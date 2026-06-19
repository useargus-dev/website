import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "../src/generated/releases.json");

const GITHUB_HEADERS = { Accept: "application/vnd.github+json" };
const OS_ORDER = ["windows", "macos", "linux"];

const ASSET_PRIORITY = {
  windows: [".msi", "-setup.exe"],
  macos: ["aarch64.dmg", "x64.dmg", "aarch64.app.tar.gz", "x64.app.tar.gz"],
  linux: [".deb", ".AppImage", ".rpm"],
};

function classifyAsset(name, url, size) {
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

function sortAssets(os, assets) {
  const priorities = ASSET_PRIORITY[os];
  return [...assets].sort((a, b) => {
    const aIndex = priorities.findIndex((token) => a.name.includes(token));
    const bIndex = priorities.findIndex((token) => b.name.includes(token));
    const aRank = aIndex === -1 ? priorities.length : aIndex;
    const bRank = bIndex === -1 ? priorities.length : bIndex;
    return aRank - bRank;
  });
}

function parseRelease(release) {
  const assetsByOs = { windows: [], macos: [], linux: [] };

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

async function fetchReleases() {
  let page = 1;
  const releases = [];

  while (true) {
    const url = `https://api.github.com/repos/useargus-dev/argus/releases?per_page=100&page=${page}`;
    const res = await fetch(url, { headers: GITHUB_HEADERS });
    if (!res.ok) {
      throw new Error(`GitHub releases ${res.status}`);
    }

    const batch = await res.json();
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

try {
  const data = await fetchReleases();
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Wrote ${data.releases.length} releases to ${outPath}`);
} catch (err) {
  console.warn("Could not refresh releases:", err);
  process.exitCode = 0;
}
