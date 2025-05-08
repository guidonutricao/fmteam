import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Substituicoes = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Substituição de Alimentos</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Consulte substituições práticas para seu plano alimentar.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Alimento</th>
                <th className="p-2 border">Substitutos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">Arroz branco</td>
                <td className="p-2 border">Arroz integral, batata, mandioca</td>
              </tr>
              <tr>
                <td className="p-2 border">Frango grelhado</td>
                <td className="p-2 border">Peito de peru, carne magra, ovos</td>
              </tr>
              <tr>
                <td className="p-2 border">Leite</td>
                <td className="p-2 border">Bebida vegetal, iogurte natural</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Substituicoes; 