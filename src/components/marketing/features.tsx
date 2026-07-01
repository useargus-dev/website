import { motion } from "motion/react";
import { FEATURES } from "@/constants/features";

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Built for supply-chain reality
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Compromised dependencies read{" "}
            <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm text-text">
              process.env
            </code>
            . Argus Proxy gives your app placeholder tokens — real API keys are injected in
            transit by the MITM proxy, not in your process, logs, or memory.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="min-w-0 rounded-xl border border-border bg-surface p-6 shadow-subtle transition-colors hover:border-signal/30"
            >
              <div
                className="mb-4 grid size-10 place-items-center rounded-md border"
                style={{
                  backgroundColor: "var(--brand-bg)",
                  borderColor: "var(--brand-border)",
                }}
              >
                <feature.icon size={20} style={{ color: "var(--brand-icon)" }} />
              </div>
              <h3 className="text-lg font-medium text-text">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
