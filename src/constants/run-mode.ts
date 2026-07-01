import { PROXY_SANDBOX_FLOW, PROXY_SANDBOX_PREREQUISITE } from "@/constants/proxy-sandbox";

export type RunModePlatform = {
  id: string;
  name: string;
  capture: "supported" | "secrets-only" | "planned";
  privileges: string;
  installer: string;
};

export const RUN_MODE_PLATFORMS: RunModePlatform[] = [
  {
    id: "linux",
    name: "Linux",
    capture: "supported",
    privileges: "sudo once per session for eBPF redirector (kernel ≥ 6.8; native Linux, not WSL2)",
    installer: ".deb / .rpm — desktop + CLI + eBPF redirector bundled",
  },
  {
    id: "windows",
    name: "Windows",
    capture: "supported",
    privileges: "UAC for WinDivert redirector; CLI stays unprivileged",
    installer: "NSIS setup.exe — desktop + CLI + redirector + WinDivert bundled",
  },
  {
    id: "macos",
    name: "macOS",
    capture: "secrets-only",
    privileges: "Use --no-proxy for env injection; OS capture planned (Network Extension)",
    installer: ".dmg — desktop app today; capture sidecars not bundled yet",
  },
];

export const SANDBOX_SDK_EXAMPLES = `# Enable Argus Proxy, loadEnv() / load_env() in your app, then argus run
argus run node app.js
argus run uvicorn main:app --reload
argus run npm start

# macOS or CI — placeholders without OS capture
argus run --no-proxy -- node app.js`;

export const RUN_MODE_EXAMPLES = SANDBOX_SDK_EXAMPLES;

export const RUN_MODE_FLOW = PROXY_SANDBOX_FLOW;

export const RUN_MODE_NOTES = [
  PROXY_SANDBOX_PREREQUISITE,
  "Install the full desktop bundle — releases ship CLI + redirector together (no standalone sidecar zips).",
  "CLI resolves sidecars via ARGUS_HOME (set by the installer) — the installer does not modify your Path env var.",
  "Certificate pinning, gRPC, QUIC, WSL2, and Docker bridge networks are not supported for capture.",
  "Early v0.3 software — not independently security-audited yet.",
] as const;
