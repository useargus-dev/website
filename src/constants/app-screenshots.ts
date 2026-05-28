export type AppScreenshot = {
  id: string;
  src: string;
  title: string;
  description: string;
};

/** Product screenshots in onboarding → app flow order (matches render capture ids). */
export const APP_SCREENSHOTS: AppScreenshot[] = [
  {
    id: "register_step_1",
    src: "/register_step_1.png",
    title: "Create your account",
    description: "Choose a username and strong password to protect the vault.",
  },
  {
    id: "register_step_2",
    src: "/register_step_2.png",
    title: "Set up unlock",
    description: "Configure TOTP or biometrics for day-to-day sign-in.",
  },
  {
    id: "register_provisioning_running",
    src: "/register_provisioning_running.png",
    title: "Provisioning vault",
    description: "Argus initializes your encrypted database locally.",
  },
  {
    id: "register_provisioning_complete",
    src: "/register_provisioning_complete.png",
    title: "Vault ready",
    description: "Registration finishes — secrets never leave your machine.",
  },
  {
    id: "dashboard",
    src: "/dashboard.png",
    title: "Dashboard",
    description: "Overview of vault health, buckets, and recent activity.",
  },
  {
    id: "vault",
    src: "/vault.png",
    title: "Secrets vault",
    description: "Store API keys, tokens, and connection strings with tags and expiry.",
  },
  {
    id: "buckets",
    src: "/buckets.png",
    title: "App buckets",
    description: "One bucket per app — rotate IDs and tokens without touching secret values.",
  },
  {
    id: "bucket_detail",
    src: "/bucket_detail.png",
    title: "Env mappings",
    description: "Map STRIPE_SECRET_KEY and other names to vault entries.",
  },
  {
    id: "approvals",
    src: "/approvals.png",
    title: "Approvals",
    description: "Review executable paths and revoke grants on your schedule.",
  },
];
