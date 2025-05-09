import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePermissions } from '@/hooks/use-permissions';
import { cn } from '@/lib/utils';
import { useEdit } from '@/contexts/EditContext';

interface EditableContentProps {
  content: string;
  onSave: (newContent: string) => void;
  className?: string;
  type?: 'text' | 'title' | 'paragraph';
  placeholder?: string;
}

const EditableContent: React.FC<EditableContentProps> = ({
  content,
  onSave,
  className,
  type = 'text',
  placeholder = 'Adicione seu conteúdo aqui...'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const { isAdmin } = usePermissions();
  const { isEditMode, setPendingChanges } = useEdit();
  const editRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditedContent(content);
  }, [content]);
  
  useEffect(() => {
    if (isEditing && editRef.current) {
      editRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave(editedContent);
    setIsEditing(false);
    setPendingChanges(true);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const getElementStyles = () => {
    switch (type) {
      case 'title':
        return 'text-2xl font-semibold tracking-tight';
      case 'paragraph':
        return 'text-base leading-7';
      default:
        return 'text-base';
    }
  };

  if (!isAdmin || !isEditMode) {
    return (
      <div className={cn(getElementStyles(), className)}>
        {content || placeholder}
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-2">
        <textarea
          ref={editRef}
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className={cn(
            "w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary",
            getElementStyles(),
            className
          )}
          rows={Math.max(3, (editedContent?.split('\n').length || 0))}
          placeholder={placeholder}
        />
        <div className="flex justify-end gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCancel}
            className="h-8 px-2"
          >
            <X size={14} className="mr-1" /> Cancelar
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={handleSave}
            className="h-8 px-2"
          >
            <Save size={14} className="mr-1" /> Salvar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative">
      <div className={cn(getElementStyles(), className)}>
        {content || placeholder}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
        onClick={() => setIsEditing(true)}
      >
        <Pencil size={12} />
      </Button>
    </div>
  );
};

export default EditableContent; 