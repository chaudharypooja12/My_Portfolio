import { Calendar, Lightbulb, Briefcase, Code2, Laptop } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ClayCard, IconTile } from "@/components/clay/clay-card";
import { toneAt } from "@/components/clay/tones";
import { Section } from "@/components/sections/section";
import { Timeline, TimelineItem } from "@/components/sections/timeline";

const experiences = [
  {
    role: "Coding Teacher",
    company: "Codingal",
    date: "April 2024 – Present",
    current: true,
    icon: Code2,
    responsibilities: [
      "Teaching C++, Python, and JavaScript to students",
      "Developing engaging coding curriculum",
      "Mentoring students in problem-solving",
      "Conducting interactive coding sessions",
    ],
  },
  {
    role: "Technical Consultant (Freelancer)",
    company: "Self-Employed",
    date: "March 2024 – Present",
    current: true,
    icon: Laptop,
    responsibilities: [
      "Built multiple projects in Python and Next.js",
      "Provided technical consulting to clients",
      "Developed full-stack web applications",
      "Implemented RESTful APIs and database solutions",
    ],
  },
  {
    role: "Teacher — Computer Science",
    company: "GD Goenka Public School, Jhajjar",
    date: "April 2023 – March 2024",
    current: false,
    icon: Briefcase,
    responsibilities: [
      "Developed and delivered Computer Science lessons",
      "Implemented innovative teaching methodologies",
      "Facilitated hands-on learning",
      "Conducted regular assessments",
      "Adjusted teaching strategies per student understanding",
      "Collaborated with colleagues on extracurricular activities",
    ],
  },
];

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      title="Experience"
      description="Professional teaching and consulting experience"
      containerClassName="max-w-4xl"
    >
      <Timeline>
        {experiences.map((exp, i) => (
          <TimelineItem key={exp.role + exp.company} highlight={exp.current} delay={i * 100}>
            <ClayCard tone="card" className="p-6 md:p-8">
              <div className="flex items-center gap-4">
                <IconTile size="lg" tone={toneAt(i)}>
                  <exp.icon className="size-6 text-primary" aria-hidden="true" />
                </IconTile>
                <div>
                  <h3 className="font-heading text-xl font-bold">{exp.role}</h3>
                  <p className="text-muted-foreground">{exp.company}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge variant="butter" className="gap-1.5">
                  <Calendar aria-hidden="true" />
                  {exp.date}
                </Badge>
                {exp.current && <Badge variant="mint">Current</Badge>}
              </div>

              <h4 className="mt-8 mb-4 font-heading text-sm font-bold uppercase tracking-wider text-foreground/70">
                Key Responsibilities
              </h4>
              <ul className="grid gap-4 sm:grid-cols-2">
                {exp.responsibilities.map((r, j) => (
                  <li key={r}>
                    <ClayCard
                      tone={toneAt(i + j + 1)}
                      size="sm"
                      className="flex h-full items-start gap-3 p-3.5"
                    >
                      <Lightbulb
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed">{r}</span>
                    </ClayCard>
                  </li>
                ))}
              </ul>
            </ClayCard>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
