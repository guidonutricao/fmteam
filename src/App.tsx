import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PlanoAlimentar from "./pages/PlanoAlimentar";
import CheckIn from "./pages/CheckIn";
import NotFound from "./pages/NotFound";
import Treino from './pages/treino';
import Substituicoes from './pages/substituicoes';
import Mentorias from './pages/mentorias';
import Suplementos from './pages/suplementos';
import Aplicativos from './pages/aplicativos';
import Ebooks from './pages/ebooks';
import Incentivos from './pages/incentivos';
import PlanoAlimentarOrientacoes from './pages/PlanoAlimentarOrientacoes';

// Importação dos ícones lucide que estavam faltando
import { Bell, Settings } from 'lucide-react';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plano-alimentar" element={<PlanoAlimentar />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/treino" element={<Treino />} />
          <Route path="/substituicoes" element={<Substituicoes />} />
          <Route path="/mentorias" element={<Mentorias />} />
          <Route path="/suplementos" element={<Suplementos />} />
          <Route path="/aplicativos" element={<Aplicativos />} />
          <Route path="/ebooks" element={<Ebooks />} />
          <Route path="/incentivos" element={<Incentivos />} />
          <Route path="/plano-alimentar-orientacoes" element={<PlanoAlimentarOrientacoes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
