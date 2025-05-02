
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Suppliers from "./pages/Suppliers";
import SupplierDetail from "./pages/SupplierDetail";
import NewSupplier from "./pages/NewSupplier";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NewProduct from "./pages/NewProduct";
import Documents from "./pages/Documents";
import NewDocument from "./pages/NewDocument";
import Requirements from "./pages/Requirements";
import RequirementGroups from "./pages/RequirementGroups";
import SupplierPortalPreview from "./pages/SupplierPortalPreview";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fournisseurs" element={<Suppliers />} />
          <Route path="/fournisseurs/nouveau" element={<NewSupplier />} />
          <Route path="/fournisseurs/:id" element={<SupplierDetail />} />
          <Route path="/produits" element={<Products />} />
          <Route path="/produits/nouveau" element={<NewProduct />} />
          <Route path="/produits/:id" element={<ProductDetail />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/documents/nouveau" element={<NewDocument />} />
          <Route path="/exigences" element={<Requirements />} />
          <Route path="/groupes-exigences" element={<RequirementGroups />} />
          <Route path="/portail-fournisseur" element={<SupplierPortalPreview />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/parametres" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
