import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InvoicesLibrary from './pages/InvoicesLibrary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/invoices-library" element={<InvoicesLibrary />} />
      </Routes>
    </Router>
  );
}

export default App;
