import { Shield, Terminal } from "lucide-react";
import { NavLink } from "react-router-dom";
import { LINKS } from "@/constants/links";
import { SectionLink } from "@/components/layout/section-link";
import { Brand } from "@/components/ui/brand";
import { LinkButton } from "@/components/ui/button";
import { headerIconButtonActiveClass } from "@/components/ui/header-icon-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/cn";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "text-sm transition-colors",
    isActive ? "text-text font-medium" : "text-text-muted hover:text-text",
  );

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl min-w-0 items-center justify-between gap-2 px-4 sm:gap-4 sm:px-5">
        <Brand className="min-w-0 shrink" />
        <nav className="hidden items-center gap-8 sm:flex">
          <SectionLink
            sectionId="features"
            className="text-sm text-text-muted hover:text-text"
          >
            Features
          </SectionLink>
          <SectionLink
            sectionId="how-it-works"
            className="text-sm text-text-muted hover:text-text"
          >
            How it works
          </SectionLink>
          <SectionLink
            sectionId="screenshots"
            className="text-sm text-text-muted hover:text-text"
          >
            Screenshots
          </SectionLink>
          <NavLink to="/usage" className={navLinkClass}>
            Usage
          </NavLink>
          <NavLink to="/security" className={navLinkClass}>
            Security
          </NavLink>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <NavLink
            to="/usage"
            className={({ isActive }) =>
              cn(headerIconButtonActiveClass(isActive), "sm:hidden")
            }
            aria-label="Usage"
            title="Usage"
          >
            <Terminal size={20} aria-hidden />
          </NavLink>
          <NavLink
            to="/security"
            className={({ isActive }) =>
              cn(headerIconButtonActiveClass(isActive), "sm:hidden")
            }
            aria-label="Security"
            title="Security"
          >
            <Shield size={20} aria-hidden />
          </NavLink>
          <ThemeToggle className="hidden sm:grid" />
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
            className="hidden sm:inline-flex"
          >
            Download
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
