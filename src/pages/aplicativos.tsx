import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const apps = [
  {
    nome: 'MyFitnessPal',
    descricao: 'Controle sua alimentação e calorias.',
    icone: 'https://play-lh.googleusercontent.com/1.png',
    link: 'https://www.myfitnesspal.com/',
  },
  {
    nome: 'Google Agenda',
    descricao: 'Organize seus compromissos e mentorias.',
    icone: 'https://play-lh.googleusercontent.com/2.png',
    link: 'https://calendar.google.com/',
  },
  {
    nome: 'Habitica',
    descricao: 'Crie hábitos saudáveis de forma gamificada.',
    icone: 'https://play-lh.googleusercontent.com/3.png',
    link: 'https://habitica.com/',
  },
];

const Aplicativos = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aplicativos Recomendados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {apps.map((app) => (
            <div key={app.nome} className="flex flex-col items-center bg-gray-100 rounded p-4">
              <img src={app.icone} alt={app.nome} className="w-16 h-16 mb-2 rounded" />
              <h3 className="font-semibold text-lg mb-1">{app.nome}</h3>
              <p className="text-sm text-center mb-2">{app.descricao}</p>
              <Button asChild size="sm" variant="outline">
                <a href={app.link} target="_blank" rel="noopener noreferrer">Baixar</a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Aplicativos; 