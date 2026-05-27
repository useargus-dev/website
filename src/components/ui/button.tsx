import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover border-transparent",
  secondary:
    "bg-surface-raised text-text border-border hover:bg-surface-muted",
  ghost:
    "bg-transparent text-text-muted hover:text-text hover:bg-surface-raised border-transparent",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button className={cn(baseClass, variants[variant], className)} {...props} />
  );
}

export function LinkButton({
  className,
  variant = "primary",
  ...props
}: LinkButtonProps) {
  return (
    <a className={cn(baseClass, variants[variant], className)} {...props} />
  );
}
