export type SdkLanguageId = "node" | "python" | "go" | "ruby" | "java";

export type SdkLanguageStatus = "available" | "development";

export type SdkCodeBlock = {
  label: string;
  code: string;
};

export type SdkUsageSection = {
  id: string;
  title: string;
  description: string;
  blocks: SdkCodeBlock[];
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
  /** Legacy flat blocks for in-development languages. */
  blocks: SdkCodeBlock[];
  /** Accordion sections for available languages (proxy on/off + client support). */
  usageSections?: SdkUsageSection[];
};

const PROJECT_ENV = `ARGUS_BUCKET_ID=550e8400-e29b-41d4-a716-446655440000
ARGUS_BUCKET_TOKEN=tok_...

# Optional local override (wins over bucket for same key)
# API_BASE_URL=http://localhost:3000`;

const NODE_USAGE_SECTIONS: SdkUsageSection[] = [
  {
    id: "setup",
    title: "Setup",
    description:
      "Install the package, add bucket credentials to .env (never secret values), and call loadEnv() before the rest of your app reads process.env.",
    blocks: [
      { label: "Install", code: "npm install @useargus/node" },
      { label: "Project .env", code: PROJECT_ENV },
      {
        label: "ESM entry",
        code: `import { loadEnv } from "@useargus/node";

await loadEnv();
// process.env.<KEY_FROM_BUCKET> is set`,
      },
      {
        label: "ESM preload (optional)",
        code: "node --import @useargus/node/register ./app.js",
      },
    ],
  },
  {
    id: "no-proxy",
    title: "Without Argus Proxy",
    description:
      "When proxy is disabled on the bucket, IPC returns real secret values into process.env. Use your HTTP client normally — no proxy factories required.",
    blocks: [
      {
        label: "Load and call APIs directly",
        code: `import { loadEnv } from "@useargus/node";

await loadEnv();

const res = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": process.env.ANTHROPIC_API_KEY!,
    "content-type": "application/json",
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({ model: "claude-sonnet-4-5", max_tokens: 64, messages: [...] }),
});`,
      },
      {
        label: "Notes",
        code: `# Secrets live in process.env after loadEnv() — same as python-dotenv + IPC.
# First connection may open an Argus approval dialog (~120s timeout).
# Idle app lock does NOT block IPC; sign-out returns locked.`,
      },
    ],
  },
  {
    id: "with-proxy",
    title: "With Argus Proxy enabled",
    description:
      "Enable proxy on the bucket in Argus. Proxy-enabled mappings receive argus-proxy-* placeholders in env — never real API keys. After loadEnv(), use config helpers or agent builders from @useargus/node.",
    blocks: [
      {
        label: "fetch",
        code: `import { loadEnv, createArgusUndiciDispatcher } from "@useargus/node";

await loadEnv();
// process.env.ANTHROPIC_API_KEY === "argus-proxy-..." (placeholder)

const dispatcher = await createArgusUndiciDispatcher();
await fetch("https://api.anthropic.com/v1/messages", {
  dispatcher,
  method: "POST",
  headers: {
    "x-api-key": process.env.ANTHROPIC_API_KEY!,
    "content-type": "application/json",
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({ model: "claude-sonnet-4-5", max_tokens: 64, messages: [...] }),
});`,
      },
      {
        label: "ProxyConfig fields (low-level IPC)",
        code: `import { requireProxyConfig, proxyUrl } from "@useargus/node";

const proxy = await requireProxyConfig();

proxy.enabled        // true when bucket proxy is on
proxy.httpProxy      // http://<token>@127.0.0.1:<port>
proxy.httpsProxy     // same for HTTPS CONNECT
proxy.noProxy        // localhost,127.0.0.1,::1
proxy.caBundlePath   // ~/.argus/ca-bundle.pem — trust Argus MITM CA

url = proxyUrl(proxy)  // prefers httpsProxy`,
      },
    ],
  },
  {
    id: "clients",
    title: "HTTP client examples",
    description:
      "Config helpers return plain options; builders return ready-to-use agents. Install undici and https-proxy-agent in your app — @useargus/node does not bundle them. See node-argus docs/usage for full guides.",
    blocks: [
      {
        label: "Native fetch / undici",
        code: `import { loadEnv, createArgusUndiciDispatcher } from "@useargus/node";

await loadEnv();
const dispatcher = await createArgusUndiciDispatcher();
await fetch(url, { dispatcher, headers: { ... } });`,
      },
      {
        label: "@anthropic-ai/sdk (≥ 0.65)",
        code: `import Anthropic from "@anthropic-ai/sdk";
import { loadEnv, createArgusUndiciDispatcher } from "@useargus/node";

await loadEnv();
const dispatcher = await createArgusUndiciDispatcher();
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
  fetchOptions: { dispatcher },
});`,
      },
      {
        label: "axios",
        code: `import axios from "axios";
import { loadEnv, createArgusHttpsProxyAgent } from "@useargus/node";

await loadEnv();
const agent = await createArgusHttpsProxyAgent();
const client = axios.create({ httpsAgent: agent, httpAgent: agent, proxy: false });`,
      },
      {
        label: "LangChain (@langchain/anthropic)",
        code: `import { ChatAnthropic } from "@langchain/anthropic";
import { loadEnv, createArgusUndiciDispatcher } from "@useargus/node";

await loadEnv();
const dispatcher = await createArgusUndiciDispatcher();
const llm = new ChatAnthropic({
  model: "claude-sonnet-4-5",
  apiKey: process.env.ANTHROPIC_API_KEY!,
  clientOptions: { fetchOptions: { dispatcher } },
});`,
      },
      {
        label: "node:https",
        code: `import https from "node:https";
import { loadEnv, createArgusHttpsProxyAgent } from "@useargus/node";

await loadEnv();
const agent = await createArgusHttpsProxyAgent();
https.get(url, { agent, headers: { ... } }, callback);`,
      },
    ],
  },
];

const PYTHON_USAGE_SECTIONS: SdkUsageSection[] = [
  {
    id: "setup",
    title: "Setup",
    description:
      "Install useargus, add bucket credentials to .env, and call load_env() before other modules read os.environ.",
    blocks: [
      { label: "Install", code: "pip install useargus" },
      { label: "Project .env", code: PROJECT_ENV },
      {
        label: "Usage",
        code: `from useargus import load_env

load_env()
# os.environ["<KEY_FROM_BUCKET>"] is set`,
      },
      {
        label: "Migration from python-dotenv",
        code: `# Before
from dotenv import load_dotenv
load_dotenv()

# After
from useargus import load_env
load_env()`,
      },
    ],
  },
  {
    id: "no-proxy",
    title: "Without Argus Proxy",
    description:
      "When proxy is disabled, real secret values are injected into os.environ. Use requests, httpx, or any client with the env var directly.",
    blocks: [
      {
        label: "Load and call APIs directly",
        code: `import os
import httpx
from useargus import load_env

load_env()

with httpx.Client(timeout=30) as client:
    r = client.post(
        "https://api.anthropic.com/v1/messages",
        headers={
            "x-api-key": os.environ["ANTHROPIC_API_KEY"],
            "anthropic-version": "2023-06-01",
        },
        json={"model": "claude-sonnet-4-5", "max_tokens": 64, "messages": [...]},
    )`,
      },
      {
        label: "Notes",
        code: `# Same IPC + approval flow as Node.
# .env overrides bucket when the same key exists in both files.`,
      },
    ],
  },
  {
    id: "with-proxy",
    title: "With Argus Proxy enabled",
    description:
      "Proxy-enabled mappings get argus-proxy-* placeholders. After load_env(), use config helpers or adapters from useargus.",
    blocks: [
      {
        label: "httpx",
        code: `import os
import httpx
from useargus import load_env, argus_httpx_config

load_env()
# os.environ["ANTHROPIC_API_KEY"] == "argus-proxy-..."

client = httpx.Client(**argus_httpx_config(), timeout=60)
client.post(
    "https://api.anthropic.com/v1/messages",
    headers={"x-api-key": os.environ["ANTHROPIC_API_KEY"], ...},
    json={...},
)
client.close()`,
      },
      {
        label: "ProxyConfig fields (low-level IPC)",
        code: `from useargus import require_proxy_config, proxy_url

proxy = require_proxy_config()

proxy.enabled          # True when bucket proxy is on
proxy.http_proxy       # http://<token>@127.0.0.1:<port>
proxy.https_proxy      # same for HTTPS CONNECT
proxy.no_proxy         # localhost,127.0.0.1,::1
proxy.ca_bundle_path   # ~/.argus/ca-bundle.pem — trust Argus MITM CA

url = proxy_url(proxy)  # prefers https_proxy`,
      },
    ],
  },
  {
    id: "clients",
    title: "HTTP client examples",
    description:
      "Config helpers return kwargs dicts; builders provide non-serializable wiring (e.g. requests adapter). useargus does not wrap HTTP libraries. See py-argus docs/usage for full guides.",
    blocks: [
      {
        label: "requests",
        code: `import requests
from useargus import load_env, argus_requests_config, create_argus_requests_proxy_adapter

load_env()
cfg = argus_requests_config()
session = requests.Session()
session.proxies.update(cfg["proxies"])
session.verify = cfg["verify"]
session.trust_env = cfg["trust_env"]
adapter = create_argus_requests_proxy_adapter()
session.mount("https://", adapter)
session.mount("http://", adapter)
session.get("https://api.anthropic.com/v1/models", headers={...})`,
      },
      {
        label: "httpx sync / async",
        code: `import httpx
from useargus import load_env, argus_httpx_config

load_env()
sync = httpx.Client(**argus_httpx_config(), timeout=60)
async_client = httpx.AsyncClient(**argus_httpx_config(), timeout=60)`,
      },
      {
        label: "aiohttp",
        code: `import aiohttp
from useargus import load_env, argus_aiohttp_config

load_env()
cfg = argus_aiohttp_config()
connector = aiohttp.TCPConnector(ssl=cfg["connector_ssl"])
async with aiohttp.ClientSession(connector=connector, trust_env=cfg["trust_env"]) as session:
    async with session.get(url, headers={...}, proxy=cfg["proxy"]) as resp: ...`,
      },
      {
        label: "urllib / stdlib",
        code: `import urllib.request
from useargus import load_env, argus_urllib_config

load_env()
cfg = argus_urllib_config()
opener = urllib.request.build_opener(
    urllib.request.ProxyHandler(cfg["proxy_handler"]),
    urllib.request.HTTPSHandler(context=cfg["ssl_context"]),
)`,
      },
      {
        label: "LangChain (langchain-anthropic)",
        code: `import httpx
from anthropic import Anthropic
from langchain_anthropic import ChatAnthropic
from useargus import load_env, argus_httpx_config

load_env()
http_client = httpx.Client(**argus_httpx_config(), timeout=60)
anthropic = Anthropic(http_client=http_client)
llm = ChatAnthropic(model="claude-sonnet-4-5", client=anthropic)`,
      },
    ],
  },
];

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
    usageSections: NODE_USAGE_SECTIONS,
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
    usageSections: PYTHON_USAGE_SECTIONS,
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
