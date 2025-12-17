// app/create/page.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Hook para redirecionar
import { useAuth } from '../context/AuthContext';

export default function CreateEvent() {
  const { user } = useAuth();
  const router = useRouter();

  // Estados do formulário
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
    category: 'Música' // Valor padrão
  });

  const [loading, setLoading] = useState(false);

  // 🔒 PROTEÇÃO DE ROTA
  // Se não tiver usuário, manda pra home.
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  // Atualiza o estado quando digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Envia o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Não deixa a página recarregar
    setLoading(true);

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Evento cadastrado com sucesso!');
        router.push('/'); // Volta pra home pra ver o novo evento
      } else {
        alert('Erro ao cadastrar evento.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  // Se não estiver logado, não renderiza nada (enquanto redireciona)
  if (!user) return null;

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded shadow border border-gray-200 mt-10 text-black">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Cadastrar Novo Evento</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Nome */}
        <div>
          <label className="block text-sm font-bold mb-1">Nome do Evento</label>
          <input 
            type="text" 
            name="name" 
            required 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ex: Show de Rock"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Data e Local */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Data</label>
            <input 
              type="date" 
              name="date" 
              required 
              className="w-full border p-2 rounded"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Local</label>
            <input 
              type="text" 
              name="location" 
              required 
              className="w-full border p-2 rounded"
              placeholder="Ex: Lapa"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-sm font-bold mb-1">Categoria</label>
          <select 
            name="category" 
            className="w-full border p-2 rounded bg-white"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Música">Música</option>
            <option value="Teatro">Teatro</option>
            <option value="Exposição">Exposição</option>
            <option value="Infantil">Infantil</option>
          </select>
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-bold mb-1">Descrição</label>
          <textarea 
            name="description" 
            rows="3" 
            className="w-full border p-2 rounded"
            placeholder="Detalhes do evento..."
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Botão Salvar */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? 'Salvando...' : 'Cadastrar Evento'}
        </button>

      </form>
    </div>
  );
}