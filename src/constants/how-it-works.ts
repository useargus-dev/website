export type HowItWorksStep = {
  id: string;
  title: string;
  description: string;
};

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: "unlock",
    title: "Unlock the app",
    description:
      "Sign in with your password and TOTP or biometrics. Argus stays local — your vault never leaves the machine.",
  },
  {
    id: "secrets",
    title: "Add secrets to your vault",
    description:
      "Store API keys, tokens, and connection strings in an encrypted SQLCipher database at ~/.argus/argus.db.",
  },
  {
    id: "bucket",
    title: "Create an app bucket",
    description:
      "One bucket per app or service. Argus generates a bucket ID and token you can rotate anytime.",
  },
  {
    id: "mappings",
    title: "Map env names to secrets",
    description:
      "Link STRIPE_SECRET_KEY to a vault entry. Your app keeps the same variable names — values stay in Argus.",
  },
  {
    id: "env",
    title: "Add bucket ID and token to project env",
    description:
      "Set ARGUS_BUCKET_ID and ARGUS_BUCKET_TOKEN in your project .env or shell — not the secret values themselves.",
  },
  {
    id: "run",
    title: "Run your app",
    description:
      "Your process connects over local IPC (named pipe or Unix socket). Argus resolves the real process identity.",
  },
  {
    id: "approve",
    title: "Approve bucket access",
    description:
      "Review the executable path, working directory, and command line. Grant access for that fingerprint and TTL.",
  },
];
