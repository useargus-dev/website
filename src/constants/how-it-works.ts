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
      "Sign in with your password and TOTP or biometrics. Your vault stays on your machine — no cloud sync.",
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
      "Link ANTHROPIC_API_KEY to a vault entry. Your app keeps the same variable names — values stay in Argus.",
  },
  {
    id: "proxy",
    title: "Enable proxy injection (optional)",
    description:
      "Turn on Argus Proxy for the bucket, enable inject proxy token on a mapping, and set allowed domains. Env vars get argus-proxy-* placeholders instead of real keys.",
  },
  {
    id: "env",
    title: "Add bucket ID and token to project env",
    description:
      "Set ARGUS_BUCKET_ID and ARGUS_BUCKET_TOKEN in your project .env — not the secret values themselves.",
  },
  {
    id: "run",
    title: "Run your app",
    description:
      "loadEnv() / load_env() connects over local IPC. With proxy on, use SDK proxy helpers to wire your HTTP library.",
  },
  {
    id: "approve",
    title: "Approve bucket access",
    description:
      "Review the executable path, working directory, and command line. Grant access for that fingerprint and TTL.",
  },
];
