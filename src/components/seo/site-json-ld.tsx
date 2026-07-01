import { LINKS, TEAM_MEMBERS } from "@/constants/links";
import {
  DEFAULT_DESCRIPTION,
  EXTERNAL_BACKLINKS,
  SITE_NAME,
  SITE_URL,
} from "@/constants/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: LINKS.contactEmailAddress,
      sameAs: [
        LINKS.github,
        LINKS.npmNode,
        LINKS.pypiUseargus,
        LINKS.nodeSdkRepo,
        LINKS.pythonSdkRepo,
        LINKS.linkedinSushant,
        LINKS.linkedinSachin,
      ],
    },
    ...TEAM_MEMBERS.map((member, index) => ({
      "@type": "Person",
      "@id": `${SITE_URL}/#person-${index + 1}`,
      name: member.name,
      url: member.linkedin,
      sameAs: [member.linkedin],
      worksFor: { "@id": `${SITE_URL}/#organization` },
    })),
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: SITE_NAME,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows, macOS, Linux",
      description: DEFAULT_DESCRIPTION,
      url: SITE_URL,
      downloadUrl: LINKS.releases,
      softwareVersion: "0.3.0",
      license: "https://spdx.org/licenses/AGPL-3.0-or-later.html",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: { "@id": `${SITE_URL}/#organization` },
      sameAs: EXTERNAL_BACKLINKS.map((l) => l.href),
    },
  ],
};

export function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
