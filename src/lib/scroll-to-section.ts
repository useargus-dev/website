const HEADER_OFFSET_PX = 72;
const RETRY_DELAYS_MS = [0, 16, 50, 100, 200, 400];

function getSectionElement(sectionId: string): HTMLElement | null {
  return document.querySelector(`main #${CSS.escape(sectionId)}`);
}

/** Scroll to a home-page section by id (accounts for sticky header). */
export function scrollToSection(
  sectionId: string,
  behavior: ScrollBehavior = "smooth",
): boolean {
  const el = getSectionElement(sectionId);
  if (!el) return false;

  const top =
    el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}

/** Retry until the section exists (e.g. right after route change). */
export function scrollToSectionWhenReady(
  sectionId: string,
  behavior: ScrollBehavior = "smooth",
) {
  const timers: number[] = [];
  let cancelled = false;

  const tryScroll = () => {
    if (!cancelled) scrollToSection(sectionId, behavior);
  };

  for (const delay of RETRY_DELAYS_MS) {
    if (delay === 0) tryScroll();
    else timers.push(window.setTimeout(tryScroll, delay));
  }

  return () => {
    cancelled = true;
    for (const id of timers) window.clearTimeout(id);
  };
}
