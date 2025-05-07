
import React from 'react';
import MembersLayout from '@/components/layout/MembersLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FileText, MessageCircle, Utensils } from 'lucide-react';

const PlanoAlimentar = () => {
  return (
    <MembersLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Plano Alimentar</h1>
          <Button>
            <Download size={18} className="mr-2" /> Baixar Plano
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils size={20} />
              Como seguir seu plano alimentar
            </CardTitle>
            <CardDescription>
              Orientações importantes sobre como implementar seu plano alimentar personalizado
            </CardDescription>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              Seu plano alimentar foi desenvolvido considerando seus objetivos, preferências alimentares, 
              rotina e necessidades nutricionais específicas. Para aproveitar ao máximo os resultados:
            </p>
            
            <ul>
              <li>Procure seguir os horários sugeridos para as refeições</li>
              <li>Mantenha-se hidratado(a) durante todo o dia</li>
              <li>Utilize a lista de substituições quando necessário</li>
              <li>Reporte no check-in semanal qualquer dificuldade encontrada</li>
              <li>Não pule refeições, mesmo nos dias mais corridos</li>
            </ul>
            
            <p>
              Lembre-se que adaptações são normais no início. O importante é manter a consistência
              e comunicar qualquer desafio para ajustes no próximo check-in.
            </p>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="atual">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="atual">Plano Atual</TabsTrigger>
            <TabsTrigger value="anteriores">Planos Anteriores</TabsTrigger>
          </TabsList>
          
          <TabsContent value="atual" className="space-y-4">
            <Card>
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="text-lg text-primary">Plano - Atualizado em 27/04/2025</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 divide-y">
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Café da manhã (7h - 8h)</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• 2 ovos mexidos</li>
                      <li>• 1 fatia de pão integral</li>
                      <li>• 1 colher de chá de manteiga</li>
                      <li>• Café preto ou chá verde</li>
                    </ul>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Lanche da manhã (10h - 10h30)</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• 1 fruta média (maçã, pera ou banana)</li>
                      <li>• 20g de castanhas</li>
                    </ul>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Almoço (12h - 13h)</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• 150g de proteína (frango, peixe ou carne magra)</li>
                      <li>• 4 colheres de sopa de arroz integral</li>
                      <li>• Salada à vontade (folhas verdes, tomate, cenoura)</li>
                      <li>• 1 colher de sobremesa de azeite</li>
                    </ul>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Lanche da tarde (16h - 16h30)</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• 1 pote de iogurte natural</li>
                      <li>• 1 colher de sopa de granola sem açúcar</li>
                      <li>• 1/2 fruta picada</li>
                    </ul>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Jantar (19h - 20h)</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Omelete com 3 ovos e vegetais</li>
                      <li>• 1/2 abacate</li>
                      <li>• Salada verde à vontade</li>
                    </ul>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Ceia (opcional)</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• 1 xícara de chá de camomila</li>
                      <li>• 3 biscoitos integrais</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notas do nutricionista</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3 bg-muted/30 p-3 rounded-lg">
                  <MessageCircle className="text-primary mt-1" />
                  <div>
                    <p className="mb-2">
                      Este plano prioriza proteínas e fibras para maior saciedade e recuperação muscular. 
                      Ajustamos os carboidratos para seu novo volume de treino.
                    </p>
                    <p>
                      Não se esqueça de aumentar a hidratação nos dias de treino para 3L de água.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="anteriores" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Histórico de planos anteriores</CardTitle>
                <CardDescription>
                  Acesse seus planos alimentares anteriores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="text-muted-foreground" />
                      <div>
                        <p className="font-medium">Plano - Fase inicial</p>
                        <p className="text-sm text-muted-foreground">10/03/2025 - 26/04/2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download size={16} className="mr-2" /> Baixar
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="text-muted-foreground" />
                      <div>
                        <p className="font-medium">Plano - Fase de adaptação</p>
                        <p className="text-sm text-muted-foreground">01/02/2025 - 09/03/2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download size={16} className="mr-2" /> Baixar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MembersLayout>
  );
};

export default PlanoAlimentar;
