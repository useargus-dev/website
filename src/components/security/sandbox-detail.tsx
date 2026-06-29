import { motion } from "motion/react";
import { Cpu, Fingerprint, Lock, Network } from "lucide-react";
import { SANDBOX_DETAILS } from "@/constants/security";

const BLOCKS = [
  { title: "Session lifecycle", icon: Lock, items: SANDBOX_DETAILS.lifecycle },
  { title: "Relay attestation", icon: Network, items: SANDBOX_DETAILS.relay },
  { title: "PID & grant binding", icon: Fingerprint, items: SANDBOX_DETAILS.pidGrant },
  { title: "Redirector peers", icon: Cpu, items: SANDBOX_DETAILS.redirector },
] as const;

export function SandboxDetail() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {BLOCKS.map((block, i) => (
        <motion.article
          key={block.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
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
