import {
  Fingerprint,
  Globe,
  KeyRound,
  Lock,
  LogOut,
  ShieldCheck,
  Terminal,
  Timer,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const FEATURES: Feature[] = [
  {
    icon: Lock,
    title: "Encrypted local vault",
    description:
      "Secrets live in a SQLCipher database. No cloud sync, no remote API for your keys.",
  },
  {
    icon: KeyRound,
    title: "App buckets",
    description:
      "One bucket per app or service. Map env names to vault secrets and rotate client tokens — your app keeps the same variable names, values stay in Argus.",
  },
  {
    icon: Globe,
    title: "Argus Proxy",
    description:
      "Optional per-bucket HTTP MITM so clients get argus-proxy-* placeholders — real keys stay in Argus until outbound HTTP rewrite.",
  },
  {
    icon: Terminal,
    title: "Argus Sandbox",
    description:
      "Call load_env() / loadEnv() in your app, then wrap with argus run — outbound HTTPS is captured at the OS level on Linux and Windows.",
  },
  {
    icon: Fingerprint,
    title: "Process-verified IPC",
    description:
      "Client identity is derived server-side from the OS process on the pipe. Tokens alone are not enough.",
  },
  {
    icon: ShieldCheck,
    title: "Human approval",
    description:
      "Every request shows the real binary path. Grants expire on a schedule you control.",
  },
  {
    icon: Timer,
    title: "Tray + requests window",
    description:
      "Approve or deny from a compact popup while your main window stays closed.",
  },
  {
    icon: LogOut,
    title: "Secure sign-out",
    description:
      "Sign out stops local IPC and clears encryption keys from memory. Use it when you leave a shared machine.",
  },
];
