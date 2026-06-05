import type { RoadmapPhase } from "@/constants/roadmap";
import { RoadmapPhaseCard } from "@/components/roadmap/phase-card";
import { cn } from "@/lib/cn";

export function RoadmapTimeline({ phases }: { phases: RoadmapPhase[] }) {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Vertical spine — left on mobile, centered on md+ */}
      <div
        className="pointer-events-none absolute bottom-0 top-0 w-px bg-border left-4 md:left-1/2 md:-translate-x-1/2"
        aria-hidden
      />

      <ol className="relative list-none space-y-10 md:space-y-14">
        {phases.map((phase, index) => {
          const isLeft = index % 2 === 0;

          return (
            <li
              key={phase.id}
              className="relative grid grid-cols-[2rem_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] md:gap-x-10"
            >
              {/* Timeline node */}
              <div
                className="col-start-1 row-start-1 flex justify-center md:col-start-2 md:row-start-1"
                aria-hidden
              >
                <span
                  className={cn(
                    "relative z-10 mt-7 size-3.5 shrink-0 rounded-full border-[3px] border-bg shadow-subtle md:mt-8",
                    phase.shipped ? "bg-success" : "bg-signal",
                  )}
                />
              </div>

              {/* Phase card — right on mobile; alternates left/right on desktop */}
              <div
                className={cn(
                  "col-start-2 row-start-1 min-w-0",
                  isLeft
                    ? "md:col-start-1 md:col-end-2 md:pr-2"
                    : "md:col-start-3 md:col-end-4 md:pl-2",
                )}
              >
                <RoadmapPhaseCard
                  phase={phase}
                  index={index}
                  align={isLeft ? "right" : "left"}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
