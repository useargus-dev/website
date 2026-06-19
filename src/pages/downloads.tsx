import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { LINKS } from "@/constants/links";
import { useReleases } from "@/hooks/use-releases";
import { detectOs } from "@/lib/detect-os";
import { OS_ORDER_EXPORT } from "@/lib/releases";
import { OsDownloadSection } from "@/components/downloads/os-download-section";

export function DownloadsPage() {
  const { data, loading } = useReleases();
  const detectedOs = detectOs();

  return (
    <div className="mx-auto w-full max-w-4xl min-w-0 px-4 py-12 sm:px-5 lg:py-16">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-10 max-w-2xl"
      >
        <p className="text-xs font-medium uppercase tracking-wider text-signal">
          Desktop app
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Downloads
        </h1>
        <p className="mt-4 leading-relaxed text-text-muted">
          Install Argus for Windows, macOS, or Linux. The latest release is shown
          first for each platform — expand older versions if you need a specific
          build.
        </p>
        <a
          href={LINKS.releases}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-signal hover:underline"
        >
          All releases on GitHub
          <ExternalLink size={14} />
        </a>
      </motion.header>

      {loading && data.releases.length === 0 ? (
        <p className="text-sm text-text-muted">Loading releases…</p>
      ) : data.releases.length === 0 ? (
        <p className="text-sm text-text-muted">
          No releases found. Check{" "}
          <a
            href={LINKS.releases}
            target="_blank"
            rel="noreferrer"
            className="text-signal hover:underline"
          >
            GitHub releases
          </a>
          .
        </p>
      ) : (
        <div className="space-y-8">
          {OS_ORDER_EXPORT.map((os, index) => (
            <OsDownloadSection
              key={os}
              os={os}
              releases={data.releases}
              highlighted={detectedOs === os}
              index={index}
            />
          ))}
        </div>
      )}

      <p className="mt-10 text-center text-xs text-text-muted">
        AGPL-3.0 community edition · Signed updates via Tauri updater
      </p>
    </div>
  );
}
