import React, { useState, useEffect } from 'react';
import api from '../../services/api';

interface ClientFilterProps {
  onFilterChange: (clientId: string, period: string) => void;
}

const ClientFilter: React.FC<ClientFilterProps> = ({ onFilterChange }) => {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState('');
  const [period, setPeriod] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get('/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClientId(event.target.value);
    onFilterChange(event.target.value, period);
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriod(event.target.value);
    onFilterChange(clientId, event.target.value);
  };

  return (
    <div className="client-filter">
      <select value={clientId} onChange={handleClientChange}>
        <option value="">Select Client</option>
        {clients.map((client: any) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>
      <input
        type="month"
        value={period}
        onChange={handlePeriodChange}
        placeholder="Select Period"
      />
    </div>
  );
};

export default ClientFilter;
