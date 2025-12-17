// app/events/[id]/page.js
"use client"; 

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Pega o ID da URL
import Link from 'next/link';

export default function EventDetails() {
  const { id } = useParams(); // Ex: se a url for /events/1, id = 1
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        // Como é mock, buscamos tudo e filtramos. Na vida real, seria fetch(`/api/events/${id}`)
        const res = await fetch('/api/events');
        const allEvents = await res.json();
        
        // O ID da URL vem como texto, por isso usamos "==" para comparar com número
        const foundEvent = allEvents.find((e) => e.id == id);
        
        setEvent(foundEvent);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (loading) return <div className="p-10 text-center text-gray-500">Carregando detalhes...</div>;

  if (!event) return (
    <div className="p-10 text-center">
      <h2 className="text-xl font-bold text-red-500">Evento não encontrado!</h2>
      <Link href="/" className="text-blue-600 hover:underline mt-4 block">Voltar para Home</Link>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200 text-black">
      {/* Cabeçalho */}
      <div className="border-b pb-4 mb-4">
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          {event.category}
        </span>
        <h1 className="text-3xl font-bold text-blue-700 mt-2">{event.name}</h1>
      </div>

      {/* Informações */}
      <div className="space-y-4">
        <p className="text-gray-700 text-lg leading-relaxed">
          {event.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase">Data</p>
            <p className="font-medium">{event.date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase">Local</p>
            <p className="font-medium">{event.location}</p>
          </div>
        </div>
      </div>

      {/* Botão Voltar */}
      <div className="mt-8">
        <Link 
          href="/" 
          className="text-gray-600 hover:text-blue-600 font-medium transition flex items-center gap-2"
        >
          ← Voltar para a lista
        </Link>
      </div>
    </div>
  );
}