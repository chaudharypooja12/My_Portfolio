import {
  Code2,
  Globe,
  Database,
  AppWindow,
  Server,
  Cloud,
  Layout,
  Terminal,
  Sparkles,
  Bot,
  FileCode,
  Palette,
  Blocks,
  Globe2,
  Mail,
  Cpu,
  Brain,
  MessageSquare,
  Video,
  Workflow,
  Monitor,
  FileText,
  Presentation,
  MessageCircle,
} from "lucide-react";
import { ClayCard, IconTile } from "@/components/clay/clay-card";
import type { Tone } from "@/components/clay/tones";
import { Reveal } from "@/components/layout/reveal";
import { Section } from "@/components/sections/section";
import { TechCarousel } from "@/components/portfolio/tech-carousel";
import { TechIcon, hasTechIcon, techNames } from "@/components/portfolio/tech-icon";

const categories = [
  {
    icon: Layout,
    name: "Frontend Development",
    tone: "peach" as Tone,
    skills: [
      { name: "Next.js", level: 85, icon: Blocks },
      { name: "JavaScript", level: 82, icon: FileCode },
      { name: "Tailwind CSS", level: 88, icon: Palette },
      { name: "shadcn/ui", level: 80, icon: AppWindow },
      { name: "HTML", level: 90, icon: Globe },
    ],
  },
  {
    icon: Server,
    name: "Backend & APIs",
    tone: "sky" as Tone,
    skills: [
      { name: "REST API", level: 80, icon: Server },
      { name: "Resend", level: 75, icon: Mail },
      { name: "Supabase", level: 78, icon: Database },
    ],
  },
  {
    icon: Database,
    name: "Database",
    tone: "mint" as Tone,
    skills: [
      { name: "PostgreSQL", level: 78, icon: Database },
      { name: "SQL", level: 82, icon: Database },
      { name: "MySQL", level: 75, icon: Database },
    ],
  },
  {
    icon: Cloud,
    name: "Deployment & Cloud",
    tone: "butter" as Tone,
    skills: [
      { name: "Vercel", level: 85, icon: Cloud },
      { name: "GitHub", level: 80, icon: Globe2 },
    ],
  },
  {
    icon: Code2,
    name: "Programming Languages",
    tone: "rose" as Tone,
    skills: [
      { name: "Python", level: 85, icon: Code2 },
      { name: "C", level: 80, icon: Terminal },
      { name: "C++", level: 75, icon: Terminal },
      { name: "Visual Basic", level: 70, icon: Code2 },
    ],
  },
  {
    icon: Sparkles,
    name: "AI & Automation",
    tone: "teal" as Tone,
    skills: [
      { name: "ChatGPT", level: 88, icon: MessageSquare },
      { name: "Claude Code", level: 85, icon: Brain },
      { name: "Gemini", level: 82, icon: Sparkles },
      { name: "Meta AI", level: 80, icon: Bot },
      { name: "AI Automation", level: 85, icon: Workflow },
    ],
  },
  {
    icon: Bot,
    name: "AI Tools & IDEs",
    tone: "sky" as Tone,
    skills: [
      { name: "Cursor IDE", level: 88, icon: Monitor },
      { name: "OpenCode", level: 85, icon: Code2 },
      { name: "OpenAI", level: 82, icon: Cpu },
      { name: "Google Flow", level: 78, icon: Video },
    ],
  },
  {
    icon: AppWindow,
    name: "Applications & Tools",
    tone: "peach" as Tone,
    skills: [
      { name: "MS Office", level: 90, icon: FileText },
      { name: "VS Code", level: 88, icon: Code2 },
      { name: "Gamma (PPT)", level: 85, icon: Presentation },
      { name: "Chatbots", level: 80, icon: MessageCircle },
    ],
  },
];

const half = Math.ceil(techNames.length / 2);
const carouselRows = [techNames.slice(0, half), techNames.slice(half)];

export function SkillsSection() {
  return (
    <Section
      id="skills"
      title="Technical Skills"
      description="Technologies, tools, and frameworks I work with"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, ci) => (
          <Reveal key={cat.name} delay={(ci % 4) * 80} className="h-full">
            <ClayCard tone={cat.tone} className="h-full p-5">
              <div className="mb-5 flex items-center gap-3">
                <IconTile>
                  <cat.icon className="size-5" />
                </IconTile>
                <h3 className="font-heading text-base font-bold leading-tight">{cat.name}</h3>
              </div>

              <ul className="space-y-3.5">
                {cat.skills.map((skill) => (
                  <li key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-sm font-medium">
                        {hasTechIcon(skill.name) ? (
                          <TechIcon name={skill.name} className="size-4" />
                        ) : (
                          <skill.icon className="size-4 text-muted-foreground" aria-hidden="true" />
                        )}
                        {skill.name}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      role="progressbar"
                      aria-label={`${skill.name} proficiency`}
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      className="clay-inset h-3 overflow-hidden rounded-full bg-card/70 p-0.5"
                    >
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </ClayCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <h3 className="mb-2 text-center font-heading text-xl font-bold">Tech I build with</h3>
        <div className="space-y-1">
          {carouselRows.map((row, i) => (
            <TechCarousel key={i} items={row} reverse={i === 1} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
