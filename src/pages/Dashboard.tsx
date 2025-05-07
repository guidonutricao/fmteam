
import React from 'react';
import MembersLayout from '@/components/layout/MembersLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Book, Calendar, Dumbbell, FileText, Gift, 
  ListCheck, Star, Users, Utensils, Video 
} from 'lucide-react';

const Dashboard = () => {
  return (
    <MembersLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl md:text-3xl">Bem-vindo(a) à sua jornada nutricional</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-primary-foreground/90 mb-4">
              Esta é sua área exclusiva de membros onde você encontrará todo o conteúdo do seu acompanhamento.
              Assista o vídeo abaixo para saber como aproveitar ao máximo.
            </p>
            <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center">
              <Video size={48} className="text-white/70" />
            </div>
          </CardContent>
        </Card>

        {/* Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Último check-in</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">25/04/2025</div>
              <p className="text-muted-foreground text-sm">Seu próximo check-in é em 4 dias</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Progresso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Meta de peso</span>
                  <span className="font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div className="space-y-2 mt-3">
                <div className="flex justify-between text-sm">
                  <span>Meta de medidas</span>
                  <span className="font-medium">42%</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Próxima mentoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">12/05/2025</div>
              <p className="text-muted-foreground text-sm">19h30 - Tema: Nutrição e Recuperação</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Navigation Cards */}
        <h2 className="text-xl font-bold mt-8 mb-4">Conteúdo do seu acompanhamento</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard
            title="Plano Alimentar"
            description="Acesse seu plano alimentar personalizado e anotações do seu nutricionista."
            icon={<Utensils size={24} />}
            to="/plano-alimentar"
            variant="primary"
          />
          <DashboardCard
            title="Orientações de Treino"
            description="Dicas e orientações sobre treinos complementares."
            icon={<Dumbbell size={24} />}
            to="/treino"
          />
          <DashboardCard
            title="Check-in"
            description="Realize seu check-in semanal e acompanhe seu progresso."
            icon={<ListCheck size={24} />}
            to="/check-in"
            variant="secondary"
          />
          <DashboardCard
            title="Substituições"
            description="Lista completa para substituição de alimentos do seu plano."
            icon={<FileText size={24} />}
            to="/substituicoes"
          />
          <DashboardCard
            title="Mentorias em Grupo"
            description="Participe de mentorias em grupo com nossa psicóloga especializada."
            icon={<Users size={24} />}
            to="/mentorias"
          />
          <DashboardCard
            title="Suplementos"
            description="Suplementos recomendados com melhor custo-benefício."
            icon={<Star size={24} />}
            to="/suplementos"
          />
          <DashboardCard
            title="Aplicativos"
            description="Links para os aplicativos utilizados no acompanhamento."
            icon={<Calendar size={24} />}
            to="/aplicativos"
          />
          <DashboardCard
            title="E-books e Materiais"
            description="Acesse materiais educativos e e-books exclusivos."
            icon={<Book size={24} />}
            to="/ebooks"
          />
          <DashboardCard
            title="Programa de Incentivo"
            description="Ganhe recompensas por cumprir suas metas e desafios."
            icon={<Gift size={24} />}
            to="/incentivos"
            variant="primary"
          />
        </div>
      </div>
    </MembersLayout>
  );
};

export default Dashboard;
