import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ClayCard, IconTile } from "@/components/clay/clay-card";
import { toneAt } from "@/components/clay/tones";
import { Section } from "@/components/sections/section";
import { Timeline, TimelineItem } from "@/components/sections/timeline";

const education = [
  {
    degree: "M.Sc. Computer Science",
    institution: "Maharshi Dayanand University, Rohtak",
    date: "Aug 2020 – Aug 2022",
    grade: "First Division",
    description: "Advanced topics in computer science like programming languages and databases.",
    skills: ["SQL", "Python", "C/C++", "Java", "Visual Basic"],
    extraSkills: 2,
    highlight: true,
  },
  {
    degree: "B.Sc. (General)",
    institution: "Maharshi Dayanand University, Rohtak",
    date: "Aug 2016 – Jun 2019",
    grade: "First Division",
    description: "Foundational knowledge across various science subjects rather than specializing in a single field.",
    skills: ["Analytical Skills", "Problem Solving"],
    extraSkills: 3,
    highlight: false,
  },
  {
    degree: "12th, Computer Science",
    institution: "Ganga International School",
    date: "Jun 2015 – Mar 2016",
    grade: "First Division",
    description: "Higher secondary education with Computer Science specialization.",
    skills: ["Physics", "Chemistry", "Maths", "Computer Science"],
    highlight: false,
  },
  {
    degree: "10th",
    institution: "Ganga International School",
    date: "Jun 2013 – Mar 2014",
    grade: "First Division",
    description: "Secondary education with comprehensive curriculum.",
    skills: ["Hindi", "English", "Maths", "Social Science", "Science"],
    highlight: false,
  },
];

export function EducationSection() {
  return (
    <Section
      id="education"
      title="Education"
      description="Academic qualifications and certifications"
      containerClassName="max-w-3xl"
    >
      <Timeline>
        {education.map((edu, i) => (
          <TimelineItem key={edu.degree + edu.institution} highlight={edu.highlight} delay={i * 100}>
            <ClayCard tone={toneAt(i + 3)} className="p-6">
              <div className="flex items-start gap-4">
                <IconTile size="lg">
                  {edu.highlight ? (
                    <GraduationCap className="size-6 text-primary" aria-hidden="true" />
                  ) : (
                    <BookOpen className="size-6 text-accent" aria-hidden="true" />
                  )}
                </IconTile>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold">{edu.degree}</h3>
                  <p className="text-foreground/80">{edu.institution}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{edu.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge variant="card" className="gap-1.5">
                      <Calendar aria-hidden="true" />
                      {edu.date}
                    </Badge>
                    <Badge variant="mint" className="gap-1.5">
                      <Award aria-hidden="true" />
                      {edu.grade}
                    </Badge>
                  </div>
                  {edu.skills.length > 0 && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Skills:</span>{" "}
                      {edu.skills.join(", ")}
                      {edu.extraSkills ? `, +${edu.extraSkills} skills` : ""}
                    </p>
                  )}
                </div>
              </div>
            </ClayCard>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
