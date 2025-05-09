import React, { useState, useEffect } from 'react';
import MembersLayout from '@/components/layout/MembersLayout';
import BackButton from '@/components/layout/BackButton';
import CollapsibleBox from '@/components/ui/CollapsibleBox';
import { 
  Apple, Beef, Coffee, Egg, Fish, Banana, 
  Wheat, Milk, Calculator, Search, FileText 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Simulação de dados da tabela TACO (em produção, seria carregado de um banco de dados)
const alimentosTACO = [
  { nome: 'Arroz branco cozido', categoria: 'Cereais', calorias: 128, quantidade: 100, unidade: 'g' },
  { nome: 'Feijão preto cozido', categoria: 'Leguminosas', calorias: 77, quantidade: 100, unidade: 'g' },
  { nome: 'Peito de frango grelhado', categoria: 'Carnes', calorias: 159, quantidade: 100, unidade: 'g' },
  { nome: 'Patinho cozido', categoria: 'Carnes', calorias: 219, quantidade: 100, unidade: 'g' },
  { nome: 'Batata cozida', categoria: 'Vegetais', calorias: 52, quantidade: 100, unidade: 'g' },
  { nome: 'Brócolis cozido', categoria: 'Vegetais', calorias: 29, quantidade: 100, unidade: 'g' },
  { nome: 'Banana prata', categoria: 'Frutas', calorias: 98, quantidade: 100, unidade: 'g' },
  { nome: 'Maçã', categoria: 'Frutas', calorias: 59, quantidade: 100, unidade: 'g' },
  { nome: 'Leite integral', categoria: 'Laticínios', calorias: 61, quantidade: 100, unidade: 'ml' },
  { nome: 'Pão francês', categoria: 'Cereais', calorias: 300, quantidade: 100, unidade: 'g' },
  { nome: 'Ovo de galinha cozido', categoria: 'Ovos', calorias: 146, quantidade: 100, unidade: 'g' },
  { nome: 'Azeite de oliva', categoria: 'Óleos', calorias: 884, quantidade: 100, unidade: 'ml' },
];

const categorias = [
  { id: 'proteinas', nome: 'Proteínas', icon: <Beef size={18} /> },
  { id: 'carboidratos', nome: 'Carboidratos', icon: <Wheat size={18} /> },
  { id: 'vegetais', nome: 'Vegetais', icon: <Banana size={18} /> },
  { id: 'frutas', nome: 'Frutas', icon: <Apple size={18} /> },
  { id: 'laticinios', nome: 'Laticínios', icon: <Milk size={18} /> },
  { id: 'outros', nome: 'Outros', icon: <Coffee size={18} /> },
];

const Substituicoes = () => {
  const [alimentoOriginal, setAlimentoOriginal] = useState('');
  const [quantidadeOriginal, setQuantidadeOriginal] = useState<number>(100);
  const [alimentosEquivalentes, setAlimentosEquivalentes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAlimentos, setFilteredAlimentos] = useState(alimentosTACO);

  useEffect(() => {
    if (searchTerm) {
      setFilteredAlimentos(
        alimentosTACO.filter(alimento => 
          alimento.nome.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredAlimentos(alimentosTACO);
    }
  }, [searchTerm]);

  const calcularEquivalentes = () => {
    const alimentoSelecionado = alimentosTACO.find(
      a => a.nome.toLowerCase() === alimentoOriginal.toLowerCase()
    );

    if (!alimentoSelecionado) {
      // Alimento não encontrado na base
      setAlimentosEquivalentes([]);
      return;
    }

    // Calorias totais do alimento original
    const caloriasOriginais = (alimentoSelecionado.calorias * quantidadeOriginal) / 100;

    // Calcula equivalentes
    const equivalentes = alimentosTACO
      .filter(a => a.nome !== alimentoSelecionado.nome)
      .map(alimento => {
        const quantidadeEquivalente = (caloriasOriginais * 100) / alimento.calorias;
        return {
          ...alimento,
          quantidadeEquivalente: Math.round(quantidadeEquivalente * 10) / 10,
        };
      });

    setAlimentosEquivalentes(equivalentes);
  };

  return (
    <MembersLayout>
      <div className="space-y-6">
        <BackButton to="/dashboard" />
        
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-primary">Substituição de Alimentos</h1>
          <p className="text-muted-foreground mt-1">
            Encontre equivalentes calóricos para os alimentos do seu plano.
          </p>
        </header>

        {/* Calculadora de Equivalências */}
        <Card className="mb-8">
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calculator size={20} className="text-primary" />
              Calculadora de Equivalência
            </h2>
            
            <div className="grid gap-4 mb-4">
              <div>
                <Label htmlFor="alimento-original">Alimento que deseja substituir</Label>
                <div className="relative mt-1">
                  <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="alimento-original"
                    className="pl-8"
                    placeholder="Digite o nome do alimento"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {searchTerm && (
                  <div className="mt-1 max-h-48 overflow-y-auto border rounded-md bg-card">
                    {filteredAlimentos.length > 0 ? (
                      filteredAlimentos.map((alimento, i) => (
                        <div 
                          key={i}
                          className="p-2 hover:bg-accent cursor-pointer border-b last:border-0"
                          onClick={() => {
                            setAlimentoOriginal(alimento.nome);
                            setSearchTerm('');
                          }}
                        >
                          {alimento.nome} ({alimento.calorias} kcal/100{alimento.unidade})
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-muted-foreground">Nenhum alimento encontrado</div>
                    )}
                  </div>
                )}
                
                {alimentoOriginal && (
                  <div className="mt-2 text-sm font-medium text-primary">
                    Selecionado: {alimentoOriginal}
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="quantidade">Quantidade (g/ml)</Label>
                <Input
                  id="quantidade"
                  type="number"
                  min="1"
                  value={quantidadeOriginal}
                  onChange={(e) => setQuantidadeOriginal(Number(e.target.value))}
                />
              </div>
              
              <Button 
                onClick={calcularEquivalentes}
                disabled={!alimentoOriginal || quantidadeOriginal <= 0}
                className="mt-2"
              >
                Calcular Equivalentes
              </Button>
            </div>
            
            {/* Resultados da Calculadora */}
            {alimentosEquivalentes.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Equivalentes Calóricos</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Estas são as quantidades equivalentes em calorias para {quantidadeOriginal}g/ml de {alimentoOriginal}:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                  {alimentosEquivalentes.map((alimento, index) => (
                    <div key={index} className="flex items-center gap-2 border rounded p-2 text-sm">
                      <div className="font-medium flex-1">{alimento.nome}</div>
                      <div className="text-muted-foreground whitespace-nowrap">
                        {alimento.quantidadeEquivalente} {alimento.unidade}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Guias de Substituição por Categoria */}
        <h2 className="text-xl font-semibold mb-4">Guias de Substituição</h2>
        
        <Tabs defaultValue="proteinas">
          <TabsList className="mb-4 flex w-full justify-start overflow-x-auto pb-px">
            {categorias.map((categoria) => (
              <TabsTrigger 
                key={categoria.id} 
                value={categoria.id}
                className="flex items-center gap-1"
              >
                {categoria.icon}
                <span>{categoria.nome}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="proteinas">
            <CollapsibleBox 
              title="Carnes" 
              icon={<Beef size={18} />}
              defaultOpen
            >
              <div className="space-y-2">
                <p>Estas são opções equivalentes para substituir suas fontes de proteína animal:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li><span className="font-medium">100g peito de frango:</span> 130g de filé de peixe, 90g de carne patinho, 180g de atum enlatado</li>
                  <li><span className="font-medium">100g de carne patinho:</span> 115g de peito de frango, 100g de lombo de porco, 110g de atum</li>
                  <li><span className="font-medium">2 ovos médios:</span> 80g de peito de frango, 70g de carne moída, 100g de filé de peixe</li>
                </ul>
              </div>
            </CollapsibleBox>
            
            <CollapsibleBox 
              title="Ovos" 
              icon={<Egg size={18} />}
            >
              <div className="space-y-2">
                <p>Equivalência calórica para ovos:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li><span className="font-medium">1 ovo grande inteiro (50g):</span> 2 claras grandes, 30g de peito de frango, 30g de atum em água</li>
                  <li><span className="font-medium">1 clara de ovo (35g):</span> 20g de peito de frango, 25g de peixe branco</li>
                </ul>
              </div>
            </CollapsibleBox>
            
            <CollapsibleBox 
              title="Peixes" 
              icon={<Fish size={18} />}
            >
              <div className="space-y-2">
                <p>Equivalências para diferentes tipos de peixe:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li><span className="font-medium">100g de salmão:</span> 85g de atum, 130g de tilápia, 90g de bacalhau</li>
                  <li><span className="font-medium">100g de tilápia:</span> 70g de salmão, 75g de atum, 120g de pescada</li>
                </ul>
              </div>
            </CollapsibleBox>
          </TabsContent>
          
          <TabsContent value="carboidratos">
            <CollapsibleBox 
              title="Cereais e Grãos" 
              icon={<Wheat size={18} />}
              defaultOpen
            >
              <div className="space-y-2">
                <p>Substitua seus carboidratos com estas opções equivalentes:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li><span className="font-medium">4 colheres de sopa de arroz branco (100g):</span> 100g de batata doce, 100g de mandioca, 80g de macarrão</li>
                  <li><span className="font-medium">1 pão francês (50g):</span> 2 fatias de pão integral, 100g de batata, 60g de arroz</li>
                </ul>
              </div>
            </CollapsibleBox>
          </TabsContent>
          
          {/* Conteúdo para outras abas */}
          <TabsContent value="vegetais">
            <CollapsibleBox 
              title="Vegetais" 
              icon={<Banana size={18} />}
              defaultOpen
            >
              <div className="space-y-2">
                <p>Os vegetais podem ser substituídos livremente entre si na mesma quantidade, pois a maioria tem baixo valor calórico. Priorize sempre a variedade de cores.</p>
              </div>
            </CollapsibleBox>
          </TabsContent>
          
          <TabsContent value="frutas">
            <CollapsibleBox 
              title="Frutas" 
              icon={<Apple size={18} />}
              defaultOpen
            >
              <div className="space-y-2">
                <p>Equivalências entre diferentes frutas:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li><span className="font-medium">1 maçã média (100g):</span> 1 banana pequena, 1 laranja média, 1 pera pequena, 200g de melão</li>
                  <li><span className="font-medium">1 banana média (100g):</span> 1 maçã, 200g de morango, 100g de uva</li>
                </ul>
              </div>
            </CollapsibleBox>
          </TabsContent>
          
          <TabsContent value="laticinios">
            <CollapsibleBox 
              title="Laticínios" 
              icon={<Milk size={18} />}
              defaultOpen
            >
              <div className="space-y-2">
                <p>Substitua os laticínios do seu plano com estas opções:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li><span className="font-medium">1 copo de leite desnatado (200ml):</span> 2 fatias de queijo branco, 1 iogurte natural, 120g de cottage</li>
                  <li><span className="font-medium">30g de queijo mussarela:</span> 50g de queijo cottage, 30g de queijo minas, 20g de queijo parmesão</li>
                </ul>
              </div>
            </CollapsibleBox>
          </TabsContent>
          
          <TabsContent value="outros">
            <CollapsibleBox 
              title="Oleaginosas" 
              icon={<Coffee size={18} />}
              defaultOpen
            >
              <div className="space-y-2">
                <p>Equivalências para oleaginosas e gorduras boas:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li><span className="font-medium">1 colher de sopa de azeite (15ml):</span> 30g de abacate, 15g de castanhas, 15g de amêndoas</li>
                  <li><span className="font-medium">30g de castanha do pará:</span> 15g de amêndoas, 15g de nozes, 1 colher de sopa de azeite</li>
                </ul>
              </div>
            </CollapsibleBox>
          </TabsContent>
        </Tabs>
        
        {/* Recomendação para TACO */}
        <Card className="bg-muted mt-8">
          <CardContent className="p-4 flex gap-3">
            <FileText className="text-primary h-10 w-10 flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-1">Tabela TACO</h3>
              <p className="text-sm text-muted-foreground">
                As equivalências são baseadas na Tabela Brasileira de Composição de Alimentos (TACO, 2011). 
                Para informações mais detalhadas, consulte seu nutricionista.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MembersLayout>
  );
};

export default Substituicoes; 