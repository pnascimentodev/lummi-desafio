import fs from 'fs';
import pdfParse from 'pdf-parse';
import { PDFDocument } from 'pdf-lib';

export const extractDataFromPDF = async (filePath: string) => {
    const fileBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(fileBuffer);
    const text = data.text.replace(/\s+/g, ' ').trim(); // Limpa espaços extras

    console.log("Texto extraído:", text);

    const clientNumberMatch = text.match(/N[ºo]{1}\s*DO\s*CLIENTE\s*(?:N[ºo]{1}\s*DA\s*INSTALAÇÃO\s*)?(\d+)/i);
    const referenceMonthMatch = text.match(/Referente a\s+Vencimento\s+Valor a pagar\s+\(R\$\)\s+([A-Z]{3}\/\d{4})/i);
    const energyElectricityMatch = text.match(/Energia\s*Elétrica\s*\(?kWh\)?\s*(\d+)\s*[\d,\.]+\s*([\d,\.]+)/i);
    const energySCEEEICMSMatch = text.match(/Energia\s*SCEE{1,2}\s*s\/?\s*ICMS\s*\(?kWh\)?\s*(\d+)\s*[\d,\.]+\s*([\d,\.]+)/i);
    const energyCompensatedGDIMatch = text.match(/Energia\s*compensada\s*GD\s*I\s*\(?kWh\)?\s*(\d+)\s*[\d,\.]+\s*([\-\d,\.]+)/i);
    const ilumPublicaMatch = text.match(/Contrib\s*Ilum\s*Publica\s*Municipal\s*([\d,\.]+)/i);
    

    const extractedData = {
        clientNumber: clientNumberMatch ? clientNumberMatch[1].trim() : null,
        referenceMonth: referenceMonthMatch ? referenceMonthMatch[1].trim() : null,
        energyElectricity: energyElectricityMatch ? {
            quantity: parseFloat(energyElectricityMatch[1].replace(',', '.')),
            value: parseFloat(energyElectricityMatch[2].replace(',', '.')),
        } : null,       
        energySCEEE: energySCEEEICMSMatch ? {
            quantity: parseFloat(energySCEEEICMSMatch[1].replace(',', '.')),
            value: parseFloat(energySCEEEICMSMatch[2].replace(',', '.')),
        } : null,        
        energyCompensated: energyCompensatedGDIMatch ? {
            quantity: parseFloat(energyCompensatedGDIMatch[1].replace(',', '.')),
            value: parseFloat(energyCompensatedGDIMatch[2].replace(',', '.')),
        } : null,        
        ilumPublicaValue: ilumPublicaMatch ? parseFloat(ilumPublicaMatch[1].replace(',', '.')) : null,
    };
    

    console.log("Extracted Data:", extractedData);
    return extractedData;
};

const parseNumber = (str: string) => {
    const num = parseFloat(str.replace(/\./g, '').replace(',', '.'));
    return isNaN(num) ? null : num; // Retorna null se não for um número válido
};

