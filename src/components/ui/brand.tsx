import { Link, useLocation } from "react-router-dom";

import { AppLogo } from "@/components/ui/app-logo";
import { cn } from "@/lib/cn";

export function Brand({ className }: { className?: string }) {
  const { pathname, hash } = useLocation();

  function handleClick() {
    if (pathname === "/" && !hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }

  return (
    <Link
      to={{ pathname: "/", hash: "" }}
      onClick={handleClick}
      className={cn("flex items-center gap-2.5", className)}
    >
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
