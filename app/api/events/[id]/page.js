// app/events/[id]/page.js
"use client"; // Client Component porque vamos usar Hooks

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Hook para pegar o ID da URL
import Link from 'next/link';

export default function EventDetails() {
  const { id } = useParams(); // Pega o número que está na URL (ex: 1)
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Como nossa API é simples, vamos buscar tudo e filtrar aqui.
    // Numa API real, você faria fetch(`/api/events/${id}`)
    async function fetchEvent() {
      try {
        const res = await fetch('/api/events');
        const allEvents = await res.json();
        
        // O ID da URL vem como texto (string), por isso o "==" e não "==="
        // ou convertemos: parseInt(id)
        const foundEvent = allEvents.find((e) => e.id == id);
        
        setEvent(foundEvent);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Carregando detalhes...</div>;

  if (!event) return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-bold text-red-500">Evento não encontrado!</h2>
      <Link href="/" className="text-blue-600 hover:underline mt-4 block">Voltar para Home</Link>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 mt-6 text-black">
      {/* Cabeçalho do Card */}
      <div className="bg-blue-600 p-6 text-white">
        <h1 className="text-3xl font-bold">{event.name}</h1>
        <p className="opacity-90 mt-2">{event.category}</p>
      </div>

      {/* Corpo com Detalhes */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-gray-500 text-sm font-bold uppercase">Data e Horário</h3>
          <p className="text-lg">{event.date}</p>
        </div>

        <div>
          <h3 className="text-gray-500 text-sm font-bold uppercase">Local</h3>
          <p className="text-lg">{event.location}</p>
        </div>

        <div>
          <h3 className="text-gray-500 text-sm font-bold uppercase">Sobre o evento</h3>
          <p className="text-gray-700 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Botão de Voltar */}
        <div className="pt-6 border-t mt-6">
          <Link 
            href="/" 
            className="inline-block bg-gray-100 text-gray-700 px-6 py-2 rounded hover:bg-gray-200 transition font-medium"
          >
            ← Voltar para a lista
          </Link>
        </div>
      </div>
    </div>
  );
}