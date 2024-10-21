import React from 'react';

interface InvoiceCardProps {
  title: string;
  value: string;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ title, value }) => {
  return (
    <div className="invoice-card">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
};

export default InvoiceCard;
