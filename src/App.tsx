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
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import Register from './pages/Register';

// Importação dos ícones lucide que estavam faltando
import { Bell, Settings } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/plano-alimentar" element={
              <ProtectedRoute>
                <PlanoAlimentar />
              </ProtectedRoute>
            } />
            <Route path="/check-in" element={
              <ProtectedRoute>
                <CheckIn />
              </ProtectedRoute>
            } />
            <Route path="/treino" element={
              <ProtectedRoute>
                <Treino />
              </ProtectedRoute>
            } />
            <Route path="/substituicoes" element={
              <ProtectedRoute>
                <Substituicoes />
              </ProtectedRoute>
            } />
            <Route path="/mentorias" element={
              <ProtectedRoute>
                <Mentorias />
              </ProtectedRoute>
            } />
            <Route path="/suplementos" element={
              <ProtectedRoute>
                <Suplementos />
              </ProtectedRoute>
            } />
            <Route path="/aplicativos" element={
              <ProtectedRoute>
                <Aplicativos />
              </ProtectedRoute>
            } />
            <Route path="/ebooks" element={
              <ProtectedRoute>
                <Ebooks />
              </ProtectedRoute>
            } />
            <Route path="/incentivos" element={
              <ProtectedRoute>
                <Incentivos />
              </ProtectedRoute>
            } />
            <Route path="/plano-alimentar-orientacoes" element={
              <ProtectedRoute>
                <PlanoAlimentarOrientacoes />
              </ProtectedRoute>
            } />
            
            {/* Rotas de Administração - Apenas para Nutricionistas/Admin */}
            <Route path="/admin/users" element={
              <ProtectedRoute requiredProfile="admin">
                <h1>Gerenciar Usuários - Apenas Admin</h1>
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute requiredProfile="admin">
                <h1>Configurações - Apenas Admin</h1>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
