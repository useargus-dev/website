import {
  Fingerprint,
  KeyRound,
  Lock,
  LogOut,
  ShieldCheck,
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
    title: "App buckets + proxy",
    description:
      "Map env names to vault secrets. Optionally enable Argus Proxy so clients get placeholders — real keys stay in Argus until HTTP rewrite.",
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
