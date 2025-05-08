import React from 'react';
import OrientacoesAccordion, { Orientacao } from '@/components/PlanoAlimentar/OrientacoesAccordion';
import { useAuth } from '@/contexts/AuthContext';

const initialBlocks: Orientacao[] = [
  {
    id: '1',
    title: 'Hábitos saudáveis',
    content: '• Beba água ao longo do dia\n• Pratique atividade física regularmente\n• Faça refeições em horários regulares\n• Mastigue devagar e preste atenção à saciedade',
  },
  {
    id: '2',
    title: 'Rotina, sono e malefícios do álcool',
    content: '• Durma pelo menos 7-8 horas por noite\n• Evite eletrônicos antes de dormir\n• O álcool prejudica o metabolismo e a recuperação\n• Organize sua rotina para priorizar o descanso',
  },
  {
    id: '3',
    title: 'Alimentos saudáveis x não saudáveis',
    content: 'Recomendados: frutas, verduras, legumes, proteínas magras, grãos integrais\nEvite: frituras, refrigerantes, doces em excesso, ultraprocessados',
  },
  {
    id: '4',
    title: 'Refeições livres',
    content: '• Planeje sua refeição livre para um momento especial\n• Evite exageros e mantenha o equilíbrio\n• Retome a rotina normalmente após a refeição livre',
  },
  {
    id: '5',
    title: 'Doces e ansiedade',
    content: '• Não tenha doces à vista em casa\n• Pratique técnicas de respiração e mindfulness\n• Prefira frutas ou opções saudáveis quando sentir vontade de doce',
  },
  {
    id: '6',
    title: 'Orientações gerais',
    content: '• Café: consuma com moderação\n• Açúcar: prefira versões naturais\n• Hidratação: beba pelo menos 2L de água por dia\n• Industrializados: evite sempre que possível',
  },
];

const PlanoAlimentarOrientacoes: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.profile === 'admin';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-2">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 font-sans">Orientações sobre o Plano Alimentar</h1>
      <OrientacoesAccordion isAdmin={isAdmin} initialBlocks={initialBlocks} />
    </div>
  );
};

export default PlanoAlimentarOrientacoes; 