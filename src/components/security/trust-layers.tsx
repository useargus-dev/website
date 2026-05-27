import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { TRUST_LAYERS } from "@/constants/security";
import { cn } from "@/lib/cn";

export function TrustLayers() {
  return (
    <div className="space-y-0">
      {TRUST_LAYERS.map((layer, index) => (
        <div key={layer.id}>
          <motion.article
            initial={{ opacity: 0, x: layer.trust === "trusted" ? 0 : -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={cn(
              "relative rounded-xl border p-5 sm:p-6",
              layer.trust === "trusted"
                ? "border-signal/40 bg-surface-muted shadow-subtle"
                : "border-border bg-surface-raised"
            )}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-lg border",
                  layer.trust === "trusted"
                    ? "border-signal/30 bg-warm-mist/80 dark:bg-warm-mist"
                    : "border-border bg-surface"
                )}
              >
                <layer.icon
                  size={22}
                  className={
                    layer.trust === "trusted" ? "text-signal" : "text-text-muted"
                  }
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
                    {layer.label}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                      layer.trust === "trusted"
                        ? "bg-success-muted text-success"
                        : "bg-surface border border-border text-text-muted"
                    )}
                  >
                    {layer.trust === "trusted" ? "Trusted" : "Untrusted"}
                  </span>
                </div>
                <h3 className="mt-1 text-lg font-medium text-text">
                  {layer.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {layer.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-sm leading-relaxed text-text-muted"
                    >
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-signal" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>

          {index < TRUST_LAYERS.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="flex justify-center py-3"
              aria-hidden
            >
              <div className="flex flex-col items-center gap-1 text-text-muted">
                <div className="h-6 w-px bg-gradient-to-b from-border to-signal/50" />
                <ArrowDown size={14} className="text-signal" />
              </div>
            </motion.div>
          )}
        </div>
      ))}

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-6 rounded-lg border border-signal/20 bg-surface-muted px-4 py-3 text-sm text-text-muted"
      >
        <strong className="font-medium text-text">Invariant:</strong> decryption
        of secret payloads happens only in the Rust core, after authorization
        checks — never in the React bundle or client libraries.
      </motion.p>
    </div>
  );
}
