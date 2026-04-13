import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import ProductPage from "@/pages/ProductPage";
import AscendPage from "@/pages/AscendPage";
import SharpsDisposalPage from "@/pages/SharpsDisposalPage";
import AboutPage from "@/pages/AboutPage";
import SpeakerPage from "@/pages/SpeakerPage";
import PartnershipsPage from "@/pages/PartnershipsPage";
import ResourcesPage from "@/pages/ResourcesPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";
import { useCartSync } from "@/hooks/useCartSync";

const queryClient = new QueryClient();

const AppContent = () => {
  useCartSync();
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:category" element={<ShopPage />} />
          <Route path="/shop/product/:slug" element={<ProductPage />} />
          <Route path="/ascend" element={<AscendPage />} />
          <Route path="/shop/sharps-disposal" element={<SharpsDisposalPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/speaker" element={<SpeakerPage />} />
          <Route path="/partnerships" element={<PartnershipsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
