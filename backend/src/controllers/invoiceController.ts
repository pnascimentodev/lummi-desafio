import { Request, Response } from 'express';
import { extractDataFromPDF } from '../utils/dataExtractor';
import { saveInvoiceData } from '../models/invoiceModel';
import { pool } from '../models/invoiceModel';
import fs from 'fs';
import path from 'path';

const convertToValidDate = (monthYear: string): string | null => {
    const monthMap: { [key: string]: string } = {
        'JAN': '01',
        'FEV': '02',
        'MAR': '03',
        'ABR': '04',
        'MAI': '05',
        'JUN': '06',
        'JUL': '07',
        'AGO': '08',
        'SET': '09',
        'OUT': '10',
        'NOV': '11',
        'DEZ': '12'
    };

    const [monthAbbr, year] = monthYear.split('/');
    
    if (monthAbbr && year && monthMap[monthAbbr]) {
        return `${year}-${monthMap[monthAbbr]}-01`;
    }

    return null;
};

export const uploadInvoice = async (req: Request, res: Response): Promise<void> => {
    const file = req.file;

    if (!file || !file.path) {
        console.log("Nenhum arquivo recebido ou caminho inválido.");
        res.status(400).json({ error: 'Arquivo é obrigatório' });
        return;
    }

    console.log("Arquivo recebido:", file);

    try {
        const extractedData = await extractDataFromPDF(file.path);

        if (extractedData.referenceMonth) {
            extractedData.referenceMonth = convertToValidDate(extractedData.referenceMonth);
        }

        await saveInvoiceData(extractedData);

        if (fs.existsSync(file.path)) {
            console.log("Arquivo salvo com sucesso:", file.path);
        } else {
            console.log("O arquivo não foi encontrado após o upload.");
        }

        res.status(200).json({ message: 'Dados da fatura salvos com sucesso' });
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'Erro desconhecido';
        console.error('Erro durante o processamento:', errorMessage);
        res.status(500).json({ error: errorMessage });
    }
};

export const getInvoiceSummary = async (req: Request, res: Response): Promise<void> => {
    const { client_number, reference_month } = req.query;

    let query = 'SELECT * FROM invoices';
    let queryParams: any[] = [];

    if (client_number) {
        query += ' WHERE client_number = $1';
        queryParams.push(client_number);
    }

    if (reference_month) {
        const monthStart = new Date(`${reference_month}-01`);
        const monthEnd = new Date(monthStart);
        monthEnd.setMonth(monthStart.getMonth() + 1);

        if (queryParams.length > 0) {
            query += ' AND reference_month BETWEEN $2 AND $3';
        } else {
            query += ' WHERE reference_month BETWEEN $1 AND $2';
        }

        queryParams.push(monthStart, monthEnd);
    }

    try {
        const result = await pool.query(query, queryParams);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar faturas:', error);
        res.status(500).json({ error: 'Erro ao buscar faturas' });
    }
};


export const downloadInvoice = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const invoice = await pool.query('SELECT * FROM invoices WHERE id = $1', [id]);
        if (invoice.rows.length === 0) {
            res.status(404).send('Fatura não encontrada');
            return;
        }
        const filename = invoice.rows[0].filename;
        const filePath = path.join(__dirname, '../../uploads', filename);

        if (fs.existsSync(filePath)) {
            res.download(filePath);
        } else {
            res.status(404).send('Arquivo não encontrado');
        }
    } catch (error) {
        console.error('Erro ao baixar fatura:', error);
        res.status(500).send('Erro ao baixar fatura');
    }
};
