import React, { useState } from 'react';
import MembersLayout from '@/components/layout/MembersLayout';
import BackButton from '@/components/layout/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Download, FileText, Search, BookOpen, 
  BookmarkIcon, Brain, Utensils, ShoppingBag 
} from 'lucide-react';

// Simulação de dados de materiais
const materiais = [
  // Receitas
  {
    id: 1,
    titulo: "Receitas Proteicas para Ganho Muscular",
    descricao: "30 receitas ricas em proteínas para maximizar seus ganhos de massa muscular.",
    categoria: "receitas",
    thumbnail: "https://placehold.co/320x240/2563eb/FFFFFF/png?text=Receitas+Proteicas",
    formato: "PDF",
    tamanho: "4.2 MB",
    link: "#"
  },
  {
    id: 2,
    titulo: "Lanches Saudáveis para o Trabalho",
    descricao: "Opções práticas de lanches nutritivos para levar ao trabalho ou estudos.",
    categoria: "receitas",
    thumbnail: "https://placehold.co/320x240/22c55e/FFFFFF/png?text=Lanches+Saudáveis",
    formato: "PDF",
    tamanho: "3.8 MB",
    link: "#"
  },
  {
    id: 3,
    titulo: "Sobremesas Fit: Sabor sem Culpa",
    descricao: "Receitas de sobremesas com baixo teor de açúcar e alternativas saudáveis.",
    categoria: "receitas",
    thumbnail: "https://placehold.co/320x240/ec4899/FFFFFF/png?text=Sobremesas+Fit",
    formato: "PDF",
    tamanho: "5.1 MB",
    link: "#"
  },
  
  // Guias
  {
    id: 4,
    titulo: "Guia Completo de Leitura de Rótulos",
    descricao: "Aprenda a interpretar rótulos nutricionais e faça escolhas mais conscientes.",
    categoria: "guias",
    thumbnail: "https://placehold.co/320x240/8b5cf6/FFFFFF/png?text=Leitura+de+Rótulos",
    formato: "PDF",
    tamanho: "6.5 MB",
    link: "#"
  },
  {
    id: 5,
    titulo: "Manual de Preparo de Refeições",
    descricao: "Guia prático para o preparo e armazenamento de refeições da semana.",
    categoria: "guias",
    thumbnail: "https://placehold.co/320x240/f59e0b/FFFFFF/png?text=Preparo+de+Refeições",
    formato: "PDF",
    tamanho: "7.3 MB",
    link: "#"
  },
  
  // Mindset
  {
    id: 6,
    titulo: "Desenvolvendo uma Mentalidade Saudável",
    descricao: "Estratégias para desenvolver uma relação positiva com alimentação e exercícios.",
    categoria: "mindset",
    thumbnail: "https://placehold.co/320x240/14b8a6/FFFFFF/png?text=Mindset+Saudável",
    formato: "PDF",
    tamanho: "4.9 MB",
    link: "#"
  },
  {
    id: 7,
    titulo: "Superando a Compulsão Alimentar",
    descricao: "Ferramentas e técnicas para identificar e superar gatilhos de compulsão alimentar.",
    categoria: "mindset",
    thumbnail: "https://placehold.co/320x240/6366f1/FFFFFF/png?text=Compulsão+Alimentar",
    formato: "PDF",
    tamanho: "5.5 MB",
    link: "#"
  },
  
  // Listas
  {
    id: 8,
    titulo: "Lista de Compras Essenciais",
    descricao: "Modelo de lista de compras organizada por categorias para facilitar suas idas ao supermercado.",
    categoria: "listas",
    thumbnail: "https://placehold.co/320x240/ef4444/FFFFFF/png?text=Lista+de+Compras",
    formato: "PDF",
    tamanho: "2.1 MB",
    link: "#"
  },
  {
    id: 9,
    titulo: "Checklist de Alimentos Sazonais",
    descricao: "Lista de frutas e vegetais por sazonalidade para economizar e consumir alimentos mais frescos.",
    categoria: "listas",
    thumbnail: "https://placehold.co/320x240/0ea5e9/FFFFFF/png?text=Alimentos+Sazonais",
    formato: "PDF",
    tamanho: "3.2 MB",
    link: "#"
  }
];

const categorias = [
  { id: "todos", nome: "Todos", icon: <BookOpen size={18} /> },
  { id: "receitas", nome: "Receitas", icon: <Utensils size={18} /> },
  { id: "guias", nome: "Guias", icon: <FileText size={18} /> },
  { id: "mindset", nome: "Mindset", icon: <Brain size={18} /> },
  { id: "listas", nome: "Listas", icon: <ShoppingBag size={18} /> },
];

const Ebooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMateriais = searchTerm 
    ? materiais.filter(m => 
        m.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
        m.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : materiais;
  
  return (
    <MembersLayout>
      <div className="space-y-6">
        <BackButton to="/dashboard" />
        
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-primary">E-books e Materiais</h1>
          <p className="text-muted-foreground mt-1">
            Conteúdos e recursos para apoiar sua jornada nutricional.
          </p>
        </header>
        
        {/* Barra de pesquisa */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Pesquisar materiais..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Conteúdo categorizado */}
        <Tabs defaultValue="todos">
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
          
          {/* Todos os Materiais */}
          <TabsContent value="todos" className="animate-fade-in-up">
            {filteredMateriais.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMateriais.map(material => (
                  <MaterialCard key={material.id} material={material} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum material encontrado com os termos de pesquisa
              </div>
            )}
          </TabsContent>
          
          {/* Conteúdo por categoria */}
          {categorias.slice(1).map(categoria => (
            <TabsContent key={categoria.id} value={categoria.id} className="animate-fade-in-up">
              {filteredMateriais.filter(m => m.categoria === categoria.id).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMateriais
                    .filter(m => m.categoria === categoria.id)
                    .map(material => (
                      <MaterialCard key={material.id} material={material} />
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum material encontrado nesta categoria
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MembersLayout>
  );
};

interface MaterialCardProps {
  material: typeof materiais[0];
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] bg-primary/10 relative overflow-hidden">
        <img 
          src={material.thumbnail} 
          alt={material.titulo} 
          className="w-full h-full object-cover"
        />
        <Badge 
          className="absolute top-2 right-2"
          variant="secondary"
        >
          {material.formato}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-base mb-1 line-clamp-1">{material.titulo}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {material.descricao}
        </p>
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="text-xs">
            {material.tamanho}
          </Badge>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={() => window.open(material.link, '_blank')}
          >
            <Download size={14} />
            Baixar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Ebooks; 