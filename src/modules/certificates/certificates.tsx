"use client";

import Image from "next/image";
import { Award, ZoomIn } from "lucide-react";
import { ClayCard, IconTile } from "@/components/clay/clay-card";
import { toneAt } from "@/components/clay/tones";
import { Reveal } from "@/components/layout/reveal";
import { Section } from "@/components/sections/section";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Certificate {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

const certificates: Certificate[] = [
  {
    title: "NSS Certificate",
    description:
      "National Service Scheme certification for community service and social responsibility.",
  },
  {
    title: "Data Analysis and Visualization",
    description: "Certification in data analysis and visualization techniques.",
  },
  {
    title: "Python for Data Science",
    description: "Certification in Python programming fundamentals for data science.",
    imageSrc: "/images/certificates/python-for-data-science-certificate.jpg",
    imageAlt: "Python for Data Science certificate",
  },
  {
    title: "SQL for Data Science",
    description: "Certification in SQL for querying and analyzing data.",
    imageSrc: "/images/certificates/sql-for-data-science-certificate.jpg",
    imageAlt: "SQL for Data Science certificate",
  },
];

export function CertificatesSection() {
  return (
    <Section
      id="certificates"
      title="Certificates"
      description="Professional certifications and recognitions"
      containerClassName="max-w-4xl"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {certificates.map((cert, i) => (
          <Reveal key={cert.title} delay={(i % 2) * 100} className="h-full">
            <Dialog>
              <ClayCard
                tone={toneAt(i + 2)}
                interactive
                className="group flex h-full flex-col overflow-hidden"
              >
                {cert.imageSrc && (
                  <DialogTrigger
                    aria-label={`View ${cert.title} certificate`}
                    className="relative h-48 w-full cursor-pointer overflow-hidden bg-card/70 sm:h-56"
                  >
                    <Image
                      src={cert.imageSrc}
                      alt={cert.imageAlt ?? cert.title}
                      fill
                      sizes="(max-width: 767px) calc(100vw - 2rem), 50vw"
                      className="object-contain p-4 transition duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <span className="clay-btn absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-foreground">
                      <ZoomIn className="size-3.5" aria-hidden="true" />
                      View
                    </span>
                  </DialogTrigger>
                )}

                <div className="flex items-start gap-4 p-6">
                  <IconTile>
                    <Award className="size-5 text-primary" aria-hidden="true" />
                  </IconTile>
                  <div>
                    <h3 className="font-heading font-bold">{cert.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/75">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </ClayCard>

              {cert.imageSrc && (
                <DialogContent className="max-w-3xl p-0">
                  <DialogHeader>
                    <DialogTitle>{cert.title}</DialogTitle>
                    <DialogDescription>{cert.description}</DialogDescription>
                  </DialogHeader>
                  <div className="relative aspect-[4/3] w-full sm:aspect-video">
                    <Image
                      src={cert.imageSrc}
                      alt={cert.imageAlt ?? cert.title}
                      fill
                      sizes="(max-width: 1023px) calc(100vw - 2rem), 48rem"
                      className="object-contain p-4"
                    />
                  </div>
                </DialogContent>
              )}
            </Dialog>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
