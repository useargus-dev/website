export type SdkLanguageId = "node" | "python" | "go" | "ruby" | "java";

export type SdkLanguageStatus = "available" | "development";

export type SdkCodeBlock = {
  label: string;
  code: string;
};

export type SdkPackageLink = {
  name: string;
  registry: string;
  url: string;
};

export type SdkLanguage = {
  id: SdkLanguageId;
  label: string;
  status: SdkLanguageStatus;
  install?: string;
  packageLink?: SdkPackageLink;
  sourceRepoUrl?: string;
  summary: string;
  /** Flat blocks for in-development languages. */
  blocks: SdkCodeBlock[];
};

export const SDK_LANGUAGES: SdkLanguage[] = [
  {
    id: "node",
    label: "Node.js",
    status: "available",
    install: "npm install @useargus/node",
    packageLink: {
      name: "@useargus/node",
      registry: "npm",
      url: "https://www.npmjs.com/package/@useargus/node",
    },
    sourceRepoUrl: "https://github.com/useargus-dev/node-argus",
    summary:
      "Load bucket secrets into process.env. Optional proxy config helpers and agent builders for fetch, axios, Anthropic SDK, and more.",
    blocks: [],
  },
  {
    id: "python",
    label: "Python",
    status: "available",
    install: "pip install useargus",
    packageLink: {
      name: "useargus",
      registry: "PyPI",
      url: "https://pypi.org/project/useargus/",
    },
    sourceRepoUrl: "https://github.com/useargus-dev/py-argus",
    summary:
      "Load bucket secrets into os.environ — same IPC contract as Node, with proxy helpers for requests, httpx, aiohttp, and Anthropic.",
    blocks: [],
  },
  {
    id: "go",
    label: "Go",
    status: "development",
    summary:
      "Planned module for loading bucket env before main — same IPC protocol as the desktop app.",
    blocks: [
      {
        label: "Planned usage",
        code: `// go get github.com/useargus-dev/argus-go  (not published yet)

import "github.com/useargus-dev/argus-go/secrets"

func main() {
    if err := secrets.LoadEnv(); err != nil {
        log.Fatal(err)
    }
    // os.Getenv("<KEY_FROM_BUCKET>") is set
}`,
      },
    ],
  },
  {
    id: "ruby",
    label: "Ruby",
    status: "development",
    summary:
      "Planned gem with load_env — dotenv-style merge and Argus IPC for Rails and scripts.",
    blocks: [
      {
        label: "Planned usage",
        code: `# gem install argus-secrets  (not published yet)

require "argus/secrets"

Argus::Secrets.load_env!
# ENV["<KEY_FROM_BUCKET>"] is set`,
      },
    ],
  },
  {
    id: "java",
    label: "Java",
    status: "development",
    summary:
      "Planned library for JVM apps — load env at startup before Spring or other frameworks read configuration.",
    blocks: [
      {
        label: "Planned usage",
        code: `// implementation.gradle (not published yet)

import dev.useargus.ArgusEnv;

public class Main {
    public static void main(String[] args) throws Exception {
        ArgusEnv.load();
        // System.getenv("<KEY_FROM_BUCKET>") is set
    }
}`,
      },
    ],
  },
];

export const SDK_SHARED_NOTES = [
  "Call load before the rest of your app reads environment variables.",
  "Put only ARGUS_BUCKET_ID and ARGUS_BUCKET_TOKEN in .env — not secret values.",
  "First connection may show an Argus approval dialog (up to ~120s).",
  "Idle app lock does not block IPC; only sign-out returns locked.",
  ".env overrides bucket values when the same key exists in both.",
  "With Argus Proxy off: real secrets in env — use any HTTP client. With proxy on: placeholders in env — use SDK proxy helpers.",
] as const;
