import React, { useState } from 'react';
import MembersLayout from '@/components/layout/MembersLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CollapsibleBox from '@/components/ui/CollapsibleBox';
import { 
  Book, Calendar, ChevronRight, Dumbbell, FileText, Gift, 
  ListCheck, Star, Users, Utensils, Video, MessageSquare
} from 'lucide-react';
import { usePermissions } from '@/hooks/use-permissions';
import EditableContent from '@/components/admin/EditableContent';
import EditableButton from '@/components/admin/EditableButton';
import AdvancedMediaUploader from '@/components/admin/AdvancedMediaUploader';

type MediaItem = {
  url: string;
  type: 'video' | 'image' | 'pdf' | 'doc' | 'unknown';
  title?: string;
};

const Dashboard = () => {
  const { isAdmin } = usePermissions();
  
  // Estado para conteúdo editável
  const [welcomeTitle, setWelcomeTitle] = useState('Bem-vindo à Área de Membros!');
  const [welcomeMessage, setWelcomeMessage] = useState(
    'Aqui você encontrará todas as informações sobre seu plano alimentar, treinos, mentorias e muito mais.'
  );
  
  // Estado para botões editáveis
  const [nutritionistButton, setNutritionistButton] = useState({
    text: 'Falar com Nutricionista',
    url: 'https://wa.me/5511999999999'
  });
  
  const [financialButton, setFinancialButton] = useState({
    text: 'Financeiro',
    url: 'https://wa.me/5511888888888'
  });
  
  // Estado para mídia
  const [welcomeVideo, setWelcomeVideo] = useState<MediaItem>({
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'video',
    title: 'Vídeo de Boas-vindas'
  });
  
  // Callbacks para atualizar conteúdo
  const handleVideoUpload = (url: string, type: 'video' | 'image' | 'pdf' | 'doc' | 'unknown', title?: string) => {
    setWelcomeVideo({ url, type, title });
  };
  
  const handleNutritionistButtonSave = (text: string, url: string) => {
    setNutritionistButton({ text, url });
  };
  
  const handleFinancialButtonSave = (text: string, url: string) => {
    setFinancialButton({ text, url });
  };

  return (
    <MembersLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-2">
          <EditableContent
            content={welcomeTitle}
            onSave={setWelcomeTitle}
            type="title"
            className="text-3xl font-bold tracking-tight"
          />
          <EditableContent
            content={welcomeMessage}
            onSave={setWelcomeMessage}
            className="text-muted-foreground"
          />
        </div>

        {/* Welcome Video */}
        <Card>
          <CardHeader>
            <CardTitle>Vídeo de Boas-vindas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Vídeo Incorporado */}
            {welcomeVideo.url && (
              <div className="aspect-video w-full bg-muted rounded-md overflow-hidden">
                {welcomeVideo.type === 'video' && welcomeVideo.url.includes('youtube.com') ? (
                  <iframe 
                    src={`https://www.youtube.com/embed/${new URL(welcomeVideo.url).searchParams.get('v')}`}
                    className="w-full h-full"
                    allowFullScreen
                    frameBorder="0"
                    title={welcomeVideo.title || "Vídeo de boas-vindas"}
                  />
                ) : welcomeVideo.type === 'video' ? (
                  <video 
                    src={welcomeVideo.url} 
                    controls 
                    className="w-full h-full" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Nenhum vídeo disponível</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Uploader de mídia (visível apenas para admin) */}
            {isAdmin && (
              <AdvancedMediaUploader
                acceptedTypes={['video']}
                onUpload={handleVideoUpload}
                currentUrl={welcomeVideo.url}
                currentTitle={welcomeVideo.title}
              />
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <EditableButton
                text={nutritionistButton.text}
                url={nutritionistButton.url}
                onSave={handleNutritionistButtonSave}
                icon={<MessageSquare size={16} />}
                className="flex-1"
              />
              
              <EditableButton
                text={financialButton.text}
                url={financialButton.url}
                onSave={handleFinancialButtonSave}
                variant="outline"
                className="flex-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </MembersLayout>
  );
};

interface QuickAccessCardProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  color: string;
}

const QuickAccessCard = ({ icon, label, to, color }: QuickAccessCardProps) => (
  <a 
    href={to} 
    className="flex flex-col items-center justify-center p-4 rounded-xl border bg-card shadow-sm hover:shadow-md transition-all text-center"
  >
    <div className={`rounded-full p-3 mb-2 ${color}`}>
      {icon}
    </div>
    <span className="text-sm font-medium line-clamp-2">{label}</span>
  </a>
);

export default Dashboard;
