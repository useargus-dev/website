import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppScreenshots } from "@/components/marketing/app-screenshots";
import { CtaSection } from "@/components/marketing/cta-section";
import { Features } from "@/components/marketing/features";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ProductTiers } from "@/components/marketing/product-tiers";
import { EcosystemStats } from "@/components/marketing/ecosystem-stats";
import { ArgusSandboxTeaser } from "@/components/marketing/run-mode-teaser";
import { UsageTeaser } from "@/components/marketing/usage-teaser";
import { scrollToSectionWhenReady } from "@/lib/scroll-to-section";

export function HomePage() {
  const { hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    const sectionId = hash.replace(/^#/, "");
    // Drop scroll position carried over from /security (or other long pages).
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return scrollToSectionWhenReady(sectionId);
  }, [hash]);

  return (
    <>
      <Hero />
      <EcosystemStats />
      <ProductTiers />
      <Features />
      <ArgusSandboxTeaser />
      <HowItWorks />
      <UsageTeaser />
      <AppScreenshots />
      <CtaSection />
    </>
  );
}
