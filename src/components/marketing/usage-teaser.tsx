import { motion } from "motion/react";
import { ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { UsageLanguageTabs } from "@/components/sdk/usage-language-tabs";
import { PROXY_SANDBOX_TAGLINE } from "@/constants/proxy-sandbox";
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
            SDKs · Argus Proxy · Sandbox
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Placeholders in env. Real keys in transit.
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            {PROXY_SANDBOX_TAGLINE} Enable Argus Proxy, call{" "}
            <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm text-text">
              loadEnv()
            </code>{" "}
            /{" "}
            <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm text-text">
              load_env()
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
          className="mt-10"
        >
          <UsageLanguageTabs variant="compact" />
        </motion.div>
      </div>
    </section>
  );
}
