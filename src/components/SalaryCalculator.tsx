import React, { useState, useEffect } from 'react';
import './SalaryCalculator.css';

const PRESUPUESTO_INICIAL = 1000000000;

type TipoDocente = 'Auxiliar' | 'Asistente' | 'Asociado' | 'Titular';
type Formacion = 'Pregrado' | 'Especialización' | 'Maestría' | 'Doctorado' | 'Dos Maestrías' | 'Dos Doctorados' | 'Especialización Clínica';
type Categoria = 'Auxiliar' | 'Asistente' | 'Asociado' | 'Titular';
type Experiencia = 'Investigación' | 'Docencia' | 'Dirección Académica' | 'Profesional No Docente';
type Productividad = 'A1' | 'A2' | 'B' | 'C' | 'Libro Investigación' | 'Libro Texto' | 'Patente' | 'Premio' | 'Software';
type Cargo = 'Rector' | 'Vicerrector' | 'Secretario General' | 'Decano' | 'Director de Programa';

const VALORES_BASE: Record<TipoDocente, number> = {
  "Auxiliar": 4000000,
  "Asistente": 5000000,
  "Asociado": 7000000,
  "Titular": 9000000
};
const VALOR_PUNTO = 20895;

const puntosFormacion: Record<Formacion, number> = {
  "Pregrado": 178,
  "Especialización": 20,
  "Maestría": 40,
  "Doctorado": 80,
  "Dos Maestrías": 60,
  "Dos Doctorados": 120,
  "Especialización Clínica": 15
};

const puntosCategoria: Record<Categoria, number> = {
  "Auxiliar": 37,
  "Asistente": 58,
  "Asociado": 74,
  "Titular": 96
};

const puntosExperiencia: Record<Experiencia, number> = {
  "Investigación": 6,
  "Docencia": 4,
  "Dirección Académica": 4,
  "Profesional No Docente": 3
};

const puntosProductividad: Record<Productividad, number> = {
  "A1": 15,
  "A2": 12,
  "B": 8,
  "C": 3,
  "Libro Investigación": 20,
  "Libro Texto": 15,
  "Patente": 25,
  "Premio": 15,
  "Software": 15
};

const puntosCargos: Record<Cargo, number> = {
  "Rector": 11,
  "Vicerrector": 9,
  "Secretario General": 9,
  "Decano": 6,
  "Director de Programa": 6
};

interface SalaryCalculatorProps {
  presupuesto: number | null;
  setPresupuesto: (presupuesto: number) => void;
  presupuestoRestante: number | null;
  setPresupuestoRestante: (presupuesto: number) => void;
}

const SalaryCalculator: React.FC<SalaryCalculatorProps> = ({ presupuesto, setPresupuesto, presupuestoRestante, setPresupuestoRestante }) => {
  const [mensaje, setMensaje] = useState('');
  const [notificationClass, setNotificationClass] = useState('');
  const [tipoDocente, setTipoDocente] = useState<TipoDocente>('Auxiliar');
  const [formacion, setFormacion] = useState<Formacion>('Pregrado');
  const [categoria, setCategoria] = useState<Categoria>('Auxiliar');
  const [experiencia, setExperiencia] = useState<number>(0);
  const [publicaciones, setPublicaciones] = useState<number>(0);
  const [contrataciones, setContrataciones] = useState<number>(1);
  const [puntos, setPuntos] = useState<number>(0);
  const [salarioFinal, setSalarioFinal] = useState<number>(0);
  const [historialContrataciones, setHistorialContrataciones] = useState<any[]>([]);
  const [mostrarHistorial, setMostrarHistorial] = useState<boolean>(false);
  const [inputPresupuesto, setInputPresupuesto] = useState('');

  useEffect(() => {
    const puntosTotales = puntosFormacion[formacion] + puntosCategoria[categoria] + (experiencia * 2) + (publicaciones * 3);
    setPuntos(puntosTotales);
    const salarioBase = VALORES_BASE[categoria];
    const salarioTotal = salarioBase + (puntosTotales * VALOR_PUNTO);
    setSalarioFinal(salarioTotal);
  }, [formacion, categoria, experiencia, publicaciones]);

  const handleSetPresupuesto = () => {
    const parsedPresupuesto = parseFloat(inputPresupuesto);
    if (!isNaN(parsedPresupuesto) && parsedPresupuesto > 0) {
      setPresupuesto(parsedPresupuesto);
      setPresupuestoRestante(parsedPresupuesto);
      setMensaje('Presupuesto inicial establecido.');
      setNotificationClass('');
    } else {
      setMensaje('Por favor, ingrese un presupuesto válido.');
      setNotificationClass('mensaje-rojo');
    }
    setTimeout(() => setMensaje(''), 5000); // La notificación desaparecerá después de 5 segundos
  };

  const calcularSalario = () => {
    let totalNomina = 0;
    const nuevoHistorial: any[] = [];

    const salarioBase = VALORES_BASE[categoria];
    const puntosTotales = puntosFormacion[formacion] + puntosCategoria[categoria] + (experiencia * 2) + (publicaciones * 3);
    const salarioFinal = salarioBase + (puntosTotales * VALOR_PUNTO);
    totalNomina += salarioFinal * contrataciones;

    nuevoHistorial.push([categoria, formacion, experiencia, publicaciones, contrataciones, salarioFinal]);

    if (totalNomina > presupuesto!) {
      setMensaje(`Riesgo financiero: Nómina supera el presupuesto.\nTotal Nómina: ${totalNomina.toLocaleString()}\nPresupuesto: ${presupuesto!.toLocaleString()}`);
      setNotificationClass('mensaje-rojo');
    } else {
      setPresupuestoRestante(presupuesto! - totalNomina);
      setMensaje(`Nómina dentro del presupuesto.\nTotal Nómina: ${totalNomina.toLocaleString()}\nPresupuesto: ${presupuestoRestante!.toLocaleString()}`);
      setNotificationClass('mensaje-verde');
    }

    setHistorialContrataciones(nuevoHistorial);
    setTimeout(() => setMensaje(''), 5000); // La notificación desaparecerá después de 5 segundos
  };

  const getPresupuestoClass = () => {
    if (presupuestoRestante! > 0) return 'presupuesto-verde';
    if (presupuestoRestante === 0) return 'presupuesto-amarillo';
    return 'presupuesto-rojo';
  };

  const handleMostrarHistorial = () => {
    setMostrarHistorial(!mostrarHistorial);
  };

  return (
    <div className="container">
      {presupuesto === null ? (
        <>
          <div className="header">
            <h1>Simulador de Salario - Decreto 1279</h1>
          </div>
          <input
            type="number"
            placeholder="Presupuesto Salarial"
            value={inputPresupuesto}
            onChange={(e) => setInputPresupuesto(e.target.value)}
          />
          <button onClick={handleSetPresupuesto}>Establecer Presupuesto Inicial</button>
          {mensaje && <div className={`mensaje ${notificationClass}`}>{mensaje}</div>}
        </>
      ) : (
        <>
          <div className="header">
            <h1>Simulador de Salario - Decreto 1279</h1>
          </div>
          <div className={`presupuesto ${getPresupuestoClass()}`}>
            <h3>Presupuesto disponible: ${presupuestoRestante!.toLocaleString()}</h3>
          </div>
          {mensaje && <div className={`mensaje ${notificationClass}`}>{mensaje}</div>}
          <div className="form-container">
            <div className="form-section">
              <label htmlFor="tipoDocente">Tipo de Docente:</label>
              <select id="tipoDocente" value={tipoDocente} onChange={(e) => setTipoDocente(e.target.value as TipoDocente)}>
                <option value="Auxiliar">Auxiliar</option>
                <option value="Asistente">Asistente</option>
                <option value="Asociado">Asociado</option>
                <option value="Titular">Titular</option>
              </select>
              <label htmlFor="formacion">Formación:</label>
              <select id="formacion" value={formacion} onChange={(e) => setFormacion(e.target.value as Formacion)}>
                {Object.keys(puntosFormacion).map((key) => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
              <label htmlFor="categoria">Categoría:</label>
              <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value as Categoria)}>
                {Object.keys(puntosCategoria).map((key) => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
              <label htmlFor="experiencia">Años de Experiencia:</label>
              <input
                id="experiencia"
                type="number"
                placeholder="Años de experiencia"
                value={experiencia}
                onChange={(e) => setExperiencia(parseInt(e.target.value))}
              />
              <label htmlFor="publicaciones">Número de Publicaciones:</label>
              <input
                id="publicaciones"
                type="number"
                placeholder="Número de publicaciones"
                value={publicaciones}
                onChange={(e) => setPublicaciones(parseInt(e.target.value))}
              />
              <label htmlFor="contrataciones">Número de Contrataciones:</label>
              <input
                id="contrataciones"
                type="number"
                placeholder="Número de contrataciones"
                value={contrataciones}
                onChange={(e) => setContrataciones(parseInt(e.target.value))}
              />
              <button onClick={calcularSalario}>Calcular Salario</button>
              <div className="salario-final">
                <h3>Puntos Totales: {puntos}</h3>
                <h3>Salario Final: {salarioFinal}</h3>
              </div>
            </div>
          </div>
          <button onClick={handleMostrarHistorial}>Mostrar Historial</button>
          {mostrarHistorial && (
            <div className="historial">
              <h2>Historial de Contrataciones</h2>
              <table>
                <thead>
                  <tr>
                    <th>Categoría</th>
                    <th>Formación</th>
                    <th>Experiencia</th>
                    <th>Publicaciones</th>
                    <th>Contrataciones</th>
                    <th>Salario Final</th>
                  </tr>
                </thead>
                <tbody>
                  {historialContrataciones.map((contratacion, index) => (
                    <tr key={index}>
                      {contratacion.map((valor: any, colIndex: number) => (
                        <td key={colIndex}>{valor}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SalaryCalculator;
