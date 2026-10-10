"use client";

import { useEffect, useRef, useState } from "react";
import { ClayCard } from "@/components/clay/clay-card";
import { toneAt } from "@/components/clay/tones";
import { Reveal } from "@/components/layout/reveal";
import portfolioData from "@/data/portfolio.json";

const skillCount = portfolioData.skills.reduce((sum, group) => sum + group.items.length, 0);

const stats = [
  { end: 3, suffix: "+", label: "Years Experience" },
  { end: skillCount, suffix: "+", label: "Technical Skills" },
  { end: portfolioData.education.length, suffix: "", label: "Academic Degrees" },
  { end: portfolioData.projects.length, suffix: "", label: "Projects Built" },
];

const DURATION_MS = 1600;

export function StatsSection() {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      frame = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION_MS, 1);
          setProgress(1 - Math.pow(1 - t, 3));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} aria-label="At a glance" className="px-4 py-12 md:px-8">
      <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
        {stats.map((stat, i) => (
          <li key={stat.label}>
            <Reveal delay={i * 80}>
              <ClayCard tone={toneAt(i)} className="p-6 text-center">
                <div className="font-heading text-4xl font-bold text-foreground md:text-5xl">
                  {Math.round(stat.end * progress)}
                  {stat.suffix}
                </div>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
              </ClayCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
