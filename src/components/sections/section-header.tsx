import { Reveal } from "@/components/layout/reveal";

interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <Reveal className="mb-14 text-center">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          {description}
        </p>
      )}
      <div className="mx-auto mt-6 flex items-center justify-center gap-2" aria-hidden="true">
        <div className="clay-chip h-2.5 w-8 rounded-full bg-primary" />
        <div className="clay-chip h-2.5 w-12 rounded-full bg-tone-butter" />
        <div className="clay-chip h-2.5 w-8 rounded-full bg-accent" />
      </div>
    </Reveal>
  );
}
