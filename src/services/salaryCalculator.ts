const SALARIO_MINIMO_BASE = 1000000;

export interface Teacher {
  id: string;
  nombre: string;
  tipo: "ocasional";
  tipoOcasional: string;
  cualificacion?: "Especialización" | "Maestría" | "Doctorado" | "Ninguna";
  grupoColciencias?:
    | "Grupo A1"
    | "Grupo A"
    | "Grupo B"
    | "Grupo C"
    | "Grupos Reconocidos"
    | "Semillero"
    | "Ninguno";
}

export function calculateSalary(teacher: Teacher): number {
  let totalSalary = SALARIO_MINIMO_BASE;

  // Factor por tipo de docente ocasional
  switch (teacher.tipoOcasional) {
    case "Auxiliar de tiempo completo":
      totalSalary = SALARIO_MINIMO_BASE * 2.645;
      break;
    case "Auxiliar de medio tiempo":
      totalSalary = SALARIO_MINIMO_BASE * 1.509;
      break;
    case "Asistente de tiempo completo":
      totalSalary = SALARIO_MINIMO_BASE * 3.125;
      break;
    case "Asistente de medio tiempo":
      totalSalary = SALARIO_MINIMO_BASE * 1.749;
      break;
    case "Asociado de tiempo completo":
      totalSalary = SALARIO_MINIMO_BASE * 3.606;
      break;
    case "Asociado de medio tiempo":
      totalSalary = SALARIO_MINIMO_BASE * 1.99;
      break;
    case "Titular de tiempo completo":
      totalSalary = SALARIO_MINIMO_BASE * 3.918;
      break;
    case "Titular de medio tiempo":
      totalSalary = SALARIO_MINIMO_BASE * 2.146;
      break;
    default:
      break;
  }

  // Porcentaje adicional por cualificación
  switch (teacher.cualificacion) {
    case "Especialización":
      totalSalary += SALARIO_MINIMO_BASE * 0.1;
      break;
    case "Maestría":
      totalSalary += SALARIO_MINIMO_BASE * 0.45;
      break;
    case "Doctorado":
      totalSalary += SALARIO_MINIMO_BASE * 0.9;
      break;
    // Postdoctorado: Exento del cálculo por el momento
  }

  // Porcentaje adicional por grupo Colciencias
  switch (teacher.grupoColciencias) {
    case "Grupo A1":
      totalSalary += SALARIO_MINIMO_BASE * 0.56;
      break;
    case "Grupo A":
      totalSalary += SALARIO_MINIMO_BASE * 0.47;
      break;
    case "Grupo B":
      totalSalary += SALARIO_MINIMO_BASE * 0.42;
      break;
    case "Grupo C":
      totalSalary += SALARIO_MINIMO_BASE * 0.38;
      break;
    case "Grupos Reconocidos":
      totalSalary += SALARIO_MINIMO_BASE * 0.33;
      break;
    case "Semillero":
      totalSalary += SALARIO_MINIMO_BASE * 0.19;
      break;
    case "Ninguno":
      break;
  }

  return totalSalary;
}
