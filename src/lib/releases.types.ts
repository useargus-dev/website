export type OsPlatform = "windows" | "macos" | "linux";

export type ReleaseAsset = {
  name: string;
  label: string;
  url: string;
  size: number;
};

export type ParsedRelease = {
  tag: string;
  name: string;
  publishedAt: string;
  body: string;
  htmlUrl: string;
  assetsByOs: Record<OsPlatform, ReleaseAsset[]>;
};

export type ReleasesData = {
  fetchedAt: string;
  releases: ParsedRelease[];
};
