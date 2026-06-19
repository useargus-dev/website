import type {
  OsPlatform,
  ParsedRelease,
  ReleaseAsset,
  ReleasesData,
} from "./releases.types";

const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
};

type GitHubReleaseApi = {
  tag_name: string;
  name: string;
  published_at: string;
  body: string | null;
  html_url: string;
  assets?: Array<{
    name: string;
    size: number;
    browser_download_url: string;
  }>;
};

const OS_ORDER: OsPlatform[] = ["windows", "macos", "linux"];

const ASSET_PRIORITY: Record<OsPlatform, string[]> = {
  windows: [".msi", "-setup.exe"],
  macos: ["aarch64.dmg", "x64.dmg", "aarch64.app.tar.gz", "x64.app.tar.gz"],
  linux: [".deb", ".AppImage", ".rpm"],
};

function classifyAsset(
  name: string,
  url: string,
  size: number,
): { os: OsPlatform; asset: ReleaseAsset } | null {
  if (
    name.endsWith(".sig") ||
    name === "latest.json" ||
    name.startsWith("Source code")
  ) {
    return null;
  }

  if (name.endsWith(".msi")) {
    return {
      os: "windows",
      asset: { name, label: "MSI installer (recommended)", url, size },
    };
  }
  if (name.endsWith("-setup.exe")) {
    return {
      os: "windows",
      asset: { name, label: "EXE installer", url, size },
    };
  }

  if (name.endsWith(".dmg")) {
    const appleSilicon = name.includes("aarch64");
    return {
      os: "macos",
      asset: {
        name,
        label: appleSilicon ? "Apple Silicon (DMG)" : "Intel (DMG)",
        url,
        size,
      },
    };
  }
  if (name.endsWith(".app.tar.gz")) {
    const appleSilicon = name.includes("aarch64");
    return {
      os: "macos",
      asset: {
        name,
        label: appleSilicon ? "Apple Silicon (tar.gz)" : "Intel (tar.gz)",
        url,
        size,
      },
    };
  }

  if (name.endsWith(".deb")) {
    return {
      os: "linux",
      asset: { name, label: "Debian / Ubuntu (.deb)", url, size },
    };
  }
  if (name.endsWith(".AppImage")) {
    return {
      os: "linux",
      asset: { name, label: "AppImage (portable)", url, size },
    };
  }
  if (name.endsWith(".rpm")) {
    return {
      os: "linux",
      asset: { name, label: "Fedora / RHEL (.rpm)", url, size },
    };
  }

  return null;
}

function sortAssets(os: OsPlatform, assets: ReleaseAsset[]): ReleaseAsset[] {
  const priorities = ASSET_PRIORITY[os];
  return [...assets].sort((a, b) => {
    const aIndex = priorities.findIndex((token) => a.name.includes(token));
    const bIndex = priorities.findIndex((token) => b.name.includes(token));
    const aRank = aIndex === -1 ? priorities.length : aIndex;
    const bRank = bIndex === -1 ? priorities.length : bIndex;
    return aRank - bRank;
  });
}

function parseRelease(release: GitHubReleaseApi): ParsedRelease {
  const assetsByOs: Record<OsPlatform, ReleaseAsset[]> = {
    windows: [],
    macos: [],
    linux: [],
  };

  for (const asset of release.assets ?? []) {
    const classified = classifyAsset(
      asset.name,
      asset.browser_download_url,
      asset.size,
    );
    if (!classified) continue;
    assetsByOs[classified.os].push(classified.asset);
  }

  for (const os of OS_ORDER) {
    assetsByOs[os] = sortAssets(os, assetsByOs[os]);
  }

  return {
    tag: release.tag_name,
    name: release.name,
    publishedAt: release.published_at,
    body: release.body ?? "",
    htmlUrl: release.html_url,
    assetsByOs,
  };
}

export async function fetchLiveReleases(): Promise<ReleasesData> {
  let page = 1;
  const releases: ParsedRelease[] = [];

  while (true) {
    const url = `https://api.github.com/repos/useargus-dev/argus/releases?per_page=100&page=${page}`;
    const res = await fetch(url, { headers: GITHUB_HEADERS });
    if (!res.ok) {
      throw new Error(`GitHub releases ${res.status}`);
    }

    const batch = (await res.json()) as GitHubReleaseApi[];
    if (batch.length === 0) break;

    for (const release of batch) {
      releases.push(parseRelease(release));
    }

    if (batch.length < 100) break;
    page += 1;
  }

  return {
    fetchedAt: new Date().toISOString(),
    releases,
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return "";
  if (bytes >= 1024 * 1024) {
    const mb = bytes / (1024 * 1024);
    return `${mb >= 10 ? Math.round(mb) : mb.toFixed(1).replace(/\.0$/, "")} MB`;
  }
  if (bytes >= 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${bytes} B`;
}

export function formatReleaseDate(isoDate: string): string {
  return new Date(`${isoDate.slice(0, 10)}T12:00:00`).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" },
  );
}

export function releasesForOs(
  releases: ParsedRelease[],
  os: OsPlatform,
): ParsedRelease[] {
  return releases.filter((release) => release.assetsByOs[os].length > 0);
}

export const OS_LABELS: Record<OsPlatform, string> = {
  windows: "Windows",
  macos: "macOS",
  linux: "Linux",
};

export const OS_ORDER_EXPORT = OS_ORDER;
