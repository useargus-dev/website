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
    title: "Enable Argus Proxy",
    description:
      "Turn on the bucket MITM proxy and inject proxy token per mapping. loadEnv() puts argus-proxy-* placeholders in env — your app never receives the real API key.",
  },
  {
    id: "env",
    title: "Add bucket ID and token to project env",
    description:
      "Set ARGUS_BUCKET_ID and ARGUS_BUCKET_TOKEN in your project .env — not the secret values themselves.",
  },
  {
    id: "run",
    title: "Run with argus run",
    description:
      "Argus Sandbox routes outbound HTTPS through the same proxy. Placeholders go out; the proxy swaps in real keys in transit. No SDK proxy wiring on Linux/Windows.",
  },
  {
    id: "approve",
    title: "Approve bucket access",
    description:
      "Review executable path, cwd, and command line. argus run approves once for the whole session; SDK mode may prompt per fingerprint.",
  },
];
