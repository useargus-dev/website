import { Download } from "lucide-react";
import type { ReleaseAsset } from "@/lib/releases.types";
import { formatFileSize } from "@/lib/releases";
import { LinkButton } from "@/components/ui/button";

export function DownloadAssetList({ assets }: { assets: ReleaseAsset[] }) {
  if (assets.length === 0) {
    return (
      <p className="text-sm text-text-muted">No installers for this platform.</p>
    );
  }

  return (
    <ul className="space-y-2">
      {assets.map((asset) => (
        <li key={asset.name}>
          <LinkButton
            href={asset.url}
            className="w-full justify-between px-4 py-3 text-left"
          >
            <span className="flex min-w-0 items-center gap-2">
              <Download size={16} className="shrink-0" aria-hidden />
              <span className="min-w-0">
                <span className="block font-medium">{asset.label}</span>
                <span className="block truncate text-xs font-normal opacity-80">
                  {asset.name}
                </span>
              </span>
            </span>
            {formatFileSize(asset.size) && (
              <span className="shrink-0 pl-3 text-xs font-normal opacity-80">
                {formatFileSize(asset.size)}
              </span>
            )}
          </LinkButton>
        </li>
      ))}
    </ul>
  );
}
