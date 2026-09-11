# Recurso Educativo Digital e Interactivo: Evolución Histórica de la Psicopedagogía, Tercera Métrica y Autocuidado Docente

Aplicación web interactiva en formato diapositivas (*slide deck*) desarrollada para exponer de manera dinámica, rigurosa y visual la historia de la psicopedagogía, los 4 pilares de la Tercera Métrica del siglo XXI y las estrategias digitales de autocuidado docente.

---

## 🌐 Enlace Público en Línea (Disponible para cualquiera)

El proyecto se encuentra alojado y publicado oficialmente en GitHub Pages:
👉 **[https://makxxkansca.github.io/diapositiva-psicopedagogia/](https://makxxkansca.github.io/diapositiva-psicopedagogia/)**

Repositorio en GitHub:
📦 **[https://github.com/MakxxKansca/diapositiva-psicopedagogia](https://github.com/MakxxKansca/diapositiva-psicopedagogia)**

---

## 🚀 Cómo Abrir y Ejecutar el Recurso Localmente

Este recurso es **100% autocontenido y no requiere instalación de dependencias externas**.

### Opción 1: Apertura Directa
1. Haz doble clic en el archivo [`index.html`](file:///c:/PROYECTOS/DIAPOSITIVA/index.html) desde tu explorador de archivos.
2. Se abrirá automáticamente en tu navegador predeterminado (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, etc.).

### Opción 2: Servidor Local (Recomendado para proyección)
Si deseas ejecutarlo mediante un servidor local, puedes usar Python:
```bash
python -m http.server 8085
```
Luego abre en tu navegador: [http://localhost:8085](http://localhost:8085)

---

## ✅ Cumplimiento de Requisitos de Interactividad

La consigna solicitaba incorporar **al menos dos** de los recursos interactivos. Esta aplicación incorpora **los cuatro**:

| Recurso Solicitado | Implementación en la Aplicación | Ubicación en Diapositivas |
| :--- | :--- | :--- |
| **1. Botones de interacción que despliegan información adicional** | Botones interactivos que alternan y despliegan la aplicación docente en cada uno de los 4 pilares y en las pestañas de autocuidado. | **Diapositiva 3** (Tercera Métrica) y **Diapositiva 4** (Estrategias de Autocuidado). |
| **2. Ventanas emergentes (Pop-up windows)** | Modales accesibles con diseño flotante que muestran el contexto histórico, citas textuales, aspectos fundamentales y relevancia pedagógica de figuras como Comenio, Rousseau, Pestalozzi, Herbart y Estela Mora. | **Diapositiva 2** (Línea de Tiempo Interactiva). |
| **3. Videos incrustados de fuentes confiables** | Reproductores de video responsivos integrados directamente con conferencias académicas oficiales de TED sobre aprendizaje, Tercera Métrica (Arianna Huffington) y vínculo docente. | **Diapositiva 5** (Videoteca Académica). |
| **4. Elementos de gamificación** | Desafío interactivo con 4 preguntas clave, puntaje acumulativo en tiempo real, retroalimentación formativa inmediata por respuesta y Diploma/Certificado descargable con nombre editable. | **Diapositiva 6** (Desafío Psicopedagógico Gamificado). |

---

## 🎮 Controles y Navegación

* **Avance de Diapositivas:**
  * Clic en el botón **Siguiente** o en el botón **Comenzar Recorrido Interactivo**.
  * Tecla `→` (Flecha derecha) o barra espaciadora (`Espacio`).
  * Tecla `Av Pág` (*Page Down*).
  * Gestos táctiles: *Swipe* hacia la izquierda en pantallas móviles o táctiles.
* **Retroceso de Diapositivas:**
  * Clic en el botón **Anterior**.
  * Tecla `←` (Flecha izquierda).
  * Tecla `Re Pág` (*Page Up*).
  * Gestos táctiles: *Swipe* hacia la derecha.
* **Salto Directo:** Clic en cualquiera de los 7 puntos de la barra de navegación superior o números del `1` al `7` en el teclado.
* **Ventanas Emergentes (Pop-ups):**
  * Abrir: Clic en **"Ver Hito y Cita (Pop-up)"** en cualquier tarjeta.
  * Cerrar: Clic en la `X`, clic fuera del modal o presionando la tecla `Escape`.
* **Herramientas Superiores:**
  * Botón 🔊: Activa o silencia los efectos de sonido sintetizados.
  * Botón ❓: Abre la guía de interactividad.
  * Botón ⛶: Alterna el modo Pantalla Completa.

---

## 📂 Estructura de Archivos del Proyecto

```
C:\PROYECTOS\DIAPOSITIVA\
├── index.html       # Estructura semántica, accesibilidad WCAG y layout de diapositivas
├── styles.css       # Tokens de diseño, glassmorphism, responsive y transiciones suaves
├── app.js           # Motores de interacción: SlideManager, ModalManager, QuizEngine y Temporizador 50/10
├── data.js          # Base de datos con hitos cronológicos, pilares, preguntas del quiz y bibliografía
└── README.md        # Documentación de uso y justificación pedagógica
```

---

## 📚 Fuentes y Rigor Académico

El contenido fue extraído rigurosamente del documento:
`C:\PROYECTOS\DIAPOSITIVA\evolución histórica de la Psicopedagogía y los pri.pdf`
Articulando la epistemología histórica de la psicopedagogía (siglos XVII a XXI), el marco humanista de la Tercera Métrica de Arianna Huffington y los protocolos internacionales de bienestar digital para docentes (European Schoolnet InnovatED).
