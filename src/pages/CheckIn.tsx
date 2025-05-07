
import React from 'react';
import MembersLayout from '@/components/layout/MembersLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ListCheck, Info, Clock, CalendarCheck, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CheckIn = () => {
  return (
    <MembersLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Check-in Semanal</h1>
          <Button className="bg-secondary hover:bg-secondary/90">
            <CalendarCheck size={18} className="mr-2" /> Realizar Check-in
          </Button>
        </div>
        
        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4 text-primary" />
          <AlertTitle>Próximo check-in</AlertTitle>
          <AlertDescription>
            Seu próximo check-in deve ser realizado em 12/05/2025 (4 dias restantes)
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListCheck size={20} />
              Sobre o Check-in
            </CardTitle>
            <CardDescription>
              Entenda a importância do check-in semanal para seu progresso
            </CardDescription>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              O check-in semanal é uma ferramenta essencial para acompanharmos seu progresso e 
              realizarmos os ajustes necessários no seu plano alimentar e orientações.
            </p>
            
            <h4 className="font-medium text-base mt-4">Por que o check-in é importante?</h4>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <Clock size={18} className="mt-1 flex-shrink-0 text-muted-foreground" />
                <span>Permite ajustes rápidos e personalizados em seu plano</span>
              </li>
              <li className="flex gap-2">
                <AlertCircle size={18} className="mt-1 flex-shrink-0 text-muted-foreground" />
                <span>Identifica obstáculos e dificuldades para resolvermos juntos</span>
              </li>
              <li className="flex gap-2">
                <CalendarCheck size={18} className="mt-1 flex-shrink-0 text-muted-foreground" />
                <span>Mantém seu comprometimento e consistência no processo</span>
              </li>
              <li className="flex gap-2">
                <Info size={18} className="mt-1 flex-shrink-0 text-muted-foreground" />
                <span>Fornece dados objetivos para avaliarmos resultados e tendências</span>
              </li>
            </ul>
            
            <h4 className="font-medium text-base mt-4">Como realizar o check-in:</h4>
            <ol className="space-y-2">
              <li>Complete o formulário de check-in semanalmente (mesmo dia e horário)</li>
              <li>Envie fotos de acompanhamento no mesmo ângulo e iluminação</li>
              <li>Reporte com sinceridade sobre sua adesão ao plano (sem julgamentos)</li>
              <li>Compartilhe dificuldades, dúvidas e vitórias da semana</li>
            </ol>
            
            <p className="mt-4">
              Após cada check-in, você receberá feedback e ajustes em até 48 horas.
            </p>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="historico">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="historico">Histórico de Check-ins</TabsTrigger>
            <TabsTrigger value="formulario">Formulário</TabsTrigger>
          </TabsList>
          
          <TabsContent value="historico" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Seus check-ins anteriores</CardTitle>
                <CardDescription>
                  Visualize o histórico de seus check-ins e feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Check-in #12</p>
                        <p className="text-sm text-muted-foreground">28/04/2025</p>
                      </div>
                      <Button variant="outline" size="sm">Ver detalhes</Button>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium mb-1">Resumo:</p>
                      <p className="text-muted-foreground text-sm">
                        Boa evolução na perda de medidas. Ajustamos macros para melhorar energia durante treinos.
                      </p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Check-in #11</p>
                        <p className="text-sm text-muted-foreground">21/04/2025</p>
                      </div>
                      <Button variant="outline" size="sm">Ver detalhes</Button>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium mb-1">Resumo:</p>
                      <p className="text-muted-foreground text-sm">
                        Manutenção do peso. Aumentamos proteína e ajustamos horários para melhor recuperação.
                      </p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Check-in #10</p>
                        <p className="text-sm text-muted-foreground">14/04/2025</p>
                      </div>
                      <Button variant="outline" size="sm">Ver detalhes</Button>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium mb-1">Resumo:</p>
                      <p className="text-muted-foreground text-sm">
                        Progresso consistente. Mantivemos o plano com pequenos ajustes nos lanches.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="formulario">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Formulário de Check-in</CardTitle>
                <CardDescription>
                  Preencha as informações abaixo para realizar seu check-in semanal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Medidas atuais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="peso">Peso atual (kg)</Label>
                        <Input id="peso" type="number" step="0.1" placeholder="Ex: 68.5" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cintura">Cintura (cm)</Label>
                        <Input id="cintura" type="number" step="0.5" placeholder="Ex: 75" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quadril">Quadril (cm)</Label>
                        <Input id="quadril" type="number" step="0.5" placeholder="Ex: 95" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Adesão ao plano</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="adesao">Qual foi sua adesão ao plano alimentar? (0-100%)</Label>
                        <Input id="adesao" type="number" min="0" max="100" placeholder="Ex: 90" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="desvios">Houve desvios do plano? Descreva:</Label>
                        <Textarea id="desvios" placeholder="Descreva os momentos em que não conseguiu seguir o plano" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Treinos e atividades</h3>
                    <div className="space-y-2">
                      <Label htmlFor="treinos">Quantos treinos você realizou esta semana?</Label>
                      <Input id="treinos" type="number" min="0" max="7" placeholder="Ex: 5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="obs_treinos">Observações sobre treinos:</Label>
                      <Textarea id="obs_treinos" placeholder="Como se sentiu nos treinos? Alguma dificuldade?" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Sensações e observações</h3>
                    <div className="space-y-2">
                      <Label htmlFor="energia">Como está sua energia durante o dia? (1-10)</Label>
                      <Input id="energia" type="number" min="1" max="10" placeholder="Ex: 8" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sono">Como está seu sono? (1-10)</Label>
                      <Input id="sono" type="number" min="1" max="10" placeholder="Ex: 7" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="digestao">Como está sua digestão? (1-10)</Label>
                      <Input id="digestao" type="number" min="1" max="10" placeholder="Ex: 9" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="observacoes">Outras observações importantes:</Label>
                      <Textarea id="observacoes" placeholder="Compartilhe outras sensações, dificuldades ou conquistas" />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit" className="w-full">Enviar Check-in</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MembersLayout>
  );
};

export default CheckIn;
