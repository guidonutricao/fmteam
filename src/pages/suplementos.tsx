import React from 'react';
import MembersLayout from '@/components/layout/MembersLayout';
import BackButton from '@/components/layout/BackButton';
import CollapsibleBox from '@/components/ui/CollapsibleBox';
import { 
  Dumbbell, Brain, Moon, Zap, Heart, 
  Weight, Droplets, Star, ExternalLink 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Simulação de dados de suplementos recomendados
const suplementos = [
  // Massa muscular
  {
    id: 1,
    categoria: "ganho-muscular",
    nome: "Whey Protein Isolado",
    marca: "Growth",
    descricao: "Proteína de alta qualidade e rápida absorção, ideal para o pós-treino.",
    beneficios: ["Recuperação muscular", "Alta concentração proteica (90%)", "Baixo teor de gorduras e carboidratos"],
    dosagem: "1 scoop (30g) após o treino ou entre refeições",
    links: [
      { nome: "Growth Suplementos", url: "https://www.gsuplementos.com.br/whey-protein-isolado" },
      { nome: "Amazon", url: "https://www.amazon.com.br/whey-protein-isolado" }
    ],
    classificacao: 5,
    preco: "$$"
  },
  {
    id: 2,
    categoria: "ganho-muscular",
    nome: "Creatina Monohidratada",
    marca: "Optimum Nutrition",
    descricao: "Suplemento que melhora a força, potência e recuperação muscular.",
    beneficios: ["Aumento de força", "Melhora da performance", "Aumento da síntese proteica"],
    dosagem: "5g por dia, todos os dias",
    links: [
      { nome: "Netshoes", url: "https://www.netshoes.com.br/creatina-optimum" },
      { nome: "Amazon", url: "https://www.amazon.com.br/creatina-optimum-nutrition" }
    ],
    classificacao: 5,
    preco: "$"
  },
  
  // Recuperação
  {
    id: 3,
    categoria: "recuperacao",
    nome: "BCAA 2:1:1",
    marca: "Integral Médica",
    descricao: "Aminoácidos de cadeia ramificada que auxiliam na recuperação muscular.",
    beneficios: ["Redução do catabolismo muscular", "Recuperação pós-treino", "Menor fadiga muscular"],
    dosagem: "5g antes e/ou depois do treino",
    links: [
      { nome: "Integral Médica", url: "https://www.integralmedica.com.br/bcaa" },
      { nome: "Amazon", url: "https://www.amazon.com.br/bcaa-integral-medica" }
    ],
    classificacao: 4,
    preco: "$$"
  },
  {
    id: 4,
    categoria: "recuperacao",
    nome: "Glutamina",
    marca: "Max Titanium",
    descricao: "Aminoácido essencial para a recuperação muscular e função imunológica.",
    beneficios: ["Recuperação acelerada", "Fortalecimento do sistema imunológico", "Proteção contra catabolismo"],
    dosagem: "5g após o treino e/ou antes de dormir",
    links: [
      { nome: "Max Titanium", url: "https://www.maxtitanium.com.br/glutamina" },
      { nome: "Amazon", url: "https://www.amazon.com.br/glutamina-max-titanium" }
    ],
    classificacao: 4,
    preco: "$"
  },
  
  // Energia
  {
    id: 5,
    categoria: "energia",
    nome: "Cafeína Anidra",
    marca: "Adaptogen",
    descricao: "Estimulante natural que aumenta a energia, foco e performance.",
    beneficios: ["Aumento da energia", "Maior foco", "Melhora da resistência física"],
    dosagem: "1 cápsula (200mg) 30 minutos antes do treino",
    links: [
      { nome: "Adaptogen", url: "https://www.adaptogen.com.br/cafeina" },
      { nome: "Amazon", url: "https://www.amazon.com.br/cafeina-anidra-adaptogen" }
    ],
    classificacao: 4,
    preco: "$"
  },
  {
    id: 6,
    categoria: "energia",
    nome: "Beta-Alanina",
    marca: "Essential Nutrition",
    descricao: "Aumenta os níveis de carnosina, melhorando a resistência muscular.",
    beneficios: ["Aumento da resistência", "Redução da fadiga", "Melhor performance em exercícios intensos"],
    dosagem: "2-5g por dia, dividido em doses menores",
    links: [
      { nome: "Essential Nutrition", url: "https://www.essentialnutrition.com.br/beta-alanina" },
      { nome: "Amazon", url: "https://www.amazon.com.br/beta-alanina-essential" }
    ],
    classificacao: 3,
    preco: "$$"
  },
  
  // Sono
  {
    id: 7,
    categoria: "sono",
    nome: "ZMA",
    marca: "Profit",
    descricao: "Combinação de Zinco, Magnésio e Vitamina B6 que melhora a qualidade do sono e recuperação.",
    beneficios: ["Melhora do sono", "Recuperação hormonal", "Suporte à síntese proteica"],
    dosagem: "2 cápsulas antes de dormir",
    links: [
      { nome: "Profit Labs", url: "https://www.profitlabs.com.br/zma" },
      { nome: "Amazon", url: "https://www.amazon.com.br/zma-profit" }
    ],
    classificacao: 4,
    preco: "$$"
  },
  {
    id: 8,
    categoria: "sono",
    nome: "Melatonina",
    marca: "Vitafor",
    descricao: "Hormônio natural que regula o ciclo de sono-vigília.",
    beneficios: ["Indução do sono", "Melhora da qualidade do sono", "Ajuste do ritmo circadiano"],
    dosagem: "1 cápsula (3mg) 30 minutos antes de dormir",
    links: [
      { nome: "Vitafor", url: "https://www.vitafor.com.br/melatonina" },
      { nome: "Amazon", url: "https://www.amazon.com.br/melatonina-vitafor" }
    ],
    classificacao: 5,
    preco: "$"
  },
  
  // Saúde
  {
    id: 9,
    categoria: "saude",
    nome: "Ômega 3",
    marca: "Naturalis",
    descricao: "Ácidos graxos essenciais com benefícios anti-inflamatórios e cardiovasculares.",
    beneficios: ["Saúde cardiovascular", "Redução da inflamação", "Saúde cognitiva"],
    dosagem: "2 cápsulas por dia com refeições",
    links: [
      { nome: "Naturalis", url: "https://www.naturalis.com.br/omega3" },
      { nome: "Amazon", url: "https://www.amazon.com.br/omega3-naturalis" }
    ],
    classificacao: 5,
    preco: "$$"
  },
  {
    id: 10,
    categoria: "saude",
    nome: "Multivitamínico",
    marca: "Centrum",
    descricao: "Combinação de vitaminas e minerais essenciais para o funcionamento do organismo.",
    beneficios: ["Prevenção de deficiências nutricionais", "Suporte ao sistema imunológico", "Energia e vitalidade"],
    dosagem: "1 cápsula por dia com uma refeição",
    links: [
      { nome: "Drogaria São Paulo", url: "https://www.drogariasaopaulo.com.br/centrum" },
      { nome: "Amazon", url: "https://www.amazon.com.br/centrum" }
    ],
    classificacao: 4,
    preco: "$$"
  },
  
  // Hidratação
  {
    id: 11,
    categoria: "hidratacao",
    nome: "Malto + Eletrolitos",
    marca: "Integralmédica",
    descricao: "Combinação de carboidratos e eletrólitos para hidratação e energia durante treinos longos.",
    beneficios: ["Reposição de eletrólitos", "Energia sustentada", "Hidratação otimizada"],
    dosagem: "30g em 500ml de água durante o treino",
    links: [
      { nome: "Integral Médica", url: "https://www.integralmedica.com.br/maltodextrina" },
      { nome: "Amazon", url: "https://www.amazon.com.br/maltodextrina-integral-medica" }
    ],
    classificacao: 4,
    preco: "$"
  }
];

const categorias = [
  { id: "ganho-muscular", nome: "Ganho Muscular", icon: <Dumbbell size={18} /> },
  { id: "recuperacao", nome: "Recuperação", icon: <Zap size={18} /> },
  { id: "energia", nome: "Energia", icon: <Weight size={18} /> },
  { id: "sono", nome: "Sono", icon: <Moon size={18} /> },
  { id: "saude", nome: "Saúde", icon: <Heart size={18} /> },
  { id: "hidratacao", nome: "Hidratação", icon: <Droplets size={18} /> },
];

const Suplementos = () => {
  return (
    <MembersLayout>
      <div className="space-y-6">
        <BackButton to="/dashboard" />
        
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-primary">Suplementos Recomendados</h1>
          <p className="text-muted-foreground mt-1">
            Opções com melhor custo-benefício selecionadas pelo seu nutricionista.
          </p>
        </header>
        
        {/* Aviso Importante */}
        <Card className="bg-yellow-50 border-yellow-200 mb-6">
          <CardContent className="p-4">
            <p className="text-sm">
              <strong>Importante:</strong> Estas são apenas recomendações gerais. Sempre consulte seu nutricionista 
              antes de iniciar qualquer suplementação, pois as necessidades variam individualmente.
            </p>
          </CardContent>
        </Card>
        
        {/* Abas por Categoria */}
        <Tabs defaultValue="ganho-muscular">
          <TabsList className="mb-6 flex w-full justify-start overflow-x-auto pb-px">
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
          
          {/* Conteúdo das abas */}
          {categorias.map((categoria) => (
            <TabsContent key={categoria.id} value={categoria.id} className="space-y-4">
              {suplementos
                .filter((sup) => sup.categoria === categoria.id)
                .map((suplemento) => (
                  <SuplementoCard key={suplemento.id} suplemento={suplemento} />
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MembersLayout>
  );
};

// Componente de estrelas para classificação
const Estrelas = ({ classificacao }: { classificacao: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={14} 
          className={i < classificacao ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
        />
      ))}
    </div>
  );
};

interface SuplementoCardProps {
  suplemento: typeof suplementos[0];
}

const SuplementoCard: React.FC<SuplementoCardProps> = ({ suplemento }) => {
  return (
    <CollapsibleBox
      title={suplemento.nome}
      icon={
        suplemento.categoria === "ganho-muscular" ? <Dumbbell size={18} /> :
        suplemento.categoria === "recuperacao" ? <Zap size={18} /> :
        suplemento.categoria === "energia" ? <Weight size={18} /> :
        suplemento.categoria === "sono" ? <Moon size={18} /> :
        suplemento.categoria === "saude" ? <Heart size={18} /> :
        <Droplets size={18} />
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{suplemento.marca}</Badge>
            <div className="flex items-center gap-1">
              <Estrelas classificacao={suplemento.classificacao} />
            </div>
          </div>
          <Badge 
            variant="outline" 
            className="text-green-600 border-green-200"
          >
            {suplemento.preco}
          </Badge>
        </div>
        
        <p className="text-sm">{suplemento.descricao}</p>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Benefícios</h4>
          <ul className="list-disc pl-4 text-sm space-y-1">
            {suplemento.beneficios.map((beneficio, idx) => (
              <li key={idx}>{beneficio}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Dosagem Recomendada</h4>
          <p className="text-sm">{suplemento.dosagem}</p>
        </div>
        
        <div className="pt-2 border-t">
          <h4 className="text-sm font-medium mb-2">Onde Comprar</h4>
          <div className="flex flex-wrap gap-2">
            {suplemento.links.map((link, idx) => (
              <Button 
                key={idx} 
                variant="outline" 
                size="sm"
                className="h-8 text-xs"
                onClick={() => window.open(link.url, '_blank')}
              >
                {link.nome} <ExternalLink size={12} className="ml-1" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </CollapsibleBox>
  );
};

export default Suplementos; 