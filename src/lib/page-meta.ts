import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/constants/site";

export type PageMetaInput = {
  title: string;
  description?: string;
  path?: string;
  /** Set false on nested pages if title already includes site name */
  appendSiteName?: boolean;
};

function upsertMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function applyPageMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  appendSiteName = true,
}: PageMetaInput) {
  const fullTitle =
    appendSiteName && !title.includes(SITE_NAME)
      ? `${title} · ${SITE_NAME}`
      : title;
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;

  document.title = fullTitle;

  upsertMeta("description", description);
  upsertMeta("robots", "index, follow, max-image-preview:large");
  upsertMeta("googlebot", "index, follow");

  upsertMeta("og:title", fullTitle, true);
  upsertMeta("og:description", description, true);
  upsertMeta("og:type", "website", true);
  upsertMeta("og:url", canonical, true);
  upsertMeta("og:site_name", SITE_NAME, true);
  upsertMeta("og:locale", "en_US", true);
  upsertMeta("og:image", `${SITE_URL}/token.svg`, true);

  upsertMeta("twitter:card", "summary");
  upsertMeta("twitter:title", fullTitle);
  upsertMeta("twitter:description", description);

  upsertLink("canonical", canonical);
}
