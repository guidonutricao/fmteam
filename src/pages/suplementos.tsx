import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const suplementos = [
  {
    nome: 'Whey Protein',
    descricao: 'Proteína de alta qualidade para recuperação muscular.',
    imagem: 'https://via.placeholder.com/80',
    link: 'https://www.exemplo.com/whey',
    cupom: 'NUTRIFM10',
  },
  {
    nome: 'Creatina',
    descricao: 'Aumenta força e desempenho nos treinos.',
    imagem: 'https://via.placeholder.com/80',
    link: 'https://www.exemplo.com/creatina',
    cupom: 'NUTRIFM10',
  },
];

const Suplementos = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suplementos com Desconto</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {suplementos.map((sup) => (
            <div key={sup.nome} className="flex gap-4 items-center bg-gray-100 rounded p-4">
              <img src={sup.imagem} alt={sup.nome} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{sup.nome}</h3>
                <p className="text-sm mb-2">{sup.descricao}</p>
                <div className="flex gap-2 items-center">
                  <Button asChild size="sm" variant="outline">
                    <a href={sup.link} target="_blank" rel="noopener noreferrer">Ver produto</a>
                  </Button>
                  <span className="bg-yellow-200 text-yellow-900 px-2 py-1 rounded text-xs font-bold">Cupom: {sup.cupom}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Suplementos; 