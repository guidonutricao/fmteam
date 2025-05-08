import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ebooks = [
  {
    titulo: 'Guia de Alimentação Esportiva',
    descricao: 'Tudo sobre nutrição para atletas iniciantes.',
    capa: 'https://via.placeholder.com/100x140',
    arquivo: '#',
  },
  {
    titulo: 'Receitas Fit',
    descricao: 'Receitas práticas e saudáveis para o dia a dia.',
    capa: 'https://via.placeholder.com/100x140',
    arquivo: '#',
  },
];

const Ebooks = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ebooks e Materiais Bônus</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {ebooks.map((ebook) => (
            <div key={ebook.titulo} className="flex flex-col items-center bg-gray-100 rounded p-4">
              <img src={ebook.capa} alt={ebook.titulo} className="w-24 h-32 mb-2 rounded shadow" />
              <h3 className="font-semibold text-lg mb-1 text-center">{ebook.titulo}</h3>
              <p className="text-sm text-center mb-2">{ebook.descricao}</p>
              <Button asChild size="sm" variant="outline">
                <a href={ebook.arquivo} download>Baixar</a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Ebooks; 