import type { ReactNode } from "react";
import { Reveal } from "@/components/layout/reveal";
import { cn } from "@/lib/utils";

export function Timeline({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="clay-inset absolute top-2 bottom-2 left-[12px] hidden w-1.5 rounded-full bg-muted md:block"
      />
      <ol className="space-y-8 md:pl-14">{children}</ol>
    </div>
  );
}

export function TimelineItem({
  highlight = false,
  delay = 0,
  children,
}: {
  highlight?: boolean;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <li className="relative">
      <span
        aria-hidden="true"
        className={cn(
          "clay-chip absolute top-8 -left-14 hidden size-7 items-center justify-center rounded-full md:flex",
          highlight ? "bg-primary" : "bg-accent",
        )}
      >
        <span className="size-2.5 rounded-full bg-white/90" />
      </span>
      <Reveal delay={delay}>{children}</Reveal>
    </li>
  );
}
