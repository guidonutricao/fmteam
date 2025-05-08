import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Incentivos = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Programa de Incentivo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Progresso de Metas</h3>
          <div className="mb-2">Check-ins realizados: <span className="font-bold">8/12</span></div>
          <Progress value={66} className="h-2 mb-4" />
          <div className="mb-2">Desafios concluídos: <span className="font-bold">3/5</span></div>
          <Progress value={60} className="h-2" />
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Selos Conquistados</h3>
          <div className="flex gap-2 flex-wrap">
            <span className="bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full font-bold">Check-in Pontual</span>
            <span className="bg-green-300 text-green-900 px-3 py-1 rounded-full font-bold">Desafio Cumprido</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Cartões de Incentivo</h3>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="bg-gray-100 rounded p-4">Parabéns! Você completou 3 meses de acompanhamento 🎉</div>
            <div className="bg-gray-100 rounded p-4">Meta de peso atingida! 🏆</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Incentivos; 