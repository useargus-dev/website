import { cn } from "@/lib/cn";

/** Matches theme toggle — mobile header icon buttons. */
export const headerIconButtonClass =
  "grid size-10 place-items-center rounded-md border border-border bg-surface-raised p-2 text-text-muted transition-colors hover:bg-surface-muted hover:text-text";

export function headerIconButtonActiveClass(active: boolean) {
  return cn(
    headerIconButtonClass,
    active && "border-signal/40 bg-surface-muted text-signal shadow-subtle",
  );
}
