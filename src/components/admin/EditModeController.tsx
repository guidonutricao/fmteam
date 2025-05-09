import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Save, X } from 'lucide-react';
import { useEdit } from '@/contexts/EditContext';
import { usePermissions } from '@/hooks/use-permissions';
import { useToast } from '@/hooks/use-toast';

const EditModeController: React.FC = () => {
  const { isEditMode, pendingChanges, toggleEditMode, saveChanges, cancelChanges } = useEdit();
  const { isAdmin } = usePermissions();
  const { toast } = useToast();

  if (!isAdmin) return null;

  const handleSave = () => {
    saveChanges();
    toast({
      title: "Alterações salvas",
      description: "As alterações foram salvas com sucesso",
    });
  };

  const handleCancel = () => {
    cancelChanges();
    toast({
      title: "Edição cancelada",
      description: "As alterações foram descartadas",
    });
  };

  if (!isEditMode) {
    return (
      <Button
        className="fixed bottom-20 md:bottom-6 right-4 z-50 shadow-lg"
        size="sm"
        onClick={toggleEditMode}
      >
        <Pencil size={16} className="mr-2" /> Editar Conteúdo
      </Button>
    );
  }

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCancel}
        className="shadow-lg"
      >
        <X size={16} className="mr-2" /> Cancelar
      </Button>
      
      <Button
        variant={pendingChanges ? "default" : "outline"}
        size="sm"
        onClick={handleSave}
        className="shadow-lg"
        disabled={!pendingChanges}
      >
        <Save size={16} className="mr-2" /> Salvar
      </Button>
    </div>
  );
};

export default EditModeController; 