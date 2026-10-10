import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { ButtonLink } from "@/components/ui/button";
import portfolioData from "@/data/portfolio.json";

const { email, github, linkedin } = portfolioData.profile;

const socials = [
  { href: `mailto:${email}`, label: "Email", icon: Mail, external: false },
  { href: `https://${github}`, label: "GitHub", icon: FaGithub, external: true },
  { href: `https://${linkedin}`, label: "LinkedIn", icon: FaLinkedinIn, external: true },
];

export function Footer() {
  return (
    <footer className="px-4 pb-8 md:px-8">
      <div className="clay mx-auto flex max-w-6xl flex-col items-center gap-4 rounded-[2rem] bg-card px-6 py-6 md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Pooja Chaudhary. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          {socials.map(({ href, label, icon: Icon, external }) => (
            <ButtonLink
              key={label}
              href={href}
              aria-label={label}
              variant="secondary"
              size="icon"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Icon className="size-4" />
            </ButtonLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
