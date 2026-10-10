export const tones = ["peach", "mint", "sky", "butter", "rose", "teal"] as const;

export type Tone = (typeof tones)[number];

export const toneBg: Record<Tone, string> = {
  peach: "bg-tone-peach",
  mint: "bg-tone-mint",
  sky: "bg-tone-sky",
  butter: "bg-tone-butter",
  rose: "bg-tone-rose",
  teal: "bg-tone-teal",
};

export function toneAt(index: number): Tone {
  return tones[index % tones.length];
}
