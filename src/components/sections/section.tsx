import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";

type SectionProps = {
  id: string;
  title: string;
  description?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

export function Section({
  id,
  title,
  description,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("section-padding scroll-mt-16", className)}>
      <div className={cn("mx-auto max-w-6xl", containerClassName)}>
        <SectionHeader title={title} description={description} />
        {children}
      </div>
    </section>
  );
}
