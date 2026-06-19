import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { OsPlatform, ParsedRelease } from "@/lib/releases.types";
import { formatReleaseDate } from "@/lib/releases";
import { DownloadAssetList } from "@/components/downloads/download-asset-list";
import { cn } from "@/lib/cn";

export function ReleaseAccordion({
  release,
  os,
}: {
  release: ParsedRelease;
  os: OsPlatform;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const assets = release.assetsByOs[os];

  return (
    <article className="overflow-hidden rounded-lg border border-border bg-surface">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-muted/50 sm:px-5"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-text">{release.tag}</span>
            <span className="text-xs text-text-muted">
              {formatReleaseDate(release.publishedAt)}
            </span>
          </div>
        </div>
        <ChevronDown
          size={18}
          className={cn(
            "shrink-0 text-text-muted transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <div
        id={panelId}
        aria-hidden={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-4 py-4 sm:px-5">
            <DownloadAssetList assets={assets} />
          </div>
        </div>
      </div>
    </article>
  );
}
