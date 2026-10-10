import type { IconType } from "react-icons";
import {
  SiC,
  SiClaude,
  SiCplusplus,
  SiCursor,
  SiGithub,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiMeta,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiResend,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TechEntry = { icon: IconType; color?: string };

const techIcons = new Map<string, TechEntry>([
  ["Next.js", { icon: SiNextdotjs }],
  ["JavaScript", { icon: SiJavascript, color: "#D9A400" }],
  ["TypeScript", { icon: SiTypescript, color: "#3178C6" }],
  ["React", { icon: SiReact, color: "#149ECA" }],
  ["Tailwind CSS", { icon: SiTailwindcss, color: "#06B6D4" }],
  ["shadcn/ui", { icon: SiShadcnui }],
  ["HTML", { icon: SiHtml5, color: "#E34F26" }],
  ["PostgreSQL", { icon: SiPostgresql, color: "#336791" }],
  ["MySQL", { icon: SiMysql, color: "#4479A1" }],
  ["Supabase", { icon: SiSupabase, color: "#3ECF8E" }],
  ["Resend", { icon: SiResend }],
  ["Python", { icon: SiPython, color: "#3776AB" }],
  ["C", { icon: SiC, color: "#5C6BC0" }],
  ["C++", { icon: SiCplusplus, color: "#00599C" }],
  ["Vercel", { icon: SiVercel }],
  ["Vite", { icon: SiVite, color: "#8F6FFF" }],
  ["GitHub", { icon: SiGithub }],
  ["Gemini", { icon: SiGooglegemini, color: "#4285F4" }],
  ["Cursor IDE", { icon: SiCursor }],
  ["Claude Code", { icon: SiClaude, color: "#D97757" }],
  ["Meta AI", { icon: SiMeta, color: "#0866FF" }],
]);

export const techNames: string[] = Array.from(techIcons.keys());

export function hasTechIcon(name: string): boolean {
  return techIcons.has(name);
}

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const entry = techIcons.get(name);
  if (!entry) return null;

  const Icon = entry.icon;
  return (
    <Icon
      aria-hidden="true"
      className={className}
      style={entry.color ? { color: entry.color } : undefined}
    />
  );
}

export function TechTag({ name, className }: { name: string; className?: string }) {
  return (
    <Badge variant="card" className={cn("h-7 gap-1.5 px-3", className)}>
      <TechIcon name={name} className="size-3.5" />
      {name}
    </Badge>
  );
}

