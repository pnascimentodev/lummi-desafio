import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

console.log('DB_PASSWORD:', process.env.DB_PASSWORD);


const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);



export const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
};

export default sequelize;
