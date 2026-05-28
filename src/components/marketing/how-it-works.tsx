import { useState } from "react";
import { motion } from "motion/react";
import { HOW_IT_WORKS_STEPS } from "@/constants/how-it-works";
import type { HowItWorksStep } from "@/constants/how-it-works";
import { cn } from "@/lib/cn";
import { AppScreenPreview } from "./app-screen-preview";

export function HowItWorks() {
  const [activeId, setActiveId] = useState<HowItWorksStep["id"]>(
    HOW_IT_WORKS_STEPS[0].id
  );
  const activeIndex = HOW_IT_WORKS_STEPS.findIndex((s) => s.id === activeId);
  const progress =
    activeIndex >= 0
      ? ((activeIndex + 1) / HOW_IT_WORKS_STEPS.length) * 100
      : 0;

  return (
    <section id="how-it-works" className="border-y border-border py-20">
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            From vault to bucket to approval
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">
            Seven steps from unlock to running your app. Secret values stay in
            Argus — your project env only needs a bucket ID and token.
          </p>
        </motion.div>

        <div className="mt-14 grid min-w-0 gap-12 lg:grid-cols-2 lg:items-start">
          <div className="min-w-0">
            <div className="mb-4 h-1 overflow-hidden rounded-full bg-surface-raised">
              <motion.div
                className="h-full rounded-full bg-signal"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <ol className="space-y-1.5">
              {HOW_IT_WORKS_STEPS.map((step, index) => {
                const isActive = step.id === activeId;
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(step.id)}
                      className={cn(
                        "relative w-full rounded-xl border px-4 py-3.5 text-left transition-all",
                        isActive
                          ? "border-signal/40 bg-surface-muted shadow-subtle"
                          : "border-transparent bg-transparent hover:bg-surface-raised"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="how-it-works-active"
                          className="absolute inset-0 rounded-xl border border-signal/20"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                        />
                      )}
                      <div className="relative flex items-start gap-3">
                        <span
                          className={cn(
                            "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                            isActive
                              ? "bg-signal text-white dark:text-accent-foreground"
                              : "bg-surface-raised text-text-muted"
                          )}
                        >
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              "font-medium",
                              isActive ? "text-text" : "text-text-muted"
                            )}
                          >
                            {step.title}
                          </p>
                          <motion.div
                            initial={false}
                            animate={{
                              height: isActive ? "auto" : 0,
                              opacity: isActive ? 1 : 0,
                            }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-1 text-sm leading-relaxed text-text-muted">
                              {step.description}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex w-full min-w-0 flex-col items-center gap-3 pb-6 lg:sticky lg:top-24"
          >
            <p className="w-full text-center text-xs font-medium uppercase tracking-wider text-text-muted">
              Step {activeIndex + 1} of {HOW_IT_WORKS_STEPS.length}
            </p>
            <div className="flex w-full min-w-0 justify-center">
              <AppScreenPreview activeStepId={activeId} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
