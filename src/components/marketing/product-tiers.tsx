import { motion } from "motion/react";
import { Check, Clock } from "lucide-react";
import { LINKS } from "@/constants/links";
import { LinkButton } from "@/components/ui/button";

const openSourceFeatures = [
  "Single-user desktop vault",
  "SQLCipher encrypted database",
  "App buckets + env mappings",
  "Local IPC with human approval",
  "System tray + requests window",
];

export function ProductTiers() {
  return (
    <section className="border-b border-border bg-surface-muted/50 py-20">
      <div className="mx-auto max-w-6xl px-5">
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
            Start with the open source edition today. A self-hosted system is on the
            roadmap.
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
              Open source edition
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              Free under AGPL-3.0. Run on your own machine for personal or
              internal use.
            </p>
            <ul className="mt-6 space-y-3">
              {openSourceFeatures.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <Check size={16} className="mt-0.5 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
            <LinkButton
              href={LINKS.releases}
              target="_blank"
              rel="noreferrer"
              className="mt-8"
            >
              Get releases
            </LinkButton>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative rounded-xl border border-dashed border-border bg-surface-raised/50 p-8"
          >
            <p className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-text-muted">
              <Clock size={12} />
              On the roadmap
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-text">
              Self-hosted system
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              On the roadmap. The community edition is the foundation — same
              security model, local-first by default.
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
