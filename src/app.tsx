import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PageLayout } from "@/components/layout/page-layout";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { HomePage } from "@/pages/home";
import { UsagePage } from "@/pages/usage";
import { SecurityPage } from "@/pages/security";
import { RoadmapPage } from "@/pages/roadmap";
import { DownloadsPage } from "@/pages/downloads";

export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <SpeedInsights />
      <ScrollToTop />
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/usage" element={<UsagePage />} />
          <Route path="/sdk" element={<Navigate to="/usage" replace />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}
