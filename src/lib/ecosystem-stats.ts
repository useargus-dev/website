import type {
  EcosystemStats,
  GitHubReleaseLine,
  GitHubVersionGroup,
} from "./ecosystem-stats.types";

const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
};

type GitHubReleaseApi = {
  tag_name: string;
  published_at: string;
  assets?: Array<{ name: string; download_count: number }>;
};

function releaseAssetDownloads(release: GitHubReleaseApi): number {
  return (release.assets ?? [])
    .filter((asset) => !asset.name.startsWith("Source code"))
    .reduce((sum, asset) => sum + (asset.download_count ?? 0), 0);
}

function minorVersionLabel(tag: string): string {
  const match = tag.match(/^v?(\d+\.\d+)/);
  return match ? `v${match[1]}.x` : tag;
}

function compareSemverDesc(a: string, b: string): number {
  const parse = (tag: string) =>
    tag
      .replace(/^v/, "")
      .split(".")
      .map((part) => Number.parseInt(part, 10) || 0);
  const [aMajor, aMinor = 0] = parse(a);
  const [bMajor, bMinor = 0] = parse(b);
  if (aMajor !== bMajor) return bMajor - aMajor;
  return bMinor - aMinor;
}

export function groupGitHubReleases(
  releases: GitHubReleaseLine[],
): GitHubVersionGroup[] {
  const groups = new Map<string, GitHubVersionGroup>();

  for (const release of releases) {
    const label = minorVersionLabel(release.tag);
    const existing = groups.get(label);
    const publishedDate = release.publishedAt.slice(0, 10);

    if (!existing) {
      groups.set(label, {
        label,
        downloads: release.downloads,
        firstReleasedAt: publishedDate,
        lastReleasedAt: publishedDate,
        releases: [release],
      });
      continue;
    }

    existing.downloads += release.downloads;
    existing.releases.push(release);
    if (publishedDate < existing.firstReleasedAt) {
      existing.firstReleasedAt = publishedDate;
    }
    if (publishedDate > existing.lastReleasedAt) {
      existing.lastReleasedAt = publishedDate;
    }
  }

  return [...groups.values()]
    .map((group) => ({
      ...group,
      releases: [...group.releases].sort((a, b) =>
        compareSemverDesc(a.tag, b.tag),
      ),
    }))
    .sort((a, b) => compareSemverDesc(a.label, b.label));
}

async function fetchGitHubReleaseStats(): Promise<{
  releaseDownloads: number;
  latestVersion: string | null;
  versionGroups: GitHubVersionGroup[];
}> {
  let page = 1;
  const releaseLines: GitHubReleaseLine[] = [];
  let latestVersion: string | null = null;

  while (true) {
    const url = `https://api.github.com/repos/useargus-dev/argus/releases?per_page=100&page=${page}`;
    const res = await fetch(url, { headers: GITHUB_HEADERS });
    if (!res.ok) {
      throw new Error(`GitHub releases ${res.status}`);
    }

    const releases = (await res.json()) as GitHubReleaseApi[];
    if (releases.length === 0) break;

    if (page === 1) {
      latestVersion = releases[0]?.tag_name ?? null;
    }

    for (const release of releases) {
      releaseLines.push({
        tag: release.tag_name,
        publishedAt: release.published_at,
        downloads: releaseAssetDownloads(release),
      });
    }

    if (releases.length < 100) break;
    page += 1;
  }

  const versionGroups = groupGitHubReleases(releaseLines);
  const releaseDownloads = releaseLines.reduce(
    (sum, release) => sum + release.downloads,
    0,
  );

  return { releaseDownloads, latestVersion, versionGroups };
}

async function fetchNpmDownloadsLastMonth(): Promise<number> {
  const res = await fetch(
    "https://api.npmjs.org/downloads/point/last-month/@useargus%2Fnode",
  );
  if (!res.ok) {
    throw new Error(`npm downloads ${res.status}`);
  }
  const data = (await res.json()) as { downloads?: number };
  return data.downloads ?? 0;
}

async function fetchPyPiDownloadsLast30Days(): Promise<number> {
  const res = await fetch(
    "https://pypistats.org/api/packages/useargus/overall?mirrors=false",
  );
  if (!res.ok) {
    throw new Error(`pypistats ${res.status}`);
  }

  const { data } = (await res.json()) as {
    data: Array<{ category: string; date: string; downloads: number }>;
  };
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const cutoffStr = cutoff.toISOString().slice(0, 10);

  return data
    .filter(
      (row) => row.category === "without_mirrors" && row.date >= cutoffStr,
    )
    .reduce((sum, row) => sum + (row.downloads ?? 0), 0);
}

export async function fetchLiveEcosystemStats(): Promise<EcosystemStats> {
  const [githubResult, npmResult, pypiResult] = await Promise.allSettled([
    fetchGitHubReleaseStats(),
    fetchNpmDownloadsLastMonth(),
    fetchPyPiDownloadsLast30Days(),
  ]);

  if (githubResult.status === "rejected") {
    throw githubResult.reason;
  }

  const github = githubResult.value;

  return {
    fetchedAt: new Date().toISOString(),
    github: {
      releaseDownloads: github.releaseDownloads,
      latestVersion: github.latestVersion,
      versionGroups: github.versionGroups,
      href: "https://github.com/useargus-dev/argus/releases",
    },
    npm: {
      downloadsLastMonth:
        npmResult.status === "fulfilled" ? npmResult.value : null,
      package: "@useargus/node",
      href: "https://www.npmjs.com/package/@useargus/node",
    },
    pypi: {
      downloadsLast30Days:
        pypiResult.status === "fulfilled" ? pypiResult.value : null,
      package: "useargus",
      href: "https://pypi.org/project/useargus/",
    },
  };
}

export function formatStatCount(value: number | null): string {
  if (value == null) return "—";
  if (value >= 1_000_000) {
    const scaled = value / 1_000_000;
    return `${scaled >= 10 ? Math.round(scaled) : scaled.toFixed(1).replace(/\.0$/, "")}M+`;
  }
  if (value >= 10_000) {
    return `${Math.round(value / 1000)}k+`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k+`;
  }
  return value.toLocaleString();
}

export function formatReleaseDate(isoDate: string): string {
  return new Date(`${isoDate.slice(0, 10)}T12:00:00`).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" },
  );
}

export function formatReleaseDateRange(first: string, last: string): string {
  const start = formatReleaseDate(first);
  const end = formatReleaseDate(last);
  return start === end ? start : `${start} – ${end}`;
}

export function hasAnyStats(stats: EcosystemStats): boolean {
  return (
    stats.github.releaseDownloads != null ||
    stats.npm.downloadsLastMonth != null ||
    stats.pypi.downloadsLast30Days != null
  );
}

export function mergeEcosystemStats(
  base: EcosystemStats,
  live: EcosystemStats,
): EcosystemStats {
  return {
    fetchedAt: live.fetchedAt ?? base.fetchedAt,
    github: {
      ...base.github,
      releaseDownloads:
        live.github.releaseDownloads ?? base.github.releaseDownloads,
      latestVersion: live.github.latestVersion ?? base.github.latestVersion,
      versionGroups:
        live.github.versionGroups.length > 0
          ? live.github.versionGroups
          : base.github.versionGroups,
    },
    npm: {
      ...base.npm,
      downloadsLastMonth:
        live.npm.downloadsLastMonth ?? base.npm.downloadsLastMonth,
    },
    pypi: {
      ...base.pypi,
      downloadsLast30Days:
        live.pypi.downloadsLast30Days ?? base.pypi.downloadsLast30Days,
    },
  };
}
