# Plan de Implementación: Diapositiva Interactiva de Psicopedagogía, Tercera Métrica y Autocuidado

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir una aplicación web interactiva completa (HTML5 + CSS3 + Vanilla JS modular) con 7 diapositivas, línea de tiempo con ventanas emergentes (pop-ups), tarjetas de la Tercera Métrica con botones de despliegue, temporizador de pausas activas 50/10, videoteca académica incrustada y un quiz gamificado con insignia personalizada.

**Architecture:** Aplicación web sin dependencias externas obligatorias (zero-dependency standalone). Contenidos y lógica desacoplados en `data.js`, `styles.css`, `app.js` e `index.html`.

**Tech Stack:** HTML5 semántico, CSS3 moderno (Variables CSS, Flexbox, Grid, Backdrop-filter, Animaciones clave), JavaScript ES6+ modular, Google Fonts (Plus Jakarta Sans).

**Spec:** [`docs/superpowers/specs/2026-09-11-diapositiva-interactiva-psicopedagogia-design.md`](file:///c:/PROYECTOS/DIAPOSITIVA/docs/superpowers/specs/2026-09-11-diapositiva-interactiva-psicopedagogia-design.md)

## Global Constraints
- Standalone y portable: Ejecutable directamente en el navegador con doble clic sobre `index.html` o servidor local.
- Cumplimiento de requisitos de interactividad: Botones de información desplegable, ventanas emergentes (*pop-ups*), videos incrustados y gamificación (quiz interactivo).
- Diseño responsivo: Óptimo en pantallas de escritorio, tablets y teléfonos móviles.
- Accesibilidad: Soporte completo para navegación por teclado (flechas, espacio, Escape) y contrastes WCAG AA.

---

### Task 1: Banco de Datos Estructurado (`data.js`)

**Files:**
- Create: `c:\PROYECTOS\DIAPOSITIVA\data.js`

**Interfaces:**
- Produces: Objeto global `APP_DATA` con:
  - `timeline`: Colección de hitos históricos con id, año, título, autor, descripción corta, contenido completo para el modal, cita y etiquetas.
  - `thirdMetric`: Los 4 pilares (Bienestar, Sabiduría, Asombro, Generosidad) con descripción, cita clave y aplicación docente.
  - `selfCare`: Categorías de autocuidado (Límites, Pausas 50/10, Ergonomía, Conexión) con consejos prácticos.
  - `quiz`: 4 preguntas del documento con opciones, respuesta correcta, retroalimentación formativa y lecciones clave.
  - `videos`: Videos educativos seleccionados con id de YouTube, título y descripción.
  - `references`: Lista bibliográfica original del documento para consulta rápida.

- [ ] **Paso 1: Crear `data.js` con todos los datos extraídos del PDF**
- [ ] **Paso 2: Validar la integridad sintáctica de `data.js`**

---

### Task 2: Sistema de Diseño Visual y Estilos (`styles.css`)

**Files:**
- Create: `c:\PROYECTOS\DIAPOSITIVA\styles.css`

**Interfaces:**
- Consumes: Clases semánticas en el DOM (`.slide`, `.timeline-card`, `.metric-card`, `.modal`, `.quiz-container`).
- Produces: Sistema de diseño completo con temas, animaciones de entrada, efectos glassmorphism, disposición responsive y microinteracciones.

- [ ] **Paso 1: Definir variables CSS (tokens de color, espaciado, tipografía, radios y sombras)**
- [ ] **Paso 2: Maquetar el contenedor de diapositivas (`.slide-deck`) y transiciones (`.active`, `.enter-right`, `.enter-left`)**
- [ ] **Paso 3: Estilizar componentes clave: línea de tiempo horizontal/scrollable, tarjetas interactivas, ventanas modales (`.modal-overlay`), temporizador 50/10, videoteca y módulo de quiz con insignia final**
- [ ] **Paso 4: Añadir media queries para soporte en móviles y modo de alto contraste**

---

### Task 3: Estructura HTML Semántica (`index.html`)

**Files:**
- Create: `c:\PROYECTOS\DIAPOSITIVA\index.html`

**Interfaces:**
- Consumes: `styles.css`, `data.js`, `app.js`.
- Produces: Estructura con barra de navegación superior, 7 secciones `<section class="slide">`, contenedor modal accesible y controles de navegación inferiores.

- [ ] **Paso 1: Estructurar el encabezado con barra de progreso, contador de diapositivas y botón de pantalla completa**
- [ ] **Paso 2: Desarrollar las 7 diapositivas semánticas con sus respectivos contenedores dinámicos**
- [ ] **Paso 3: Configurar el contenedor modal reutilizable (`#global-modal`) con botones de cierre accesibles**
- [ ] **Paso 4: Añadir los botones flotantes de navegación (anterior, siguiente, índice rápido)**

---

### Task 4: Lógica de Interacción y Motores (`app.js`)

**Files:**
- Create: `c:\PROYECTOS\DIAPOSITIVA\app.js`

**Interfaces:**
- Consumes: `APP_DATA` de `data.js`, elementos del DOM en `index.html`.
- Produces: 
  - `SlideManager`: Control de cambio de diapositivas, eventos de teclado, gestos táctiles y actualización de la barra de progreso.
  - `ModalManager`: Renderizado dinámico de contenido en ventana emergente, apertura/cierre accesible con `Escape` y click exterior.
  - `TimelineRenderer`: Renderizado de los hitos con botones de pop-up.
  - `MetricsRenderer`: Alternancia y despliegue de información en las tarjetas de la 3ra Métrica.
  - `SelfCareTimer`: Temporizador interactivo para la regla 50/10 con alertas de audio sutiles y visuales.
  - `QuizEngine`: Gestión de preguntas, validación de respuestas, cálculo de puntaje, retroalimentación inmediata explicativa y generación de insignia de honor con nombre personalizado.

- [ ] **Paso 1: Implementar `SlideManager` y escuchadores de eventos (teclas de flecha, swipe táctil, clics)**
- [ ] **Paso 2: Implementar `ModalManager` y renderizado de hitos de la línea de tiempo**
- [ ] **Paso 3: Implementar la interactividad de la Tercera Métrica y el temporizador de pausas 50/10**
- [ ] **Paso 4: Implementar el motor del Quiz gamificado con cálculo de puntos y emisión de la insignia personalizada**

---

### Task 5: Verificación, Pruebas y Documentación (`README.md`)

**Files:**
- Create: `c:\PROYECTOS\DIAPOSITIVA\README.md`

**Interfaces:**
- Guía para el usuario y evaluador docente: cómo abrir la presentación, interactividades disponibles, controles y resumen pedagógico.

- [ ] **Paso 1: Redactar `README.md` detallando las características de interactividad**
- [ ] **Paso 2: Iniciar servidor local de prueba y validar en navegador (renderizado, clics, modales, videos y quiz)**
- [ ] **Paso 3: Verificar cobertura completa de los requisitos de la consigna académica**
