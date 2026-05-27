import { NavLink } from "react-router-dom";
import { LINKS } from "@/constants/links";
import { Brand } from "@/components/ui/brand";
import { LinkButton } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/cn";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "text-sm transition-colors",
    isActive ? "text-text font-medium" : "text-text-muted hover:text-text"
  );

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Brand />
        <nav className="hidden items-center gap-8 sm:flex">
          <a href="/#features" className="text-sm text-text-muted hover:text-text">
            Features
          </a>
          <a href="/#how-it-works" className="text-sm text-text-muted hover:text-text">
            How it works
          </a>
          <NavLink to="/security" className={navLinkClass}>
            Security
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LinkButton
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            className="hidden sm:inline-flex"
          >
            GitHub
          </LinkButton>
          <LinkButton href={LINKS.releases} target="_blank" rel="noreferrer">
            Download
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
