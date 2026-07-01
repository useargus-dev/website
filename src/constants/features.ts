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
import {
  PROXY_FEATURE_SUMMARY,
  SANDBOX_FEATURE_SUMMARY,
} from "@/constants/proxy-sandbox";

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
      "One bucket per app or service. Map env names to vault secrets — commit a bucket ID and rotatable token, not API keys. A stolen token still needs Argus running and your approval.",
  },
  {
    icon: Globe,
    title: "Argus Proxy",
    description: PROXY_FEATURE_SUMMARY,
  },
  {
    icon: Terminal,
    title: "Argus Sandbox",
    description: SANDBOX_FEATURE_SUMMARY,
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
      "Every request shows the real binary path — including unexpected postinstall scripts. Grants expire on a schedule you control.",
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
