import React, { useState } from 'react';
import MembersLayout from '@/components/layout/MembersLayout';
import BackButton from '@/components/layout/BackButton';
import { 
  Calendar, Clock, Users, Video, Play, 
  Download, ExternalLink, Search, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isBefore, isAfter, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Simulação de dados de mentorias
const mentoriasData = [
  {
    id: 1,
    titulo: "Comer Emocional - Como Identificar e Superar",
    data: new Date(2025, 4, 10), // 10/05/2025
    horario: "19:00",
    duracao: "60 min",
    mentor: "Dra. Ana Silva",
    descricao: "Nesta mentoria, vamos abordar os gatilhos emocionais que levam à alimentação compulsiva e estratégias práticas para superá-los.",
    link: "https://zoom.us/j/1234567890",
    status: "agendada"
  },
  {
    id: 2,
    titulo: "Nutrição e Treino: Otimizando Resultados",
    data: new Date(2025, 4, 17), // 17/05/2025
    horario: "20:00",
    duracao: "60 min",
    mentor: "Dr. Carlos Mendes",
    descricao: "Aprenda a sincronizar sua alimentação com seus treinos para maximizar ganhos e recuperação muscular.",
    link: "https://zoom.us/j/0987654321",
    status: "agendada"
  },
  {
    id: 3,
    titulo: "Alimentação Intuitiva e Mindfulness",
    data: new Date(2025, 4, 24), // 24/05/2025
    horario: "19:30",
    duracao: "60 min",
    mentor: "Dra. Mariana Costa",
    descricao: "Aprenda a reconhecer sinais de fome e saciedade e desenvolva uma relação mais saudável com a comida.",
    link: "https://zoom.us/j/5678901234",
    status: "agendada"
  },
  {
    id: 4,
    titulo: "Nutrição e Sono - Impactos na Saúde",
    data: new Date(2025, 3, 26), // 26/04/2025 (passado)
    horario: "19:00",
    duracao: "60 min",
    mentor: "Dr. Ricardo Oliveira",
    descricao: "Como a qualidade do sono afeta sua nutrição e vice-versa. Estratégias para melhorar ambos.",
    link: "",
    video: "https://vimeo.com/123456789",
    status: "realizada"
  },
  {
    id: 5,
    titulo: "Mitos e Verdades sobre Suplementação",
    data: new Date(2025, 3, 12), // 12/04/2025 (passado)
    horario: "20:00",
    duracao: "60 min",
    mentor: "Dra. Fernanda Lima",
    descricao: "Descubra o que realmente funciona no mundo da suplementação e o que é apenas marketing.",
    link: "",
    video: "https://vimeo.com/987654321",
    status: "realizada"
  }
];

const formatarData = (date: Date) => {
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

const Mentorias = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMentorias = mentoriasData.filter(mentoria =>
    mentoria.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentoria.mentor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentoria.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const proximasMentorias = filteredMentorias.filter(
    mentoria => isAfter(mentoria.data, new Date()) || isSameDay(mentoria.data, new Date())
  ).sort((a, b) => a.data.getTime() - b.data.getTime());
  
  const mentoriasPassadas = filteredMentorias.filter(
    mentoria => isBefore(mentoria.data, new Date()) && !isSameDay(mentoria.data, new Date())
  ).sort((a, b) => b.data.getTime() - a.data.getTime());

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const diasDoMes = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const dentroDoMes = (data: Date) => {
    const inicio = startOfMonth(currentDate);
    const fim = endOfMonth(currentDate);
    return (isAfter(data, inicio) || isSameDay(data, inicio)) && 
           (isBefore(data, fim) || isSameDay(data, fim));
  };

  const mentoriasDoMes = mentoriasData.filter(mentoria => dentroDoMes(mentoria.data));

  return (
    <MembersLayout>
      <div className="space-y-6">
        <BackButton to="/dashboard" />
        
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-primary">Mentorias em Grupo</h1>
          <p className="text-muted-foreground mt-1">
            Participe de mentorias em grupo online e acesse replays de sessões anteriores.
          </p>
        </header>

        {/* Barra de Pesquisa */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Pesquisar mentorias..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Abas */}
        <Tabs defaultValue="agenda">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
            <TabsTrigger value="proximas">Próximas</TabsTrigger>
            <TabsTrigger value="replays">Replays</TabsTrigger>
          </TabsList>

          {/* Visualização de Agenda */}
          <TabsContent value="agenda" className="space-y-6">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <Button variant="ghost" size="sm" onClick={prevMonth}>
                    <ChevronLeft size={18} />
                  </Button>
                  <h2 className="text-lg font-semibold">
                    {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                  </h2>
                  <Button variant="ghost" size="sm" onClick={nextMonth}>
                    <ChevronRight size={18} />
                  </Button>
                </div>

                <div className="space-y-4">
                  {mentoriasDoMes.length > 0 ? (
                    mentoriasDoMes.map(mentoria => (
                      <MentoriaCard key={mentoria.id} mentoria={mentoria} />
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      Nenhuma mentoria agendada para este mês
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Próximas Mentorias */}
          <TabsContent value="proximas" className="space-y-4">
            {proximasMentorias.length > 0 ? (
              proximasMentorias.map(mentoria => (
                <MentoriaCard key={mentoria.id} mentoria={mentoria} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma mentoria agendada no momento
              </div>
            )}
          </TabsContent>

          {/* Replays */}
          <TabsContent value="replays" className="space-y-4">
            {mentoriasPassadas.length > 0 ? (
              mentoriasPassadas.map(mentoria => (
                <MentoriaCard key={mentoria.id} mentoria={mentoria} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum replay disponível
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MembersLayout>
  );
};

interface MentoriaCardProps {
  mentoria: typeof mentoriasData[0];
}

const MentoriaCard: React.FC<MentoriaCardProps> = ({ mentoria }) => {
  const isUpcoming = isAfter(mentoria.data, new Date()) || isSameDay(mentoria.data, new Date());
  const isLive = isSameDay(mentoria.data, new Date());
  
  const hoje = new Date();
  const dataPassada = isBefore(mentoria.data, hoje) && !isSameDay(mentoria.data, hoje);
  
  return (
    <Card className={`border overflow-hidden ${isLive ? 'border-primary' : ''}`}>
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Data/Status */}
          <div className="bg-muted p-4 sm:p-6 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3 sm:min-w-32 border-b sm:border-b-0 sm:border-r border-border">
            <div className="flex flex-col items-center text-center">
              <span className="text-sm text-muted-foreground">
                {format(mentoria.data, 'dd', { locale: ptBR })}
              </span>
              <span className="text-lg font-bold">
                {format(mentoria.data, 'MMM', { locale: ptBR })}
              </span>
              <span className="text-sm text-muted-foreground">
                {format(mentoria.data, 'yyyy', { locale: ptBR })}
              </span>
            </div>
            
            {isLive ? (
              <Badge variant="default" className="bg-red-500 hover:bg-red-600 animate-pulse">
                Ao vivo agora
              </Badge>
            ) : dataPassada ? (
              <Badge variant="outline" className="bg-muted">
                Concluída
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {mentoria.horario}
              </Badge>
            )}
          </div>
          
          {/* Conteúdo */}
          <div className="p-4 flex-1">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold text-lg">{mentoria.titulo}</h3>
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{mentoria.horario} • {mentoria.duracao}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>{mentoria.mentor}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {mentoria.descricao}
            </p>
            
            {/* Ações */}
            <div className="mt-auto">
              {isUpcoming ? (
                <Button 
                  className="w-full sm:w-auto"
                  variant={isLive ? "default" : "outline"}
                  onClick={() => window.open(mentoria.link, '_blank')}
                  disabled={!mentoria.link}
                >
                  {isLive ? (
                    <>
                      <Play size={16} className="mr-1" /> Entrar ao vivo
                    </>
                  ) : (
                    <>
                      <Calendar size={16} className="mr-1" /> Agendar
                    </>
                  )}
                </Button>
              ) : (
                <Button 
                  className="w-full sm:w-auto"
                  variant="outline"
                  onClick={() => window.open(mentoria.video, '_blank')}
                  disabled={!mentoria.video}
                >
                  <Video size={16} className="mr-1" /> Assistir replay
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Mentorias; 