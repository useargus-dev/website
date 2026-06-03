import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Download, Package, Terminal } from "lucide-react";
import {
  formatReleaseDate,
  formatStatCount,
} from "@/lib/ecosystem-stats";
import type { GitHubVersionGroup } from "@/lib/ecosystem-stats.types";
import { useEcosystemStats } from "@/hooks/use-ecosystem-stats";
import { InfoTooltip } from "@/components/ui/info-tooltip";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  detail: string;
  value: number | null;
  loading: boolean;
  delay?: number;
  infoTooltip?: React.ReactNode;
};

function StatCard({
  icon: Icon,
  label,
  detail,
  value,
  loading,
  delay = 0,
  infoTooltip,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      className="relative min-w-0 rounded-xl border border-border bg-surface px-5 py-4 shadow-subtle"
    >
      {infoTooltip ? (
        <InfoTooltip label="Release download breakdown" className="absolute top-3 right-3">
          {infoTooltip}
        </InfoTooltip>
      ) : null}
      <div className="flex items-start gap-3">
        <div
          className="grid size-9 shrink-0 place-items-center rounded-md border"
          style={{
            backgroundColor: "var(--brand-bg)",
            borderColor: "var(--brand-border)",
          }}
        >
          <Icon size={18} style={{ color: "var(--brand-icon)" }} aria-hidden />
        </div>
        <div className="min-w-0 flex-1 pr-6">
          <p
            className={`text-2xl font-semibold tracking-tight text-text transition-opacity ${loading && value == null ? "opacity-60" : ""}`}
          >
            {formatStatCount(value)}
          </p>
          <p className="mt-0.5 text-sm font-medium text-text">{label}</p>
          <p className="mt-1 text-xs text-text-muted">{detail}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ReleaseDownloadBreakdown({
  versionGroups,
}: {
  versionGroups: GitHubVersionGroup[];
}) {
  if (versionGroups.length === 0) {
    return <p className="text-text-muted">No release breakdown available.</p>;
  }

  return (
    <ul className="space-y-2">
      {versionGroups.map((group) => (
        <li
          key={group.label}
          className="flex items-baseline justify-between gap-4"
        >
          <span className="text-text">
            {group.label}
            <span className="text-text-muted">
              {" "}
              · {formatReleaseDate(group.lastReleasedAt)}
            </span>
          </span>
          <span className="shrink-0 tabular-nums font-medium text-text">
            {group.downloads.toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function EcosystemStats() {
  const { stats, loading } = useEcosystemStats();

  const githubDetail = stats.github.latestVersion
    ? `Desktop app · latest ${stats.github.latestVersion}`
    : "Desktop app";

  return (
    <section
      aria-label="Download and package stats"
      className="border-b border-border bg-surface-muted/60"
    >
      <div className="mx-auto grid w-full max-w-6xl min-w-0 gap-4 px-4 py-8 sm:grid-cols-3 sm:px-5 sm:py-10">
        <StatCard
          icon={Download}
          label="Release downloads"
          detail={githubDetail}
          value={stats.github.releaseDownloads}
          loading={loading}
          infoTooltip={
            <ReleaseDownloadBreakdown
              versionGroups={stats.github.versionGroups}
            />
          }
        />
        <StatCard
          icon={Terminal}
          label="npm downloads"
          detail={`${stats.npm.package} · last 30 days · api.npmjs.org`}
          value={stats.npm.downloadsLastMonth}
          loading={loading}
          delay={0.06}
        />
        <StatCard
          icon={Package}
          label="PyPI downloads"
          detail={`${stats.pypi.package} · last 30 days · pypistats.org`}
          value={stats.pypi.downloadsLast30Days}
          loading={loading}
          delay={0.12}
        />
      </div>
    </section>
  );
}
