// app/components/Header.jsx
"use client"; // Precisa ser client porque tem clique (interatividade)

import Link from "next/link";
import { useAuth } from "../context/AuthContext"; // Importa nosso hook

export default function Header() {
  const { user, login, logout } = useAuth(); // Pega os dados do contexto

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo que leva pra Home */}
        <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition">
          RioEventos
        </Link>

        {/* Área do Usuário */}
        <nav className="flex items-center gap-4">
          {user ? (
            // SE ESTIVER LOGADO (user existe)
            <div className="flex items-center gap-4">
              <span className="text-sm">Olá, <strong>{user.name}</strong></span>
              <Link 
                href="/create" 
                className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-bold hover:bg-gray-100"
              >
                + Novo Evento
              </Link>
              <button 
                onClick={logout} 
                className="text-sm hover:underline text-blue-200"
              >
                Sair
              </button>
            </div>
          ) : (
            // SE ESTIVER DESLOGADO (user é null)
            <button 
              onClick={login} 
              className="bg-blue-800 px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
            >
              Simular Login SSO
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}