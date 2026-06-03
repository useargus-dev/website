import { motion } from "motion/react";
import { Globe, KeyRound, Shield } from "lucide-react";
import { PROXY_DETAILS } from "@/constants/security";

const BLOCKS = [
  { title: "Loopback proxy", icon: Globe, items: PROXY_DETAILS.loopback },
  { title: "Placeholder injection", icon: KeyRound, items: PROXY_DETAILS.placeholders },
  { title: "Request gate", icon: Shield, items: PROXY_DETAILS.gate },
] as const;

export function ProxyDetail() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {BLOCKS.map((block, i) => (
        <motion.article
          key={block.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.08 }}
          className="rounded-xl border border-border bg-surface-raised p-5"
        >
          <div
            className="mb-4 grid size-10 place-items-center rounded-lg border"
            style={{
              backgroundColor: "var(--brand-bg)",
              borderColor: "var(--brand-border)",
            }}
          >
            <block.icon size={18} style={{ color: "var(--brand-icon)" }} />
          </div>
          <h3 className="font-medium text-text">{block.title}</h3>
          <ul className="mt-3 space-y-2.5">
            {block.items.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-text-muted">
                {item}
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  );
}
