import { motion } from "motion/react";
import { ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { UsageLanguageTabs } from "@/components/sdk/usage-language-tabs";
import { cn } from "@/lib/cn";

export function UsageTeaser() {
  return (
    <section id="usage" className="border-b border-border py-20">
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-signal">
            <Package size={14} aria-hidden />
            SDKs & Argus Sandbox
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Load env, run in the sandbox
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Install the Python or Node SDK, call{" "}
            <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm text-text">
              loadEnv()
            </code>{" "}
            /{" "}
            <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm text-text">
              load_env()
            </code>{" "}
            in your app, then wrap it with{" "}
            <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm text-text">
              argus run
            </code>{" "}
            for OS-level HTTPS capture on Linux and Windows.
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
          className="mt-10"
        >
          <UsageLanguageTabs variant="compact" />
        </motion.div>
      </div>
    </section>
  );
}
