# Calculo salarial docentes


Este proyecto es una aplicación para calcular el salario de docentes universitarios, diferenciando entre docentes ocasionales y catedráticos. La aplicación permite gestionar la información de los docentes y calcular sus salarios de acuerdo a sus características específicas.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de archivos:

```
salary-calculator
├── src
│   ├── app.ts                # Punto de entrada de la aplicación
│   ├── models
│   │   └── teacher.ts        # Modelo que representa a un docente
│   ├── services
│   │   └── salaryCalculator.ts # Servicio para calcular salarios
│   └── types
│       └── index.ts          # Tipos e interfaces utilizados en el proyecto
├── package.json               # Configuración de npm
├── tsconfig.json              # Configuración de TypeScript
└── README.md                  # Documentación del proyecto
```

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raíz del proyecto:

```
npm install
```

## Ejecución

Para ejecutar la aplicación, utiliza el siguiente comando:

```
npm start
```

## Uso

La aplicación permite ingresar los datos de los docentes y calcular sus salarios. Asegúrate de proporcionar la información correcta sobre el tipo de docente (ocasional o catedrático) y su salario base.

