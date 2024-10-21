import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
});

export const saveInvoiceData = async (data: any) => {
    const query = `
        INSERT INTO invoices (
            client_number, reference_month, 
            energy_consumption_quantity, energy_consumption_value, 
            energy_sceee_quantity, energy_sceee_value, 
            energy_compensated_quantity, energy_compensated_value, 
            ilum_publica_value
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    const values = [
        data.clientNumber || null,  
        data.referenceMonth || null,  
        data.energyElectricity?.quantity || 0,
        data.energyElectricity?.value || 0,
        data.energySCEEE?.quantity || 0,
        data.energySCEEE?.value || 0,
        data.energyCompensated?.quantity || 0,
        data.energyCompensated?.value || 0,
        data.ilumPublicaValue || 0
    ];

    try {
        await pool.query(query, values);
    } catch (error) {
        console.error('Error saving invoice data:', error);
        throw error;
    }
};
