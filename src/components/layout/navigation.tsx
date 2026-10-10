"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#achievements", label: "Achievements" },
  { href: "#resume", label: "Resume" },
];

function Logo() {
  return (
    <span className="flex items-center gap-2.5 font-heading text-lg font-bold text-foreground">
      <span
        aria-hidden="true"
        className="clay-btn flex size-10 items-center justify-center rounded-2xl bg-primary font-heading text-[0.95rem] font-extrabold tracking-tight text-primary-foreground [--clay-tint:var(--primary)]"
      >
        PC
      </span>
      <span>
        Pooja<span className="sr-only"> Chaudhary</span>
      </span>
    </span>
  );
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-3 top-3 z-50 md:inset-x-6">
      <nav
        aria-label="Primary"
        className="clay relative mx-auto flex h-16 max-w-6xl items-center justify-between overflow-hidden rounded-full bg-card/95 px-3 pl-4 backdrop-blur-md"
      >
        <Link href="/" aria-label="Pooja - Home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? "clay-inset bg-tone-peach text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={cn(buttonVariants({ variant: "secondary", size: "icon" }), "lg:hidden")}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-5">
              <SheetTitle className="mb-2">
                <Logo />
              </SheetTitle>
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "block rounded-2xl px-4 py-3 text-sm font-semibold transition-colors",
                          isActive
                            ? "clay-inset bg-tone-peach text-foreground"
                            : "text-foreground hover:bg-muted",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-6 bottom-0 h-1 overflow-hidden rounded-full"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </nav>
    </header>
  );
}
