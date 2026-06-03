export type GitHubReleaseLine = {
  tag: string;
  publishedAt: string;
  downloads: number;
};

export type GitHubVersionGroup = {
  label: string;
  downloads: number;
  firstReleasedAt: string;
  lastReleasedAt: string;
  releases: GitHubReleaseLine[];
};

export type EcosystemStats = {
  fetchedAt: string | null;
  github: {
    releaseDownloads: number | null;
    latestVersion: string | null;
    versionGroups: GitHubVersionGroup[];
    href: string;
  };
  npm: {
    downloadsLastMonth: number | null;
    package: string;
    href: string;
  };
  pypi: {
    downloadsLast30Days: number | null;
    package: string;
    href: string;
  };
};
