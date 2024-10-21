import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Adicione esta linha
import { connectDatabase } from './database/connection';
import invoiceRoutes from './routes/invoiceRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use('/api/invoices', invoiceRoutes);

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((error) => {
  console.error('Erro ao iniciar o servidor:', error);
});
