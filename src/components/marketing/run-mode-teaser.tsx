import { motion } from "motion/react";
import { ArrowRight, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { CodePanel } from "@/components/sdk/code-panel";
import { ProxySandboxExplainer } from "@/components/marketing/proxy-sandbox-explainer";
import {
  PROXY_SANDBOX_TAGLINE,
  PROXY_SANDBOX_PREREQUISITE,
} from "@/constants/proxy-sandbox";
import {
  SANDBOX_SDK_EXAMPLES,
  RUN_MODE_NOTES,
  RUN_MODE_PLATFORMS,
} from "@/constants/run-mode";
import { cn } from "@/lib/cn";

export function ArgusSandboxTeaser() {
  return (
    <section id="argus-sandbox" className="border-b border-border bg-surface-muted/40 py-20">
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-signal">
            <Terminal size={14} aria-hidden />
            Argus Proxy & Sandbox
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Placeholders in your app. Real keys in transit.
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            {PROXY_SANDBOX_TAGLINE} Enable Argus Proxy, call{" "}
            <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm text-text">
              loadEnv()
            </code>
            , then{" "}
            <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm text-text">
              argus run
            </code>{" "}
            — the MITM proxy injects real secrets on the wire, not in your process.
          </p>
          <Link
            to="/usage"
            className={cn(
              "mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-signal hover:underline",
            )}
          >
            Usage guide
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 grid gap-6 lg:grid-cols-2"
        >
          <div className="rounded-xl border border-border bg-surface p-6 shadow-subtle">
            <ProxySandboxExplainer showSummary={false} />
          </div>
          <CodePanel filename="terminal" code={SANDBOX_SDK_EXAMPLES} />
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-surface p-6 shadow-subtle"
          >
            <h3 className="text-lg font-medium text-text">Platform support</h3>
            <ul className="mt-4 space-y-3">
              {RUN_MODE_PLATFORMS.map((platform) => (
                <li
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
                        ? "Proxy + Sandbox"
                        : platform.capture === "secrets-only"
                          ? "Proxy placeholders only"
                          : "Planned"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-text-muted">{platform.installer}</p>
                  <p className="mt-1 text-xs text-text-muted">{platform.privileges}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-xl border border-border bg-surface p-6 shadow-subtle"
          >
            <h3 className="text-lg font-medium text-text">Notes</h3>
            <ul className="mt-4 space-y-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <span className="text-signal" aria-hidden>·</span>
                <span>{PROXY_SANDBOX_PREREQUISITE}</span>
              </li>
              {RUN_MODE_NOTES.slice(1, 4).map((note) => (
                <li key={note} className="flex gap-2">
                  <span className="text-signal" aria-hidden>·</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
