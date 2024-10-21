import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EnergyChartProps {
  data: Array<{ month: string; consumption: number; compensated: number }>;
}

const EnergyChart: React.FC<EnergyChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" label={{ value: 'Mês', position: 'insideBottomRight', offset: -5 }} />
        <YAxis label={{ value: 'Consumo (kWh)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend
          formatter={(value) => {
            if (value === 'consumption') return 'Consumo';
            if (value === 'compensated') return 'Compensado';
            return value;
          }}
        />
        <Line type="monotone" dataKey="consumption" name="Consumo" stroke="#8884d8" />
        <Line type="monotone" dataKey="compensated" name="Compensado" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EnergyChart;
