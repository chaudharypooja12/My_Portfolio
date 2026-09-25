"use client";

import { useEffect, useRef } from "react";

const PORTRAIT_SRC = "/images/photo.png";

// Eye anchors in natural image pixels (1312x1199 photo.png).
const EYES = [
  { cx: 577, cy: 227, rx: 32, ry: 18 },
  { cx: 678, cy: 227, rx: 32, ry: 18 },
];

const MAX_SHIFT = 6;
const LERP = 0.12;
const EDGE_FADE_START = 0.82;

// The source is not a real transparency cutout: it carries a light studio
// background. Best-effort removal at render time via flood fill from the
// image borders, so the hero background stays visible around the portrait.
const BG_LUM_MIN = 165;
const BG_SAT_MAX = 38;

interface View {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  dw: number;
  dh: number;
  scale: number;
}

function clamp(value: number): number {
  if (value <= -1) return -1;
  if (value >= 1) return 1;
  return value;
}

function keyOutBackground(target: HTMLCanvasElement): void {
  const targetCtx = target.getContext("2d");
  if (!targetCtx) return;

  const w = target.width;
  const h = target.height;
  const id = targetCtx.getImageData(0, 0, w, h);
  const d = id.data;
  const n = w * h;

  const flagged = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const r = d[i * 4];
    const g = d[i * 4 + 1];
    const b = d[i * 4 + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (lum >= BG_LUM_MIN && max - min <= BG_SAT_MAX) flagged[i] = 1;
  }

  const stack: number[] = [];
  const push = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const i = y * w + x;
    if (flagged[i] === 1) {
      flagged[i] = 2;
      stack.push(i);
    }
  };

  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }

  while (stack.length) {
    const i = stack.pop();
    if (i === undefined) continue;
    const x = i % w;
    const y = (i - x) / w;
    push(x - 1, y);
    push(x + 1, y);
    push(x, y - 1);
    push(x, y + 1);
  }

  for (let i = 0; i < n; i++) {
    if (flagged[i] === 2) d[i * 4 + 3] = 0;
  }

  targetCtx.putImageData(id, 0, 0);
}

export function EyeFollowPortrait() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !window.matchMedia) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const img = new Image();
    img.decoding = "async";
    img.src = PORTRAIT_SRC;

    let raf = 0;
    let running = false;
    let destroyed = false;
    let teardown: (() => void) | null = null;
    let view: View | null = null;
    let shiftX = 0;
    let shiftY = 0;
    let targetX = 0;
    let targetY = 0;
    const offs: Array<HTMLCanvasElement | null> = [null, null];
    let offW = 0;
    let offH = 0;
    let baseCv: HTMLCanvasElement | null = null;

    const drawEyes = () => {
      if (!view || !img.naturalWidth) return;
      const { sx, sy, scale } = view;

      for (let i = 0; i < EYES.length; i++) {
        const eye = EYES[i];
        const off = offs[i];
        if (!off) continue;
        const octx = off.getContext("2d");
        if (!octx) continue;

        const srcCx = eye.cx + shiftX;
        const srcCy = eye.cy + shiftY;
        const srcHalfW = offW / 2 / scale;
        const srcHalfH = offH / 2 / scale;

        octx.clearRect(0, 0, offW, offH);
        octx.drawImage(
          img,
          srcCx - srcHalfW,
          srcCy - srcHalfH,
          srcHalfW * 2,
          srcHalfH * 2,
          0,
          0,
          offW,
          offH
        );

        const rxDev = eye.rx * scale;
        const ryDev = eye.ry * scale;
        octx.save();
        octx.globalCompositeOperation = "destination-in";
        octx.translate(offW / 2, offH / 2);
        octx.scale(1, ryDev / rxDev);
        const grad = octx.createRadialGradient(
          0,
          0,
          rxDev * EDGE_FADE_START,
          0,
          0,
          rxDev
        );
        grad.addColorStop(0, "rgba(0,0,0,1)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        octx.fillStyle = grad;
        octx.fillRect(-rxDev, -rxDev, rxDev * 2, rxDev * 2);
        octx.restore();

        const exDev = (eye.cx - sx) * scale;
        const eyDev = (eye.cy - sy) * scale;
        ctx.drawImage(off, exDev - offW / 2, eyDev - offH / 2, offW, offH);
      }
    };

    const frame = () => {
      if (destroyed || !view || !baseCv) return;

      shiftX += (targetX - shiftX) * LERP;
      shiftY += (targetY - shiftY) * LERP;
      if (Math.abs(targetX - shiftX) < 0.02) shiftX = targetX;
      if (Math.abs(targetY - shiftY) < 0.02) shiftY = targetY;

      ctx.clearRect(0, 0, view.dw, view.dh);
      ctx.drawImage(baseCv, 0, 0);
      drawEyes();

      if (running) raf = requestAnimationFrame(frame);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = clamp(
        (event.clientX - (rect.left + rect.width / 2)) / (rect.width * 1.5)
      );
      const ny = clamp(
        (event.clientY - (rect.top + rect.height / 2)) / (rect.height * 1.5)
      );
      targetX = nx * MAX_SHIFT;
      targetY = ny * MAX_SHIFT;
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) {
        targetX = 0;
        targetY = 0;
      }
    };

    const setup = () => {
      const rect = container.getBoundingClientRect();
      const cssW = rect.width || 1;
      const cssH = rect.height || 1;
      const dpr = window.devicePixelRatio || 1;
      const dw = Math.max(1, Math.round(cssW * dpr));
      const dh = Math.max(1, Math.round(cssH * dpr));

      if (canvas.width !== dw) canvas.width = dw;
      if (canvas.height !== dh) canvas.height = dh;

      const ratio = Math.max(
        cssW / img.naturalWidth,
        cssH / img.naturalHeight
      );
      const sw = cssW / ratio;
      const sh = cssH / ratio;
      view = {
        sx: (img.naturalWidth - sw) / 2,
        sy: (img.naturalHeight - sh) / 2,
        sw,
        sh,
        dw,
        dh,
        scale: dw / sw,
      };

      const margin = Math.ceil(MAX_SHIFT * view.scale) + 2;
      offW = Math.ceil(EYES[0].rx * view.scale * 2) + margin * 2;
      offH = Math.ceil(EYES[0].ry * view.scale * 2) + margin * 2;

      for (let i = 0; i < EYES.length; i++) {
        if (!offs[i]) offs[i] = document.createElement("canvas");
        offs[i]!.width = offW;
        offs[i]!.height = offH;
      }

      if (!baseCv) baseCv = document.createElement("canvas");
      baseCv.width = dw;
      baseCv.height = dh;
      const bctx = baseCv.getContext("2d");
      if (!bctx) return;
      bctx.drawImage(
        img,
        view.sx,
        view.sy,
        view.sw,
        view.sh,
        0,
        0,
        dw,
        dh
      );
      keyOutBackground(baseCv);

      ctx.clearRect(0, 0, dw, dh);
      ctx.drawImage(baseCv, 0, 0);
    };

    const handleResize = () => {
      setup();
    };

    img.onload = () => {
      if (destroyed) return;
      setup();

      // Static portrait only on touch devices or when reduced motion is set.
      if (!finePointer || reduced) return;

      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      window.addEventListener("pointerout", handlePointerOut);
      window.addEventListener("resize", handleResize);
      document.addEventListener("scroll", handleResize, { capture: true });
      const ro = new ResizeObserver(handleResize);
      ro.observe(container);

      running = true;
      raf = requestAnimationFrame(frame);

      teardown = () => {
        ro.disconnect();
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerout", handlePointerOut);
        window.removeEventListener("resize", handleResize);
        document.removeEventListener("scroll", handleResize, {
          capture: true,
        });
        cancelAnimationFrame(raf);
        running = false;
      };
    };

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      running = false;
      teardown?.();
    };
  }, []);

  return (
    <>
      <link rel="preload" as="image" href={PORTRAIT_SRC} />
      <div
        ref={containerRef}
        role="img"
        aria-label="Pooja - Computer Science Teacher"
        className="relative h-full w-full select-none"
      >
        <canvas ref={canvasRef} aria-hidden className="h-full w-full" />
      </div>
    </>
  );
}