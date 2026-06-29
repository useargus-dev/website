import { motion } from "motion/react";
import { Monitor, Apple, TerminalSquare } from "lucide-react";
import type { OsPlatform, ParsedRelease } from "@/lib/releases.types";
import { formatReleaseDate, OS_LABELS, releasesForOs } from "@/lib/releases";
import { DownloadAssetList } from "@/components/downloads/download-asset-list";
import { ReleaseAccordion } from "@/components/downloads/release-accordion";
import { cn } from "@/lib/cn";

const OS_ICONS = {
  windows: Monitor,
  macos: Apple,
  linux: TerminalSquare,
} as const;

function LatestReleaseCard({
  release,
  os,
}: {
  release: ParsedRelease;
  os: OsPlatform;
}) {
  const assets = release.assetsByOs[os];

  return (
    <div className="rounded-xl border border-signal/30 bg-surface shadow-subtle">
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-signal/10 px-2.5 py-0.5 text-xs font-medium text-signal">
            Latest
          </span>
          <h3 className="text-lg font-semibold text-text">{release.tag}</h3>
          <span className="text-sm text-text-muted">
            {formatReleaseDate(release.publishedAt)}
          </span>
        </div>
      </div>
      <div className="px-5 py-5 sm:px-6">
        <DownloadAssetList assets={assets} />
      </div>
    </div>
  );
}

export function OsDownloadSection({
  os,
  releases,
  highlighted = false,
  index,
}: {
  os: OsPlatform;
  releases: ParsedRelease[];
  highlighted?: boolean;
  index: number;
}) {
  const osReleases = releasesForOs(releases, os);
  const [latest, ...older] = osReleases;
  const Icon = OS_ICONS[os];

  if (!latest) return null;

  return (
    <motion.section
      id={`downloads-${os}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        "scroll-mt-24 rounded-2xl border p-5 sm:p-6",
        highlighted
          ? "border-signal/40 bg-surface-muted/60 ring-1 ring-signal/20"
          : "border-border bg-surface",
      )}
    >
      <div className="mb-5 flex items-center gap-3">
        <div
          className={cn(
            "grid size-10 place-items-center rounded-lg",
            highlighted ? "bg-signal/15 text-signal" : "bg-surface-muted text-text",
          )}
        >
          <Icon size={20} aria-hidden />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text">{OS_LABELS[os]}</h2>
          {highlighted && (
            <p className="text-xs text-signal">Detected for your system</p>
          )}
          {os === "macos" && (
            <p className="mt-1 text-sm text-text-muted">
              Argus Sandbox is not supported on macOS yet — the feature will be
              included in a coming release.
            </p>
          )}
        </div>
      </div>

      <LatestReleaseCard release={latest} os={os} />

      {older.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-muted">
            Older releases
          </p>
          <div className="space-y-2">
            {older.map((release) => (
              <ReleaseAccordion key={release.tag} release={release} os={os} />
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}
