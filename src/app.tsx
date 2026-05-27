import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageLayout } from "@/components/layout/page-layout";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { HomePage } from "@/pages/home";
import { SecurityPage } from "@/pages/security";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/security" element={<SecurityPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}
