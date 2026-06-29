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

export const SANDBOX_SDK_EXAMPLES = `# Call loadEnv() / load_env() in your app, then wrap with Argus Sandbox
argus run node app.js
argus run uvicorn main:app --reload
argus run npm start

# macOS or CI — load env without OS capture
argus run --no-proxy -- node app.js`;

export const RUN_MODE_EXAMPLES = SANDBOX_SDK_EXAMPLES;

export const RUN_MODE_FLOW = [
  {
    title: "Approve once",
    description:
      "You approve argus run in the terminal. Child processes inherit the sandbox session — no per-uvicorn popup.",
  },
  {
    title: "OS redirect",
    description:
      "A platform redirector (eBPF on Linux, WinDivert on Windows) sends captured HTTPS to your bucket's loopback proxy.",
  },
  {
    title: "Same rewrite engine",
    description:
      "Argus Proxy rewrites argus-proxy-* placeholders to real secrets — no per-client HTTP client wiring when capture is active.",
  },
  {
    title: "Teardown",
    description:
      "When your command exits, the redirector stops and the sandbox session is revoked automatically.",
  },
] as const;

export const RUN_MODE_NOTES = [
  "Requires Argus desktop signed in with proxy enabled on the bucket.",
  "Install the full desktop bundle — releases ship CLI + redirector together (no standalone sidecar zips).",
  "CLI resolves sidecars via ARGUS_HOME (set by the installer) — the installer does not modify your Path env var.",
  "Certificate pinning, gRPC, QUIC, WSL2, and Docker bridge networks are not supported for capture.",
  "Early v0.3 software — not independently security-audited yet.",
] as const;
