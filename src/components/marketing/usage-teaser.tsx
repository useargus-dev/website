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
            Client libraries
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Drop-in SDKs for your stack
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Node.js and Python are on npm and PyPI today. Go, Ruby, and Java clients
            share the same IPC contract and are under active development.
          </p>
          <Link
            to="/usage"
            className={cn(
              "mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-signal hover:underline",
            )}
          >
            Full usage guide
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
