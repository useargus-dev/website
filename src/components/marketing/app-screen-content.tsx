import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Check, KeyRound, Lock, Shield } from "lucide-react";
import type { HowItWorksStep } from "@/constants/how-it-works";
import { cn } from "@/lib/cn";

function ScreenChrome({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col text-left">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </div>
        <span className="ml-2 text-[11px] text-text-muted">{title}</span>
      </div>
      <div className="flex-1 overflow-hidden p-4">{children}</div>
    </div>
  );
}

function UnlockScreen() {
  return (
    <ScreenChrome title="Argus — Sign in">
      <div className="flex h-full flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="mb-3 grid size-12 place-items-center rounded-lg border"
          style={{
            backgroundColor: "var(--brand-bg)",
            borderColor: "var(--brand-border)",
          }}
        >
          <Lock size={22} style={{ color: "var(--brand-icon)" }} />
        </motion.div>
        <p className="text-sm font-medium text-text">Unlock the app</p>
        <p className="mt-1 text-xs text-text-muted">Password + TOTP</p>
        <div className="mt-4 w-full max-w-[200px] space-y-2 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scaleX: 0.92 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            style={{ transformOrigin: "center center" }}
            className="h-8 w-full rounded-md border border-border bg-surface-raised"
          />
          <motion.div
            initial={{ opacity: 0, scaleX: 0.92 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            style={{ transformOrigin: "center center" }}
            className="h-8 w-full rounded-md border border-border bg-surface-raised"
          />
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="h-8 rounded-md bg-accent text-center text-xs leading-8 text-accent-foreground"
          >
            Unlock
          </motion.div>
        </div>
      </div>
    </ScreenChrome>
  );
}

function SecretsScreen() {
  const secrets = [
    { name: "stripe_live", type: "api_key" },
    { name: "postgres_prod", type: "connection_string" },
    { name: "github_pat", type: "access_token" },
  ];

  return (
    <ScreenChrome title="Argus — Vault">
      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
        Secrets
      </p>
      <div className="mt-3 space-y-2">
        {secrets.map((secret, i) => (
          <motion.div
            key={secret.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="flex items-center justify-between rounded-lg border border-border bg-surface-raised px-3 py-2.5"
          >
            <div className="flex items-center gap-2">
              <KeyRound size={12} className="text-signal" />
              <span className="text-sm font-medium text-text">{secret.name}</span>
            </div>
            <span className="rounded-md bg-surface-muted px-1.5 py-0.5 font-mono text-[9px] text-text-muted">
              {secret.type}
            </span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="rounded-lg border border-dashed border-border px-3 py-2.5 text-sm text-text-muted"
        >
          + Add secret
        </motion.div>
      </div>
    </ScreenChrome>
  );
}

function BucketScreen() {
  return (
    <ScreenChrome title="Argus — App buckets">
      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
        Buckets
      </p>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-3 rounded-lg border border-signal/40 bg-surface-muted p-3"
      >
        <p className="text-sm font-medium text-text">api-service</p>
        <p className="mt-1 font-mono text-[10px] text-text-muted">
          id: 7f3a…c21e
        </p>
        <p className="mt-1 font-mono text-[10px] text-text-muted">
          token: tok_…8f2a
        </p>
      </motion.div>
      <div className="mt-2 rounded-lg border border-border bg-surface-raised p-3 opacity-60">
        <p className="text-sm text-text-muted">+ New bucket</p>
      </div>
    </ScreenChrome>
  );
}

function MappingsScreen() {
  const mappings = [
    ["STRIPE_SECRET_KEY", "stripe_live"],
    ["DATABASE_URL", "postgres_prod"],
  ];

  return (
    <ScreenChrome title="Argus — Env mappings">
      <p className="text-xs text-text-muted">api-service · mappings</p>
      <div className="mt-3 space-y-2">
        {mappings.map(([env, secret], i) => (
          <motion.div
            key={env}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="flex items-center justify-between rounded-md border border-border bg-surface-raised px-2.5 py-2"
          >
            <span className="font-mono text-[10px] text-signal">{env}</span>
            <span className="text-[10px] text-text-muted">→ {secret}</span>
          </motion.div>
        ))}
      </div>
    </ScreenChrome>
  );
}

function EnvScreen() {
  return (
    <ScreenChrome title=".env — your project">
      <motion.pre
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="break-all font-mono text-[10px] leading-relaxed text-text-muted"
      >
        <span className="text-text-muted"># Local project env</span>
        {"\n"}
        <span className="text-signal">ARGUS_BUCKET_ID</span>=7f3a…c21e
        {"\n"}
        <span className="text-signal">ARGUS_BUCKET_TOKEN</span>=tok_…8f2a
        {"\n\n"}
        <span className="text-text-muted"># Not in env — stored in vault</span>
        {"\n"}
        <span className="line-through opacity-40">STRIPE_SECRET_KEY=sk_live_…</span>
      </motion.pre>
    </ScreenChrome>
  );
}

function RunScreen() {
  return (
    <ScreenChrome title="Terminal">
      <motion.pre
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="break-all font-mono text-[10px] text-text-muted"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-success">$</span> pnpm dev
        </motion.span>
        {"\n"}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <span className="text-text-muted">→ connecting to </span>
          <span className="text-signal">\\.\pipe\argus</span>
        </motion.span>
        {"\n"}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-warning"
        >
          ⏳ awaiting approval…
        </motion.span>
      </motion.pre>
    </ScreenChrome>
  );
}

function ApproveScreen() {
  return (
    <ScreenChrome title="Argus — Bucket access">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="rounded-lg border border-border bg-surface-raised p-3"
      >
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-signal" />
          <p className="text-xs font-medium text-text">api-service</p>
        </div>
        <p className="mt-2 break-all font-mono text-[9px] leading-snug text-text-muted">
          /usr/local/bin/node
          {"\n"}
          …/my-app/node_modules/.bin/vite
        </p>
        <div className="mt-3 flex gap-2">
          <motion.span
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
            className="flex-1 rounded-md bg-success-muted py-1.5 text-center text-[10px] font-medium text-success"
          >
            Accept
          </motion.span>
          <span className="flex-1 rounded-md border border-border py-1.5 text-center text-[10px] text-text-muted">
            Deny
          </span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-3 flex items-center gap-1.5 text-[10px] text-success"
      >
        <Check size={12} />
        Access granted · 15m TTL
      </motion.div>
    </ScreenChrome>
  );
}

const SCREENS: Record<HowItWorksStep["id"], () => ReactNode> = {
  unlock: UnlockScreen,
  secrets: SecretsScreen,
  bucket: BucketScreen,
  mappings: MappingsScreen,
  env: EnvScreen,
  run: RunScreen,
  approve: ApproveScreen,
};

export function AppScreenContent({ stepId }: { stepId: HowItWorksStep["id"] }) {
  const Screen = SCREENS[stepId];
  return <Screen />;
}

export function AppScreenShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-w-0 max-w-sm shrink-0 rounded-xl shadow-subtle sm:max-w-md",
        className
      )}
    >
      {/* Shadow on outer; overflow-hidden on inner so drop shadow is not clipped */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <div className="w-full min-h-[280px]">{children}</div>
      </div>
    </div>
  );
}
