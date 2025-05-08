import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Treino = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orientações de Treino</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Aqui você encontra vídeos, PDFs e links com orientações gerais e específicas de treino.</p>
        {/* Espaço para upload/admin e listagem de conteúdos */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-gray-100 rounded p-4">Vídeo de exemplo (embed ou player local)</div>
          <div className="bg-gray-100 rounded p-4">PDF de exemplo (link para download)</div>
        </div>
        <div className="mt-6">Links úteis: <a href="#" className="text-primary underline">Exemplo de link</a></div>
      </CardContent>
    </Card>
  );
};

export default Treino; 