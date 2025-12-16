import { NextResponse } from 'next/server';

// 1. O BANCO DE DADOS FAKE (EM MEMÓRIA)
// Colocamos essa variável FORA das funções para ela não resetar a cada clique.
// Nota: Se reiniciar o servidor (npm run dev), ela volta ao original.
let events = [
  {
    id: 1,
    name: "Show de Jazz na Praça",
    description: "Um evento incrível com os melhores saxofonistas do Rio.",
    location: "Praça Mauá",
    date: "2023-12-25",
    category: "Música"
  },
  {
    id: 2,
    name: "Exposição de Arte Moderna",
    description: "Obras de artistas locais.",
    location: "Museu do Amanhã",
    date: "2023-12-28",
    category: "Exposição"
  }
];

// 2. ROTA GET (LISTAR EVENTOS)
export async function GET() {
  // Retorna a lista completa como JSON com status 200 (OK)
  return NextResponse.json(events);
}

// 3. ROTA POST (CRIAR NOVO EVENTO)
export async function POST(request) {
  try {
    // Lê os dados que o front-end mandou
    const data = await request.json();

    // Validação simples (Chama atenção da chefia: mostra que ele se preocupa com dados ruins)
    if (!data.name || !data.date) {
        return NextResponse.json(
            { message: "Nome e Data são obrigatórios" },
            { status: 400 }
        );
    }

    // Cria o novo evento com um ID simples (data atual em milissegundos é um truque fácil pra ID único)
    const newEvent = {
      id: Date.now(), 
      ...data, // Espalha os dados recebidos (name, description, etc)
    };

    // Salva no nosso array "banco de dados"
    events.push(newEvent);

    // Retorna o evento criado com status 201 (Criado com sucesso)
    return NextResponse.json(newEvent, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Erro ao criar evento" }, { status: 500 });
  }
}