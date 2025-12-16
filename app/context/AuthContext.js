// app/context/AuthContext.js
"use client"; // Obrigatório porque usa hooks (useState, createContext)

import { createContext, useContext, useState } from "react";

// Cria o contexto
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Estado do usuário. Começa como null (deslogado)
  const [user, setUser] = useState(null);

  // Função de Login (Simulada)
  const login = () => {
    // Aqui a gente finge que validou o usuário
    const fakeUser = {
      id: 1,
      name: "Admin da Cultura",
      email: "admin@rio.rj.gov.br",
      avatar: "https://github.com/shadcn.png" // Opcional, só pra ficar bonito se quiser
    };
    
    setUser(fakeUser);
    // Dica extra: Poderia salvar no localStorage aqui se quisesse persistir
  };

  // Função de Logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para não precisar importar useContext toda hora
export function useAuth() {
  return useContext(AuthContext);
}