import { Request, Response } from 'express';
import { pool } from '../models/invoiceModel';

export const getDashboardData = async (req: Request, res: Response): Promise<void> => {
    try {
        const energyQuery = `
            SELECT
                TO_CHAR(reference_month, 'Mon') AS month,
                SUM(energy_consumption_quantity + energy_sceee_quantity) AS consumption,
                SUM(energy_compensated_quantity) AS compensated
            FROM invoices
            GROUP BY month
            ORDER BY MIN(reference_month);
        `;

        const financialQuery = `
            SELECT
                TO_CHAR(reference_month, 'Mon') AS month,
                SUM(energy_consumption_value + energy_sceee_value + ilum_publica_value) AS total_value,
                SUM(energy_compensated_value) AS savings
            FROM invoices
            GROUP BY month
            ORDER BY MIN(reference_month);
        `;

        const energyData = await pool.query(energyQuery);
        const financialData = await pool.query(financialQuery);

        res.status(200).json({ energy: energyData.rows, financial: financialData.rows });
    } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
    }
};

export const getTotals = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = `
            SELECT
                SUM(energy_consumption_quantity + energy_sceee_quantity) AS total_consumption,
                SUM(energy_compensated_value) AS total_savings,
                COUNT(*) AS total_invoices
            FROM invoices;
        `;
        const result = await pool.query(query);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar totais:', error);
        res.status(500).json({ error: 'Erro ao buscar totais' });
    }
};


export const saveInvoiceData = async (invoiceData: any, filename: string): Promise<void> => {
    const query = `
        INSERT INTO invoices (client_number, reference_month, energy_consumption_quantity, 
        energy_consumption_value, energy_sceee_quantity, energy_sceee_value, energy_compensated_quantity, 
        energy_compensated_value, ilum_publica_value, filename)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;
    const values = [
        invoiceData.client_number,
        invoiceData.referenceMonth,
        invoiceData.energyConsumptionQuantity,
        invoiceData.energyConsumptionValue,
        invoiceData.energySceeeQuantity,
        invoiceData.energySceeeValue,
        invoiceData.energyCompensatedQuantity,
        invoiceData.energyCompensatedValue,
        invoiceData.ilumPublicaValue,
        filename
    ];

    await pool.query(query, values);
};

