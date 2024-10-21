# Desafio de Extração e Apresentação de Faturas de Energia Elétrica

Este projeto visa desenvolver uma aplicação que extrai dados de faturas de energia elétrica em formato PDF, armazena essas informações em um banco de dados PostgreSQL, e disponibiliza-as por meio de uma aplicação web utilizando Node.js (Fastify ou Express) para o backend e React para o frontend.

# Iniciando

Esse é um projeto que utiliza:
- [Node.js](https://nodejs.org)
- [PostgreSQL](https://www.postgresql.org)
- [React.js](https://reactjs.org)
- [Documentação sobre APIs](https://expressjs.com/en/4x/api.html)

# Configurando

1. **Configuração do Ambiente**  
   - **Pré-requisitos**:
     - Node.js (versão 16.x ou superior)
     - PostgreSQL (versão 13.x ou superior)
     - NPM ou Yarn (gerenciador de pacotes)
     - Docker (opcional, mas recomendado para execução do PostgreSQL e da aplicação)
     
   - **Instalação do PostgreSQL via Docker**  
     Se preferir usar Docker para rodar o PostgreSQL, execute:
     ```bash
     docker run --name pg-faturas -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=faturas -p 5432:5432 -d postgres
     ```

2. **Backend (Node.js)**  
   - Clone o repositório do projeto:
     ```bash
     git clone <repo-url>
     cd backend
     ```
   - Instale as dependências do projeto:
     ```bash
     npm install
     ```
   - Configure as variáveis de ambiente: Crie um arquivo `.env` na raiz do backend com as seguintes variáveis:
     ```
     PORT=3000
     DATABASE_URL=postgres://admin:admin@localhost:5432/faturas
     ```
   - Migre o banco de dados:
     ```bash
     npx prisma migrate dev
     ```
   - Execute o servidor backend:
     ```bash
     npm run dev
     ```

3. **Frontend (React.js)**  
   - Navegue para o diretório do frontend:
     ```bash
     cd frontend
     ```
   - Instale as dependências:
     ```bash
     npm install
     ```
   - Configure as variáveis de ambiente: Crie um arquivo `.env` na raiz do frontend com a URL do backend:
     ```
     REACT_APP_API_URL=http://localhost:3000
     ```
   - Execute o servidor de desenvolvimento:
     ```bash
     npm start
     ```

4. **Banco de Dados (PostgreSQL)**  
## Estrutura das Tabelas
Tabela: invoices

```sql
     CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,              
    client_number VARCHAR(50),           
    reference_month DATE,              
    energy_consumption_quantity NUMERIC,
    energy_consumption_value NUMERIC, 
    energy_sceee_quantity NUMERIC,
    energy_sceee_value NUMERIC,
    energy_compensated_quantity NUMERIC,
    energy_compensated_value NUMERIC,
    ilum_publica_value NUMERIC 
);
```

## Consultas Úteis
- Total de energia consumida por cliente:
```sql
SELECT client_number, SUM(energy_consumption_quantity + energy_sceee_quantity) AS total_consumo
FROM invoices
GROUP BY client_number;     
```
- Faturas por cliente e mês:
  
```sql
SELECT * 
FROM invoices 
WHERE client_number = $1 AND reference_month = $2;
 ```

5. **Execução Completa da Aplicação**  

Após a configuração do backend e frontend, a aplicação estará disponível em:

## Backend: http://localhost:3000
## Frontend: http://localhost:5173

Use ferramentas como Postman ou Insomnia para enviar requisições aos endpoints.

6. **Testes e Qualidade de Código**  

Backend: Utilize o framework de testes como Jest para garantir a funcionalidade da API.
bash

```bash
     npm run test
```

Frontend: Utilize ferramentas como React Testing Library ou Cypress para testar a interface


## Onde pode me encontrar:
</div>
<div align="center"> 
  <a href="https://wa.me/5581992006647?text=Ola!%20Vi%20Seu%20perfil%20no%20GitHub!" target="_blank"><img align="center" src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" target="_blank"></a>
  <a href="https://t.me/PNascimentoDev" target="_blank"><img align="center" src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" target="_blank"></a>
  <a href="mailto:pnmelo2808@gmail.com"><img align="center" src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/priscila-nascimento-191447181/" target="_blank"><img align="center" src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</div>
