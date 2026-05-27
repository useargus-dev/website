import { motion } from "motion/react";
import { HARDENING_ITEMS } from "@/constants/security";

export function Hardening() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {HARDENING_ITEMS.map((item, i) => (
        <motion.article
          key={item.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="rounded-xl border border-border bg-surface-raised p-5"
        >
          <item.icon size={20} className="text-signal" />
          <h3 className="mt-3 font-medium text-text">{item.title}</h3>
          <ul className="mt-3 space-y-2">
            {item.points.map((point) => (
              <li
                key={point}
                className="text-sm leading-relaxed text-text-muted"
              >
                {point}
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  );
}
