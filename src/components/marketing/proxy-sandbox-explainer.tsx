import { PROXY_SANDBOX_FLOW, PROXY_SANDBOX_SUMMARY, PROXY_SANDBOX_TAGLINE } from "@/constants/proxy-sandbox";

type ProxySandboxExplainerProps = {
  showSummary?: boolean;
  className?: string;
};

export function ProxySandboxExplainer({
  showSummary = true,
  className,
}: ProxySandboxExplainerProps) {
  return (
    <div className={className}>
      {showSummary ? (
        <>
          <p className="text-sm font-medium text-signal">{PROXY_SANDBOX_TAGLINE}</p>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{PROXY_SANDBOX_SUMMARY}</p>
        </>
      ) : null}
      <ol className={showSummary ? "mt-6 space-y-4" : "space-y-4"}>
        {PROXY_SANDBOX_FLOW.map((step, i) => (
          <li key={step.title} className="flex gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-signal/10 text-xs font-semibold text-signal">
              {i + 1}
            </span>
            <div>
              <p className="font-medium text-text">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
