import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FinancialChartProps {
  data: Array<{ month: string; totalValue: number; savings: number }>;
}

const FinancialChart: React.FC<FinancialChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" label={{ value: 'Mês', position: 'insideBottomRight', offset: -5 }} />
        <YAxis label={{ value: 'Valor (R$)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend
          formatter={(value) => {
            if (value === 'totalValue') return 'Valor Total';
            if (value === 'savings') return 'Economia';
            return value;
          }}
        />
        <Bar dataKey="totalValue" name="Valor Total" fill="#8884d8" />
        <Bar dataKey="savings" name="Economia" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FinancialChart;
