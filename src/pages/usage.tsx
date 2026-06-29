import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { UsageStepGuide } from "@/components/sdk/usage-step-guide";
import { UsageLanguageTabs } from "@/components/sdk/usage-language-tabs";
import { RUN_MODE_FLOW, RUN_MODE_NOTES, RUN_MODE_PLATFORMS } from "@/constants/run-mode";
import { LEGACY_PROXY_GUIDES } from "@/constants/usage-guide";
import { SDK_SHARED_NOTES } from "@/constants/sdk";
import { cn } from "@/lib/cn";

function LegacyProxySection() {
  const [active, setActive] = useState<"node" | "python">("node");
  const guide = LEGACY_PROXY_GUIDES[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Legacy library"
        className="flex gap-6 overflow-x-auto border-b border-border"
      >
        {(["node", "python"] as const).map((id) => {
          const selected = id === active;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(id)}
              className={cn(
                "shrink-0 border-b-2 pb-3 pt-1 text-sm font-medium transition-colors",
                selected
                  ? "border-text text-text"
                  : "border-transparent text-text-muted hover:border-border hover:text-text",
              )}
            >
              {id === "node" ? "Node.js" : "Python"}
            </button>
          );
        })}
      </div>
      <div className="mt-6">
        <UsageStepGuide guide={guide} />
      </div>
    </div>
  );
}

export function UsagePage() {
  return (
    <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-12 sm:px-6 lg:py-16">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-10 max-w-2xl"
      >
        <p className="text-xs font-medium uppercase tracking-wider text-signal">
          Usage
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Load env, run in Argus Sandbox
        </h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
          Call{" "}
          <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm text-text">
            loadEnv()
          </code>{" "}
          or{" "}
          <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm text-text">
            load_env()
          </code>{" "}
          in your app, then wrap it with{" "}
          <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm text-text">
            argus run
          </code>
          . Argus injects placeholders from your bucket and captures outbound HTTPS at the
          OS on Linux and Windows — no per-client proxy wiring.
        </p>
      </motion.header>

      <motion.section
        id="get-started"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="scroll-mt-24"
      >
        <UsageLanguageTabs variant="full" />
      </motion.section>

      <motion.section
        id="argus-sandbox"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.4 }}
        className="mt-16 scroll-mt-24"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-text">
          About Argus Sandbox
        </h2>
        <p className="mt-3 max-w-3xl text-text-muted">
          Argus Sandbox is not a standalone CLI workflow — your app loads env through the SDK
          first, then runs inside{" "}
          <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm text-text">
            argus run
          </code>
          . One terminal approval covers the whole process tree; child PIDs inherit the
          session without a second popup.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-text">How it works</h3>
            <ol className="mt-4 space-y-4">
              {RUN_MODE_FLOW.map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-signal/10 text-xs font-semibold text-signal">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-text">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-text">Platform support</h3>
              <div className="mt-4 space-y-3">
                {RUN_MODE_PLATFORMS.map((platform) => (
                  <div
                    key={platform.id}
                    className="rounded-lg border border-border bg-surface-raised p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-medium text-text">{platform.name}</span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium",
                          platform.capture === "supported"
                            ? "bg-success/10 text-success"
                            : "border border-border bg-surface-muted text-text-muted",
                        )}
                      >
                        {platform.capture === "supported"
                          ? "OS capture"
                          : "Secrets only (--no-proxy)"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-text-muted">{platform.installer}</p>
                    <p className="mt-1 text-xs text-text-muted">{platform.privileges}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-text">Notes</h3>
              <ul className="mt-4 space-y-2 text-sm text-text-muted">
                {RUN_MODE_NOTES.map((note) => (
                  <li key={note} className="flex gap-2">
                    <span className="text-signal" aria-hidden>·</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="legacy-v02"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-16 scroll-mt-24"
      >
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
          Legacy · v0.2.x
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text">
          Library proxy mode
        </h2>
        <p className="mt-3 max-w-3xl text-text-muted">
          Before Argus Sandbox, apps ran directly and wired each HTTP client to the bucket
          loopback proxy with SDK factory helpers. This pattern still works on v0.2.x
          workflows but is no longer the recommended path.
        </p>
        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface p-5 sm:p-6">
          <LegacyProxySection />
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.4 }}
        className="mt-10 overflow-hidden rounded-xl border border-border bg-surface p-5 sm:p-6"
      >
        <h2 className="text-lg font-semibold text-text">Shared notes</h2>
        <ul className="mt-4 space-y-2 text-sm text-text-muted">
          {SDK_SHARED_NOTES.map((note) => (
            <li key={note} className="flex gap-2">
              <span className="text-signal" aria-hidden>·</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-8 text-center text-sm text-text-muted"
      >
        <Link to="/security#sandbox" className="font-medium text-signal hover:underline">
          Argus Sandbox security
        </Link>
        {" · "}
        <Link to="/roadmap" className="font-medium text-signal hover:underline">
          Roadmap
        </Link>
        {" · "}
        <Link to="/#how-it-works" className="font-medium text-signal hover:underline">
          How it works
        </Link>
      </motion.div>
    </div>
  );
}
