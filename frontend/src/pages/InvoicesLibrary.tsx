import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/InvoicesLibrary.css';

interface Invoice {
    id: number;
    client_number: string;
    reference_month: string;
    energy_consumption_value: number;
    energy_sceee_value: number;
    energy_compensated_value: number;
    ilum_publica_value: number;
}

const InvoicesLibrary: React.FC = () => {
    const [clientNumber, setClientNumber] = useState<string>('');
    const [referenceMonth, setReferenceMonth] = useState<string>('');
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    
    const navigate = useNavigate();

    const handleFetchInvoices = async () => {
        setLoading(true);
        try {
            const response = await api.get('/invoices/summary', {
                params: {
                    client_number: clientNumber || undefined,
                    reference_month: referenceMonth || undefined,
                },
            });
            setInvoices(response.data);
        } catch (error) {
            console.error('Erro ao buscar faturas:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadInvoice = (invoiceId: number) => {
        const link = document.createElement('a');
        link.href = `${process.env.REACT_APP_API_URL}/invoices/download/${invoiceId}`;
        link.setAttribute('download', `fatura-${invoiceId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="invoices-container">
            <h1>Biblioteca de Faturas</h1>
            <div className="filters">
                <div className="input-group">
                    <label htmlFor="clientNumber">Número do Cliente</label>
                    <input
                        id="clientNumber"
                        type="text"
                        placeholder="Digite o número do cliente"
                        value={clientNumber}
                        onChange={(e) => setClientNumber(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="referenceMonth">Mês de Referência</label>
                    <input
                        id="referenceMonth"
                        type="month"
                        value={referenceMonth}
                        onChange={(e) => setReferenceMonth(e.target.value)}
                        className="input-field"
                    />
                </div>
                <button className="fetch-button" onClick={handleFetchInvoices}>Buscar Faturas</button>
            </div>

            {loading ? (
                <p>Carregando faturas...</p>
            ) : (
                <>
                    {invoices.length === 0 ? (
                        <p>Nenhuma fatura encontrada para os critérios fornecidos.</p>
                    ) : (
                        <table className="invoices-table">
                            <thead>
                                <tr>
                                    <th>Número do Cliente</th>
                                    <th>Mês de Referência</th>
                                    <th>Consumo de Energia (R$)</th>
                                    <th>Valor Energia SCEE (R$)</th>
                                    <th>Valor Energia Compensada (R$)</th>
                                    <th>Iluminação Pública (R$)</th>
                                    <th>Baixar Fatura</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((invoice) => (
                                    <tr key={invoice.id}>
                                        <td>{invoice.client_number}</td>
                                        <td>{new Date(invoice.reference_month).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}</td>
                                        <td>R$ {invoice.energy_consumption_value.toFixed(2)}</td>
                                        <td>R$ {invoice.energy_sceee_value.toFixed(2)}</td>
                                        <td>R$ {invoice.energy_compensated_value.toFixed(2)}</td>
                                        <td>R$ {invoice.ilum_publica_value.toFixed(2)}</td>
                                        <td>
                                            <button className="download-button" onClick={() => handleDownloadInvoice(invoice.id)}>
                                                Baixar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}

            <button className="back-button" onClick={() => window.location.href = 'http://localhost:5173/'}>
                Voltar para Dashboard
            </button>

        </div>
    );
};

export default InvoicesLibrary;
