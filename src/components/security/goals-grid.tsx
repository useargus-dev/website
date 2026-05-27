import { motion } from "motion/react";
import { SECURITY_GOALS } from "@/constants/security";

export function GoalsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {SECURITY_GOALS.map((goal, i) => (
        <motion.article
          key={goal.goal}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.05 }}
          className="rounded-xl border border-border bg-surface-raised p-5 transition-colors hover:border-signal/25"
        >
          <h3 className="font-medium text-text">{goal.goal}</h3>
          <p className="mt-2 text-sm font-medium text-signal">{goal.metric}</p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {goal.detail}
          </p>
        </motion.article>
      ))}
    </div>
  );
}
