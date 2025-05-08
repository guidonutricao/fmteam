import React, { useState } from 'react';

interface OrientacaoBlockProps {
  title: string;
  content: string;
  isAdmin?: boolean;
  onEdit?: (title: string, content: string) => void;
  onRemove?: () => void;
}

const OrientacaoBlock: React.FC<OrientacaoBlockProps> = ({ title, content, isAdmin, onEdit, onRemove }) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  const handleSave = () => {
    onEdit && onEdit(editTitle, editContent);
    setEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border mb-3">
      <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none" onClick={() => setOpen(!open)}>
        {editing ? (
          <input
            className="font-semibold text-lg bg-transparent border-b border-gray-300 focus:outline-none flex-1 mr-2"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <span className="font-semibold text-lg flex-1">{title}</span>
        )}
        <div className="flex items-center gap-2">
          {isAdmin && !editing && (
            <button
              className="text-xs text-gray-500 hover:text-primary px-2"
              onClick={e => { e.stopPropagation(); setEditing(true); }}
            >Editar</button>
          )}
          {isAdmin && editing && (
            <>
              <button className="text-xs text-green-600 px-2" onClick={e => { e.stopPropagation(); handleSave(); }}>Salvar</button>
              <button className="text-xs text-gray-500 px-2" onClick={e => { e.stopPropagation(); setEditing(false); setEditTitle(title); setEditContent(content); }}>Cancelar</button>
            </>
          )}
          {isAdmin && !editing && (
            <button className="text-xs text-red-500 px-2" onClick={e => { e.stopPropagation(); onRemove && onRemove(); }}>Remover</button>
          )}
          <button className="ml-2 text-gray-400 hover:text-primary" aria-label={open ? 'Fechar bloco' : 'Abrir bloco'}>
            {open ? (
              <span className="text-2xl">-</span>
            ) : (
              <span className="text-2xl">+</span>
            )}
          </button>
        </div>
      </div>
      {open && (
        <div className="px-4 pb-4">
          {editing ? (
            <textarea
              className="w-full mt-2 p-2 rounded border border-gray-200 bg-gray-50 dark:bg-gray-800 focus:outline-none"
              rows={5}
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
            />
          ) : (
            <div className="prose prose-sm dark:prose-invert mt-2 whitespace-pre-line">{content}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrientacaoBlock; 