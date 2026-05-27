import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { CRYPTO_LAYERS } from "@/constants/security";
import { cn } from "@/lib/cn";

export function CryptoDetail() {
  const [openId, setOpenId] = useState<string>(CRYPTO_LAYERS[0].id);

  return (
    <div className="space-y-3">
      {CRYPTO_LAYERS.map((layer) => {
        const isOpen = openId === layer.id;
        return (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-xl border border-border bg-surface-raised"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? "" : layer.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-muted"
            >
              <div>
                <h3 className="font-medium text-text">{layer.title}</h3>
                <p className="mt-1 text-sm text-text-muted">{layer.summary}</p>
              </div>
              <ChevronDown
                size={18}
                className={cn(
                  "shrink-0 text-text-muted transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border px-5 pb-5 pt-2">
                    <dl className="divide-y divide-border">
                      {layer.params.map((param) => (
                        <div
                          key={param.name}
                          className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:justify-between sm:gap-4"
                        >
                          <dt className="text-sm text-text-muted">{param.name}</dt>
                          <dd className="font-mono text-xs text-text sm:text-right">
                            {param.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    {layer.notes && (
                      <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
                        {layer.notes.map((note) => (
                          <li
                            key={note}
                            className="text-xs leading-relaxed text-text-muted"
                          >
                            {note}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
