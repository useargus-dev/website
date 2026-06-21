import { Heart } from "lucide-react";
import { LINKS } from "@/constants/links";

export function SponsorshipTopStrip() {
  return (
    <div
      role="region"
      aria-label="Sponsor Argus"
      className="relative border-b border-signal/20 bg-gradient-to-r from-signal/12 via-surface-muted to-signal/8"
    >
      <div className="mx-auto flex w-full max-w-6xl min-w-0 items-center gap-3 px-4 py-2.5 sm:px-5">
        <Heart
          size={15}
          className="hidden shrink-0 fill-signal/25 text-signal sm:block"
          aria-hidden
        />
        <p className="min-w-0 flex-1 text-center text-sm leading-snug text-text sm:text-left">
          <span className="font-medium">Argus is open source.</span>{" "}
          <span className="text-text-muted">
            Help fund audits, signing, and releases —
          </span>{" "}
          <a
            href={LINKS.githubSponsors}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-signal underline decoration-signal/40 underline-offset-2 transition-colors hover:decoration-signal"
          >
            sponsor on GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
