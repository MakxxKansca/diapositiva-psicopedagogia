/**
 * ============================================================================
 * LÓGICA INTERACTIVA - INFOGRAFÍA DE ATENCIÓN A LA DIVERSIDAD (PANAMÁ)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initFontControls();
  initAudioNarrator();
  initSimulator();
  initQuiz();
  setupModalKeyboardEvents();
});

/* ==========================================================================
   1. CONTROL DE MODALES ACCESIBLES (POP-UPS)
   ========================================================================== */
let lastFocusedElement = null;

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  lastFocusedElement = document.activeElement;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Enfocar el botón de cierre para accesibilidad
  const closeBtn = modal.querySelector('.btn-modal-close');
  if (closeBtn) closeBtn.focus();
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function setupModalKeyboardEvents() {
  // Cerrar al pulsar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) {
        closeModal(activeModal.id);
      }
    }
  });

  // Cerrar al hacer clic en el backdrop exterior
  document.querySelectorAll('.modal-overlay').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
}

/* ==========================================================================
   2. TARJETAS DESPLEGABLES (EXPAND/COLLAPSE)
   ========================================================================== */
function toggleExpand(expandId) {
  const content = document.getElementById(expandId);
  if (!content) return;

  const btn = content.previousElementSibling;
  const isExpanded = content.classList.contains('expanded');

  if (isExpanded) {
    content.classList.remove('expanded');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  } else {
    content.classList.add('expanded');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }
}

/* ==========================================================================
   3. ACCESIBILIDAD: TEMA (DARK/LIGHT), FUENTE Y NARRADOR
   ========================================================================== */

// Alternador de Modo Claro / Oscuro
function initTheme() {
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  const themeLabel = document.getElementById('theme-label');
  const savedTheme = localStorage.getItem('panama_infog_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeUI(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('panama_infog_theme', newTheme);
      updateThemeUI(newTheme);
    });
  }
}

function updateThemeUI(theme) {
  const themeLabel = document.getElementById('theme-label');
  if (!themeLabel) return;
  if (theme === 'dark') {
    themeLabel.textContent = 'Modo Claro';
  } else {
    themeLabel.textContent = 'Modo Oscuro';
  }
}

// Escalado Dinámico de Fuente
let currentScale = 1.0;
function initFontControls() {
  const btnInc = document.getElementById('btn-font-inc');
  const btnDec = document.getElementById('btn-font-dec');
  const btnPrint = document.getElementById('btn-print-page');

  if (btnInc) {
    btnInc.addEventListener('click', () => {
      if (currentScale < 1.3) {
        currentScale += 0.05;
        document.documentElement.style.setProperty('--font-scale', `${currentScale}rem`);
      }
    });
  }

  if (btnDec) {
    btnDec.addEventListener('click', () => {
      if (currentScale > 0.85) {
        currentScale -= 0.05;
        document.documentElement.style.setProperty('--font-scale', `${currentScale}rem`);
      }
    });
  }

  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }
}

// Lector de Síntesis de Voz (Web Speech API)
let speechSynth = window.speechSynthesis;
let speechUtterance = null;
let isSpeaking = false;

function initAudioNarrator() {
  const audioBtn = document.getElementById('btn-audio-narrator');
  const label = document.getElementById('audio-btn-label');

  if (!audioBtn) return;

  if (!speechSynth) {
    audioBtn.style.display = 'none';
    return;
  }

  const narrationScript = `
    Infografía interactiva sobre la Atención a la Diversidad y la Educación Inclusiva en Panamá.
    Tres principios fundamentales orientan este proceso:
    Primero: Normalización, respaldado por el artículo 19 de la Ley 42 de 1999, que garantiza que las personas con discapacidad accedan al sistema educativo regular con todos los apoyos necesarios.
    Segundo: Flexibilidad, respaldado por el artículo 21 de la Ley 42 y el Decreto Ejecutivo número 1 de 2000, que permite adaptar contenidos, ritmos y metodologías a cada estudiante.
    Tercero: Atención personalizada, concretada a través del Programa Educativo Individual, PEI, oficializado mediante el Resuelto número 924 de 2006 del Ministerio de Educación.
    En el nivel medio, estas normas se traducen en priorizar competencias esenciales, emplear tecnología de apoyo, diversificar las formas de evaluación y fomentar el trabajo colaborativo en el aula.
  `;

  audioBtn.addEventListener('click', () => {
    if (isSpeaking) {
      speechSynth.cancel();
      isSpeaking = false;
      audioBtn.classList.remove('active-audio');
      label.textContent = 'Escuchar Resumen';
    } else {
      speechSynth.cancel(); // Detener cualquier audio previo
      speechUtterance = new SpeechSynthesisUtterance(narrationScript);
      speechUtterance.lang = 'es-PA';
      speechUtterance.rate = 1.0;
      speechUtterance.pitch = 1.0;

      // Buscar voz en español disponible
      const voices = speechSynth.getVoices();
      const spanishVoice = voices.find(v => v.lang.startsWith('es'));
      if (spanishVoice) {
        speechUtterance.voice = spanishVoice;
      }

      speechUtterance.onend = () => {
        isSpeaking = false;
        audioBtn.classList.remove('active-audio');
        label.textContent = 'Escuchar Resumen';
      };

      speechUtterance.onerror = () => {
        isSpeaking = false;
        audioBtn.classList.remove('active-audio');
        label.textContent = 'Escuchar Resumen';
      };

      speechSynth.speak(speechUtterance);
      isSpeaking = true;
      audioBtn.classList.add('active-audio');
      label.textContent = 'Pausar Narración';
    }
  });
}

/* ==========================================================================
   4. SIMULADOR DE AULA INCLUSIVA (CASO 10.° GRADO)
   ========================================================================== */
const simulatorData = {
  obj: {
    title: '1. Priorización de Objetivos Esenciales del Currículo',
    tag: 'Adecuación Curricular No Significativa / Significativa',
    description: 'En asignaturas teóricas con alto volumen de lecturas, el docente jerarquiza los aprendizajes clave indispensables del trimestre. Se seleccionan los conceptos nucleares (por ejemplo: causas y consecuencias históricas principales) reduciendo la carga accesoria o memorística para evitar la sobrecarga cognitiva del estudiante.'
  },
  eval: {
    title: '2. Evaluaciones Orales o con Apoyo de Tecnología Asistiva',
    tag: 'Adecuación de Acceso y Procedimiento',
    description: 'En lugar de penalizar la ortografía o velocidad en pruebas escritas extensas, se habilita la sustentación oral mediante entrevistas estructuradas, mapas conceptuales hablados o el uso de procesadores de texto con dictado por voz y lectores de pantalla en tabletas escolares.'
  },
  tiempo: {
    title: '3. Otorgamiento de Tiempo Adicional Dosificado',
    tag: 'Ajuste Metodológico Razonable',
    description: 'Se concede un margen de 20 a 30 minutos extra en evaluaciones escritas, permitiendo pausas activas para descansar la vista y recuperar la concentración. Se facilita la lectura de consignas en voz baja por parte del docente tutor para asegurar la comprensión de las preguntas.'
  },
  multimodal: {
    title: '4. Incorporación de Materiales en Formatos Accesibles',
    tag: 'Enfoque DUA (Diseño Universal)',
    description: 'Los textos de estudio se entregan digitalizados en formatos PDF accesibles con soporte de audio, acompañados de organizadores gráficos, diagramas de flujo y resúmenes con tipografía sans-serif ampliada e interlineado cómodo para facilitar la decodificación fluida.'
  }
};

function initSimulator() {
  showSimulatorCase('obj');
}

function showSimulatorCase(caseKey) {
  const output = document.getElementById('simulator-output');
  if (!output) return;

  // Actualizar botones activos
  document.querySelectorAll('.btn-strategy').forEach((btn) => {
    btn.classList.remove('active');
  });
  const activeBtn = Array.from(document.querySelectorAll('.btn-strategy')).find(b => 
    b.getAttribute('onclick')?.includes(caseKey)
  );
  if (activeBtn) activeBtn.classList.add('active');

  const data = simulatorData[caseKey];
  if (!data) return;

  output.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.6rem; flex-wrap: wrap; gap: 0.5rem;">
      <h4 style="font-family: var(--font-display); color: var(--emerald-400); font-size: 1.1rem;">${data.title}</h4>
      <span style="font-size: 0.75rem; background: rgba(16, 185, 129, 0.15); color: var(--emerald-400); padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-weight: 700;">${data.tag}</span>
    </div>
    <p style="font-size: 0.94rem; color: var(--text-main); line-height: 1.6;">${data.description}</p>
  `;
}

/* ==========================================================================
   5. GAMIFICACIÓN: DESAFÍO INCLUSIVO (QUIZ INTERACTIVO)
   ========================================================================== */
const quizQuestions = [
  {
    question: '1. ¿Qué principio pedagógico sostiene que las personas con NEE deben tener acceso a los mismos entornos y oportunidades que el resto de la población?',
    options: [
      'Principio de Homogeneización Curricular',
      'Principio de Normalización (Ley 42 de 1999)',
      'Principio de Exclusividad Pedagógica',
      'Principio de Segregación Progresiva'
    ],
    correctIndex: 1,
    explanation: '¡Exacto! El principio de normalización establece la igualdad de oportunidades y la plena integración ciudadana, estipulado en el Artículo 19 de la Ley 42 de 1999.'
  },
  {
    question: '2. ¿Cuál es el decreto ejecutivo panameño que reglamenta los procedimientos y tipos de adecuaciones curriculares para estudiantes con NEE?',
    options: [
      'Decreto Ejecutivo N.º 1 de 4 de febrero de 2000',
      'Decreto de Gabinete N.º 45 de 1970',
      'Ley Orgánica N.º 34 de 1995',
      'Decreto Ejecutivo N.º 500 de 2012'
    ],
    correctIndex: 0,
    explanation: '¡Correcto! El Decreto Ejecutivo N.º 1 de 2000 es la norma que regula operativamente la educación inclusiva y las adecuaciones en Panamá.'
  },
  {
    question: '3. El Programa Educativo Individual (PEI) fue adoptado oficialmente en todos los centros públicos de Panamá mediante:',
    options: [
      'La Constitución Política de 1972',
      'El Resuelto N.º 924 de 24 de junio de 2006 del MEDUCA',
      'El Código de la Familia de 1994',
      'La Resolución Ministerial N.º 15 de 2021'
    ],
    correctIndex: 1,
    explanation: '¡Excelente! El Resuelto N.º 924 de 2006 institucionalizó el PEI como la herramienta técnico-pedagógica obligatoria para el seguimiento de adecuaciones.'
  },
  {
    question: '4. En el 10.º grado (Nivel Medio), ¿cuál de las siguientes medidas representa una buena práctica inclusiva documentada para un alumno con dificultades de lectoescritura?',
    options: [
      'Suspender la asignatura de Historia y no evaluar al alumno',
      'Obligarlo a leer en voz alta frente a todo el colegio para que pierda el miedo',
      'Priorizar objetivos esenciales, brindar tiempo adicional y habilitar evaluaciones orales o con tecnología asistiva',
      'Aumentar el número de páginas escritas en el examen de trimestre'
    ],
    correctIndex: 2,
    explanation: '¡Muy bien! Según las guías de inclusión del MEDUCA y Save the Children, adaptar metodologías, tiempos y formatos asegura el logro de aprendizajes sin discriminar.'
  }
];

let currentQuestionIndex = 0;
let userScore = 0;
let answerSubmitted = false;

function initQuiz() {
  currentQuestionIndex = 0;
  userScore = 0;
  answerSubmitted = false;
  renderQuestion();
}

function renderQuestion() {
  answerSubmitted = false;
  const q = quizQuestions[currentQuestionIndex];

  document.getElementById('quiz-question-view').style.display = 'block';
  document.getElementById('quiz-results').style.display = 'none';

  document.getElementById('quiz-step').textContent = `Pregunta ${currentQuestionIndex + 1} de ${quizQuestions.length}`;
  document.getElementById('quiz-score-tracker').textContent = `Puntos: ${userScore}`;
  document.getElementById('quiz-progress').style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;

  document.getElementById('quiz-question-title').textContent = q.question;

  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = '';

  const feedbackBox = document.getElementById('quiz-feedback');
  feedbackBox.style.display = 'none';
  feedbackBox.innerHTML = '';

  const nextBtn = document.getElementById('btn-quiz-next');
  nextBtn.style.display = 'none';

  q.options.forEach((optText, index) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.innerHTML = `<span>${optText}</span><span class="option-icon">⚪</span>`;
    btn.addEventListener('click', () => handleOptionClick(index, btn));
    optionsContainer.appendChild(btn);
  });
}

function handleOptionClick(selectedIndex, clickedBtn) {
  if (answerSubmitted) return;
  answerSubmitted = true;

  const q = quizQuestions[currentQuestionIndex];
  const allOptionBtns = document.querySelectorAll('.quiz-option-btn');

  allOptionBtns.forEach(btn => btn.setAttribute('disabled', 'true'));

  const feedbackBox = document.getElementById('quiz-feedback');
  feedbackBox.style.display = 'block';

  if (selectedIndex === q.correctIndex) {
    userScore++;
    clickedBtn.classList.add('correct');
    clickedBtn.querySelector('.option-icon').textContent = '✅';
    feedbackBox.style.borderLeftColor = 'var(--emerald-500)';
    feedbackBox.innerHTML = `<strong>¡Respuesta Correcta!</strong><br>${q.explanation}`;
  } else {
    clickedBtn.classList.add('incorrect');
    clickedBtn.querySelector('.option-icon').textContent = '❌';
    allOptionBtns[q.correctIndex].classList.add('correct');
    allOptionBtns[q.correctIndex].querySelector('.option-icon').textContent = '✅';
    feedbackBox.style.borderLeftColor = '#ef4444';
    feedbackBox.innerHTML = `<strong>Respuesta Incorrecta.</strong><br>${q.explanation}`;
  }

  document.getElementById('quiz-score-tracker').textContent = `Puntos: ${userScore}`;

  const nextBtn = document.getElementById('btn-quiz-next');
  nextBtn.style.display = 'inline-block';
  if (currentQuestionIndex === quizQuestions.length - 1) {
    nextBtn.textContent = 'Ver Resultados Finales 🏆';
  } else {
    nextBtn.textContent = 'Siguiente Pregunta →';
  }
}

function nextQuizQuestion() {
  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    showQuizResults();
  }
}

function showQuizResults() {
  document.getElementById('quiz-question-view').style.display = 'none';
  const resultView = document.getElementById('quiz-results');
  resultView.style.display = 'block';

  document.getElementById('quiz-final-score').textContent = `Puntuación Obtenida: ${userScore} de ${quizQuestions.length} (${Math.round((userScore / quizQuestions.length) * 100)}%)`;

  const msg = document.getElementById('quiz-result-msg');
  if (userScore === quizQuestions.length) {
    msg.textContent = '¡Puntaje perfecto! Dominas los principios teóricos, los fundamentos legales panameños y las adaptaciones del PEI para la educación media.';
  } else if (userScore >= 2) {
    msg.textContent = '¡Buen trabajo! Cuentas con un entendimiento sólido de las normas y principios de inclusión. Te invitamos a repasar los modales de las leyes para afianzar detalles específicos.';
  } else {
    msg.textContent = 'Has dado el primer paso. Revisa las secciones interactivas de la Ley 42, el Decreto 1 y el Resuelto 924 para reforzar tus conocimientos.';
  }
}

function restartQuiz() {
  initQuiz();
}

/* ==========================================================================
   6. UTILIDAD: COPIAR CITAS AL PORTAPAPELES
   ========================================================================== */
function copyCitations() {
  const citations = `
1. República de Panamá. (1999). Ley N.º 42 de 27 de agosto de 1999, «Por la cual se establece la Equiparación de Oportunidades para las Personas con Discapacidad». Gaceta Oficial N.º 23,876.
2. Ministerio de Educación de Panamá. (2000). Decreto Ejecutivo N.º 1 de 4 de febrero de 2000, «Por el cual se establece la Normativa para la Educación Inclusiva de la Población con Necesidades Educativas Especiales (NEE)».
3. Ministerio de Educación de Panamá. (2006). Resuelto N.º 924 de 24 de junio de 2006, «Por el cual se adopta en todos los centros educativos públicos del país el Programa Educativo Individual (PEI)».
4. Ministerio de Educación de Panamá (MEDUCA). Estudio de la Situación de la Educación Inclusiva en Panamá: Diagnóstico y Lineamientos Curriculares.
5. Agencia Europea para el Desarrollo de la Educación del Alumnado con NEE. Educación inclusiva y prácticas en el aula en la educación secundaria.
6. Universidad Internacional de Valencia (VIU). Educación inclusiva: claves y prácticas recomendables.
7. Save the Children. Guía de buenas prácticas en educación inclusiva.
  `.trim();

  navigator.clipboard.writeText(citations).then(() => {
    const btnText = document.getElementById('copy-btn-text');
    if (btnText) {
      const original = btnText.textContent;
      btnText.textContent = '¡Referencias Copiadas!';
      setTimeout(() => {
        btnText.textContent = original;
      }, 2500);
    }
  }).catch(err => {
    console.error('Error al copiar al portapapeles:', err);
  });
}
