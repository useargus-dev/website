import { CtaSection } from "@/components/marketing/cta-section";
import { Features } from "@/components/marketing/features";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ProductTiers } from "@/components/marketing/product-tiers";

export function HomePage() {
  return (
    <>
      <Hero />
      <ProductTiers />
      <Features />
      <HowItWorks />
      <CtaSection />
    </>
  );
}
