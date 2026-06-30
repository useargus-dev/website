import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { RouteButton } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const desktopFeatures = [
  "Single-user desktop vault",
  "SQLCipher encrypted database",
  "No API keys in repo .env — bucket ID + token only",
  "Optional Argus Proxy (HTTP MITM)",
  "argus run — Argus Sandbox on Linux & Windows",
  "Local IPC with human approval",
  "System tray + requests window",
];

const integrationFeatures = [
  "argus run uvicorn / node / cargo — no SDK wiring",
  "npm install @useargus/node · pip install useargus",
  "loadEnv() / load_env() + argus run on Linux & Windows",
  "Full installers bundle CLI + redirector (ARGUS_HOME)",
];

export function ProductTiers() {
  return (
    <section className="border-b border-border bg-surface-muted/50 py-20">
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Built for developers who own their keys
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">
            A privacy-first desktop vault on your machine — no cloud sync. Keep secrets out
            of repo{" "}
            <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-xs">
              .env
            </code>{" "}
            files, approve each process, and run apps with{" "}
            <strong className="font-medium text-text">Argus Sandbox</strong> (
            <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-xs">
              argus run
            </code>
            ) on Linux and Windows.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border border-border bg-surface p-8 shadow-subtle"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-signal">
              Available now
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-text">
              Desktop app
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              Free under AGPL-3.0. Windows, macOS, and Linux — secrets stay on
              your machine.
            </p>
            <ul className="mt-6 space-y-3">
              {desktopFeatures.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <Check size={16} className="mt-0.5 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
            <RouteButton to="/downloads" className="mt-8">
              Get releases
            </RouteButton>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-xl border border-border bg-surface p-8 shadow-subtle"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-signal">
              Available now
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-text">
              CLI + Argus Sandbox
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              Wrap any command with{" "}
              <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-xs">
                argus run
              </code>{" "}
              or load secrets via SDK before your app starts — Argus must be signed in
              locally.
            </p>
            <ul className="mt-6 space-y-3">
              {integrationFeatures.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <Check size={16} className="mt-0.5 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/usage"
              className={cn(
                "mt-8 inline-flex items-center justify-center rounded-md border border-border bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface-muted",
              )}
            >
              Usage guide
            </Link>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
