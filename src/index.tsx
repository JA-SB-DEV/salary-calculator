import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import SalaryCalculator from './components/SalaryCalculator';

const Main: React.FC = () => {
  const [presupuesto, setPresupuesto] = useState<number | null>(null);
  const [presupuestoRestante, setPresupuestoRestante] = useState<number | null>(null);

  return (
    <React.StrictMode>
      <App
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        presupuestoRestante={presupuestoRestante}
        setPresupuestoRestante={setPresupuestoRestante}
      />
      <SalaryCalculator
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        presupuestoRestante={presupuestoRestante}
        setPresupuestoRestante={setPresupuestoRestante}
      />
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Main />);
