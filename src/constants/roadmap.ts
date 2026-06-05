export type RoadmapItem = {
  label: string;
  done: boolean;
};

export type RoadmapPhase = {
  id: string;
  title: string;
  description: string;
  /** Shipped phases show a “Done” badge; planned phases show “Planned”. */
  shipped: boolean;
  items: RoadmapItem[];
};

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: "foundation",
    title: "Foundation & vault",
    description:
      "Local-first encrypted secrets vault on your machine — no cloud, no remote API.",
    shipped: true,
    items: [
      { label: "SQLCipher encrypted database at ~/.argus/argus.db", done: true },
      { label: "Sign-in with password + TOTP or biometric unlock", done: true },
      { label: "Vault CRUD for API keys, tokens, and typed secrets", done: true },
      { label: "Secret expiry tracking and notifications", done: true },
      { label: "Audit log for vault and access events", done: true },
      { label: "Desktop app for Windows, macOS, and Linux", done: true },
      { label: "Auto app lock after idle; IPC stays up while signed in", done: true },
    ],
  },
  {
    id: "buckets-env-ipc",
    title: "Buckets, env & IPC",
    description:
      "Replace plaintext secrets in .env with bucket credentials and approve each process before it receives values.",
    shipped: true,
    items: [
      { label: "App buckets with rotatable client tokens", done: true },
      { label: "Bucket env mappings (secret → env var name)", done: true },
      { label: "Project .env with ARGUS_BUCKET_ID and ARGUS_BUCKET_TOKEN", done: true },
      { label: "Local IPC over Unix socket / Windows named pipe", done: true },
      { label: "OS-verified process fingerprint (exe, cwd, args, git remote)", done: true },
      { label: "Human approval popup for new client identities", done: true },
      { label: "Per-bucket client grants with configurable TTL", done: true },
      { label: "Requests window and grant revoke in the UI", done: true },
      { label: "System tray with background IPC when window is closed", done: true },
      { label: "Python SDK — pip install useargus, load_env()", done: true },
      { label: "Node SDK — npm install @useargus/node, loadEnv()", done: true },
      { label: ".env fallback when Argus is locked or unavailable", done: true },
    ],
  },
  {
    id: "proxy",
    title: "Argus Proxy (library mode)",
    description:
      "Optional per-bucket HTTP MITM proxy so proxy-enabled mappings use placeholders — real secrets rewritten only at outbound request time.",
    shipped: true,
    items: [
      { label: "Per-bucket loopback proxy (ports 9000–9100)", done: true },
      { label: "argus-proxy-* placeholders instead of real keys in os.environ", done: true },
      { label: "Per-mapping allowed host lists (suffix match)", done: true },
      { label: "Local Argus CA and per-host TLS MITM", done: true },
      { label: "Header and body placeholder rewrite before upstream", done: true },
      { label: "Proxy auth via client token + active grant + peer PID", done: true },
      { label: "Proxy audit events (request, host denied, grant denied)", done: true },
      { label: "Per-library wiring guides (requests, httpx, axios, fetch, Anthropic, LangChain, …)", done: true },
    ],
  },
  {
    id: "run-mode",
    title: "Run mode (OS sandbox)",
    description:
      "argus run wraps any command and intercepts outbound HTTP/HTTPS at the OS level — no per-library proxy wiring.",
    shipped: false,
    items: [
      { label: "argus run <command> CLI sidecar (docker run-style UX)", done: false },
      { label: "Transparent network capture via mitmproxy_rs redirectors", done: false },
      { label: "Linux capture (eBPF / Aya)", done: false },
      { label: "Windows capture (WinDivert elevated redirector)", done: false },
      { label: "macOS capture (Network Extension system extension)", done: false },
      { label: "Sandbox sessions with grant delegation to child processes", done: false },
      { label: "Transparent proxy acceptor in Argus core", done: false },
      { label: "Process tree support (uvicorn --reload, npm scripts)", done: false },
      { label: "argus status and argus sessions commands", done: false },
      { label: "Live traffic summary in terminal (--traffic)", done: false },
      { label: "Optional filesystem isolation (--isolate)", done: false },
      { label: "argus doctor preflight checks", done: false },
    ],
  },
  {
    id: "cli-ecosystem",
    title: "CLI & client ecosystem",
    description:
      "Shell and language integrations beyond the desktop app and Python/Node SDKs.",
    shipped: false,
    items: [
      { label: "argus get / list / export shell commands", done: false },
      { label: "Eval-safe export without shell history leakage", done: false },
      { label: "Go client library (argus-go)", done: false },
      { label: "Ruby gem (argus-secrets)", done: false },
      { label: "Java / JVM client library", done: false },
      { label: "Advanced tray menus (per-bucket submenu, pause IPC)", done: false },
    ],
  },
  {
    id: "self-hosted",
    title: "Self-hosted system",
    description:
      "Run Argus infrastructure on your own servers for teams — shared secrets and policy without a SaaS vault.",
    shipped: false,
    items: [
      { label: "Self-hosted Argus server (team vault backend)", done: false },
      { label: "Multi-user and role-based access control", done: false },
      { label: "Shared buckets and team secret policies", done: false },
      { label: "Remote agent / IPC bridge for CI and servers", done: false },
      { label: "Organizational audit and compliance exports", done: false },
      { label: "SSO and enterprise identity integration", done: false },
      { label: "High-availability and backup for team deployments", done: false },
    ],
  },
];
