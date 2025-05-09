import React from 'react';
import MembersLayout from '@/components/layout/MembersLayout';
import { Card, CardContent } from '@/components/ui/card';
import BackButton from '@/components/layout/BackButton';
import CollapsibleBox from '@/components/ui/CollapsibleBox';
import { 
  Utensils, CheckCircle, HelpCircle, 
  Calendar, Clock, BarChart, PlusCircle,
  ShoppingCart, ListChecks
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const PlanoAlimentarOrientacoes = () => {
  return (
    <MembersLayout>
      <div className="space-y-6">
        <BackButton to="/plano-alimentar" />
        
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-primary">Plano – Como usar o Webdiet</h1>
          <p className="text-muted-foreground mt-1">
            Aprenda a utilizar o aplicativo Webdiet para acompanhar seu plano alimentar.
          </p>
        </header>
        
        {/* Acesso rápido ao app */}
        <section className="mb-8">
          <Card className="bg-muted border-primary/20">
            <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Utensils className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-medium mb-1">Seu plano alimentar está no Webdiet</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Acesse o aplicativo para visualizar seu plano completo, marcar refeições e monitorar seu progresso.
                </p>
                <Button 
                  className="w-full sm:w-auto"
                  onClick={() => window.open('https://app.webdiet.com.br', '_blank')}
                >
                  Acessar o Webdiet
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tutorial em vídeo */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Tutorial em Vídeo</h2>
          <Card className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/placeholder"
                title="Tutorial Webdiet"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">Primeiros passos com o Webdiet</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Este vídeo explica como navegar no aplicativo, visualizar seu plano alimentar e registrar suas refeições.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Guia de Uso */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Guia de Uso do Webdiet</h2>

          <CollapsibleBox 
            title="Primeiros Passos" 
            icon={<PlusCircle size={18} />}
            defaultOpen={true}
          >
            <div className="space-y-3">
              <p>Para começar a usar o Webdiet, siga estas etapas:</p>
              <ol className="list-decimal pl-4 space-y-2">
                <li>Acesse <a href="https://app.webdiet.com.br" className="text-primary underline">app.webdiet.com.br</a> ou baixe o aplicativo na loja de apps.</li>
                <li>Faça login usando o e-mail e senha que você recebeu por e-mail.</li>
                <li>Na primeira vez, complete seu perfil com informações básicas.</li>
                <li>Seu plano alimentar já estará disponível na tela inicial.</li>
              </ol>
            </div>
          </CollapsibleBox>

          <CollapsibleBox 
            title="Visualizando seu Plano" 
            icon={<Utensils size={18} />}
          >
            <div className="space-y-3">
              <p>Para acessar seu plano alimentar completo:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Na tela inicial, toque em "Meu Plano" ou no ícone de prato.</li>
                <li>Visualize todas as suas refeições diárias organizadas por horário.</li>
                <li>Toque em cada refeição para ver detalhes dos alimentos e porções.</li>
                <li>Você pode alternar entre diferentes planos se tiver mais de um (dia de treino/descanso).</li>
              </ul>
            </div>
          </CollapsibleBox>

          <CollapsibleBox 
            title="Registrando Refeições" 
            icon={<CheckCircle size={18} />}
          >
            <div className="space-y-3">
              <p>Para marcar suas refeições como realizadas:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Acesse a refeição que você acabou de consumir.</li>
                <li>Toque no botão "Marcar como realizada" ou no ícone de check.</li>
                <li>Se necessário, ajuste as quantidades realmente consumidas.</li>
                <li>Opcionalmente, adicione uma foto da sua refeição para acompanhamento.</li>
                <li>Confirme para salvar o registro no sistema.</li>
              </ul>
            </div>
          </CollapsibleBox>

          <CollapsibleBox 
            title="Acompanhando seu Progresso" 
            icon={<BarChart size={18} />}
          >
            <div className="space-y-3">
              <p>Para visualizar métricas e estatísticas:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Acesse a seção "Relatórios" ou "Estatísticas".</li>
                <li>Visualize gráficos de adesão ao plano ao longo do tempo.</li>
                <li>Acompanhe distribuição de macronutrientes (proteínas, carboidratos, gorduras).</li>
                <li>Veja o histórico de refeições com fotos e análises.</li>
              </ul>
            </div>
          </CollapsibleBox>

          <CollapsibleBox 
            title="Lista de Compras" 
            icon={<ShoppingCart size={18} />}
          >
            <div className="space-y-3">
              <p>Para gerar uma lista de compras baseada no seu plano:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Acesse a seção "Lista de Compras" no menu principal.</li>
                <li>Selecione o período desejado (1 dia, 3 dias, 1 semana).</li>
                <li>O aplicativo calculará as quantidades necessárias de cada item.</li>
                <li>Você pode marcar itens conforme os compra e adicionar itens extras.</li>
              </ul>
            </div>
          </CollapsibleBox>

          <CollapsibleBox 
            title="Perguntas Frequentes" 
            icon={<HelpCircle size={18} />}
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Posso substituir alimentos no aplicativo?</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Sim, você pode usar a função "Substituir" ao lado de cada alimento para escolher opções equivalentes aprovadas pelo seu nutricionista.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Como reportar uma refeição que não realizei?</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Acesse a refeição e selecione "Marcar como não realizada". Se possível, adicione o motivo para feedback ao nutricionista.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Como sincronizar dados entre dispositivos?</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  A sincronização acontece automaticamente quando você tem conexão à internet. Basta fazer login com a mesma conta em todos os dispositivos.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Posso usar o app sem internet?</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Sim, o Webdiet funciona offline. Os dados serão sincronizados quando você reconectar à internet.
                </p>
              </div>
            </div>
          </CollapsibleBox>
        </section>
      </div>
    </MembersLayout>
  );
};

export default PlanoAlimentarOrientacoes; 