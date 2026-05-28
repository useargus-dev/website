import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className={cn(
        "grid size-9 place-items-center rounded-md border border-border bg-surface-raised p-2 text-text-muted transition-colors hover:bg-surface-muted hover:text-text",
        className,
      )}
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
