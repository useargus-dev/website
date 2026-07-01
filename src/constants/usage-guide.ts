export type UsageLibraryExample = {
  id: string;
  label: string;
  filename: string;
  code: string;
};

export type UsageGuideStep = {
  step: string;
  title: string;
  description: string;
  /** Single code sample (setup steps). */
  filename?: string;
  code?: string;
  /** Multiple library variants (proxy wiring step). */
  libraries?: UsageLibraryExample[];
};

export type UsageGuide = {
  intro: string;
  steps: UsageGuideStep[];
};

const PROJECT_ENV = `ARGUS_BUCKET_ID=550e8400-e29b-41d4-a716-446655440000
ARGUS_BUCKET_TOKEN=tok_...

# Optional local override (wins over bucket for same key)
# API_BASE_URL=http://localhost:3000`;

export const NODE_USAGE_GUIDE: UsageGuide = {
  intro:
    "Enable Argus Proxy on your bucket, install @useargus/node, call loadEnv() for argus-proxy-* placeholders in env, then argus run so HTTPS is routed through the MITM proxy — real keys injected in transit on Linux and Windows.",
  steps: [
    {
      step: "01",
      title: "Install the package",
      description:
        "Add the official Node client from npm.",
      filename: "Terminal",
      code: "npm install @useargus/node",
    },
    {
      step: "02",
      title: "Add bucket credentials to .env",
      description:
        "Store only ARGUS_BUCKET_ID and ARGUS_BUCKET_TOKEN in your project .env — never secret values. Enable Argus Proxy on the bucket so mappings receive argus-proxy-* placeholders.",
      filename: ".env",
      code: PROJECT_ENV,
    },
    {
      step: "03",
      title: "Load env at startup",
      description:
        "Call loadEnv() before the rest of your app reads process.env. With Argus Proxy enabled, env holds argus-proxy-* placeholders — not real API keys. The first connection may open an Argus approval dialog (up to ~120s). Inside an active sandbox session, child processes skip a second popup.",
      filename: "app.js",
      code: `import { loadEnv } from "@useargus/node";

await loadEnv();
// process.env.ANTHROPIC_API_KEY holds an argus-proxy-* placeholder

import "./server.js";`,
    },
    {
      step: "04",
      title: "Run with argus run",
      description:
        "Argus Sandbox routes outbound HTTPS through the bucket MITM proxy. Your app sends placeholders in headers; the proxy swaps in real keys in transit. On macOS or CI, use --no-proxy to load placeholders without OS capture.",
      filename: "Terminal",
      code: `argus run node app.js
argus run npm start
argus run --no-proxy -- node app.js`,
    },
  ],
};

const NODE_LEGACY_PROXY_STEP: UsageGuideStep = {
  step: "legacy",
  title: "Wire Argus Proxy per HTTP client",
  description:
    "v0.2.x pattern: run your app directly (no argus run) and point fetch, axios, or other clients at the bucket loopback proxy with SDK factory helpers. Still supported; Argus Sandbox is the recommended path in v0.3.",
  libraries: [
        {
          id: "fetch",
          label: "fetch",
          filename: "api.js",
          code: `import { loadEnv, argusFetchConfig } from "@useargus/node";

await loadEnv();

const { dispatcher } = await argusFetchConfig();

const res = await fetch("https://api.anthropic.com/v1/messages", {
  dispatcher,
  method: "POST",
  headers: {
    "x-api-key": process.env.ANTHROPIC_API_KEY!,
    "content-type": "application/json",
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-5",
    max_tokens: 64,
    messages: [{ role: "user", content: "Hello" }],
  }),
});`,
        },
        {
          id: "anthropic",
          label: "Anthropic SDK",
          filename: "anthropic.js",
          code: `import Anthropic from "@anthropic-ai/sdk";
import { loadEnv, argusAnthropicClientConfig } from "@useargus/node";

await loadEnv();

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
  ...(await argusAnthropicClientConfig()),
});

const models = await client.models.list();`,
        },
        {
          id: "axios",
          label: "axios",
          filename: "client.js",
          code: `import axios from "axios";
import { loadEnv, argusAxiosCreateConfig } from "@useargus/node";

await loadEnv();

const client = axios.create({
  ...(await argusAxiosCreateConfig()),
});

await client.get("https://api.anthropic.com/v1/models", {
  headers: { "x-api-key": process.env.ANTHROPIC_API_KEY! },
});`,
        },
        {
          id: "langchain",
          label: "LangChain",
          filename: "llm.js",
          code: `import { ChatAnthropic } from "@langchain/anthropic";
import { argusLangChainAnthropicClientConfig, loadEnv } from "@useargus/node";

await loadEnv();

const llm = new ChatAnthropic({
  model: "claude-sonnet-4-5",
  apiKey: process.env.ANTHROPIC_API_KEY!,
  ...(await argusLangChainAnthropicClientConfig()),
});

const response = await llm.invoke("Hello");`,
        },
        {
          id: "undici",
          label: "undici",
          filename: "undici.js",
          code: `import { loadEnv, createArgusUndiciDispatcher } from "@useargus/node";

await loadEnv();

const dispatcher = await createArgusUndiciDispatcher();

await fetch(url, { dispatcher, headers: { "x-api-key": process.env.ANTHROPIC_API_KEY! } });`,
        },
      ],
};

export const PYTHON_USAGE_GUIDE: UsageGuide = {
  intro:
    "Enable Argus Proxy on your bucket, install useargus, call load_env() for argus-proxy-* placeholders in env, then argus run so HTTPS is routed through the MITM proxy — real keys injected in transit on Linux and Windows.",
  steps: [
    {
      step: "01",
      title: "Install the package",
      description: "Add the official Python client from PyPI.",
      filename: "Terminal",
      code: "pip install useargus",
    },
    {
      step: "02",
      title: "Add bucket credentials to .env",
      description:
        "Store only ARGUS_BUCKET_ID and ARGUS_BUCKET_TOKEN in your project .env — never secret values. Enable Argus Proxy on the bucket so mappings receive argus-proxy-* placeholders.",
      filename: ".env",
      code: PROJECT_ENV,
    },
    {
      step: "03",
      title: "Load env at startup",
      description:
        "Call load_env() before other modules read os.environ. With Argus Proxy enabled, env holds argus-proxy-* placeholders — not real API keys. Inside an active sandbox session, child processes skip a second approval popup.",
      filename: "main.py",
      code: `from useargus import load_env

load_env()
# os.environ["ANTHROPIC_API_KEY"] holds an argus-proxy-* placeholder

import uvicorn
uvicorn.run("app:app", host="0.0.0.0", port=8000)`,
    },
    {
      step: "04",
      title: "Run with argus run",
      description:
        "Argus Sandbox routes outbound HTTPS through the bucket MITM proxy. Your app sends placeholders in headers; the proxy swaps in real keys in transit. On macOS or CI, use --no-proxy to load placeholders without OS capture.",
      filename: "Terminal",
      code: `argus run python main.py
argus run uvicorn app:main --reload
argus run --no-proxy -- python main.py`,
    },
  ],
};

const PYTHON_LEGACY_PROXY_STEP: UsageGuideStep = {
  step: "legacy",
  title: "Wire Argus Proxy per HTTP client",
  description:
    "v0.2.x pattern: run your app directly (no argus run) and wire requests, httpx, or other clients to the bucket loopback proxy with SDK config helpers. Still supported; Argus Sandbox is the recommended path in v0.3.",
  libraries: [
        {
          id: "httpx",
          label: "httpx",
          filename: "client.py",
          code: `import os
import httpx
from useargus import load_env, argus_httpx_config

load_env()

client = httpx.Client(**argus_httpx_config(), timeout=60)
try:
    client.post(
        "https://api.anthropic.com/v1/messages",
        headers={
            "x-api-key": os.environ["ANTHROPIC_API_KEY"],
            "anthropic-version": "2023-06-01",
        },
        json={"model": "claude-sonnet-4-5", "max_tokens": 64, "messages": [...]},
    )
finally:
    client.close()`,
        },
        {
          id: "requests",
          label: "requests",
          filename: "session.py",
          code: `import requests
from useargus import (
    load_env,
    argus_requests_config,
    create_argus_requests_proxy_adapter,
)

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
          id: "anthropic",
          label: "Anthropic SDK",
          filename: "anthropic.py",
          code: `from anthropic import Anthropic
from useargus import argus_anthropic_config, load_env

load_env()

cfg = argus_anthropic_config(timeout=60)
http_client = cfg["http_client"]
try:
    client = Anthropic(**cfg)
    models = client.models.list()
finally:
    http_client.close()`,
        },
        {
          id: "langchain",
          label: "LangChain",
          filename: "llm.py",
          code: `from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage
from useargus import (
    argus_langchain_anthropic_config,
    load_env,
    wire_langchain_anthropic_http_client,
)

load_env()

cfg = argus_langchain_anthropic_config(timeout=60)
http_client = cfg["http_client"]
try:
    wire_langchain_anthropic_http_client(http_client)
    llm = ChatAnthropic(model="claude-sonnet-4-5", max_tokens=64)
    llm.invoke([HumanMessage(content="Hello")])
finally:
    http_client.close()`,
        },
        {
          id: "aiohttp",
          label: "aiohttp",
          filename: "async_client.py",
          code: `import aiohttp
from useargus import load_env, argus_aiohttp_config

load_env()

cfg = argus_aiohttp_config()
connector = aiohttp.TCPConnector(ssl=cfg["connector_ssl"])
async with aiohttp.ClientSession(
    connector=connector,
    trust_env=cfg["trust_env"],
) as session:
    async with session.get(url, headers={...}, proxy=cfg["proxy"]) as resp:
        ...`,
        },
      ],
};

export const LEGACY_PROXY_GUIDES: Record<"node" | "python", UsageGuide> = {
  node: {
    intro:
      "Before Argus Sandbox (v0.3), apps wired each HTTP client to the bucket loopback proxy manually. This library proxy mode remains available on v0.2.x workflows.",
    steps: [NODE_LEGACY_PROXY_STEP],
  },
  python: {
    intro:
      "Before Argus Sandbox (v0.3), apps wired each HTTP client to the bucket loopback proxy manually. This library proxy mode remains available on v0.2.x workflows.",
    steps: [PYTHON_LEGACY_PROXY_STEP],
  },
};

export const USAGE_GUIDES: Record<"node" | "python", UsageGuide> = {
  node: NODE_USAGE_GUIDE,
  python: PYTHON_USAGE_GUIDE,
};
