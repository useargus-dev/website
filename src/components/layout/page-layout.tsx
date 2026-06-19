import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { MobileFloatingThemeToggle } from "./mobile-floating-theme-toggle";
import { SponsorshipBanner } from "./sponsorship-banner";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="min-w-0 flex-1">{children}</main>
      <SponsorshipBanner />
      <Footer />
      <MobileFloatingThemeToggle />
    </div>
  );
}
