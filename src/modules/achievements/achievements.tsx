import { Trophy, Star, Sparkles } from "lucide-react";
import { ClayCard, IconTile } from "@/components/clay/clay-card";
import { Reveal } from "@/components/layout/reveal";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/sections/section";

export function AchievementsSection() {
  return (
    <Section
      id="achievements"
      title="Achievements"
      description="Academic and professional recognitions"
      containerClassName="max-w-3xl"
    >
      <Reveal>
        <ClayCard tone="butter" className="p-8 md:p-10">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <IconTile size="lg" className="size-20 rounded-3xl bg-card">
              <Trophy className="size-10 text-primary" aria-hidden="true" />
            </IconTile>
            <div>
              <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
                <h3 className="font-heading text-2xl font-bold">Dean&apos;s List</h3>
                <Star className="size-5 fill-primary text-primary" aria-hidden="true" />
              </div>
              <p className="leading-relaxed text-foreground/80">
                Recognized for outstanding academic performance in M.Sc.
                Computer Science at Maharshi Dayanand University, Rohtak.
                Demonstrated exceptional dedication to academic excellence
                and technical mastery.
              </p>
              <Badge variant="card" className="mt-4 h-7 gap-1.5">
                <Sparkles className="text-primary" aria-hidden="true" />
                Academic Excellence
              </Badge>
            </div>
          </div>
        </ClayCard>
      </Reveal>
    </Section>
  );
}
