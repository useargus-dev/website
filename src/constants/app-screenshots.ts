export type AppScreenshot = {
  id: string;
  src: string;
  title: string;
  description: string;
};

/** Product screenshots — synced from argus/docs/assets/screenshots (pnpm screenshots:capture). */
export const APP_SCREENSHOTS: AppScreenshot[] = [
  {
    id: "register_account",
    src: "/screenshots/01-register-account.png",
    title: "Setup master account",
    description: "Choose username and master password — no cloud account required.",
  },
  {
    id: "register_second_factor",
    src: "/screenshots/02-register-second-factor.png",
    title: "Add a second factor",
    description: "Enroll TOTP or biometrics for day-to-day unlock.",
  },
  {
    id: "register_provisioning",
    src: "/screenshots/03-register-provisioning.png",
    title: "Securing your vault",
    description: "Argus initializes encrypted storage on your machine.",
  },
  {
    id: "register_complete",
    src: "/screenshots/04-register-complete.png",
    title: "Save your recovery code",
    description: "One-time code for password reset or second-factor recovery.",
  },
  {
    id: "dashboard",
    src: "/screenshots/05-dashboard.png",
    title: "Dashboard",
    description: "Privacy-first overview of vault, buckets, and pending approvals.",
  },
  {
    id: "vault",
    src: "/screenshots/06-vault.png",
    title: "Secrets vault",
    description: "Store API keys, tokens, and connection strings with tags and expiry.",
  },
  {
    id: "buckets",
    src: "/screenshots/07-buckets.png",
    title: "App buckets",
    description: "One bucket per app — rotate IDs and tokens without touching secret values.",
  },
  {
    id: "bucket_proxy",
    src: "/screenshots/08-bucket-detail-proxy.png",
    title: "Argus Proxy",
    description: "Enable loopback HTTP MITM per bucket on 127.0.0.1.",
  },
  {
    id: "mapping_proxy",
    src: "/screenshots/09-bucket-mapping-proxy.png",
    title: "Proxy mapping",
    description: "Inject proxy token per env key with allowed domains.",
  },
  {
    id: "mapping_token",
    src: "/screenshots/10-bucket-mapping-inject-token.png",
    title: "Proxy placeholder",
    description: "argus-proxy-* placeholders in env — real keys stay in Argus until HTTP rewrite.",
  },
  {
    id: "approvals",
    src: "/screenshots/11-approvals.png",
    title: "Approvals",
    description: "Review executable paths and revoke grants on your schedule.",
  },
  {
    id: "settings",
    src: "/screenshots/12-settings.png",
    title: "Settings",
    description: "Auto-lock, notifications, and tray preferences.",
  },
];
