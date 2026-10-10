"use client";

import { useEffect, useRef } from "react";

const PORTRAIT_SRC = "/images/photo.png";

// The source is not a real transparency cutout: it carries a light studio
// background. Best-effort removal at render time via flood fill from the
// image borders, so the hero background stays visible around the portrait.
const BG_LUM_MIN = 165;
const BG_SAT_MAX = 38;

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

export function Portrait() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.decoding = "async";
    img.src = PORTRAIT_SRC;

    const draw = () => {
      if (!img.naturalWidth) return;

      const rect = container.getBoundingClientRect();
      const cssW = rect.width || 1;
      const cssH = rect.height || 1;
      const dpr = window.devicePixelRatio || 1;
      const dw = Math.max(1, Math.round(cssW * dpr));
      const dh = Math.max(1, Math.round(cssH * dpr));

      const ratio = Math.max(cssW / img.naturalWidth, cssH / img.naturalHeight);
      const sw = cssW / ratio;
      const sh = cssH / ratio;

      canvas.width = dw;
      canvas.height = dh;
      ctx.drawImage(
        img,
        (img.naturalWidth - sw) / 2,
        (img.naturalHeight - sh) / 2,
        sw,
        sh,
        0,
        0,
        dw,
        dh
      );
      keyOutBackground(canvas);
    };

    img.onload = draw;
    const ro = new ResizeObserver(draw);
    ro.observe(container);

    return () => ro.disconnect();
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
