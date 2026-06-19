import { HeartHandshake } from "lucide-react";
import { LINKS } from "@/constants/links";

export function SponsorshipBanner() {
  return (
    <aside
      aria-label="Sponsor Argus"
      className="border-t border-border bg-surface-muted/80"
    >
      <div className="mx-auto flex w-full max-w-6xl min-w-0 flex-col items-start justify-between gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
        <div className="flex min-w-0 items-start gap-3 sm:items-center">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-signal/10 text-signal">
            <HeartHandshake size={18} aria-hidden />
          </div>
          <p className="text-sm leading-relaxed text-text">
            <span className="font-medium">Support Argus development.</span>{" "}
            <span className="text-text-muted">
              Help fund security work, signed releases, and new features.
            </span>
          </p>
        </div>
        <a
          href={LINKS.githubSponsors}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-surface-raised"
        >
          Sponsor on GitHub
        </a>
      </div>
    </aside>
  );
}
