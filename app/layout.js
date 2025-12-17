import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header"; // <--- IMPORTANTE: Importar o Header

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portal de Eventos Culturais",
  description: "Desafio Técnico Front-end",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          
          {/* Substituímos o <header> manual pelo nosso Componente Inteligente */}
          <Header />

          <main className="p-4 container mx-auto min-h-screen">
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