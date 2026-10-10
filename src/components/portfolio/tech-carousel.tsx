import { cn } from "@/lib/utils";
import { TechIcon } from "./tech-icon";

type TechCarouselProps = {
  items: string[];
  reverse?: boolean;
  className?: string;
};

function Row({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-5 pr-5"
    >
      {items.map((name) => (
        <li
          key={name}
          className="clay-sm flex items-center gap-3 rounded-2xl bg-card px-5 py-3 text-foreground"
        >
          <TechIcon name={name} className="size-7" />
          <span className="text-sm font-semibold">{name}</span>
        </li>
      ))}
    </ul>
  );
}

export function TechCarousel({ items, reverse = false, className }: TechCarouselProps) {
  return (
    <div
      role="group"
      aria-label="Technologies"
      className={cn(
        "group/marquee overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center",
          "group-hover/marquee:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          "motion-reduce:animate-none",
        )}
      >
        <Row items={items} />
        <div className="motion-reduce:hidden">
          <Row items={items} hidden />
        </div>
      </div>
    </div>
  );
}
