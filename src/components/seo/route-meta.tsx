import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_DESCRIPTION, PAGE_META, SITE_NAME } from "@/constants/site";
import { applyPageMeta } from "@/lib/page-meta";

export function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = PAGE_META[pathname] ?? {
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      path: pathname,
    };

    applyPageMeta({
      title: meta.title,
      description: meta.description,
      path: meta.path,
      appendSiteName: meta.title.includes(SITE_NAME),
    });
  }, [pathname]);

  return null;
}
