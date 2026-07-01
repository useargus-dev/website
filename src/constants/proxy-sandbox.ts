/** Shared copy: Argus Proxy + Argus Sandbox (`argus run`) are one pipeline. */

export const PROXY_SANDBOX_TAGLINE =
  "Real API keys never enter your app — Argus injects them in transit.";

export const PROXY_SANDBOX_SUMMARY =
  "Enable Argus Proxy on a bucket and your app receives argus-proxy-* placeholder tokens in env — not real secrets. Console logs, crash dumps, and process memory only ever see placeholders. When you run with argus run (Argus Sandbox), outbound HTTPS is routed through the same loopback MITM proxy; Argus swaps placeholders for real keys inside the tunnel, on the way to the API. Your code keeps using the same env var names — it never holds the real key.";

export const PROXY_FEATURE_SUMMARY =
  "Enable Argus Proxy on a bucket and your app receives argus-proxy-* placeholder tokens in env — not real secrets. Console logs, crash dumps, and process memory only ever see placeholders.";

export const SANDBOX_FEATURE_SUMMARY =
  "When you run with argus run (Argus Sandbox), outbound HTTPS is routed through the same loopback MITM proxy; Argus swaps placeholders for real keys inside the tunnel, on the way to the API. Your code keeps using the same env var names — it never holds the real key.";

export const PROXY_ONLY_SUMMARY =
  "With Argus Proxy enabled, loadEnv() / load_env() puts proxy tokens in env instead of real API keys. The bucket loopback proxy rewrites those tokens to real secrets at request time — in transit only, not in your process.";

export const PROXY_SANDBOX_FLOW = [
  {
    title: "Placeholders in your app",
    description:
      "Enable Argus Proxy on the bucket. loadEnv() / load_env() injects argus-proxy-* tokens into env — the same variable names your code already uses, but not the real API key.",
  },
  {
    title: "Real keys stay in Argus",
    description:
      "Secrets live in the encrypted vault. Your repo .env, process.env, console.log, and heap dumps only contain placeholders and a bucket token — not production keys.",
  },
  {
    title: "Rewrite in transit",
    description:
      "The bucket loopback MITM proxy swaps placeholders for real secrets in HTTP headers and bodies — only inside the proxy tunnel, on the wire to allowed hosts.",
  },
  {
    title: "argus run sends traffic there",
    description:
      "Argus Sandbox (argus run on Linux/Windows) redirects outbound HTTPS to that proxy automatically. No per-library proxy wiring — your app just calls fetch or httpx as usual.",
  },
] as const;

export const PROXY_SANDBOX_STEPS_SHORT = [
  "Enable Argus Proxy on the bucket + map secrets to env names",
  "loadEnv() / load_env() — placeholders land in env, not real keys",
  "argus run your-app — Sandbox routes HTTPS through the proxy",
  "Proxy injects real keys in transit; your process never sees them",
] as const;

export const PROXY_SANDBOX_PREREQUISITE =
  "Argus Sandbox requires Argus Proxy enabled on the bucket — capture and rewrite share the same loopback MITM proxy.";

export const HERO_PROXY_SANDBOX_BLURB =
  "Enable Argus Proxy and your app gets argus-proxy-* placeholder tokens in env — not real keys. Run with argus run (Argus Sandbox) and HTTPS is routed through the same MITM proxy; real secrets are injected in transit only. Nothing in console logs, nothing in process memory.";
