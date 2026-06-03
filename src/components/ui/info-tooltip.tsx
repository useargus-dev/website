import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/cn";

type InfoTooltipProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function InfoTooltip({ label, children, className }: InfoTooltipProps) {
  return (
    <div className={cn("group/info relative", className)}>
      <button
        type="button"
        aria-label={label}
        className="grid size-7 place-items-center rounded-md border border-border bg-surface-raised text-text-muted transition-colors hover:bg-surface-muted hover:text-text"
      >
        <Info size={14} aria-hidden />
      </button>
      <div
        role="tooltip"
        className="pointer-events-none absolute top-full right-0 z-20 mt-2 w-max min-w-[14rem] max-w-[min(18rem,calc(100vw-2rem))] rounded-lg border border-border bg-surface px-3 py-2.5 text-xs shadow-subtle opacity-0 invisible transition-[opacity,visibility] duration-150 group-hover/info:visible group-hover/info:opacity-100 group-focus-within/info:visible group-focus-within/info:opacity-100"
      >
        {children}
      </div>
    </div>
  );
}
