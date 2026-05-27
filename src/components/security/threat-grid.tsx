import { motion } from "motion/react";
import { IN_SCOPE_THREATS } from "@/constants/security";

export function ThreatGrid() {
  return (
    <div className="space-y-4">
      {IN_SCOPE_THREATS.map((t, i) => (
        <motion.article
          key={t.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.04 }}
          className="group rounded-xl border border-border bg-surface-raised p-5 transition-colors hover:border-signal/30 sm:p-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-surface-muted px-2 py-0.5 font-mono text-xs font-medium text-signal">
              {t.id}
            </span>
          </div>
          <h3 className="mt-3 font-medium text-text">{t.threat}</h3>
          <p className="mt-2 text-sm font-medium text-signal">{t.mitigation}</p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {t.detail}
          </p>
        </motion.article>
      ))}
    </div>
  );
}
