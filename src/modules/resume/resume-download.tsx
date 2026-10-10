import { CheckCircle2, Download, FileText } from "lucide-react";
import { ClayCard, IconTile } from "@/components/clay/clay-card";
import { Reveal } from "@/components/layout/reveal";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/sections/section";

const details = ["2-page PDF", "ATS-friendly", "Updated portfolio details"];

export function ResumeDownload() {
  return (
    <Section
      id="resume"
      title="Download Resume"
      description="Get a copy of my ATS-friendly resume"
      containerClassName="max-w-2xl"
    >
      <Reveal>
        <ClayCard tone="mint" className="p-6 md:p-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <IconTile size="lg" className="animate-float size-16 rounded-full">
              <FileText className="size-8 text-primary" aria-hidden="true" />
            </IconTile>

            <div>
              <h3 className="font-heading text-xl font-bold">Pooja&apos;s Resume</h3>
              <p className="mt-2 text-foreground/75">
                M.Sc. Computer Science | CS Teacher &amp; Developer
              </p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {details.map((detail) => (
                  <li key={detail}>
                    <Badge variant="card" className="h-7 gap-1.5">
                      <CheckCircle2 className="text-success" aria-hidden="true" />
                      {detail}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            <ButtonLink
              href="/Pooja_Resume.pdf"
              download="Pooja_Resume.pdf"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Download aria-hidden="true" />
              Download PDF
            </ButtonLink>
          </div>
        </ClayCard>
      </Reveal>
    </Section>
  );
}
