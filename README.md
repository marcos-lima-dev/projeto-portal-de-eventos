# 🎭 Portal de Eventos Culturais - Rio de Janeiro

Este projeto é um desafio técnico para a vaga de **Analista de Sistemas Júnior (Front-end)**.
O objetivo é uma aplicação web para listar, visualizar e cadastrar eventos culturais, consumindo uma API simulada.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** (App Router)
- **React** (Hooks: useState, useEffect, Context API)
- **Tailwind CSS** (Estilização responsiva)
- **JavaScript ES6+**

## ⚙️ Funcionalidades

1.  **Listagem de Eventos:** Exibe cards com nome, data e local.
2.  **Detalhes do Evento:** Página dinâmica (`/events/[id]`) com informações completas.
3.  **Simulação de Login (SSO):**
    - Implementado via **Context API**.
    - Usuário "fake" para demonstrar controle de estado global e proteção de rotas.
4.  **Cadastro de Eventos:**
    - Formulário simples com validação básica.
    - Persistência em memória via API Route.

## ⚠️ Importante: Sobre a API e Dados

Como o foco do desafio é o **Front-end**, a API foi construída utilizando **Next.js API Routes** com persistência em memória (array local).

> **Nota:** Ao reiniciar o servidor (`npm run dev`), os eventos cadastrados manualmente serão resetados e voltarão ao estado inicial (mock). Isso foi uma decisão de projeto para manter a simplicidade e focar na construção da interface e fluxo de dados.

## 📂 Como Rodar o Projeto

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/marcos-lima-dev/projeto-portal-de-eventos.git](https://github.com/marcos-lima-dev/projeto-portal-de-eventos.git)
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
4.  Acesse `http://localhost:3000`.

## 🛠️ Estrutura de Pastas

A organização segue o padrão do **Next.js App Router**:

- `/app`: Páginas e Rotas (File-system routing).
- `/app/api`: Backend simulado (Mock).
- `/app/components`: Componentes reutilizáveis (Cards, Header, Forms).
- `/app/context`: Gerenciamento de estado global (Auth).

## 🔮 Melhorias Futuras

Se houvesse mais tempo ou necessidade de escalar o projeto, os próximos passos seriam:

- [ ] Implementar banco de dados real (PostgreSQL ou MySQL).
- [ ] Autenticação real com JWT/NextAuth.
- [ ] Testes unitários com Jest/Testing Library.
- [ ] Paginação dos eventos diretamente no Backend.

---
Desenvolvido por **Marcos Lima**.