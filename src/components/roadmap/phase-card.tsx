import { motion } from "motion/react";
import { CheckCircle2, Circle } from "lucide-react";
import type { RoadmapPhase } from "@/constants/roadmap";
import { cn } from "@/lib/cn";

export function RoadmapPhaseCard({
  phase,
  index,
}: {
  phase: RoadmapPhase;
  index: number;
}) {
  const doneCount = phase.items.filter((item) => item.done).length;
  const total = phase.items.length;

  return (
    <motion.article
      id={phase.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="scroll-mt-24 overflow-hidden rounded-xl border border-border bg-surface"
    >
      <div className="border-b border-border px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-signal">
              Phase {index + 1}
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-text sm:text-2xl">
              {phase.title}
            </h2>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
              phase.shipped
                ? "bg-success/10 text-success"
                : "border border-border bg-surface-muted text-text-muted",
            )}
          >
            {phase.shipped ? "Shipped" : "Planned"}
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">
          {phase.description}
        </p>
        {phase.shipped && (
          <p className="mt-2 text-xs text-text-muted">
            {doneCount} of {total} items complete
          </p>
        )}
      </div>

      <ul className="divide-y divide-border">
        {phase.items.map((item) => (
          <li
            key={item.label}
            className="flex items-start gap-3 px-6 py-3.5 sm:px-8"
          >
            {item.done ? (
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0 text-success"
                aria-hidden
              />
            ) : (
              <Circle
                size={18}
                className="mt-0.5 shrink-0 text-text-muted/50"
                aria-hidden
              />
            )}
            <span
              className={cn(
                "text-sm leading-relaxed",
                item.done
                  ? "text-text-muted line-through decoration-text-muted/60"
                  : "text-text",
              )}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
