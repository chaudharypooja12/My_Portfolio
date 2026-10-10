"use client";

import { ArrowDown, Sparkles, Code2, GraduationCap, Globe, Mail } from "lucide-react";
import { Typewriter } from "@/components/portfolio/typewriter";
import { Portrait } from "@/components/portfolio/portrait";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import portfolioData from "@/data/portfolio.json";

const featureTags = [
  { icon: GraduationCap, label: "M.Sc. Computer Science", variant: "peach" },
  { icon: Code2, label: "Next.js & JavaScript", variant: "sky" },
  { icon: Globe, label: "Full Stack Development", variant: "mint" },
] as const;

export function HeroSection() {
  const mounted = useMounted();
  const enter = (delay: string) =>
    cn(
      "transition-all duration-1000",
      delay,
      mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
    );

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden section-padding pt-32"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-float absolute -top-24 -right-24 size-80 rounded-full bg-tone-peach opacity-70 blur-2xl" />
        <div className="animate-float-slow absolute -bottom-24 -left-24 size-72 rounded-full bg-tone-mint opacity-70 blur-2xl" />
        <div className="animate-float-slow absolute top-1/3 -left-10 size-40 rounded-full bg-tone-butter opacity-60 blur-2xl" />
        <div className="animate-float absolute right-10 bottom-1/4 size-44 rounded-full bg-tone-sky opacity-60 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div
          className={cn(
            "clay mx-auto mb-8 size-56 overflow-hidden rounded-[3rem] bg-tone-peach md:size-64",
            enter("delay-0"),
          )}
        >
          <Portrait />
        </div>

        <div className={cn("mb-8", enter("delay-200"))}>
          <Badge variant="card" className="h-10 gap-2.5 px-5 text-sm">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-success" />
            </span>
            Available for opportunities
          </Badge>
        </div>

        <h1
          className={cn(
            "font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl",
            enter("delay-300"),
          )}
        >
          Hi, I&apos;m <span className="gradient-text">Pooja</span>
        </h1>

        <p className={cn("mt-6 text-xl font-medium text-foreground md:text-2xl", enter("delay-500"))}>
          <Typewriter />
        </p>

        <p
          className={cn(
            "mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg",
            enter("delay-[600ms]"),
          )}
        >
          M.Sc. Computer Science post-graduate passionate about teaching and
          technology. Skilled in Next.js, JavaScript, Tailwind CSS, PostgreSQL,
          and modern web development. Dedicated to delivering engaging CS
          education and building practical software solutions.
        </p>

        <ul
          className={cn(
            "mt-8 flex flex-wrap items-center justify-center gap-3",
            enter("delay-700"),
          )}
        >
          {featureTags.map((tag) => (
            <li key={tag.label}>
              <Badge variant={tag.variant} className="h-9 gap-2 px-4 text-sm">
                <tag.icon className="size-4" aria-hidden="true" />
                {tag.label}
              </Badge>
            </li>
          ))}
        </ul>

        <div
          className={cn(
            "mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row",
            enter("delay-[800ms]"),
          )}
        >
          <ButtonLink href="#projects" size="lg">
            <Sparkles aria-hidden="true" />
            View My Work
          </ButtonLink>
          <ButtonLink href={`mailto:${portfolioData.profile.email}`} variant="outline" size="lg">
            <Mail aria-hidden="true" />
            Contact Me
          </ButtonLink>
        </div>

        <div className={cn("mt-20", enter("delay-1000"))}>
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="inline-flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="text-xs font-semibold uppercase tracking-widest">Scroll</span>
            <ArrowDown className="size-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
