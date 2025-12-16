import { Inter } from "next/font/google";
import "./globals.css";
// 1. Importar o Provider que criamos
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portal de Eventos Culturais",
  description: "Desafio Técnico Front-end",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* 2. Envolver tudo com o AuthProvider */}
        <AuthProvider>
          
          {/* Aqui vai entrar o Header jaja */}
          <header className="p-4 bg-blue-600 text-white flex justify-between">
            <h1 className="font-bold text-xl">RioEventos</h1>
            {/* O botão de login vai aqui depois */}
          </header>

          <main className="p-4 container mx-auto">
            {children}
          </main>

          <footer className="p-4 text-center text-gray-500 text-sm border-t mt-10">
            <p>© 2025 Prefeitura Fake do Rio - Desafio Técnico</p>
          </footer>

        </AuthProvider>
      </body>
    </html>
  );
}