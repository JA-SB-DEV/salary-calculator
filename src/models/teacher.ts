const SALARIO_MINIMO_BASE = 1000000;

class Teacher {
    salarioBase: number;
    cualificacion: 'Especialización' | 'Maestría' | 'Doctorado' | 'Ninguna';
    grupoColciencias: 'Grupo A1' | 'Grupo A' | 'Grupo B' | 'Grupo C' | 'Grupos Reconocidos' | 'Semillero' | 'Ninguno';

    constructor(
        public id: string,
        public nombre: string,
        public tipo: 'ocasional',
        public tipoOcasional: string,
        cualificacion: 'Especialización' | 'Maestría' | 'Doctorado' | 'Ninguna' = 'Ninguna',
        grupoColciencias: 'Grupo A1' | 'Grupo A' | 'Grupo B' | 'Grupo C' | 'Grupos Reconocidos' | 'Semillero' | 'Ninguno' = 'Ninguno'
    ) {
        this.salarioBase = SALARIO_MINIMO_BASE;
        this.cualificacion = cualificacion;
        this.grupoColciencias = grupoColciencias;
    }

    calcularSalario(): number {
        let salarioTotal = this.salarioBase;

        // Factor por tipo de docente ocasional
        switch (this.tipoOcasional) {
            case 'Auxiliar de tiempo completo':
                salarioTotal = SALARIO_MINIMO_BASE * 2.645;
                break;
            case 'Auxiliar de medio tiempo':
                salarioTotal = SALARIO_MINIMO_BASE * 1.509;
                break;
            case 'Asistente de tiempo completo':
                salarioTotal = SALARIO_MINIMO_BASE * 3.125;
                break;
            case 'Asistente de medio tiempo':
                salarioTotal = SALARIO_MINIMO_BASE * 1.749;
                break;
            case 'Asociado de tiempo completo':
                salarioTotal = SALARIO_MINIMO_BASE * 3.606;
                break;
            case 'Asociado de medio tiempo':
                salarioTotal = SALARIO_MINIMO_BASE * 1.990;
                break;
            case 'Titular de tiempo completo':
                salarioTotal = SALARIO_MINIMO_BASE * 3.918;
                break;
            case 'Titular de medio tiempo':
                salarioTotal = SALARIO_MINIMO_BASE * 2.146;
                break;
            default:
                break;
        }

        // Porcentaje adicional por cualificación
        switch (this.cualificacion) {
            case 'Especialización':
                salarioTotal += this.salarioBase * 0.10;
                break;
            case 'Maestría':
                salarioTotal += this.salarioBase * 0.45;
                break;
            case 'Doctorado':
                salarioTotal += this.salarioBase * 0.90;
                break;
            // Postdoctorado: Exento del cálculo por el momento
        }

        // Porcentaje adicional por grupo Colciencias
        switch (this.grupoColciencias) {
            case 'Grupo A1':
                salarioTotal += this.salarioBase * 0.56;
                break;
            case 'Grupo A':
                salarioTotal += this.salarioBase * 0.47;
                break;
            case 'Grupo B':
                salarioTotal += this.salarioBase * 0.42;
                break;
            case 'Grupo C':
                salarioTotal += this.salarioBase * 0.38;
                break;
            case 'Grupos Reconocidos':
                salarioTotal += this.salarioBase * 0.33;
                break;
            case 'Semillero':
                salarioTotal += this.salarioBase * 0.19;
                break;
            case 'Ninguno':
                break;
        }

        return salarioTotal;
    }
}

export default Teacher;