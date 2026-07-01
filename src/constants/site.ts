import { LINKS } from "@/constants/links";

/** Public site origin — override with VITE_SITE_URL in production if needed. */
export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ??
  "https://useargus.dev";

export const SITE_NAME = "Argus";

export const DEFAULT_DESCRIPTION =
  "Privacy-first local secrets vault for developers. Keep API keys out of repo .env files, approve each process, and run apps with Argus Sandbox on Linux and Windows.";

export type PageMetaConfig = {
  title: string;
  description: string;
  /** Path without origin, e.g. `/usage` */
  path: string;
};

export const PAGE_META: Record<string, PageMetaConfig> = {
  "/": {
    title: "Argus — Local secrets vault for developers",
    description: DEFAULT_DESCRIPTION,
    path: "/",
  },
  "/usage": {
    title: "Usage — loadEnv + Argus Sandbox",
    description:
      "Install Python or Node SDKs, call loadEnv() / load_env(), and run inside Argus Sandbox (argus run) for OS-level HTTPS capture on Linux and Windows.",
    path: "/usage",
  },
  "/security": {
    title: "Security model",
    description:
      "Threat model, cryptography, IPC grants, Argus Proxy, and Argus Sandbox controls for the open-source Argus desktop app.",
    path: "/security",
  },
  "/roadmap": {
    title: "Roadmap",
    description:
      "Argus product direction — vault, buckets, proxy, Argus Sandbox, CLI ecosystem, and future self-hosted system.",
    path: "/roadmap",
  },
  "/downloads": {
    title: "Downloads",
    description:
      "Download Argus for Windows, macOS, and Linux. Full installers bundle desktop app, CLI, and redirector.",
    path: "/downloads",
  },
};

export const EXTERNAL_BACKLINKS = [
  { label: "GitHub repository", href: LINKS.github },
  { label: "GitHub releases", href: LINKS.releases },
  { label: "Security specification (docs)", href: LINKS.securityDocs },
  { label: "Architecture (docs)", href: LINKS.architectureDocs },
  { label: "Node.js SDK (@useargus/node)", href: LINKS.npmNode },
  { label: "Python SDK (useargus)", href: LINKS.pypiUseargus },
  { label: "Node SDK source", href: LINKS.nodeSdkRepo },
  { label: "Python SDK source", href: LINKS.pythonSdkRepo },
] as const;
