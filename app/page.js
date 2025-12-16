// app/page.js
"use client"; // Obrigatório: diz que essa página roda no navegador (tem cliques, efeitos)

import { useState, useEffect } from 'react';
import EventCard from './components/EventCard'; // Vamos criar esse já já

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca os dados assim que a tela carrega
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events'); // Chama nossa rota fake
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Próximos Eventos</h2>
        {/* Futuro botão de "Novo Evento" entra aqui */}
      </div>

      {loading ? (
        <p className="text-gray-500">Carregando eventos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.length > 0 ? (
            events.map((event) => (
              // Passamos os dados para o componente Card (que vamos criar abaixo)
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p>Nenhum evento encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
}