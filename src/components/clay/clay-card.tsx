import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { toneBg, type Tone } from "./tones";

type ClayCardProps = ComponentProps<"div"> & {
  tone?: Tone | "card";
  size?: "md" | "sm";
  interactive?: boolean;
};

export function ClayCard({
  tone = "card",
  size = "md",
  interactive = false,
  className,
  ...props
}: ClayCardProps) {
  return (
    <div
      className={cn(
        "text-foreground",
        size === "md" ? "clay rounded-[2rem]" : "clay-sm rounded-2xl",
        tone === "card" ? "bg-card" : toneBg[tone],
        interactive && "clay-interactive",
        className,
      )}
      {...props}
    />
  );
}

type IconTileProps = ComponentProps<"div"> & {
  tone?: Tone | "card";
  size?: "sm" | "md" | "lg";
};

const tileSize = {
  sm: "size-9 rounded-xl",
  md: "size-11 rounded-2xl",
  lg: "size-14 rounded-[1.25rem]",
};

export function IconTile({ tone = "card", size = "md", className, ...props }: IconTileProps) {
  return (
    <div
      className={cn(
        "clay-sm flex shrink-0 items-center justify-center text-foreground",
        tileSize[size],
        tone === "card" ? "bg-card" : toneBg[tone],
        className,
      )}
      {...props}
    />
  );
}
