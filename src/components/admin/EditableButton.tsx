import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Save, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { usePermissions } from '@/hooks/use-permissions';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { useEdit } from '@/contexts/EditContext';

interface EditableButtonProps {
  text: string;
  url: string;
  onSave: (text: string, url: string) => void;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  icon?: React.ReactNode;
}

const EditableButton: React.FC<EditableButtonProps> = ({
  text,
  url,
  onSave,
  className,
  variant = 'default',
  size = 'default',
  icon
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [editedUrl, setEditedUrl] = useState(url);
  const { isAdmin } = usePermissions();
  const { isEditMode, setPendingChanges } = useEdit();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditedText(text);
    setEditedUrl(url);
  }, [text, url]);

  const handleSave = () => {
    onSave(editedText, editedUrl);
    setIsEditing(false);
    setPendingChanges(true);
  };

  const handleCancel = () => {
    setEditedText(text);
    setEditedUrl(url);
    setIsEditing(false);
  };

  if (!isAdmin || !isEditMode) {
    return (
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => window.open(url, '_blank')}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {text}
      </Button>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-2 p-3 border rounded-md">
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="button-text">Texto do Botão</Label>
            <Input
              id="button-text"
              ref={inputRef}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              placeholder="Texto do botão"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="button-url">URL</Label>
            <Input
              id="button-url"
              value={editedUrl}
              onChange={(e) => setEditedUrl(e.target.value)}
              placeholder="https://exemplo.com"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleCancel}
          >
            <X size={14} className="mr-1" /> Cancelar
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={handleSave}
          >
            <Save size={14} className="mr-1" /> Salvar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Button
        variant={variant}
        size={size}
        className={cn("relative group", className)}
        onClick={() => window.open(url, '_blank')}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {text}
        <ExternalLink size={14} className="ml-1 opacity-50" />
      </Button>
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

export default EditableButton; 