import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { APP_SCREENSHOTS } from "@/constants/app-screenshots";
import { cn } from "@/lib/cn";

export function AppScreenshots() {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbListRef = useRef<HTMLDivElement>(null);

  const active = APP_SCREENSHOTS[activeIndex];

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + APP_SCREENSHOTS.length) % APP_SCREENSHOTS.length);
  }, []);

  useEffect(() => {
    const el = thumbListRef.current?.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIndex]);

  return (
    <section
      id="screenshots"
      className="border-b border-border bg-surface-muted/40 py-20"
    >
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            See the app
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            From first-time setup through vault, buckets, and approvals.
          </p>
        </motion.div>

        <div className="mt-12 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-w-0"
          >
            <div className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-subtle">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-border" />
                  <span className="size-2.5 rounded-full bg-border" />
                  <span className="size-2.5 rounded-full bg-border" />
                </div>
                <span className="ml-2 truncate text-[11px] text-text-muted">
                  Argus — {active.title}
                </span>
              </div>
              <div className="relative aspect-[16/10] w-full bg-surface-raised">
                <img
                  key={active.id}
                  src={active.src}
                  alt={active.title}
                  width={1280}
                  height={800}
                  className="absolute inset-0 size-full object-cover object-top"
                  loading={activeIndex === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-text">{active.title}</p>
                <p className="mt-1 text-sm text-text-muted">{active.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => goTo(activeIndex - 1)}
                  className="grid size-9 place-items-center rounded-md border border-border bg-surface text-text-muted transition-colors hover:bg-surface-raised hover:text-text"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(activeIndex + 1)}
                  className="grid size-9 place-items-center rounded-md border border-border bg-surface text-text-muted transition-colors hover:bg-surface-raised hover:text-text"
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-text-muted lg:text-left">
              {activeIndex + 1} of {APP_SCREENSHOTS.length}
            </p>
          </motion.div>

          <div className="min-w-0 lg:sticky lg:top-24">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-muted">
              All screens
            </p>
            <div
              ref={thumbListRef}
              className="flex gap-2 overflow-x-auto pb-1 lg:max-h-[min(70vh,520px)] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1"
              role="tablist"
              aria-label="App screenshots"
            >
              {APP_SCREENSHOTS.map((shot, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={shot.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive ? "true" : "false"}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "group shrink-0 overflow-hidden rounded-lg border text-left transition-all",
                      "w-[140px] lg:w-full",
                      isActive
                        ? "border-signal/50 bg-surface shadow-subtle ring-1 ring-signal/20"
                        : "border-border bg-surface opacity-80 hover:border-signal/30 hover:opacity-100",
                    )}
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-surface-raised">
                      <img
                        src={shot.src}
                        alt=""
                        width={280}
                        height={175}
                        className="size-full object-cover object-top"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <p
                      className={cn(
                        "truncate px-2 py-1.5 text-[11px] font-medium",
                        isActive ? "text-text" : "text-text-muted group-hover:text-text",
                      )}
                    >
                      {shot.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
