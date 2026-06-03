import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.resolve(__dirname, "../src/generated/ecosystem-stats.json");

const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "argus-website-stats",
};

function releaseAssetDownloads(release) {
  return (release.assets ?? [])
    .filter((asset) => !asset.name.startsWith("Source code"))
    .reduce((sum, asset) => sum + (asset.download_count ?? 0), 0);
}

function minorVersionLabel(tag) {
  const match = tag.match(/^v?(\d+\.\d+)/);
  return match ? `v${match[1]}.x` : tag;
}

function compareSemverDesc(a, b) {
  const parse = (tag) =>
    tag
      .replace(/^v/, "")
      .split(".")
      .map((part) => Number.parseInt(part, 10) || 0);
  const [aMajor, aMinor = 0] = parse(a);
  const [bMajor, bMinor = 0] = parse(b);
  if (aMajor !== bMajor) return bMajor - aMajor;
  return bMinor - aMinor;
}

function groupGitHubReleases(releases) {
  const groups = new Map();

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

async function fetchGitHubReleaseStats() {
  let page = 1;
  const releaseLines = [];
  let latestVersion = null;

  while (true) {
    const url = `https://api.github.com/repos/useargus-dev/argus/releases?per_page=100&page=${page}`;
    const res = await fetch(url, { headers: GITHUB_HEADERS });
    if (!res.ok) {
      throw new Error(`GitHub releases ${res.status}`);
    }

    const releases = await res.json();
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

async function fetchNpmDownloadsLastMonth() {
  const res = await fetch(
    "https://api.npmjs.org/downloads/point/last-month/@useargus%2Fnode",
  );
  if (!res.ok) {
    throw new Error(`npm downloads ${res.status}`);
  }
  const data = await res.json();
  return data.downloads ?? 0;
}

async function fetchPyPiDownloadsLast30Days() {
  const res = await fetch(
    "https://pypistats.org/api/packages/useargus/overall?mirrors=false",
  );
  if (!res.ok) {
    throw new Error(`pypistats ${res.status}`);
  }

  const { data } = await res.json();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const cutoffStr = cutoff.toISOString().slice(0, 10);

  return data
    .filter(
      (row) => row.category === "without_mirrors" && row.date >= cutoffStr,
    )
    .reduce((sum, row) => sum + (row.downloads ?? 0), 0);
}

export async function fetchEcosystemStats() {
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

export async function writeEcosystemStats(stats) {
  await mkdir(path.dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, `${JSON.stringify(stats, null, 2)}\n`, "utf8");
}

export async function refreshEcosystemStats() {
  const stats = await fetchEcosystemStats();
  await writeEcosystemStats(stats);
  return stats;
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  try {
    const stats = await refreshEcosystemStats();
    console.log("Wrote ecosystem stats:", OUT_PATH);
    console.log(
      JSON.stringify(
        {
          githubTotal: stats.github.releaseDownloads,
          githubGroups: stats.github.versionGroups.map((group) => ({
            label: group.label,
            downloads: group.downloads,
            dates: `${group.firstReleasedAt} – ${group.lastReleasedAt}`,
          })),
          npm: stats.npm.downloadsLastMonth,
          pypi: stats.pypi.downloadsLast30Days,
        },
        null,
        2,
      ),
    );
  } catch (err) {
    console.warn("Could not refresh ecosystem stats:", err);
    process.exitCode = 0;
  }
}
