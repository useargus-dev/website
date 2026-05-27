import { Link } from "react-router-dom";

import { AppLogo } from "@/components/ui/app-logo";
import { cn } from "@/lib/cn";

export function Brand({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)}>
      <div
        className="grid size-9 place-items-center rounded-md border"
        style={{
          backgroundColor: "var(--brand-bg)",
          borderColor: "var(--brand-border)",
        }}
      >
        <AppLogo
          size={20}
          style={{ color: "var(--brand-icon)" }}
        />
      </div>
      <span className="text-lg font-semibold tracking-tight text-text">
        Argus
      </span>
    </Link>
  );
}
