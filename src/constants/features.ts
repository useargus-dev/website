import {
  Fingerprint,
  KeyRound,
  Lock,
  ShieldCheck,
  Timer,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType, CSSProperties } from "react";

import { AppLogo } from "@/components/ui/app-logo";

export type FeatureIconProps = {
  size?: number;
  style?: CSSProperties;
  className?: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon | ComponentType<FeatureIconProps>;
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
      "Map env variable names to vault secrets. Use ARGUS_BUCKET_ID and ARGUS_BUCKET_TOKEN — not the values.",
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
    icon: AppLogo,
    title: "Fail secure",
    description: "Sign out tears down the socket and zeroizes keys in the Rust core.",
  },
];
