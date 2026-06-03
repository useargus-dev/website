import { useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  SDK_LANGUAGES,
  type SdkLanguageId,
} from "@/constants/sdk";
import { USAGE_GUIDES } from "@/constants/usage-guide";
import { LINKS } from "@/constants/links";
import { CodeBlock } from "@/components/sdk/code-block";
import { UsageStepGuide } from "@/components/sdk/usage-step-guide";
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
  /** Teaser on home: summary, install, registry link only. Usage page: full step guide. */
  variant?: "compact" | "full";
};

export function UsageLanguageTabs({
  defaultLanguage = "node",
  variant = "full",
}: UsageLanguageTabsProps) {
  const [activeId, setActiveId] = useState<SdkLanguageId>(defaultLanguage);
  const active = SDK_LANGUAGES.find((l) => l.id === activeId) ?? SDK_LANGUAGES[0];
  const isCompact = variant === "compact";
  const guide =
    active.status === "available" && (active.id === "node" || active.id === "python")
      ? USAGE_GUIDES[active.id]
      : null;

  return (
    <div className="min-w-0">
      <div
        role="tablist"
        aria-label="Client library language"
        className="flex gap-6 overflow-x-auto border-b border-border"
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
                "shrink-0 border-b-2 pb-3 pt-1 text-sm font-medium transition-colors",
                selected
                  ? "border-text text-text"
                  : "border-transparent text-text-muted hover:border-border hover:text-text",
              )}
            >
              {lang.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="pt-8">
        <div className="flex flex-wrap items-center gap-2">
          {!isCompact ? (
            <h2 className="text-xl font-semibold tracking-tight text-text">
              {active.label}
            </h2>
          ) : null}
          <StatusBadge status={active.status} />
        </div>

        {isCompact ? (
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {active.summary}
          </p>
        ) : null}

        {active.install ? (
          <div className={cn("mt-4", isCompact && "space-y-3")}>
            {isCompact ? (
              <CodeBlock label="Install" code={active.install} />
            ) : null}
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
            {guide ? (
              <div className="mt-6">
                <UsageStepGuide guide={guide} />
              </div>
            ) : (
              <div className="mt-6 space-y-5">
                <p className="text-sm leading-relaxed text-text-muted">
                  {active.summary}
                </p>
                {active.blocks.map((block) => (
                  <CodeBlock key={block.label} label={block.label} code={block.code} />
                ))}
              </div>
            )}

            {active.status === "development" ? (
              <p className="mt-8 text-sm text-text-muted">
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
                className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-signal hover:underline"
              >
                Full docs on GitHub
                <ExternalLink size={14} />
              </a>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}
