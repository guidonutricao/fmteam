import React from 'react';
import MembersLayout from '@/components/layout/MembersLayout';
import BackButton from '@/components/layout/BackButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Trophy, CheckCircle, Star, Target, Calendar,
  Award, Medal, Flame, BatteryCharging, ArrowUp
} from 'lucide-react';

// Simulação de dados do programa de incentivo
const conquistas = [
  {
    id: 1,
    nome: "Iniciante Dedicado",
    descricao: "Completou 5 check-ins consecutivos",
    icone: <CheckCircle className="h-8 w-8 text-emerald-500" />,
    progresso: 100,
    desbloqueado: true,
    data: "12/03/2025"
  },
  {
    id: 2,
    nome: "Mestre dos Registros",
    descricao: "Registrou todas as refeições por 30 dias",
    icone: <Calendar className="h-8 w-8 text-indigo-500" />,
    progresso: 70,
    desbloqueado: false,
    data: null
  },
  {
    id: 3,
    nome: "Atleta Consistente",
    descricao: "Completou todos os treinos por 4 semanas",
    icone: <Medal className="h-8 w-8 text-amber-500" />,
    progresso: 50,
    desbloqueado: false,
    data: null
  },
  {
    id: 4,
    nome: "Especialista em Nutrição",
    descricao: "Participou de 3 mentorias em grupo",
    icone: <Star className="h-8 w-8 text-blue-500" />,
    progresso: 66,
    desbloqueado: false,
    data: null
  },
  {
    id: 5,
    nome: "Meta Atingida",
    descricao: "Alcançou sua primeira meta de composição corporal",
    icone: <Target className="h-8 w-8 text-rose-500" />,
    progresso: 90,
    desbloqueado: false,
    data: null
  }
];

const desafios = [
  {
    id: 1,
    nome: "7 Dias de Hidratação",
    descricao: "Beba pelo menos 2L de água por dia durante uma semana",
    icone: <BatteryCharging className="h-6 w-6 text-cyan-500" />,
    duracao: "7 dias",
    recompensa: "Medalha Azul + 50 pontos",
    ativo: true,
    progresso: 5,
    total: 7
  },
  {
    id: 2,
    nome: "Chega de Açúcar!",
    descricao: "Fique 15 dias sem consumir açúcar refinado",
    icone: <Flame className="h-6 w-6 text-red-500" />,
    duracao: "15 dias",
    recompensa: "Medalha Dourada + 100 pontos",
    ativo: true,
    progresso: 8,
    total: 15
  },
  {
    id: 3,
    nome: "Maratonista da Saúde",
    descricao: "Complete 30 dias com 100% de adesão ao plano alimentar",
    icone: <ArrowUp className="h-6 w-6 text-green-500" />,
    duracao: "30 dias",
    recompensa: "Medalha Platina + 200 pontos",
    ativo: false,
    progresso: 0,
    total: 30
  }
];

const Incentivos = () => {
  return (
    <MembersLayout>
      <div className="space-y-6">
        <BackButton to="/dashboard" />
        
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-primary">Programa de Incentivo</h1>
          <p className="text-muted-foreground mt-1">
            Acompanhe seu progresso, conquistas e participe de desafios especiais.
          </p>
        </header>
        
        {/* Visão Geral */}
        <Card className="bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
              <div className="flex items-center gap-3 mb-4 sm:mb-0">
                <div className="p-3 bg-white/20 rounded-full">
                  <Trophy className="h-10 w-10 text-yellow-300" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">375 Pontos</h2>
                  <p className="text-primary-foreground/80">Nível Prata</p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-sm mb-1">Próximo Nível: <span className="font-medium">Ouro (500 pts)</span></div>
                <Progress value={75} className="h-2 w-40 bg-white/30" />
                <div className="text-xs mt-1">125 pontos para o próximo nível</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/10 p-2 rounded">
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs">Conquistas</div>
              </div>
              <div className="bg-white/10 p-2 rounded">
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs">Desafios Ativos</div>
              </div>
              <div className="bg-white/10 p-2 rounded">
                <div className="text-2xl font-bold">5</div>
                <div className="text-xs">Semanas Seguidas</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Mensagem Motivacional */}
        <div className="bg-muted p-4 rounded-lg border border-border">
          <p className="text-center italic">
            "Sua consistência está criando resultados! Continue com o bom trabalho e conquiste todas as suas metas."
          </p>
        </div>
        
        {/* Conquistas */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Conquistas
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {conquistas.map((conquista) => (
              <Card 
                key={conquista.id} 
                className={`overflow-hidden transition-all ${!conquista.desbloqueado && 'opacity-70'}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${conquista.desbloqueado ? 'bg-primary/10' : 'bg-muted'}`}>
                      {conquista.icone}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{conquista.nome}</h3>
                        {conquista.desbloqueado && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Conquistado
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {conquista.descricao}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="w-full max-w-64">
                          <Progress 
                            value={conquista.progresso} 
                            className="h-2" 
                          />
                          <div className="flex justify-between mt-1 text-xs">
                            <span>{conquista.progresso}%</span>
                            {conquista.data && <span>Concluído em {conquista.data}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Desafios Ativos */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            Desafios Ativos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {desafios
              .filter(d => d.ativo)
              .map((desafio) => (
                <Card key={desafio.id} className="overflow-hidden border-primary/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {desafio.icone}
                        <CardTitle className="text-base">{desafio.nome}</CardTitle>
                      </div>
                      <Badge variant="outline">{desafio.duracao}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-sm text-muted-foreground mb-3">
                      {desafio.descricao}
                    </p>
                    <div className="text-xs text-muted-foreground mb-2">
                      Recompensa: <span className="font-medium text-foreground">{desafio.recompensa}</span>
                    </div>
                    <Progress 
                      value={(desafio.progresso / desafio.total) * 100} 
                      className="h-2 mb-1" 
                    />
                    <div className="flex justify-between text-xs">
                      <span>Progresso: {desafio.progresso}/{desafio.total}</span>
                      <span>{Math.floor((desafio.progresso / desafio.total) * 100)}%</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
          
          {desafios.filter(d => !d.ativo).length > 0 && (
            <div className="mt-4">
              <h3 className="text-base font-medium mb-2">Próximos Desafios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {desafios
                  .filter(d => !d.ativo)
                  .map((desafio) => (
                    <Card key={desafio.id} className="overflow-hidden bg-muted/50">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          {desafio.icone}
                          <div>
                            <h4 className="font-medium text-sm">{desafio.nome}</h4>
                            <p className="text-xs text-muted-foreground">
                              {desafio.descricao}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </MembersLayout>
  );
};

export default Incentivos; 