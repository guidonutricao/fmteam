import React, { createContext, useContext, useState } from 'react';

interface EditContextType {
  isEditMode: boolean;
  pendingChanges: boolean;
  toggleEditMode: () => void;
  setPendingChanges: (hasPendingChanges: boolean) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

const EditContext = createContext<EditContextType | undefined>(undefined);

export const EditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
    if (pendingChanges) {
      setPendingChanges(false);
    }
  };

  const saveChanges = () => {
    // Seria necessário implementar lógica para salvar no banco de dados
    // Por enquanto, apenas limpa o estado de mudanças pendentes
    setPendingChanges(false);
  };

  const cancelChanges = () => {
    // Cancela o modo de edição e descarta as mudanças
    setIsEditMode(false);
    setPendingChanges(false);
  };

  return (
    <EditContext.Provider value={{ 
      isEditMode, 
      pendingChanges, 
      toggleEditMode, 
      setPendingChanges,
      saveChanges,
      cancelChanges
    }}>
      {children}
    </EditContext.Provider>
  );
};

export const useEdit = () => {
  const ctx = useContext(EditContext);
  if (!ctx) throw new Error('useEdit deve ser usado dentro de EditProvider');
  return ctx;
}; 