import { Link } from "react-router-dom";
import { LINKS } from "@/constants/links";
import { SectionLink } from "@/components/layout/section-link";
import { Brand } from "@/components/ui/brand";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-12 sm:px-5">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <Brand />
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              Privacy-first secrets vault and approval gateway for developer
              environments. AGPL-3.0 community edition.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                Product
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <SectionLink
                    sectionId="features"
                    className="text-text-muted hover:text-text"
                  >
                    Features
                  </SectionLink>
                </li>
                <li>
                  <SectionLink
                    sectionId="how-it-works"
                    className="text-text-muted hover:text-text"
                  >
                    How it works
                  </SectionLink>
                </li>
                <li>
                  <SectionLink
                    sectionId="screenshots"
                    className="text-text-muted hover:text-text"
                  >
                    Screenshots
                  </SectionLink>
                </li>
                <li>
                  <a
                    href={LINKS.releases}
                    target="_blank"
                    rel="noreferrer"
                    className="text-text-muted hover:text-text"
                  >
                    Releases
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                Docs
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/usage" className="text-text-muted hover:text-text">
                    Usage
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="text-text-muted hover:text-text">
                    Security
                  </Link>
                </li>
                <li>
                  <a
                    href={LINKS.architectureDocs}
                    target="_blank"
                    rel="noreferrer"
                    className="text-text-muted hover:text-text"
                  >
                    Architecture
                  </a>
                </li>
                <li>
                  <a
                    href={LINKS.securityDocs}
                    target="_blank"
                    rel="noreferrer"
                    className="text-text-muted hover:text-text"
                  >
                    Security spec
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                Source
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href={LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-text-muted hover:text-text"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-border pt-6 text-xs text-text-muted">
          Early development (v0.2). Not security-audited. Desktop app for Windows,
          macOS, and Linux — no cloud sync or team server.
        </p>
      </div>
    </footer>
  );
}
