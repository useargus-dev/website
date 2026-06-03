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
            Privacy-first by design
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            No cloud vault API. Your Rust core owns crypto, the database, and the socket on your machine.
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
