# ☕ Coffee Delivery — Integração Full Stack

Este projeto reúne **front-end** e **back-end** do Coffee Delivery para a atividade prática de **Integração Full Stack**, utilizando dados reais de uma API conectada ao banco de dados.

---

## 📁 Estrutura do Projeto

coffee-delivery/
├── g1-frontend-coffee-delivery/ # Front-end (React + Vite + TypeScript)
└── g2-backend-coffee-delivery/ # Back-end (NestJS + Prisma + PostgreSQL)


---

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js (v18+)
- npm ou yarn
- PostgreSQL ou conta no [Neon](https://neon.tech/)
- (Opcional) Insomnia ou Postman para testar a API

---

### 📦 Clonando o projeto

```bash
git clone https://github.com/renato123b/coffee-delivery-final.git
cd coffee-delivery-final

🛠️ Rodando o Back-end

cd g2-backend-coffee-delivery

# Instale as dependências
npm install

# Crie o arquivo .env e configure a URL do banco PostgreSQL
cp .env.example .env

# Gere o cliente Prisma
npx prisma generate

# Realize as migrações e conecte ao banco
npx prisma migrate deploy

# Inicie o servidor
npm run start:dev

💻 Rodando o Front-end
cd ../g1-frontend-coffee-delivery

# Instale as dependências
npm install

# Rode o projeto
npm run dev

🔁 Funcionalidades Implementadas
✅ Listagem de cafés a partir da API

✅ Visualização dos detalhes de um café

✅ Integração com banco de dados via Prisma + PostgreSQL

✅ Remoção total dos dados mockados do front-end

✅ Organização em monorepo com front-end e back-end juntos

🧪 Testando com Insomnia
Importe o seguinte endpoint:

GET http://localhost:3000/coffees

Você pode adicionar cafés via:

POST http://localhost:3000/coffees
Content-Type: application/json

{
  "name": "Café Expresso",
  "description": "Forte e encorpado",
  "price": 9.5,
  "imageUrl": "https://exemplo.com/imagem.jpg",
  "tagIds": []
}

✅ Entrega
Repositório com front-end e back-end organizados no mesmo projeto, conforme solicitado na atividade.

🧠 Tecnologias Utilizadas
Front-end: React, TypeScript, Vite, Styled-components, Axios

Back-end: NestJS, Prisma ORM, PostgreSQL

Banco de dados: Neon.tech

Testes de API: Insomnia

👨‍💻 Autor
Renato Carvalho

