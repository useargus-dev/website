import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll to top on route changes. Hash scrolling on `/` is handled in HomePage
 * after sections are mounted (avoids stale scroll position from other pages).
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (pathname === "/" && hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
