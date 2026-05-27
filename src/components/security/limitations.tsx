import { motion } from "motion/react";
import { AlertTriangle } from "lucide-react";
import { OUT_OF_SCOPE } from "@/constants/security";

export function Limitations() {
  return (
    <div className="space-y-3">
      {OUT_OF_SCOPE.map((item, i) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
          className="flex gap-4 rounded-xl border border-border bg-surface-raised p-5"
        >
          <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-surface">
            <AlertTriangle size={16} className="text-warning" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-text-muted">{item.id}</span>
              <h3 className="font-medium text-text">{item.threat}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              {item.reason}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
