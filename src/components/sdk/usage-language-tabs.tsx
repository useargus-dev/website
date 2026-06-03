import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { SDK_LANGUAGES, type SdkLanguageId } from "@/constants/sdk";
import { LINKS } from "@/constants/links";
import { CodeBlock } from "@/components/sdk/code-block";
import { SdkUsageAccordion } from "@/components/sdk/sdk-usage-accordion";
import { cn } from "@/lib/cn";

function StatusBadge({ status }: { status: "available" | "development" }) {
  if (status === "available") {
    return (
      <span className="rounded-full border border-signal/30 bg-signal/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-signal">
        Available
      </span>
    );
  }
  return (
    <span className="rounded-full border border-border bg-surface-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-muted">
      In development
    </span>
  );
}

type UsageLanguageTabsProps = {
  defaultLanguage?: SdkLanguageId;
  /** Teaser on home: summary, install, registry link only. Usage page: full code samples. */
  variant?: "compact" | "full";
};

export function UsageLanguageTabs({
  defaultLanguage = "node",
  variant = "full",
}: UsageLanguageTabsProps) {
  const [activeId, setActiveId] = useState<SdkLanguageId>(defaultLanguage);
  const active = SDK_LANGUAGES.find((l) => l.id === activeId) ?? SDK_LANGUAGES[0];
  const isCompact = variant === "compact";

  return (
    <div className="min-w-0">
      <div
        role="tablist"
        aria-label="Client library language"
        className="flex gap-1 overflow-x-auto border-b border-border pb-px"
      >
        {SDK_LANGUAGES.map((lang) => {
          const selected = lang.id === activeId;
          return (
            <button
              key={lang.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(lang.id)}
              className={cn(
                "shrink-0 rounded-t-md border px-3 py-2 text-sm font-medium transition-colors",
                selected
                  ? "border-border border-b-transparent bg-surface text-text"
                  : "border-transparent text-text-muted hover:text-text",
              )}
            >
              {lang.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        className="rounded-b-xl border border-t-0 border-border bg-surface p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center gap-2">
          {!isCompact ? (
            <h3 className="text-lg font-semibold text-text">{active.label}</h3>
          ) : null}
          <StatusBadge status={active.status} />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          {active.summary}
        </p>

        {active.install ? (
          <div className={cn("mt-4", isCompact && "space-y-3")}>
            <CodeBlock label="Install" code={active.install} />
            {active.packageLink ? (
              <a
                href={active.packageLink.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-signal hover:underline"
              >
                {active.packageLink.name} on {active.packageLink.registry}
                <ExternalLink size={14} />
              </a>
            ) : null}
          </div>
        ) : null}

        {!isCompact ? (
          <>
            {active.usageSections && active.usageSections.length > 0 ? (
              <SdkUsageAccordion sections={active.usageSections} />
            ) : (
              <div className="mt-5 space-y-5">
                {active.blocks.map((block) => (
                  <CodeBlock key={block.label} label={block.label} code={block.code} />
                ))}
              </div>
            )}

            {active.status === "development" ? (
              <p className="mt-5 text-sm text-text-muted">
                This library is not published yet. The IPC protocol is stable — see{" "}
                <a
                  href={LINKS.clientLibrariesDocs}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-signal hover:underline"
                >
                  architecture §16
                </a>{" "}
                or test with{" "}
                <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-xs">
                  pnpm ipc:test
                </code>{" "}
                in the desktop repo.
              </p>
            ) : active.sourceRepoUrl ? (
              <a
                href={active.sourceRepoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-signal hover:underline"
              >
                Source on GitHub
                <ExternalLink size={14} />
              </a>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}
