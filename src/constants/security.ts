import type { LucideIcon } from "lucide-react";
import { Activity, Cpu, Lock, Monitor, Shield, Terminal } from "lucide-react";

export const SECURITY_GOALS = [
  {
    goal: "Confidentiality at rest",
    metric: "A stolen argus.db file without the master password cannot be decrypted.",
    detail:
      "SQLCipher encrypts the full database file. The encryption key is derived from your master password via Argon2id and never stored in plaintext.",
  },
  {
    goal: "Confidentiality in transit (local)",
    metric: "Only user approved processes with an active grant receive secret values.",
    detail:
      "IPC uses a local named pipe or Unix socket — not TCP. Client identity is resolved server-side from the peer process attached to the connection.",
  },
  {
    goal: "Integrity",
    metric: "Tampered ciphertext fails AES-GCM authentication.",
    detail:
      "Each secret value uses a unique 12-byte nonce. Optional associated data can bind ciphertext to a specific row ID.",
  },
  {
    goal: "Accountability",
    metric: "Every secret access is recorded in the audit log.",
    detail:
      "Audit entries include event type, bucket ID, env labels, and process metadata — never decrypted secret values.",
  },
  {
    goal: "Least privilege",
    metric: "The WebView cannot open the database or bind the socket.",
    detail:
      "Tauri capability allowlists restrict the React layer. Crypto, SQLCipher, and the socket server live exclusively in the Rust core.",
  },
  {
    goal: "Fail secure",
    metric: "Sign-out stops IPC and zeroizes keys; app lock does not.",
    detail:
      "App lock blocks vault, buckets, and settings UI but keeps keys in memory and the IPC server running — you can still approve requests. Sign-out tears down the tray core, closes SQLCipher, and clears db_key from memory.",
  },
] as const;

export type TrustLayer = {
  id: string;
  label: string;
  title: string;
  trust: "untrusted" | "trusted";
  icon: LucideIcon;
  bullets: string[];
};

export const TRUST_LAYERS: TrustLayer[] = [
  {
    id: "webview",
    label: "Layer 1",
    title: "WebView (React UI)",
    trust: "untrusted",
    icon: Monitor,
    bullets: [
      "All user input is treated as hostile",
      "No direct filesystem or network access to the vault",
      "Communicates only through Tauri invoke commands with capability checks",
      "CSP blocks remote scripts; no CDN assets in production",
    ],
  },
  {
    id: "core",
    label: "Layer 2",
    title: "Rust core",
    trust: "trusted",
    icon: Cpu,
    bullets: [
      "Owns Argon2id, SQLCipher, AES-GCM encrypt/decrypt",
      "Binds and serves the local IPC endpoint",
      "Writes append-only audit events",
      "Decrypts secrets only after authorization checks pass",
    ],
  },
  {
    id: "clients",
    label: "Layer 3",
    title: "Client applications",
    trust: "untrusted",
    icon: Terminal,
    bullets: [
      "Python, Node, or CLI processes connecting over local IPC",
      "Cannot self-report identity — OS process inspection only",
      "Must present bucket ID, client token, and earn a grant",
      "Hold env values in os.environ after approval (out of Argus control)",
    ],
  },
];

export const IN_SCOPE_THREATS = [
  {
    id: "T1",
    threat: "Supply chain reads project .env",
    mitigation: "Keep ARGUS_BUCKET_ID and ARGUS_BUCKET_TOKEN in local .env — not secret values.",
    detail:
      "Secret values live in argus.db, outside the project tree. A leaked bucket ID is useless without Argus running and an approved grant.",
  },
  {
    id: "T2",
    threat: "Casual filesystem access to the database",
    mitigation: "SQLCipher full-file encryption with Argon2id-derived key.",
    detail:
      "Wrong password fails PRAGMA key verification immediately. meta.json stores only the password hash and bootstrap flags — not the db_key.",
  },
  {
    id: "T3",
    threat: "Unknown application requests secrets",
    mitigation: "Client grant gate: bucket + fingerprint + hashed token.",
    detail:
      "First connection from a new fingerprint opens the requests window. The user sees executable path, working directory, git remote, and command line before accepting.",
  },
  {
    id: "T3b",
    threat: "Stolen client_token",
    mitigation: "Token stored as SHA-256 hash; rotate from bucket settings.",
    detail:
      "Token alone is insufficient — the fingerprint must also match an active grant. Rotating the token invalidates existing grants tied to the old hash.",
  },
  {
    id: "T6",
    threat: "Stale approval after sleep or idle",
    mitigation: "expires_at on every grant plus background cleanup.",
    detail:
      "Per-bucket access TTL and optional refresh window. Expired grants require re-approval even if the same process reconnects.",
  },
  {
    id: "T7",
    threat: "XSS in WebView stealing invoke",
    mitigation: "Strict CSP, capability allowlists, isolation pattern.",
    detail:
      "connect-src limited to ipc: only. Frontend cannot read ~/.argus or invoke shell commands. Release builds should enable Tauri's isolation pattern.",
  },
  {
    id: "T8",
    threat: "Type confusion on socket (inject wrong secret types)",
    mitigation: "Rust access matrix enforced in ipc/handler.rs.",
    detail:
      "credential, recovery_codes, ssh_key, certificate, and note types cannot be injected via IPC even if the UI were bypassed.",
  },
] as const;

export const OUT_OF_SCOPE = [
  {
    id: "O1",
    threat: "Root or kernel attacker",
    reason:
      "A privileged attacker can dump memory of an unlocked Argus process. Argus does not attempt kernel-level isolation.",
  },
  {
    id: "O2",
    threat: "User approves a malicious binary",
    reason:
      "Approvals are a human decision. The UI shows process_path and command line — ignoring them is social engineering, not a bypass.",
  },
  {
    id: "O3",
    threat: "Malware after env access",
    reason:
      "Once secrets are in os.environ, the client application owns them. Argus controls when values are provided, not the client's runtime.",
  },
  {
    id: "O4",
    threat: "Physical access while vault is unlocked",
    reason:
      "db_key and decrypted buffers exist in RAM while signed in. Use OS screen lock, short TTLs, and sign out on shared machines.",
  },
] as const;

export type CryptoLayer = {
  id: string;
  title: string;
  summary: string;
  params: { name: string; value: string }[];
  notes?: string[];
};

export const CRYPTO_LAYERS: CryptoLayer[] = [
  {
    id: "argon2",
    title: "Master password (Argon2id)",
    summary:
      "Derives db_key and password_hash from the master password. Parameters exceed OWASP minimums for desktop KDF.",
    params: [
      { name: "Algorithm", value: "Argon2id" },
      { name: "Memory", value: "65536 KiB (64 MiB)" },
      { name: "Iterations", value: "3" },
      { name: "Parallelism", value: "4" },
      { name: "Salt", value: "32 bytes random per user" },
      { name: "Output", value: "32 bytes → db_key + PHC hash string" },
    ],
    notes: [
      "Master password is never stored or logged.",
      "Storage format: $argon2id$v=19$m=65536,t=3,p=4$<salt>$<hash>",
    ],
  },
  {
    id: "sqlcipher",
    title: "Database (SQLCipher)",
    summary:
      "Full-file AES-256-CBC page encryption. Opened only in the Rust core via rusqlite + bundled-sqlcipher — not from the WebView.",
    params: [
      { name: "Engine", value: "SQLCipher" },
      { name: "Key source", value: "db_key from Argon2id" },
      { name: "Activation", value: "PRAGMA key = \"x'...hex'\"" },
      { name: "Verification", value: "sqlite_schema query fails on wrong key" },
    ],
  },
  {
    id: "gcm",
    title: "Secret values (AES-256-GCM)",
    summary: "Per-value encryption for secrets.value and bucket_mappings.text_value.",
    params: [
      { name: "Key", value: 'HKDF-SHA256(db_key, info="argus-value-v1")' },
      { name: "Nonce", value: "12 bytes random per encryption" },
      { name: "AAD", value: "Optional secret_id binding" },
      { name: "Stored form", value: "base64(nonce ‖ ciphertext ‖ tag)" },
    ],
    notes: [
      "Metadata columns (name, tags, process_path) remain plaintext inside the encrypted DB for search.",
    ],
  },
  {
    id: "totp",
    title: "TOTP second factor",
    summary: "RFC 6238 compatible authenticator support at registration.",
    params: [
      { name: "Algorithm", value: "SHA-1 (app compatibility)" },
      { name: "Digits / period", value: "6 / 30 seconds" },
      { name: "Window", value: "±1 step" },
      { name: "Seed storage", value: "Encrypted with master-password-derived key" },
    ],
  },
];

export const AUTH_SCOPES = [
  {
    scope: "APP",
    requires: "Password + TOTP or biometric (sign-in)",
    grants: "Dashboard, vault view, buckets view, settings",
  },
  {
    scope: "VAULT",
    requires: "App unlocked (blocked while soft-locked)",
    grants: "Create, update, delete, reveal secrets",
  },
  {
    scope: "BUCKETS",
    requires: "App unlocked (blocked while soft-locked)",
    grants: "Bucket CRUD, env mappings, client token rotation",
  },
  {
    scope: "IPC / approvals",
    requires: "Signed in only — not blocked by app lock",
    grants: "Process requests, approve/deny grants, revoke clients",
  },
] as const;

export const IPC_DETAILS = {
  transport: [
    "Unix: ~/.argus/argus.sock with mode 0600 after bind",
    "Windows: \\\\.\\pipe\\argus with ACL restricted to current user SID",
    "No TCP localhost — avoids port enumeration and firewall prompts",
  ],
  token: [
    "32-character CSPRNG alphanumeric token per bucket",
    "Stored as SHA-256 hash in app_buckets.client_token_hash",
    "Constant-time compare on every IPC request",
    "Rotate from bucket settings; old grants stop working",
  ],
  grant: [
    "Keyed by (bucket_id, fingerprint, token_hash)",
    "Fingerprint = SHA-256(machine_id | git_remote | cwd | exe_path | uid | run_args)",
    "All identity fields resolved server-side via OS APIs — never from client JSON",
    "First-seen triple triggers the requests window; no silent auto-approve",
  ],
} as const;

export const SECRET_TYPE_MATRIX = [
  { type: "api_key", socket: true, cli: true, ui: true },
  { type: "access_token", socket: true, cli: true, ui: true },
  { type: "connection_string", socket: true, cli: true, ui: true },
  { type: "credential", socket: false, cli: false, ui: "copy only" },
  { type: "recovery_codes", socket: false, cli: false, ui: true },
  { type: "ssh_key", socket: false, cli: "confirm", ui: true },
  { type: "certificate", socket: false, cli: true, ui: true },
  { type: "note", socket: false, cli: false, ui: "read-only" },
] as const;

export const HARDENING_ITEMS = [
  {
    title: "Content Security Policy",
    icon: Shield,
    points: [
      "default-src 'self' only; no remote scripts or styles",
      "connect-src restricted to ipc: and http://ipc.localhost",
      "Fonts bundled locally — no CDN",
    ],
  },
  {
    title: "Tauri capabilities",
    icon: Lock,
    points: [
      "Split permissions: auth-default, secrets-default, admin-default",
      "Deny frontend fs read of ~/.argus",
      "No shell access unless explicitly required",
    ],
  },
  {
    title: "Memory safety",
    icon: Activity,
    points: [
      "secrecy::Secret wrapper for key material",
      "db_key and value_key cleared from memory on sign-out",
      "Soft app lock keeps keys in memory — IPC and approvals still work",
    ],
  },
] as const;
