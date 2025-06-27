# ☕ Coffee Delivery - Integração Full Stack

Este é o projeto completo da aplicação **Coffee Delivery**, unindo **front-end** e **back-end**, com consumo de dados reais de uma **API RESTful** conectada a um banco **PostgreSQL**.

> 💻 Projeto Final da disciplina **Desenvolvimento de Software para Web - Integração Full Stack (2025)**.

---

## 🚀 Tecnologias Utilizadas

- **Front-end**
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/)
  - [Axios](https://axios-http.com/)
  - [Styled-components](https://styled-components.com/)

- **Back-end**
  - [NestJS](https://nestjs.com/)
  - [Prisma ORM](https://www.prisma.io/)
  - [PostgreSQL](https://www.postgresql.org/)
  - [Class Validator](https://github.com/typestack/class-validator)

---

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/renato123b/coffee-delivery-final.git
cd coffee-delivery-final
```
🧱 Backend (NestJS + Prisma)

1. Acesse o diretório:
```bash
cd g2-backend-coffee-delivery
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
Crie um arquivo .env com sua DATABASE_URL do PostgreSQL:

```env
DATABASE_URL=postgresql://usuario:senha@host:porta/nome_do_banco?sslmode=require
```

4. Execute as migrações e gere o client:
```bash
npx prisma generate
npx prisma migrate deploy
```

5. Inicie o servidor:
```bash
npm run start:dev
```
O backend estará em http://localhost:3000

💻 Frontend (React + Vite)
1. Acesse o diretório:
```bash
cd ../g1-frontend-coffee-delivery
```
2. Instale as dependências:
```bash
npm install
```
3. Ajuste a URL base da API:
No arquivo src/serves/api.ts, altere a URL para:

```ts
export const api = axios.create({
  baseURL: 'http://localhost:3000',
})
```

4. Inicie a aplicação:
```bash
npm run dev
```
O front-end estará em http://localhost:5173

📘 Funcionalidades
✅ Listar cafés (dados da API)

✅ Visualizar detalhes de um café

✅ (Opcional) Carrinho e finalização de pedido com persistência

✅ Consumo via Axios com remoção total de mocks

✅ Integração completa com banco de dados PostgreSQL

🔁 Endpoints da API
Cafés (/coffees)

GET /coffees

GET /coffees/:id

POST /coffees

PATCH /coffees/:id

DELETE /coffees/:id

GET /coffees/search

Carrinho (/cart)

POST /cart

GET /cart/:id

POST /cart/:id/items

PATCH /cart/:id/items/:itemId

DELETE /cart/:id/items/:itemId

Checkout (/checkout)

POST /checkout

🧪 Testes com Insomnia
Você pode testar todos os endpoints com o Insomnia ou Postman.
Exemplo para listar cafés:

```
bash
GET http://localhost:3000/coffees
```
📁 Estrutura de Pastas
```bash
coffee-delivery/
├── g1-frontend-coffee-delivery/   # Front-end React
└── g2-backend-coffee-delivery/    # Back-end NestJS
```
O projeto está organizado em monorepo com os dois projetos integrados, pronto para ser testado de ponta a ponta com dados reais da API.

🧠 Autor
Desenvolvido por Renatinho — 2025
GitHub: renato123b
