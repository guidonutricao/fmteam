import React from 'react';
import MembersLayout from '@/components/layout/MembersLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BackButton from '@/components/layout/BackButton';
import { 
  Utensils, Dumbbell, CalendarCheck, ListChecks,
  Clock, BookOpen, ExternalLink, Star
} from 'lucide-react';

// Dados dos aplicativos recomendados
const aplicativosPrincipais = [
  {
    id: 1,
    nome: "Webdiet",
    descricao: "Acompanhamento do seu plano alimentar personalizado, controle de refeições e registros diários.",
    icon: <Utensils className="w-12 h-12 text-blue-500" />,
    categoria: "Nutrição",
    link: "https://app.webdiet.com.br/",
    tutorialLink: "/plano-alimentar-orientacoes",
    destaque: true,
    cor: "bg-blue-50 border-blue-200"
  },
  {
    id: 2,
    nome: "MFit Personal",
    descricao: "Acompanhamento do seu plano de treino, progressão de cargas e registro de exercícios.",
    icon: <Dumbbell className="w-12 h-12 text-orange-500" />,
    categoria: "Treino",
    link: "https://www.mfitapp.com.br/",
    tutorialLink: "/treino",
    destaque: true,
    cor: "bg-orange-50 border-orange-200"
  }
];

const aplicativosSecundarios = [
  {
    id: 3,
    nome: "Notion",
    descricao: "Organização de rotinas, anotações, planejamento de refeições e listas de compras.",
    icon: <BookOpen className="w-10 h-10 text-gray-800" />,
    categoria: "Organização",
    link: "https://www.notion.so/",
    cor: "bg-gray-50 border-gray-200"
  },
  {
    id: 4,
    nome: "Fabulous",
    descricao: "Desenvolvedor de hábitos saudáveis com lembretes, rotinas personalizadas e acompanhamento.",
    icon: <ListChecks className="w-10 h-10 text-purple-500" />,
    categoria: "Hábitos",
    link: "https://www.thefabulous.co/",
    cor: "bg-purple-50 border-purple-200"
  },
  {
    id: 5,
    nome: "Sleep Cycle",
    descricao: "Monitoramento do sono, análise de ciclos e alarme inteligente para despertar no melhor momento.",
    icon: <Clock className="w-10 h-10 text-indigo-500" />,
    categoria: "Sono",
    link: "https://www.sleepcycle.com/",
    cor: "bg-indigo-50 border-indigo-200"
  },
  {
    id: 6,
    nome: "Everyday",
    descricao: "Rastreador de hábitos diários com visualizações de progresso e estatísticas detalhadas.",
    icon: <CalendarCheck className="w-10 h-10 text-green-500" />,
    categoria: "Hábitos",
    link: "https://everyday.app/",
    cor: "bg-green-50 border-green-200"
  }
];

const Aplicativos = () => {
  return (
    <MembersLayout>
      <div className="space-y-6">
        <BackButton to="/dashboard" />
        
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-primary">Aplicativos Recomendados</h1>
          <p className="text-muted-foreground mt-1">
            Ferramentas essenciais para o seu acompanhamento nutricional e de treino.
          </p>
        </header>

        {/* Aplicativos Principais */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Aplicativos Essenciais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aplicativosPrincipais.map(app => (
              <Card 
                key={app.id} 
                className={`overflow-hidden hover:shadow-md transition-shadow ${app.cor}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {app.icon}
                      <div>
                        <CardTitle className="text-lg">{app.nome}</CardTitle>
                        <Badge className="mt-1">{app.categoria}</Badge>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className="text-yellow-400 fill-yellow-400" 
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{app.descricao}</p>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    className="w-full sm:w-auto" 
                    onClick={() => window.open(app.link, '_blank')}
                  >
                    Acessar App <ExternalLink size={14} className="ml-1" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto"
                    onClick={() => window.location.href = app.tutorialLink}
                  >
                    Ver Tutorial
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Aplicativos Secundários */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Aplicativos Complementares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aplicativosSecundarios.map(app => (
              <Card 
                key={app.id} 
                className={`overflow-hidden hover:shadow-md transition-shadow ${app.cor}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    {app.icon}
                    <div>
                      <CardTitle className="text-base">{app.nome}</CardTitle>
                      <Badge variant="outline" className="mt-1">{app.categoria}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm">{app.descricao}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open(app.link, '_blank')}
                  >
                    Conhecer App <ExternalLink size={14} className="ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </MembersLayout>
  );
};

export default Aplicativos; 