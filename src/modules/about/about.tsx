import {
  GraduationCap,
  Lightbulb,
  Users,
  BookOpen,
  Target,
  Handshake,
  Zap,
  Brain,
  Code2,
  Globe,
} from "lucide-react";
import { ClayCard, IconTile } from "@/components/clay/clay-card";
import { toneAt } from "@/components/clay/tones";
import { Reveal } from "@/components/layout/reveal";
import { Section } from "@/components/sections/section";
import { TechTag } from "@/components/portfolio/tech-icon";

const strengths = [
  { icon: Lightbulb, label: "Problem Solving" },
  { icon: Target, label: "Analytical Thinking" },
  { icon: Users, label: "Communication" },
  { icon: Handshake, label: "Adaptability" },
  { icon: BookOpen, label: "Teaching Methods" },
  { icon: GraduationCap, label: "CS Curriculum" },
  { icon: Brain, label: "Critical Thinking" },
  { icon: Zap, label: "Quick Learner" },
  { icon: Code2, label: "Full Stack Dev" },
  { icon: Globe, label: "Web Technologies" },
];

const techHighlights = [
  "Next.js", "JavaScript", "Tailwind CSS", "shadcn/ui",
  "PostgreSQL", "Supabase", "Resend", "Vercel",
];

export function AboutSection() {
  return (
    <Section
      id="about"
      title="About Me"
      description="A dedicated Computer Science educator with strong full-stack development skills"
      containerClassName="max-w-5xl"
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <ClayCard tone="peach" className="h-full p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <IconTile size="lg">
                <BookOpen className="size-6 text-primary" />
              </IconTile>
              <h3 className="font-heading text-xl font-bold">Professional Summary</h3>
            </div>
            <p className="leading-relaxed text-foreground/80">
              M.Sc. Computer Science post-graduate with hands-on teaching experience
              and modern web development skills. Proficient in Next.js, JavaScript,
              Tailwind CSS, shadcn/ui, PostgreSQL, Supabase, REST APIs, and
              Resend for email services. Experienced in deploying applications
              on Vercel with Git-based workflows. Passionate about delivering
              engaging Computer Science education and building practical,
              production-ready software solutions.
            </p>

            <div className="mt-8">
              <h4 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-foreground/70">
                Education
              </h4>
              <ClayCard size="sm" className="flex items-center gap-3 p-4">
                <GraduationCap className="size-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-semibold">M.Sc. Computer Science</p>
                  <p className="text-sm text-muted-foreground">
                    Maharshi Dayanand University, Rohtak — August 2022
                  </p>
                </div>
              </ClayCard>
            </div>

            <div className="mt-6">
              <h4 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-foreground/70">
                Core Technologies
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {techHighlights.map((tech) => (
                  <TechTag key={tech} name={tech} />
                ))}
              </div>
            </div>
          </ClayCard>
        </Reveal>

        <ul className="grid grid-cols-2 gap-4 lg:col-span-2">
          {strengths.map((s, i) => (
            <li key={s.label}>
              <Reveal delay={(i % 4) * 60} className="h-full">
                <ClayCard
                  tone={toneAt(i + 1)}
                  size="sm"
                  interactive
                  className="flex h-full flex-col items-center gap-2.5 p-4 text-center"
                >
                  <IconTile size="sm">
                    <s.icon className="size-4 text-primary" aria-hidden="true" />
                  </IconTile>
                  <span className="text-xs font-semibold leading-tight">{s.label}</span>
                </ClayCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
