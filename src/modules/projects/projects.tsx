"use client";

import Image from "next/image";
import { useState, type ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Brain,
  ExternalLink,
  Eye,
  FileText,
  Gamepad2,
  Info,
  Layout,
  Play,
  Puzzle,
  Rocket,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import { ClayCard, IconTile } from "@/components/clay/clay-card";
import type { Tone } from "@/components/clay/tones";
import { Reveal } from "@/components/layout/reveal";
import { Section } from "@/components/sections/section";
import { TechIcon, TechTag, hasTechIcon } from "@/components/portfolio/tech-icon";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import portfolioData from "@/data/portfolio.json";
import { SnakeGame } from "@/modules/projects/games/snake";
import { SpaceshipGame } from "@/modules/projects/games/spaceship";
import { TicTacToeGame } from "@/modules/projects/games/tic-tac-toe";

type ProjectId =
  | "portfolio"
  | "attendance"
  | "education"
  | "misrikitchen"
  | "document-collector"
  | "interactive-learning"
  | "tic-tac-toe"
  | "snake"
  | "spaceship";

type GameProjectId = "tic-tac-toe" | "snake" | "spaceship";
type StandardProjectId = Exclude<ProjectId, GameProjectId>;

type PortfolioProject = {
  id: ProjectId;
  title: string;
  description: string;
  tags: string[];
  url?: string;
};

type GameComponent = ComponentType<Record<string, never>>;

type ProjectBase = PortfolioProject & {
  icon: LucideIcon;
  tone: Tone;
  eyebrow: string;
  imageSrc?: string;
  imageAlt?: string;
};

type StandardProject = Omit<ProjectBase, "id"> & {
  id: StandardProjectId;
  kind: "standard";
  highlights: readonly string[];
};

type GameProject = Omit<ProjectBase, "id"> & {
  id: GameProjectId;
  kind: "game";
  component: GameComponent;
  dialogDescription: string;
  rulesSummary: string;
  levelPills: readonly string[];
  levels: readonly string[];
  controls: readonly string[];
};

type ProjectCard = StandardProject | GameProject;

const portfolioProjects = portfolioData.projects as readonly PortfolioProject[];

const projectImages: Partial<Record<ProjectId, { src: string; alt: string }>> = {
  portfolio: {
    src: "/images/projects/portfolio-website.webp",
    alt: "Desktop and mobile screens showing the portfolio interface.",
  },
  attendance: {
    src: "/images/projects/attendance-management.webp",
    alt: "Attendance dashboard with a calendar, employee statuses, analytics, and reports.",
  },
  education: {
    src: "/images/projects/cs-education.webp",
    alt: "Students learning with a coding laptop, lesson boards, flowcharts, and assessments.",
  },
  "tic-tac-toe": {
    src: "/images/projects/tic-tac-toe.webp",
    alt: "Human and robot facing a glowing three-by-three strategy board.",
  },
  snake: {
    src: "/images/projects/snake-game.webp",
    alt: "Glowing green snake moving across an arcade grid toward fruit.",
  },
  spaceship: {
    src: "/images/projects/spaceship-survival.webp",
    alt: "Spacecraft weaving through a colorful field of incoming asteroids.",
  },
};

function assertNever(value: never): never {
  throw new Error(`Unhandled project id: ${value}`);
}

const projectCards = portfolioProjects.map<ProjectCard>((project) => {
  const image = projectImages[project.id];
  const media = image ? { imageSrc: image.src, imageAlt: image.alt } : {};

  switch (project.id) {
    case "portfolio":
      return {
        ...project,
        ...media,
        id: "portfolio",
        kind: "standard",
        icon: Layout,
        tone: "peach",
        eyebrow: "Flagship build",
        highlights: [
          "Claymorphism interface with colorful, tactile cards.",
          "Accessible light and dark themes with responsive layouts.",
        ],
      };
    case "attendance":
      return {
        ...project,
        ...media,
        id: "attendance",
        kind: "standard",
        icon: Users,
        tone: "mint",
        eyebrow: "Operations workflow",
        highlights: [
          "Employee attendance tracking designed for daily usage.",
          "Reporting-focused experience for quick review and follow-up.",
        ],
      };
    case "education":
      return {
        ...project,
        ...media,
        id: "education",
        kind: "standard",
        icon: BookOpen,
        tone: "butter",
        eyebrow: "Teaching practice",
        highlights: [
          "Hands-on curriculum design for practical computer science learning.",
          "Regular assessments and mentoring to reinforce problem solving.",
        ],
      };
    case "misrikitchen":
      return {
        ...project,
        id: "misrikitchen",
        kind: "standard",
        icon: UtensilsCrossed,
        tone: "rose",
        eyebrow: "Client website",
        highlights: [
          "Built with Next.js for fast, responsive pages.",
          "Live at misrikitchen.com.",
        ],
      };
    case "document-collector":
      return {
        ...project,
        id: "document-collector",
        kind: "standard",
        icon: FileText,
        tone: "teal",
        eyebrow: "Web application",
        highlights: [
          "Next.js frontend for the document collection workflow.",
          "PostgreSQL backend for reliable record storage.",
        ],
      };
    case "interactive-learning":
      return {
        ...project,
        id: "interactive-learning",
        kind: "standard",
        icon: Puzzle,
        tone: "butter",
        eyebrow: "Learning app",
        highlights: [
          "Frontend-only app built with Vite, with no backend to maintain.",
          "Interactive lessons made for Riya and Siya, deployed on Vercel.",
        ],
      };
    case "tic-tac-toe":
      return {
        ...project,
        ...media,
        id: "tic-tac-toe",
        kind: "game",
        icon: Brain,
        tone: "sky",
        eyebrow: "Interactive game",
        component: TicTacToeGame,
        dialogDescription:
          "Strategy duel against the computer with persistent score tracking and accessible play.",
        rulesSummary:
          "Place three marks in a row before the computer does, and keep the match score climbing.",
        levelPills: ["Easy", "Medium", "Hard"],
        levels: [
          "Easy: random legal moves for a relaxed round.",
          "Medium: tactical responses mixed with unpredictability.",
          "Hard: optimal minimax play for a serious challenge.",
        ],
        controls: [
          "Mouse, touch, or keyboard-friendly board interaction.",
          "New round preserves match score until you restart the match.",
        ],
      };
    case "snake":
      return {
        ...project,
        ...media,
        id: "snake",
        kind: "game",
        icon: Gamepad2,
        tone: "mint",
        eyebrow: "Interactive game",
        component: SnakeGame,
        dialogDescription:
          "Responsive arcade run with local high-score tracking, touch support, and escalating pace.",
        rulesSummary:
          "Collect food, grow longer, avoid walls and your own tail, and survive the speed increase.",
        levelPills: ["Level 1+", "Faster pace", "Score boost"],
        levels: [
          "Level increases every 4 food pickups.",
          "Game speed accelerates as levels rise.",
          "Score gains scale with the current level.",
        ],
        controls: [
          "Arrow keys or WASD for keyboard play.",
          "On-screen touch pad for phones and tablets.",
          "Pause and resume without losing the current run.",
        ],
      };
    case "spaceship":
      return {
        ...project,
        ...media,
        id: "spaceship",
        kind: "game",
        icon: Rocket,
        tone: "rose",
        eyebrow: "Interactive game",
        component: SpaceshipGame,
        dialogDescription:
          "Asteroid-dodging survival challenge with persistent best results and responsive controls.",
        rulesSummary:
          "Dodge incoming asteroids, protect your three lives, and stay alive long enough to reach higher levels.",
        levelPills: ["10 levels", "3 lives", "Speed boost"],
        levels: [
          "Advance one level every 15 seconds survived.",
          "Asteroid speed and spawn pressure intensify up to level 10.",
          "Short post-hit shield windows create recovery opportunities.",
        ],
        controls: [
          "Arrow keys or WASD to move the ship.",
          "Touch pad controls work for mobile play.",
          "Pause and resume to manage longer survival attempts.",
        ],
      };
    default:
      return assertNever(project.id);
  }
});

const featuredProjects = projectCards.filter(
  (project): project is StandardProject => project.kind === "standard",
);

const gameProjects = projectCards.filter(
  (project): project is GameProject => project.kind === "game",
);

function ProjectMedia({ project }: { project: ProjectCard }) {
  if (project.imageSrc && project.imageAlt) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-card/70">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          width={1600}
          height={900}
          sizes="(max-width: 767px) calc(100vw - 2rem), 50vw"
          className="h-full w-full object-cover transition duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  const techNames = project.tags.filter(hasTechIcon);
  const Icon = project.icon;

  return (
    <div className="flex aspect-video items-center justify-center gap-4 rounded-[1.5rem] bg-card/70">
      {techNames.length > 0 ? (
        techNames.map((name) => (
          <TechIcon key={name} name={name} className="h-12 w-12 md:h-14 md:w-14" />
        ))
      ) : (
        <Icon className="h-14 w-14 text-foreground" aria-hidden="true" />
      )}
    </div>
  );
}

function ProjectTitle({ project }: { project: ProjectCard }) {
  const Icon = project.icon;

  return (
    <div className="flex items-start justify-between gap-4 px-1">
      <div>
        <p className="text-xs font-bold tracking-[0.18em] text-foreground/65 uppercase">
          {project.eyebrow}
        </p>
        <h4 className="mt-1 font-heading text-xl font-bold text-foreground">{project.title}</h4>
      </div>
      <IconTile>
        <Icon className="size-5" aria-hidden="true" />
      </IconTile>
    </div>
  );
}

function GroupHeading({
  icon: Icon,
  iconClassName,
  title,
  description,
}: {
  icon: LucideIcon;
  iconClassName: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <IconTile className={iconClassName}>
        <Icon className="size-5" aria-hidden="true" />
      </IconTile>
      <div>
        <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function renderTagGroup(tags: readonly string[]) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <TechTag key={tag} name={tag} />
      ))}
    </div>
  );
}

export function ProjectsSection() {
  const [selectedGameId, setSelectedGameId] = useState<GameProjectId | null>(null);
  const [rulesGameId, setRulesGameId] = useState<GameProjectId | null>(null);
  const [previewId, setPreviewId] = useState<StandardProjectId | null>(null);

  const previewProject =
    previewId === null
      ? null
      : featuredProjects.find((project) => project.id === previewId) ?? null;

  const selectedGame =
    selectedGameId === null
      ? null
      : gameProjects.find((project) => project.id === selectedGameId) ?? null;

  const SelectedGameComponent = selectedGame?.component;
  const rulesGame =
    rulesGameId === null
      ? null
      : gameProjects.find((project) => project.id === rulesGameId) ?? null;

  return (
    <>
      <Section
        id="projects"
        title="Projects & Work"
        description="Client websites, web applications, teaching work, and playable experiments in one colorful showcase"
      >
        <div className="space-y-16">
          <div className="space-y-6">
            <GroupHeading
              icon={Layout}
              iconClassName="bg-primary text-primary-foreground"
              title="Featured builds"
              description="Client websites, web applications, and teaching work."
            />

            <div className="grid gap-6 md:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <Reveal key={project.id} delay={(index % 2) * 100} className="h-full">
                  <ClayCard
                    tone={project.tone}
                    interactive
                    className="group flex h-full flex-col gap-4 p-4 md:p-5"
                  >
                    <ProjectMedia project={project} />
                    <ProjectTitle project={project} />

                    <p className="px-1 text-sm leading-6 text-foreground/80">
                      {project.description}
                    </p>

                    <ul className="grid gap-2 text-sm">
                      {project.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="clay-inset flex items-start gap-3 rounded-2xl bg-card/60 px-4 py-3"
                        >
                          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-col gap-4 px-1 pt-1">
                      {renderTagGroup(project.tags)}
                      {project.url ? (
                        <div className="flex flex-wrap gap-3">
                          <Button onClick={() => setPreviewId(project.id)}>
                            <Eye aria-hidden="true" />
                            Preview
                          </Button>
                          <ButtonLink
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="secondary"
                          >
                            <ExternalLink aria-hidden="true" />
                            Visit site
                            <span className="sr-only"> (opens in a new tab)</span>
                          </ButtonLink>
                        </div>
                      ) : null}
                    </div>
                  </ClayCard>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <GroupHeading
              icon={Gamepad2}
              iconClassName="bg-accent text-accent-foreground"
              title="Playable project demos"
              description="Open each game in a focused dialog so only the selected experience mounts and runs."
            />

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {gameProjects.map((project, index) => (
                <Reveal key={project.id} delay={index * 100} className="h-full">
                  <ClayCard
                    tone={project.tone}
                    interactive
                    className="group flex h-full min-h-64 flex-col gap-4 p-4 md:p-5"
                  >
                    <ProjectMedia project={project} />
                    <ProjectTitle project={project} />

                    <div className="flex flex-wrap gap-2 px-1">
                      {project.levelPills.map((level) => (
                        <Badge key={level} variant="card">
                          {level}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-3 px-1 pt-2">
                      <Button variant="secondary" onClick={() => setRulesGameId(project.id)}>
                        <Info aria-hidden="true" />
                        Rules
                      </Button>
                      <Button onClick={() => setSelectedGameId(project.id)}>
                        <Play aria-hidden="true" />
                        Play Game
                      </Button>
                    </div>
                  </ClayCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Dialog
        open={previewProject !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPreviewId(null);
          }
        }}
      >
        <DialogContent className="h-[calc(100dvh-1rem)] max-h-[54rem] max-w-5xl p-0 sm:h-[calc(100dvh-2rem)]">
          {previewProject?.url ? (
            <>
              <DialogHeader className="py-3">
                <DialogTitle className="text-lg">{previewProject.title}</DialogTitle>
                <DialogDescription className="truncate">
                  {previewProject.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </DialogDescription>
              </DialogHeader>

              <div className="flex min-h-0 flex-1 flex-col gap-3 p-3 sm:p-4">
                <iframe
                  key={previewProject.id}
                  src={previewProject.url}
                  title={`${previewProject.title} live preview`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  className="clay-inset min-h-0 w-full flex-1 rounded-2xl bg-white"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">
                    Preview blank? Some sites block embedding, so open it in a new tab.
                  </p>
                  <ButtonLink
                    href={previewProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    <ExternalLink aria-hidden="true" />
                    Open in new tab
                    <span className="sr-only"> (opens in a new tab)</span>
                  </ButtonLink>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog
        open={selectedGame !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedGameId(null);
          }
        }}
      >
        <DialogContent className="h-[calc(100dvh-1rem)] max-h-[54rem] max-w-4xl p-0 sm:h-[calc(100dvh-2rem)]">
          {selectedGame && SelectedGameComponent ? (
            <>
              <DialogHeader className="flex-row items-center justify-between py-3">
                <div>
                  <DialogTitle className="text-lg">{selectedGame.title}</DialogTitle>
                  <DialogDescription className="sr-only">
                    {selectedGame.dialogDescription}
                  </DialogDescription>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mr-4"
                  onClick={() => {
                    setSelectedGameId(null);
                    setRulesGameId(selectedGame.id);
                  }}
                >
                  <Info aria-hidden="true" />
                  Rules
                </Button>
              </DialogHeader>

              <div className="min-h-0 flex-1 overflow-y-auto p-2 sm:p-3">
                <SelectedGameComponent />
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog
        open={rulesGame !== null}
        onOpenChange={(open) => {
          if (!open) {
            setRulesGameId(null);
          }
        }}
      >
        <DialogContent className="max-w-md p-0">
          {rulesGame ? (
            <>
              <DialogHeader>
                <DialogTitle>{rulesGame.title} Rules</DialogTitle>
                <DialogDescription>{rulesGame.rulesSummary}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 p-5 text-sm">
                <section>
                  <h4 className="font-heading font-bold text-foreground">Levels</h4>
                  <ul className="mt-2 space-y-1.5 text-muted-foreground">
                    {rulesGame.levels.map((level) => (
                      <li key={level} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        {level}
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h4 className="font-heading font-bold text-foreground">Controls</h4>
                  <ul className="mt-2 space-y-1.5 text-muted-foreground">
                    {rulesGame.controls.map((control) => (
                      <li key={control} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        {control}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
