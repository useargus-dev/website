import type { MouseEvent, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "@/lib/scroll-to-section";

type SectionLinkProps = {
  sectionId: string;
  children: ReactNode;
  className?: string;
};

/** In-app link to a home page section (`#features`, etc.). Works from any route. */
export function SectionLink({ sectionId, children, className }: SectionLinkProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const href = `/#${sectionId}`;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    if (pathname === "/") {
      scrollToSection(sectionId);
      window.history.pushState(null, "", href);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    void navigate({ pathname: "/", hash: `#${sectionId}` });
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
