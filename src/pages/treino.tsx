import React, { useState } from 'react';
import MembersLayout from '@/components/layout/MembersLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackButton from '@/components/layout/BackButton';
import CollapsibleBox from '@/components/ui/CollapsibleBox';
import { 
  Dumbbell, PlusCircle, MinusCircle, Play, Calendar, InfoIcon,
  CheckCircle, HelpCircle, BarChart
} from 'lucide-react';

const Treino = () => {
  return (
    <MembersLayout>
      <div className="space-y-6">
        <BackButton to="/dashboard" />
        
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-primary">Treinos – Como usar o MFit Personal</h1>
          <p className="text-muted-foreground mt-1">
            Aprenda a utilizar o aplicativo MFit Personal para acompanhar seus treinos.
          </p>
        </header>

        {/* Vídeo Tutorial */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Tutorial em Vídeo</h2>
          <Card className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/placeholder"
                title="Tutorial MFit Personal"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">Primeiros passos com o MFit Personal</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Este vídeo explica como configurar seu perfil, acessar seus treinos e registrar seu progresso no aplicativo MFit Personal.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Instruções Colapsáveis */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Orientações de Uso</h2>

          <CollapsibleBox 
            title="Configuração Inicial" 
            icon={<PlusCircle size={18} />}
            defaultOpen={true}
          >
            <div className="space-y-3">
              <p>Para começar a usar o MFit Personal, siga estes passos:</p>
              <ol className="list-decimal pl-4 space-y-2">
                <li>Baixe o aplicativo na App Store ou Google Play.</li>
                <li>Crie uma conta usando seu e-mail ou perfil do Google.</li>
                <li>Complete seu perfil com peso, altura e objetivos.</li>
                <li>Insira o código fornecido pelo seu nutricionista para acessar seu plano personalizado.</li>
              </ol>
            </div>
          </CollapsibleBox>

          <CollapsibleBox 
            title="Acompanhamento de Treinos" 
            icon={<Dumbbell size={18} />}
          >
            <div className="space-y-3">
              <p>O aplicativo facilita o registro e acompanhamento dos seus treinos:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Acesse a aba "Treinos" para visualizar seu programa personalizado.</li>
                <li>Cada exercício incluirá séries, repetições e carga recomendada.</li>
                <li>Marque os exercícios como concluídos conforme avança no treino.</li>
                <li>Registre a carga utilizada para acompanhar sua progressão.</li>
              </ul>
            </div>
          </CollapsibleBox>

          <CollapsibleBox 
            title="Registro de Progresso" 
            icon={<BarChart size={18} />}
          >
            <div className="space-y-3">
              <p>Acompanhe seu progresso ao longo do tempo:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Na seção "Estatísticas", visualize gráficos de evolução.</li>
                <li>Compare seu desempenho entre semanas diferentes.</li>
                <li>Acompanhe métricas como peso levantado, tempo de treino e frequência.</li>
                <li>Tire fotos para comparação visual da evolução.</li>
              </ul>
            </div>
          </CollapsibleBox>

          <CollapsibleBox 
            title="Dias de Descanso" 
            icon={<Calendar size={18} />}
          >
            <div className="space-y-3">
              <p>Os dias de descanso são tão importantes quanto os dias de treino:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Respeite os dias de descanso programados no seu plano.</li>
                <li>Use o app para registrar atividades leves nos dias de recuperação.</li>
                <li>Monitore sua recuperação através dos indicadores de desempenho.</li>
                <li>Não pule os dias de descanso - eles são essenciais para a hipertrofia.</li>
              </ul>
            </div>
          </CollapsibleBox>

          <CollapsibleBox 
            title="Dúvidas Frequentes" 
            icon={<HelpCircle size={18} />}
          >
            <div className="space-y-3">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Não consigo sincronizar meus treinos. O que fazer?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Verifique sua conexão com a internet. Se o problema persistir, tente deslogar e logar novamente no aplicativo.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Como adaptar um exercício se não tiver o equipamento?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    O app oferece alternativas para cada exercício. Clique no ícone "i" ao lado do exercício para ver opções.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Posso alterar meu treino no aplicativo?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Não é recomendado alterar seu treino sem consultar seu nutricionista. Entre em contato para ajustes.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleBox>
        </section>
      </div>
    </MembersLayout>
  );
};

export default Treino; 