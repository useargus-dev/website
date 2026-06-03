import { useState } from "react";
import type { UsageGuide, UsageGuideStep } from "@/constants/usage-guide";
import { CodePanel } from "@/components/sdk/code-panel";
import { cn } from "@/lib/cn";

function UsageLibraryTabs({
  step,
  activeId,
  onSelect,
}: {
  step: UsageGuideStep;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const libraries = step.libraries ?? [];
  if (libraries.length === 0) return null;

  return (
    <div
      role="tablist"
      aria-label="HTTP client library"
      className="mt-4 flex flex-wrap gap-1"
    >
      {libraries.map((lib) => {
        const selected = lib.id === activeId;
        return (
          <button
            key={lib.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onSelect(lib.id)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              selected
                ? "bg-signal/15 text-signal"
                : "text-text-muted hover:bg-surface-raised hover:text-text",
            )}
          >
            {lib.label}
          </button>
        );
      })}
    </div>
  );
}

function UsageStepRow({ step }: { step: UsageGuideStep }) {
  const libraries = step.libraries ?? [];
  const [activeLibraryId, setActiveLibraryId] = useState(libraries[0]?.id ?? "");

  const activeLibrary =
    libraries.find((lib) => lib.id === activeLibraryId) ?? libraries[0];

  const filename = activeLibrary?.filename ?? step.filename ?? "code";
  const code = activeLibrary?.code ?? step.code ?? "";

  return (
    <div className="grid gap-6 border-b border-border py-10 last:border-b-0 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-4">
      <div className="flex min-w-0 gap-4 lg:gap-5">
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-surface font-mono text-xs font-medium text-text-muted"
          aria-hidden
        >
          {step.step}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-text">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {step.description}
          </p>
          {libraries.length > 0 ? (
            <UsageLibraryTabs
              step={step}
              activeId={activeLibraryId}
              onSelect={setActiveLibraryId}
            />
          ) : null}
        </div>
      </div>

      <div className="min-w-0 lg:pt-0">
        <CodePanel filename={filename} code={code} />
      </div>
    </div>
  );
}

type UsageStepGuideProps = {
  guide: UsageGuide;
};

export function UsageStepGuide({ guide }: UsageStepGuideProps) {
  return (
    <div>
      <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
        {guide.intro}
      </p>
      <div className="mt-8">
        {guide.steps.map((step) => (
          <UsageStepRow key={step.step} step={step} />
        ))}
      </div>
    </div>
  );
}
