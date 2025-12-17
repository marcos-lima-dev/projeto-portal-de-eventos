// app/page.js
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Importei o Link pra botar botão de novo evento (opcional)
import EventCard from './components/EventCard';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. Estado para guardar o texto da busca
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events');
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

  // 2. Lógica de Filtro (Case insensitive: ignora maiúsculas/minúsculas)
  const filteredEvents = events.filter((event) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = event.name.toLowerCase().includes(term);
    const categoryMatch = event.category.toLowerCase().includes(term);
    return nameMatch || categoryMatch;
  });

  return (
    <div className="p-4">
      {/* Cabeçalho com Título e Busca */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Próximos Eventos</h2>
        
        {/* 3. Input de Busca */}
        <input 
          type="text" 
          placeholder="Buscar por nome ou categoria..." 
          className="bg-white text-black border border-gray-300 p-2 rounded-lg w-full md:w-80 focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Carregando eventos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            // Agora usamos o filteredEvents em vez de events
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              <p className="text-lg">Nenhum evento encontrado para "<strong>{searchTerm}</strong>".</p>
              <button 
                onClick={() => setSearchTerm('')} 
                className="text-blue-600 hover:underline mt-2"
              >
                Limpar busca
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}