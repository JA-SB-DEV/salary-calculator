from PyQt5.QtWidgets import (QApplication, QWidget, QLabel, QVBoxLayout, QComboBox, QLineEdit, QPushButton, QMessageBox, 
                             QGridLayout, QTableWidget, QTableWidgetItem, QHBoxLayout, QDialog)
from PyQt5.QtGui import QFont
import sys

# Presupuesto inicial
presupuesto_institucion = 1000000000
historial_contrataciones = []

# Valores base
valores_base = {"Auxiliar": 4000000, "Asistente": 5000000, "Asociado": 7000000, "Titular": 9000000}
valor_punto = 20895

# Puntos por formación
puntos_formacion = {
    "Pregrado": 178,
    "Especialización": 20,
    "Maestría": 40,
    "Doctorado": 80,
    "Dos Maestrías": 60,
    "Dos Doctorados": 120,
    "Especialización Clínica": 15
}

# Puntos por categoría
puntos_categoria = {
    "Auxiliar": 37,
    "Asistente": 58,
    "Asociado": 74,
    "Titular": 96
}

# Puntos por experiencia
puntos_experiencia = {
    "Investigación": 6,
    "Docencia": 4,
    "Dirección Académica": 4,
    "Profesional No Docente": 3
}

# Puntos por productividad
puntos_productividad = {
    "A1": 15,
    "A2": 12,
    "B": 8,
    "C": 3,
    "Libro Investigación": 20,
    "Libro Texto": 15,
    "Patente": 25,
    "Premio": 15,
    "Software": 15
}

# Puntos por cargos académico-administrativos
puntos_cargos = {
    "Rector": 11,
    "Vicerrector": 9,
    "Secretario General": 9,
    "Decano": 6,
    "Director de Programa": 6
}

def actualizar_puntos(index):
    categoria = categoria_boxes[index].currentText()
    pregrado = int(pregrado_inputs[index].text()) if pregrado_inputs[index].text().isdigit() else 0
    especializacion = int(especializacion_inputs[index].text()) if especializacion_inputs[index].text().isdigit() else 0
    maestria = int(maestria_inputs[index].text()) if maestria_inputs[index].text().isdigit() else 0
    doctorado = int(doctorado_inputs[index].text()) if doctorado_inputs[index].text().isdigit() else 0
    experiencia = int(experiencia_inputs[index].text()) if experiencia_inputs[index].text().isdigit() else 0
    publicaciones = int(publicaciones_inputs[index].text()) if publicaciones_inputs[index].text().isdigit() else 0

    puntos = (pregrado * puntos_formacion["Pregrado"] + 
              especializacion * puntos_formacion["Especialización"] + 
              maestria * puntos_formacion["Maestría"] + 
              doctorado * puntos_formacion["Doctorado"] + 
              puntos_categoria.get(categoria, 0) + 
              (experiencia * 2) + 
              (publicaciones * 3))
    puntos_labels[index].setText(f"Puntos: {puntos}")
    salario_final = valores_base.get(categoria, 0) + (puntos * valor_punto)
    salario_labels[index].setText(f"Salario: ${salario_final:,.2f}")

def calcular_salario():
    global presupuesto_institucion
    total_nomina = 0
    historial_contrataciones.clear()

    for i in range(3):
        categoria = categoria_boxes[i].currentText()
        pregrado = int(pregrado_inputs[i].text()) if pregrado_inputs[i].text().isdigit() else 0
        especializacion = int(especializacion_inputs[i].text()) if especializacion_inputs[i].text().isdigit() else 0
        maestria = int(maestria_inputs[i].text()) if maestria_inputs[i].text().isdigit() else 0
        doctorado = int(doctorado_inputs[i].text()) if doctorado_inputs[i].text().isdigit() else 0
        experiencia = int(experiencia_inputs[i].text()) if experiencia_inputs[i].text().isdigit() else 0
        publicaciones = int(publicaciones_inputs[i].text()) if publicaciones_inputs[i].text().isdigit() else 0
        contrataciones = int(contrataciones_inputs[i].text()) if contrataciones_inputs[i].text().isdigit() else 0

        if categoria == "" or contrataciones == "":
            continue

        salario_base = valores_base.get(categoria, 0)
        puntos = (pregrado * puntos_formacion["Pregrado"] + 
                  especializacion * puntos_formacion["Especialización"] + 
                  maestria * puntos_formacion["Maestría"] + 
                  doctorado * puntos_formacion["Doctorado"] + 
                  puntos_categoria.get(categoria, 0) + 
                  (experiencia * 2) + 
                  (publicaciones * 3))
        salario_final = salario_base + (puntos * valor_punto)
        total_nomina += salario_final * contrataciones

        historial_contrataciones.append([categoria, pregrado, especializacion, maestria, doctorado, experiencia, publicaciones, contrataciones, salario_final])

    if total_nomina > presupuesto_institucion:
        resultado_label.setStyleSheet("color: red;")
        resultado_label.setText(f"Riesgo financiero: Nómina supera el presupuesto.\nTotal Nómina: ${total_nomina:,.2f}\nPresupuesto: ${presupuesto_institucion:,.2f}")
    else:
        presupuesto_institucion -= total_nomina
        presupuesto_label.setText(f"Presupuesto disponible: ${presupuesto_institucion:,.2f}")
        resultado_label.setStyleSheet("color: green;")
        resultado_label.setText(f"Nómina dentro del presupuesto.\nTotal Nómina: ${total_nomina:,.2f}\nPresupuesto: ${presupuesto_institucion:,.2f}")

def mostrar_historial():
    ventana_historial = QDialog()
    ventana_historial.setWindowTitle("Historial de Contrataciones")
    layout_historial = QVBoxLayout()

    tabla = QTableWidget(len(historial_contrataciones), 9)
    tabla.setHorizontalHeaderLabels(["Categoría", "Pregrado", "Especialización", "Maestría", "Doctorado", "Experiencia", "Publicaciones", "Contrataciones", "Salario Final"])

    for fila, datos in enumerate(historial_contrataciones):
        for columna, valor in enumerate(datos):
            tabla.setItem(fila, columna, QTableWidgetItem(str(valor)))
    
    layout_historial.addWidget(tabla)
    ventana_historial.setLayout(layout_historial)
    ventana_historial.exec_()

app = QApplication(sys.argv)
window = QWidget()
window.setWindowTitle("Simulador de Salario - Decreto 1279")
window.setGeometry(100, 100, 900, 600)
window.setStyleSheet("background-color: white;")
layout = QVBoxLayout()

header_label = QLabel("Simulador de Salario y Riesgo Financiero")
header_label.setFont(QFont("Arial", 16, QFont.Bold))
header_label.setStyleSheet("color: green;")
layout.addWidget(header_label)

presupuesto_label = QLabel(f"Presupuesto disponible: ${presupuesto_institucion:,.2f}")
presupuesto_label.setFont(QFont("Arial", 14, QFont.Bold))
presupuesto_label.setStyleSheet("color: green;")
layout.addWidget(presupuesto_label)

resultado_label = QLabel("")
resultado_label.setFont(QFont("Arial", 14, QFont.Bold))
layout.addWidget(resultado_label)

form_layout = QHBoxLayout()
categoria_boxes, pregrado_inputs, especializacion_inputs, maestria_inputs, doctorado_inputs, experiencia_inputs, publicaciones_inputs, contrataciones_inputs, puntos_labels, salario_labels = [], [], [], [], [], [], [], [], [], []

for i in range(3):
    grid_layout = QGridLayout()
    grid_layout.addWidget(QLabel("Categoría:"), 0, 0)
    grid_layout.addWidget(QLabel("Pregrado:"), 1, 0)
    grid_layout.addWidget(QLabel("Especialización:"), 2, 0)
    grid_layout.addWidget(QLabel("Maestría:"), 3, 0)
    grid_layout.addWidget(QLabel("Doctorado:"), 4, 0)
    grid_layout.addWidget(QLabel("Experiencia (años):"), 5, 0)
    grid_layout.addWidget(QLabel("Publicaciones:"), 6, 0)
    grid_layout.addWidget(QLabel("Contrataciones:"), 7, 0)
    grid_layout.addWidget(QLabel("Puntos acumulados:"), 8, 0)
    grid_layout.addWidget(QLabel("Salario final:"), 9, 0)
    
    categoria_box = QComboBox()
    categoria_box.addItems(["", "Auxiliar", "Asistente", "Asociado", "Titular"])
    categoria_box.currentIndexChanged.connect(lambda _, x=i: actualizar_puntos(x))
    
    pregrado_input = QLineEdit()
    pregrado_input.textChanged.connect(lambda _, x=i: actualizar_puntos(x))
    especializacion_input = QLineEdit()
    especializacion_input.textChanged.connect(lambda _, x=i: actualizar_puntos(x))
    maestria_input = QLineEdit()
    maestria_input.textChanged.connect(lambda _, x=i: actualizar_puntos(x))
    doctorado_input = QLineEdit()
    doctorado_input.textChanged.connect(lambda _, x=i: actualizar_puntos(x))
    experiencia_input = QLineEdit()
    experiencia_input.textChanged.connect(lambda _, x=i: actualizar_puntos(x))
    publicaciones_input = QLineEdit()
    publicaciones_input.textChanged.connect(lambda _, x=i: actualizar_puntos(x))
    contrataciones_input = QLineEdit()
    
    puntos_label = QLabel("Puntos: 0")
    salario_label = QLabel("Salario: $0")
    
    categoria_boxes.append(categoria_box)
    pregrado_inputs.append(pregrado_input)
    especializacion_inputs.append(especializacion_input)
    maestria_inputs.append(maestria_input)
    doctorado_inputs.append(doctorado_input)
    experiencia_inputs.append(experiencia_input)
    publicaciones_inputs.append(publicaciones_input)
    contrataciones_inputs.append(contrataciones_input)
    puntos_labels.append(puntos_label)
    salario_labels.append(salario_label)
    
    grid_layout.addWidget(categoria_box, 0, 1)
    grid_layout.addWidget(pregrado_input, 1, 1)
    grid_layout.addWidget(especializacion_input, 2, 1)
    grid_layout.addWidget(maestria_input, 3, 1)
    grid_layout.addWidget(doctorado_input, 4, 1)
    grid_layout.addWidget(experiencia_input, 5, 1)
    grid_layout.addWidget(publicaciones_input, 6, 1)
    grid_layout.addWidget(contrataciones_input, 7, 1)
    grid_layout.addWidget(puntos_label, 8, 1)
    grid_layout.addWidget(salario_label, 9, 1)
    
    form_layout.addLayout(grid_layout)

layout.addLayout(form_layout)

calcular_button = QPushButton("Calcular Nómina y Riesgo")
calcular_button.setStyleSheet("background-color: green; color: white; font-weight: bold;")
calcular_button.clicked.connect(calcular_salario)
layout.addWidget(calcular_button)

historial_button = QPushButton("Ver Historial de Contrataciones")
historial_button.setStyleSheet("background-color: green; color: white; font-weight: bold;")
historial_button.clicked.connect(mostrar_historial)
layout.addWidget(historial_button)

layout.addWidget(resultado_label := QLabel(""))
window.setLayout(layout)
window.show()
sys.exit(app.exec_())


