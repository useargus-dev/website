import { useCallback, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

type CodePanelProps = {
  filename: string;
  code: string;
  className?: string;
};

export function CodePanel({ filename, code, className }: CodePanelProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [code]);

  return (
    <div
      className={cn(
        "min-w-0 overflow-hidden rounded-xl border border-border bg-[#0e0f12] shadow-sm dark:border-white/10",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="truncate font-mono text-xs text-white/60">{filename}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white/90"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-[#e8e6e3]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
