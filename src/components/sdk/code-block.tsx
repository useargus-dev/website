import { cn } from "@/lib/cn";

type CodeBlockProps = {
  label?: string;
  code: string;
  className?: string;
};

export function CodeBlock({ label, code, className }: CodeBlockProps) {
  return (
    <div className={cn("min-w-0", className)}>
      {label ? (
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-muted">
          {label}
        </p>
      ) : null}
      <pre className="overflow-x-auto rounded-lg border border-border bg-surface-raised p-4 font-mono text-[13px] leading-relaxed text-text">
        <code>{code}</code>
      </pre>
    </div>
  );
}
