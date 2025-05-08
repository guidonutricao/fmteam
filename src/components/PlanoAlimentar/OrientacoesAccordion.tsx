import React, { useState } from 'react';
import OrientacaoBlock from './OrientacaoBlock';

export type Orientacao = {
  id: string;
  title: string;
  content: string;
};

interface OrientacoesAccordionProps {
  isAdmin?: boolean;
  initialBlocks: Orientacao[];
}

const OrientacoesAccordion: React.FC<OrientacoesAccordionProps> = ({ isAdmin, initialBlocks }) => {
  const [blocks, setBlocks] = useState<Orientacao[]>(initialBlocks);

  const handleEdit = (id: string, title: string, content: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, title, content } : b));
  };

  const handleRemove = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const handleAdd = () => {
    setBlocks([
      ...blocks,
      { id: Date.now().toString(), title: 'Novo bloco', content: '' }
    ]);
  };

  const handleMove = (from: number, to: number) => {
    if (to < 0 || to >= blocks.length) return;
    const updated = [...blocks];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setBlocks(updated);
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      {blocks.map((block, idx) => (
        <div key={block.id} className="group relative">
          <OrientacaoBlock
            title={block.title}
            content={block.content}
            isAdmin={isAdmin}
            onEdit={(title, content) => handleEdit(block.id, title, content)}
            onRemove={isAdmin ? () => handleRemove(block.id) : undefined}
          />
          {isAdmin && (
            <div className="absolute right-2 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition">
              <button
                className="text-xs text-gray-400 hover:text-primary"
                onClick={() => handleMove(idx, idx - 1)}
                disabled={idx === 0}
                title="Mover para cima"
              >↑</button>
              <button
                className="text-xs text-gray-400 hover:text-primary"
                onClick={() => handleMove(idx, idx + 1)}
                disabled={idx === blocks.length - 1}
                title="Mover para baixo"
              >↓</button>
            </div>
          )}
        </div>
      ))}
      {isAdmin && (
        <button
          className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-primary font-medium rounded-lg py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          onClick={handleAdd}
        >
          <span className="text-2xl">+</span> Adicionar bloco
        </button>
      )}
    </div>
  );
};

export default OrientacoesAccordion; 