import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/cn";

export function MobileFloatingThemeToggle() {
  return (
    <div className="fixed right-4 bottom-4 z-[100] sm:hidden">
      <ThemeToggle
        className={cn(
          "pointer-events-auto size-10 shadow-subtle",
          "bg-surface-raised/95 backdrop-blur-md",
        )}
      />
    </div>
  );
}
