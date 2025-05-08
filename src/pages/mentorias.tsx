import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Mentorias = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mentorias em Grupo com Psicóloga</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <iframe
            title="Google Agenda"
            src="https://calendar.google.com/calendar/embed?src=pt.brazilian%23holiday%40group.v.calendar.google.com&ctz=America%2FSao_Paulo"
            style={{ border: 0, width: '100%', height: 300 }}
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Button asChild variant="outline">
            <a href="https://zoom.us/" target="_blank" rel="noopener noreferrer">Acessar Zoom</a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://meet.google.com/" target="_blank" rel="noopener noreferrer">Acessar Google Meet</a>
          </Button>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Vídeos Gravados</h3>
          <div className="bg-gray-100 rounded p-4">Vídeo gravado de exemplo</div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Envie sua dúvida</h3>
          <textarea className="w-full border rounded p-2" placeholder="Digite sua dúvida aqui..." rows={3}></textarea>
          <Button className="mt-2">Enviar</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Mentorias; 