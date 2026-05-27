import { Link } from "react-router-dom";
import { LINKS } from "@/constants/links";
import { Brand } from "@/components/ui/brand";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <Brand />
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              Local-first secrets vault and approval gateway for developer
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
                  <a href="/#features" className="text-text-muted hover:text-text">
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="/#how-it-works"
                    className="text-text-muted hover:text-text"
                  >
                    How it works
                  </a>
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
          Early development (v0.1). Not security-audited. Self-hosted system on the
          roadmap.
        </p>
      </div>
    </footer>
  );
}
