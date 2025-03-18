import React, { useState, useEffect } from "react";
import Teacher from "../models/teacher";
import { calculateSalary } from "../services/salaryCalculator";
import { addTeacher, getTeachers, deleteTeacher } from "../data/teachersData";
import SalaryChart from "./SalaryChart";
import "./App.css";

interface AppProps {
  presupuesto: number | null;
  setPresupuesto: (presupuesto: number) => void;
  presupuestoRestante: number | null;
  setPresupuestoRestante: (presupuesto: number) => void;
}

const App: React.FC<AppProps> = ({
  presupuesto,
  setPresupuesto,
  presupuestoRestante,
  setPresupuestoRestante,
}) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipoOcasional, setTipoOcasional] = useState("");
  const [cualificacion, setCualificacion] = useState<
    "Especialización" | "Maestría" | "Doctorado" | "Ninguna"
  >("Ninguna");
  const [grupoColciencias, setGrupoColciencias] = useState<
    | "Grupo A1"
    | "Grupo A"
    | "Grupo B"
    | "Grupo C"
    | "Grupos Reconocidos"
    | "Semillero"
    | "Ninguno"
  >("Ninguno");
  const [salarioFinal, setSalarioFinal] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [mostrarValoresTipo, setMostrarValoresTipo] = useState(false);
  const [mostrarValoresCualificacion, setMostrarValoresCualificacion] =
    useState(false);
  const [mostrarValoresGrupo, setMostrarValoresGrupo] = useState(false);
  const [totalSalarios, setTotalSalarios] = useState(0);
  const [idBorrar, setIdBorrar] = useState("");
  const [activeTab, setActiveTab] = useState("docentes");
  const [showNotification, setShowNotification] = useState(false);
  const [showTeacherList, setShowTeacherList] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const [inputPresupuesto, setInputPresupuesto] = useState("");
  const [notificationClass, setNotificationClass] = useState("");

  const tipoOcasionalValores = {
    "Auxiliar de tiempo completo": "2.645",
    "Auxiliar de medio tiempo": "1.509",
    "Asistente de tiempo completo": "3.125",
    "Asistente de medio tiempo": "1.749",
    "Asociado de tiempo completo": "3.606",
    "Asociado de medio tiempo": "1.990",
    "Titular de tiempo completo": "3.918",
    "Titular de medio tiempo": "2.146",
  };

  const cualificacionValores = {
    Especialización: "10%",
    Maestría: "45%",
    Doctorado: "90%",
    Ninguna: "0%",
  };

  const grupoColcienciasValores = {
    "Grupo A1": "56%",
    "Grupo A": "47%",
    "Grupo B": "42%",
    "Grupo C": "38%",
    "Grupos Reconocidos": "33%",
    Semillero: "19%",
    Ninguno: "0%",
  };

  useEffect(() => {
    const savedTeachers = getTeachers();
    setTeachers(savedTeachers);
    const total = savedTeachers.reduce(
      (acc, teacher) => acc + calculateSalary(teacher),
      0
    );
    setTotalSalarios(total);
  }, []);

  useEffect(() => {
    const tempTeacher = new Teacher(
      id,
      nombre,
      "ocasional",
      tipoOcasional,
      cualificacion,
      grupoColciencias
    );
    setSalarioFinal(calculateSalary(tempTeacher));
  }, [id, nombre, tipoOcasional, cualificacion, grupoColciencias]);

  useEffect(() => {
    if (presupuesto !== null) {
      const total = teachers.reduce(
        (acc, teacher) => acc + calculateSalary(teacher),
        0
      );
      setPresupuestoRestante(presupuesto - total);
    }
  }, [presupuesto, teachers]);

  const handleAddTeacher = () => {
    const newTeacher = new Teacher(
      id,
      nombre,
      "ocasional",
      tipoOcasional,
      cualificacion,
      grupoColciencias
    );
    const newTotalSalarios = totalSalarios + calculateSalary(newTeacher);

    if (newTotalSalarios > presupuesto!) {
      setMensaje("Presupuesto superado");
      setNotificationClass("mensaje-rojo");
      setTimeout(() => setMensaje(""), 5000); // La notificación desaparecerá después de 5 segundos
      return;
    }

    if (id && nombre && tipoOcasional) {
      addTeacher(newTeacher);
      const updatedTeachers = getTeachers();
      setTeachers(updatedTeachers);
      setTotalSalarios(newTotalSalarios);
      setPresupuestoRestante(presupuesto! - newTotalSalarios);
      setMensaje("Docente guardado correctamente.");
      setNotificationClass("");
      setTimeout(() => setMensaje(""), 5000); // La notificación desaparecerá después de 5 segundos
    } else {
      setMensaje("Por favor, complete todos los campos.");
      setNotificationClass("");
      setTimeout(() => setMensaje(""), 5000); // La notificación desaparecerá después de 5 segundos
    }
  };

  const handleDeleteTeacher = () => {
    if (idBorrar) {
      deleteTeacher(idBorrar);
      const updatedTeachers = getTeachers();
      setTeachers(updatedTeachers);
      const total = updatedTeachers.reduce(
        (acc, teacher) => acc + calculateSalary(teacher),
        0
      );
      setTotalSalarios(total);
      setPresupuestoRestante(presupuesto! - total);
      setMensaje("Docente borrado correctamente.");
      setNotificationClass("");
      setTimeout(() => setMensaje(""), 5000); // La notificación desaparecerá después de 5 segundos
    } else {
      setMensaje("Por favor, ingrese un ID válido.");
      setNotificationClass("");
      setTimeout(() => setMensaje(""), 5000); // La notificación desaparecerá después de 5 segundos
    }
  };

  const toggleValoresTipo = () => {
    setMostrarValoresTipo(!mostrarValoresTipo);
  };

  const toggleValoresCualificacion = () => {
    setMostrarValoresCualificacion(!mostrarValoresCualificacion);
  };

  const toggleValoresGrupo = () => {
    setMostrarValoresGrupo(!mostrarValoresGrupo);
  };

  const handleShowNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000); // La notificación desaparecerá después de 5 segundos
  };

  const toggleTeacherList = () => {
    setShowTeacherList(!showTeacherList);
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const handleSetPresupuesto = () => {
    const parsedPresupuesto = parseFloat(inputPresupuesto);
    if (!isNaN(parsedPresupuesto) && parsedPresupuesto > 0) {
      setPresupuesto(parsedPresupuesto);
      setPresupuestoRestante(parsedPresupuesto);
    } else {
      setMensaje("Por favor, ingrese un presupuesto válido.");
      setNotificationClass("mensaje-rojo");
      setTimeout(() => setMensaje(""), 5000); // La notificación desaparecerá después de 5 segundos
    }
  };

  const getPresupuestoClass = () => {
    if (presupuestoRestante === null) return "";
    if (presupuestoRestante > 0) return "presupuesto-verde";
    if (presupuestoRestante === 0) return "presupuesto-amarillo";
    return "presupuesto-rojo";
  };

  const labels = teachers.map((teacher) => teacher.nombre);
  const data = teachers.map((teacher) => calculateSalary(teacher));

  if (presupuesto === null) {
    return (
      <div className="container">
        <h1>Ingrese el Presupuesto Salarial de la Universidad</h1>
        <input
          type="number"
          placeholder="Presupuesto Salarial"
          value={inputPresupuesto}
          onChange={(e) => setInputPresupuesto(e.target.value)}
        />
        <button onClick={handleSetPresupuesto}>Guardar Presupuesto</button>
        {mensaje && (
          <div className={`mensaje ${notificationClass}`}>{mensaje}</div>
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="main-content">
        <div className="header">
          <h1>Calculadora Salarial UPC</h1>
          <button className="explanation-button" onClick={toggleExplanation}>
            ?
          </button>
        </div>
        <div className={`presupuesto ${getPresupuestoClass()}`}>
          <h3>Presupuesto Restante: {presupuestoRestante}</h3>
        </div>
        {showExplanation && (
          <div className="explanation">
            <h3>Cómo se calcula el salario de un docente:</h3>
            <p>
              El salario base se multiplica por un factor dependiendo del tipo
              de docente ocasional. Luego, se suman porcentajes adicionales
              según la cualificación y el grupo Colciencias del docente.
            </p>
          </div>
        )}
        <div className="form-container">
          <div className="form-section">
            <input
              type="text"
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <div className="tipo-ocasional-container">
              <select
                value={tipoOcasional}
                onChange={(e) => setTipoOcasional(e.target.value)}
              >
                <option value="">
                  Seleccione el tipo de docente ocasional
                </option>
                <option value="Auxiliar de tiempo completo">
                  Auxiliar de tiempo completo
                </option>
                <option value="Auxiliar de medio tiempo">
                  Auxiliar de medio tiempo
                </option>
                <option value="Asistente de tiempo completo">
                  Asistente de tiempo completo
                </option>
                <option value="Asistente de medio tiempo">
                  Asistente de medio tiempo
                </option>
                <option value="Asociado de tiempo completo">
                  Asociado de tiempo completo
                </option>
                <option value="Asociado de medio tiempo">
                  Asociado de medio tiempo
                </option>
                <option value="Titular de tiempo completo">
                  Titular de tiempo completo
                </option>
                <option value="Titular de medio tiempo">
                  Titular de medio tiempo
                </option>
              </select>
              <button className="info-button" onClick={toggleValoresTipo}>
                Info
              </button>
            </div>
            {mostrarValoresTipo && (
              <div className="valores-tipo-ocasional">
                <h3>Valores del tipo de docente ocasional</h3>
                <ul>
                  {Object.entries(tipoOcasionalValores).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="cualificacion-container">
              <select
                value={cualificacion}
                onChange={(e) =>
                  setCualificacion(
                    e.target.value as
                      | "Especialización"
                      | "Maestría"
                      | "Doctorado"
                      | "Ninguna"
                  )
                }
              >
                <option value="Ninguna">Ninguna</option>
                <option value="Especialización">Especialización</option>
                <option value="Maestría">Maestría</option>
                <option value="Doctorado">Doctorado</option>
              </select>
              <button
                className="info-button"
                onClick={toggleValoresCualificacion}
              >
                Info
              </button>
            </div>
            {mostrarValoresCualificacion && (
              <div className="valores-cualificacion">
                <h3>Valores de la cualificación</h3>
                <ul>
                  {Object.entries(cualificacionValores).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="grupo-colciencias-container">
              <select
                value={grupoColciencias}
                onChange={(e) =>
                  setGrupoColciencias(
                    e.target.value as
                      | "Grupo A1"
                      | "Grupo A"
                      | "Grupo B"
                      | "Grupo C"
                      | "Grupos Reconocidos"
                      | "Semillero"
                      | "Ninguno"
                  )
                }
              >
                <option value="Ninguno">Ninguno</option>
                <option value="Grupo A1">Grupo A1</option>
                <option value="Grupo A">Grupo A</option>
                <option value="Grupo B">Grupo B</option>
                <option value="Grupo C">Grupo C</option>
                <option value="Grupos Reconocidos">Grupos Reconocidos</option>
                <option value="Semillero">Semillero</option>
              </select>
              <button className="info-button" onClick={toggleValoresGrupo}>
                Info
              </button>
            </div>
            {mostrarValoresGrupo && (
              <div className="valores-grupo-colciencias">
                <h3>Valores del grupo Colciencias</h3>
                <ul>
                  {Object.entries(grupoColcienciasValores).map(
                    ([key, value]) => (
                      <li key={key}>
                        {key}: {value}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
            <button className="add-button" onClick={handleAddTeacher}>
              Agregar Docente
            </button>
            <input
              type="text"
              placeholder="ID a borrar"
              value={idBorrar}
              onChange={(e) => setIdBorrar(e.target.value)}
            />
            <button className="delete-button" onClick={handleDeleteTeacher}>
              Borrar Docente
            </button>
          </div>
        </div>
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "docentes" ? "active" : ""}`}
            onClick={toggleTeacherList}
          >
            Lista de Docentes
          </button>
          <button
            className={`tab-button ${activeTab === "salarios" ? "active" : ""}`}
            onClick={handleShowNotification}
          >
            Total Salarios
          </button>
        </div>
        {showTeacherList && activeTab === "docentes" && (
          <div className="teacher-list">
            <h2>Lista de Docentes</h2>
            <ul>
              {teachers.map((teacher, index) => (
                <li key={index}>
                  {teacher.id} - {teacher.nombre}: {calculateSalary(teacher)}
                </li>
              ))}
            </ul>
          </div>
        )}
        {showNotification && (
          <div className="notification">
            <h3>Total Salarios</h3>
            <p>{totalSalarios}</p>
          </div>
        )}
        {mensaje && (
          <div className={`mensaje ${notificationClass}`}>{mensaje}</div>
        )}
        <SalaryChart labels={labels} data={data} />
      </div>
    </div>
  );
};

export default App;
