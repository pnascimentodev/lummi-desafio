import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InvoiceCard from '../components/Dashboard/InvoiceCard';
import api from '../services/api';
import EnergyChart from '../components/Dashboard/EnergyChart';
import FinancialChart from '../components/Dashboard/FinancialChart';
import '../styles/Dashboard.css';

interface Totals {
    total_consumption: string;
    total_savings: string;
    total_invoices: string;
}

const Dashboard: React.FC = () => {
    const [energyData, setEnergyData] = useState<any[]>([]);
    const [financialData, setFinancialData] = useState<any[]>([]);
    const [totals, setTotals] = useState<Totals>({ total_consumption: "0", total_savings: "0", total_invoices: "0" });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [dashboardRes, totalsRes] = await Promise.all([
                    api.get('/invoices/dashboard'),
                    api.get('/invoices/totals')
                ]);
                setEnergyData(dashboardRes.data.energy);
                setFinancialData(dashboardRes.data.financial);
                setTotals({
                    total_consumption: totalsRes.data.total_consumption,
                    total_savings: totalsRes.data.total_savings,
                    total_invoices: totalsRes.data.total_invoices,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">DASHBOARD DE CONSUMO</h1>
            <div className="card-container">
                <InvoiceCard title="Consumo total (kWh)" value={`${totals.total_consumption} kWh`} />
                <InvoiceCard title="Economia Total (R$)" value={`R$ ${parseFloat(totals.total_savings).toFixed(2)}`} />
                <InvoiceCard title="Total de faturas" value={`${totals.total_invoices}`} />
            </div>
            <div className="chart-container">
                <EnergyChart data={energyData} />
                <FinancialChart data={financialData} />
            </div>
            <button className="navigate-button" onClick={() => navigate('/invoices-library')}>Acessar Faturas</button>
        </div>
    );
};

export default Dashboard;
