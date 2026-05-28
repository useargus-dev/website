import { Shield } from "lucide-react";
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

const securityIconClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "grid size-9 place-items-center rounded-md border transition-colors",
    isActive
      ? "border-signal/40 bg-surface-muted text-signal"
      : "border-border bg-surface-raised text-text-muted hover:text-text"
  );

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl min-w-0 items-center justify-between gap-2 px-4 sm:gap-4 sm:px-5">
        <Brand className="min-w-0 shrink" />
        <nav className="hidden items-center gap-8 sm:flex">
          <a href="/#features" className="text-sm text-text-muted hover:text-text">
            Features
          </a>
          <a href="/#how-it-works" className="text-sm text-text-muted hover:text-text">
            How it works
          </a>
          <a href="/#screenshots" className="text-sm text-text-muted hover:text-text">
            Screenshots
          </a>
          <NavLink to="/security" className={navLinkClass}>
            Security
          </NavLink>
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <NavLink
            to="/security"
            className={securityIconClass}
            aria-label="Security"
            title="Security"
          >
            <Shield size={18} aria-hidden />
          </NavLink>
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
          <LinkButton
            href={LINKS.releases}
            target="_blank"
            rel="noreferrer"
            className="px-3 text-xs sm:px-4 sm:text-sm"
          >
            Download
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
