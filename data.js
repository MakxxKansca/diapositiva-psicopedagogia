/**
 * BASE DE DATOS Y CONTENIDOS: Evolución de la Psicopedagogía, Tercera Métrica y Autocuidado Docente
 * Basado fielmente en el documento académico de referencia.
 */

const APP_DATA = {
  projectInfo: {
    title: "Evolución histórica de la Psicopedagogía",
    subtitle: "Y los principios de la Tercera Métrica del siglo XXI con estrategias digitales de autocuidado docente",
    authorLabel: "Recurso Educativo Digital Interactivo",
    tagline: "Un viaje desde las raíces del aprendizaje humano hasta el bienestar docente contemporáneo"
  },

  // Hitos de la línea de tiempo histórica
  timeline: [
    {
      id: "siglo-xvii-comenio",
      period: "Siglo XVII",
      year: "1592 - 1670",
      title: "Orígenes Filosóficos y Didáctica Científica",
      person: "Juan Amos Comenio",
      category: "filosofico",
      categoryName: "Orígenes Filosóficos",
      shortDesc: "Defendió un enfoque científico de la educación basado en la naturaleza infantil y sus ritmos de aprendizaje.",
      quote: "El niño debe aprender de acuerdo con sus procesos naturales y espontáneos.",
      modalContent: {
        title: "Juan Amos Comenio y los Fundamentos de la Educación",
        context: "Siglo XVII (1592-1670) - Europa Central",
        badge: "Pilar Fundacional",
        description: `Considerado el padre de la didáctica moderna, Comenio sentó las bases de lo que siglos después sería la psicopedagogía. Se opuso firmemente al castigo físico y a la memorización mecánica, proponiendo que la enseñanza debe adaptarse a la disposición psicológica y madurativa del estudiante.`,
        keyPoints: [
          "Pionero en concebir la educación como un proceso científico estructurado.",
          "Propuso el principio de respetar las leyes del desarrollo natural de la mente infantil.",
          "Postuló la necesidad de utilizar materiales sensoriales y visuales para facilitar el aprendizaje."
        ],
        relevance: "Su visión anticipó el principio psicopedagógico moderno: no se puede enseñar eficazmente sin comprender primero cómo aprende el cerebro y la mente del niño."
      }
    },
    {
      id: "siglo-xviii-rousseau",
      period: "Siglo XVIII",
      year: "1712 - 1778",
      title: "Psicología Infantil y Etapas Evolutivas",
      person: "Jean-Jacques Rousseau",
      category: "filosofico",
      categoryName: "Orígenes Filosóficos",
      shortDesc: "Introdujo la noción de respetar las etapas evolutivas naturales del desarrollo humano en su obra 'Emilio'.",
      quote: "La infancia tiene sus propias formas de ver, pensar y sentir; nada hay más insensato que pretender sustituirlas por las nuestras.",
      modalContent: {
        title: "Jean-Jacques Rousseau: El Descubrimiento de la Infancia",
        context: "Siglo XVIII (1712-1778) - Francia / Suiza",
        badge: "Teoría del Desarrollo",
        description: `En su célebre tratado 'Emilio, o De la educación' (1762), Rousseau revolucionó la visión del aprendiz. Antes de él, el niño era tratado como un 'adulto en miniatura'. Rousseau demostró que la infancia posee leyes biológicas y psicológicas propias.`,
        keyPoints: [
          "Reconocimiento de etapas diferenciadas del desarrollo cognitivo y moral.",
          "Defensa del aprendizaje por experiencia directa y curiosidad natural.",
          "Fundamento del respeto a los tiempos individuales del aprendiz."
        ],
        relevance: "Constituye la base teórica de la evaluación psicopedagógica diagnóstica centrada en la etapa evolutiva real del alumno."
      }
    },
    {
      id: "siglo-xix-pestalozzi-herbart",
      period: "Siglo XIX",
      year: "1746 - 1841",
      title: "Vínculo entre Pedagogía y Psicología",
      person: "Pestalozzi & Herbart",
      category: "filosofico",
      categoryName: "Orígenes Filosóficos",
      shortDesc: "Afirmaron taxativamente que la pedagogía debe fundamentarse de manera indispensable en la psicología.",
      quote: "La pedagogía sin psicología es ciega; la psicología sin pedagogía es estéril.",
      modalContent: {
        title: "Pestalozzi y Herbart: La Fusión de Dos Ciencias",
        context: "Siglo XIX - Europa",
        badge: "Génesis Interdisciplinar",
        description: `Johann Heinrich Pestalozzi promovió la educación integral ('cabeza, corazón y mano'), mientras que Johann Friedrich Herbart estructuró la pedagogía como una disciplina científica con base en la ética (los fines) y la psicología (los medios para alcanzarlos).`,
        keyPoints: [
          "Establecimiento definitivo del puente metodológico entre psicología y enseñanza.",
          "Interés temprano por atender a niños con retrasos cognitivos o en situación de vulnerabilidad.",
          "Sistematización de los pasos formales de la instrucción basada en la percepción mental."
        ],
        relevance: "Dio nacimiento formal a la convicción de que el acto de educar requiere herramientas científicas de diagnóstico cognitivo y afectivo."
      }
    },
    {
      id: "1889-primer-instituto",
      period: "Finales del Siglo XIX",
      year: "1889",
      title: "Educación Especial y Diversidad en el Aula",
      person: "Comunidad Educativa Especializada",
      category: "cientifica",
      categoryName: "Consolidación Científica",
      shortDesc: "Creación del primer Instituto para sordomudos e inicio de la formación especializada de profesores en educación especial.",
      quote: "La atención a las diversidades sensoriales e intelectuales inauguró la investigación psicopedagógica aplicada.",
      modalContent: {
        title: "1889: El Nacimiento de la Educación Especial Especializada",
        context: "Finales del Siglo XIX",
        badge: "Hito Institucional",
        description: `A finales del siglo XIX emergió en el mundo occidental una preocupación creciente por las diversidades funcionales y de aprendizaje en las escuelas regulares. La fundación del primer Instituto para sordomudos marcó la profesionalización de la enseñanza adaptada.`,
        keyPoints: [
          "Primeros planes formativos para docentes enfocados en necesidades educativas especiales.",
          "Desarrollo de métodos táctiles, visuales y adaptativos de comunicación.",
          "Transición desde el asilo asistencial hacia el modelo de rehabilitación pedagógica."
        ],
        relevance: "Sentó el precedente de lo que hoy conocemos como Programas de Integración Escolar (PIE) e inclusión educativa."
      }
    },
    {
      id: "1908-termino-francia",
      period: "Inicios del Siglo XX",
      year: "1908",
      title: "Aparición del Término 'Psicopedagogía'",
      person: "Pioneros Médicos y Educadores en Francia",
      category: "cientifica",
      categoryName: "Consolidación Científica",
      shortDesc: "Primera detección documentada del término en Francia, aplicado en contextos de medicina, psicología y orientación vocacional.",
      quote: "Surge el término exacto para nombrar la ciencia aplicada del aprendizaje humano.",
      modalContent: {
        title: "1908: Francia Acuña el Término 'Psicopedagogía'",
        context: "1908 - París, Francia",
        badge: "Bautizo Disciplinar",
        description: `El término comenzó a ser empleado formalmente en clínicas y consultorios pedagógicos franceses. Nació de la necesidad práctica de médicos y psicólogos de trabajar codo a codo con los maestros ante fracasos escolares y problemas de orientación vocacional.`,
        keyPoints: [
          "Confluencia de la pediatría, psiquiatría infantil, psicología experimental y didáctica.",
          "Foco inicial en orientación vocacional y diagnóstico de inadaptaciones escolares.",
          "Consolidación en informes oficiales posteriores en 1935 y entrada al diccionario psicológico en 1957."
        ],
        relevance: "La psicopedagogía adquiere identidad propia, diferenciándose progresivamente de la psicología pura y de la pedagogía general."
      }
    },
    {
      id: "1956-latinoamerica-buenos-aires",
      period: "Mediados del Siglo XX",
      year: "1956",
      title: "Primera Carrera Universitaria en Latinoamérica",
      person: "Universidad del Salvador (Buenos Aires)",
      category: "latam",
      categoryName: "Profesionalización en América Latina",
      shortDesc: "Fundación de la carrera formal de Psicopedagogía en la Universidad del Salvador, marcando un hito mundial.",
      quote: "Argentina se convirtió en pionera global en otorgar un título universitario específico en Psicopedagogía.",
      modalContent: {
        title: "1956: Argentina Lidera la Carrera Universitaria",
        context: "1956 - Buenos Aires, Argentina",
        badge: "Hito Académico",
        description: `Bajo el impulso de facultades especializadas en Argentina, se creó la primera carrera con titulación universitaria en Psicopedagogía en el mundo. Esto transformó una práctica auxiliar en una profesión autónoma con currículo riguroso.`,
        keyPoints: [
          "Diseño del primer plan de estudios de grado especializado en diagnóstico y tratamiento del aprendizaje.",
          "Separación decisiva en los años 60: las dificultades de lectoescritura y cálculo pasaron del ámbito clínico-médico al pedagógico.",
          "Aparición de centros de atención y clínicas psicopedagógicas institucionales."
        ],
        relevance: "Inició la llamada 'escuela latinoamericana de psicopedagogía', reconocida por su enfoque holístico y psicosocial."
      }
    },
    {
      id: "1975-1981-chile-educares",
      period: "Décadas de 1970 y 1980",
      year: "1975 - 1981",
      title: "Institucionalización y Grupos Diferenciales en Chile",
      person: "Instituto Educares y Reforma Educativa Chilena",
      category: "latam",
      categoryName: "Profesionalización en América Latina",
      shortDesc: "Leyes que crearon grupos diferenciales en escuelas regulares (1975-1976) e inicio formal de la carrera en Chile (1981, Educares).",
      quote: "Las escuelas públicas integran gabinetes psicopedagógicos para democratizar el aprendizaje.",
      modalContent: {
        title: "1975-1981: La Expansión Psicopedagógica en Chile",
        context: "1975 - 1981 - Santiago de Chile",
        badge: "Marco Jurídico e Institucional",
        description: `Entre 1975 y 1976, Chile promulgó leyes para establecer 'grupos diferenciales' y centros de apoyo dentro de las escuelas regulares para estudiantes con dificultades de aprendizaje. En 1981, el Instituto Educares inició formalmente la formación técnica y universitaria de psicopedagogos en el país.`,
        keyPoints: [
          "1975-1976: Creación legal de centros de diagnóstico y grupos diferenciales en escuelas públicas.",
          "1981: El Instituto Educares abre sus aulas como entidad pionera en la titulación formal.",
          "Investigaciones de la década de 1980 lideradas por Estela Mora definieron al 'aprendizaje humano' como objeto de estudio autónomo."
        ],
        relevance: "Estableció el 'jugar matricero' como metodología propia psicopedagógica y la inserción de estos profesionales en el sistema escolar nacional."
      }
    },
    {
      id: "siglo-xxi-neurociencia-inclusion",
      period: "Siglo XXI",
      year: "Actualidad",
      title: "Neurociencias, Inclusión y Tecnologías Digitales",
      person: "Comunidad Psicopedagógica Global",
      category: "sigloxxi",
      categoryName: "Psicopedagogía Contemporánea",
      shortDesc: "Integración de neuroeducación, inclusión universal, inteligencias múltiples y personalización mediante herramientas digitales.",
      quote: "Una disciplina interdisciplinaria que articula psicología, neurociencia, didáctica y tecnología.",
      modalContent: {
        title: "El Siglo XXI: La Psicopedagogía del Futuro",
        context: "Época Contemporánea",
        badge: "Vanguardia Educativa",
        description: `Hoy la psicopedagogía se sitúa en la vanguardia del diseño universal para el aprendizaje (DUA). Se apoya en descubrimientos de la plasticidad cerebral, neurociencias cognitivas y entornos virtuales para ofrecer trayectorias de aprendizaje personalizadas y sin exclusión.`,
        keyPoints: [
          "Neuroeducación: comprender cómo el cerebro procesa, almacena y evoca conocimientos.",
          "Diseño Universal para el Aprendizaje (DUA) y equidad educativa.",
          "Uso ético y crítico de plataformas digitales adaptativas."
        ],
        relevance: "El foco no está en etiquetar 'déficits', sino en desbloquear el potencial singular de cada estudiante respetando su perfil cognitivo."
      }
    }
  ],

  // Los 4 pilares de la Tercera Métrica
  thirdMetric: {
    intro: "La Tercera Métrica surge como una respuesta crítica y transformadora frente a los dos parámetros tradicionales de éxito: el dinero y el poder. Propuesta para medir la plenitud humana, resulta esencial para que los educadores sostengan su vocación con salud integral.",
    quote: "No podemos cuidar a otros ni enseñar con pasión si nuestro propio tanque interior está completamente vacío.",
    pillars: [
      {
        id: "bienestar",
        number: "01",
        title: "Bienestar",
        subtitle: "Salud Integral",
        icon: "heart-pulse",
        color: "#10b981", // Emerald
        bgGradient: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.05))",
        description: "Salud en sus cuatro dimensiones inseparables: física, mental, emocional y espiritual. Comprende aprender a relajarnos conscientemente, cultivar relaciones interpersonales sanas y regular las emociones cotidianas.",
        expandedDetails: {
          concept: "El bienestar no es la mera ausencia de enfermedad, sino un estado activo de vitalidad, descanso reparador y homeostasis emocional.",
          docenteAction: "Priorizar un sueño nocturno reparador de 7-8 horas para regenerar conexiones neuronales y mantener la paciencia pedagógica.",
          practicalTip: "Aprender a decir 'no' sin culpa a demandas extracurriculares fuera del horario laboral."
        }
      },
      {
        id: "sabiduria",
        number: "02",
        title: "Sabiduría",
        subtitle: "Conocimiento Profundo",
        icon: "compass",
        color: "#f59e0b", // Amber
        bgGradient: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(217,119,6,0.05))",
        description: "Un saber lúcido que trasciende la simple acumulación de datos o títulos intelectuales, integrando discernimiento ético, comprensión espiritual y sintonía con las leyes naturales de la realidad.",
        expandedDetails: {
          concept: "Capacidad de tomar decisiones con perspectiva amplia, reconociendo qué cosas están bajo nuestro control y cuáles debemos soltar.",
          docenteAction: "Cultivar momentos diarios de silencio y autorreflexión sobre la propia práctica pedagógica antes de reaccionar.",
          practicalTip: "Desarrollar una mirada crítica frente a las expectativas irreales de perfección académica y digital."
        }
      },
      {
        id: "asombro",
        number: "03",
        title: "Asombro",
        subtitle: "Curiosidad Viva",
        icon: "sparkles",
        color: "#8b5cf6", // Purple
        bgGradient: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(124,58,237,0.05))",
        description: "Capacidad innata de maravillarse ante los detalles cotidianos de la vida, preservar viva la curiosidad infantil y mantener una mente abierta a lo nuevo e inesperado.",
        expandedDetails: {
          concept: "El asombro es el motor primordial del aprendizaje; sin asombro, la enseñanza se vuelve trámite burocrático.",
          docenteAction: "Celebrar los pequeños descubrimientos de los estudiantes y contemplar la belleza en el aula y en la naturaleza.",
          practicalTip: "Introducir anécdotas intrigantes, preguntas desafiantes y experimentos que despierten la chispa investigadora."
        }
      },
      {
        id: "generosidad",
        number: "04",
        title: "Generosidad",
        subtitle: "Entrega y Compasión",
        icon: "hands-holding",
        color: "#ec4899", // Pink
        bgGradient: "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(219,39,119,0.05))",
        description: "Disposición voluntaria a dar de nosotros mismos a los demás con empatía y compasión genuinas, conectando con el propósito trascendente de la educación sin descuidar el propio ser.",
        expandedDetails: {
          concept: "Compartir saberes, escucha atenta y presencia cálida genera redes de apoyo mutuo que amortiguan el desgaste profesional.",
          docenteAction: "Modelar prácticas colaborativas y de cuidado entre colegas docentes en lugar de competir o aislarse.",
          practicalTip: "Reconocer verbalmente el esfuerzo de un colega o brindar una palabra de aliento oportuna durante la jornada."
        }
      }
    ]
  },

  // Estrategias digitales de autocuidado docente
  selfCare: {
    intro: "En un contexto hiperconectado dominado por la economía de la atención y el diseño persuasivo de las aplicaciones, el docente requiere estrategias concretas para preservar su salud física, mental y visual.",
    categories: [
      {
        id: "limites",
        title: "Límites Tecnológicos Claros",
        icon: "shield-check",
        summary: "Fijar fronteras firmes para evitar la disponibilidad 24/7 y la intoxicación de notificaciones.",
        actions: [
          {
            title: "Horarios Estrictos de Comunicación",
            text: "Establecer ventanas horarias específicas para leer y contestar correos o mensajes escolares. No estar disponible 24/7."
          },
          {
            title: "Espacios 'Low-Tech' en la Escuela",
            text: "Designar tiempos libres de pantallas durante el recreo o salas de profesores para fomentar el diálogo humano directo."
          },
          {
            title: "Curaduría de Herramientas",
            text: "Utilizar solo 2 o 3 plataformas digitales que aporten verdadero valor pedagógico, evitando la sobrecarga y el caos de aplicaciones."
          }
        ]
      },
      {
        id: "pausas",
        title: "Pausas Conscientes y Regeneración",
        icon: "hourglass",
        summary: "Desconectar intencionalmente para restaurar la concentración y la salud cerebral.",
        actions: [
          {
            title: "Regla de Oro 50/10",
            text: "Por cada 50 minutos de trabajo continuo frente a la pantalla o en planificación, tomar 10 minutos de descanso total alejado de dispositivos."
          },
          {
            title: "Pausas Sensoriales",
            text: "Hacer una caminata breve, tomar una infusión en calma y silencio, o realizar estiramientos corporales conscientes."
          },
          {
            title: "Micro-momentos de Calma",
            text: "Practicar 3 respiraciones diafragmáticas profundas antes de iniciar cada clase o al cambiar de actividad docente."
          }
        ]
      },
      {
        id: "ergonomia",
        title: "Ergonomía Digital y Salud Visual",
        icon: "sun-dim",
        summary: "Ajustar el entorno tecnológico para proteger la vista, la postura y el sistema nervioso.",
        actions: [
          {
            title: "Filtros de Luz Cálida / Nocturna",
            text: "Activar la reducción de luz azul en computadoras y teléfonos para prevenir la fatiga visual y el insomnio."
          },
          {
            title: "Aumento de Escala y Tipografía",
            text: "Configurar un tamaño de texto legible que evite forzar la vista y adoptar una postura encorvada hacia la pantalla."
          },
          {
            title: "Modo Oscuro en Lecturas Extensas",
            text: "Usar fondos oscuros al revisar documentos extensos o planificaciones nocturnas para descansar la retina."
          }
        ]
      },
      {
        id: "conexion",
        title: "Conexión Humana y 'No Luchar Solos'",
        icon: "users-group",
        summary: "Construir comunidades de soporte docente para compartir desafíos tecnológicos sin vergüenza.",
        actions: [
          {
            title: "Cultura Compartida de Bienestar",
            text: "Hablar abiertamente con otros profesores sobre la fatiga digital; compartir dificultades reduce la presión de mostrar un entusiasmo forzado."
          },
          {
            title: "Priorizar Interacciones Cara a Cara",
            text: "Sustituir cadenas de mensajes o chats grupales por conversaciones personales breves y afectuosas."
          },
          {
            title: "Flexibilidad Metodológica",
            text: "Ofrecer a estudiantes y a uno mismo alternativas analógicas cuando la tecnología genere fricción o saturación mental."
          }
        ]
      }
    ]
  },

  // Videos incrustados curados de fuentes académicas confiables
  videos: [
    {
      id: "vid1",
      youtubeId: "iG9CE55wbtY", // Sir Ken Robinson en TED
      title: "¿Las escuelas matan la creatividad y la diversidad?",
      source: "Sir Ken Robinson | Conferencia Oficial TED",
      tag: "Fundamentos Disciplinares",
      description: "La conferencia más vista de la historia sobre cómo la educación debe adaptarse a los diversos perfiles de aprendizaje y talentos del ser humano."
    },
    {
      id: "vid2",
      youtubeId: "nncY-MA1Iu8", // Arianna Huffington en TED
      title: "La Tercera Métrica: El Éxito a través del Bienestar",
      source: "Arianna Huffington | Conferencia Oficial TED",
      tag: "Tercera Métrica del Siglo XXI",
      description: "La conferencia fundacional que redefinió el éxito más allá del dinero y el poder, demostrando por qué el descanso y el bienestar multiplican nuestro impacto."
    },
    {
      id: "vid3",
      youtubeId: "SFnMTHhKdkw", // Rita Pierson en TED
      title: "Todo Niño Necesita un Campeón: Conexión Humana",
      source: "Rita Pierson (Docente) | Conferencia Oficial TED",
      tag: "Prácticas de Autocuidado y Vínculo",
      description: "Una lección magistral sobre el poder de las relaciones humanas genuinas en el aula y cómo proteger la vocación docente frente a la frialdad tecnológica."
    }
  ],

  // Desafío Gamificado: Quiz de Conocimiento
  quiz: [
    {
      id: 1,
      question: "¿Quién introdujo en el siglo XVIII la idea de respetar las etapas evolutivas naturales del niño, sentando las bases de la psicología infantil?",
      options: [
        { letter: "A", text: "Juan Amos Comenio", isCorrect: false },
        { letter: "B", text: "Jean-Jacques Rousseau", isCorrect: true },
        { letter: "C", text: "Johann Friedrich Herbart", isCorrect: false },
        { letter: "D", text: "Estela Mora", isCorrect: false }
      ],
      explanation: "¡Correcto! Jean-Jacques Rousseau (1712-1778), en su célebre obra 'Emilio', postuló que el niño no es un adulto en miniatura y que la educación debe respetar estrictamente sus etapas evolutivas y ritmos biológicos."
    },
    {
      id: 2,
      question: "¿En qué año y país se detectó formalmente por primera vez el término 'Psicopedagogía' en contextos médicos y de orientación?",
      options: [
        { letter: "A", text: "1956 en Buenos Aires, Argentina", isCorrect: false },
        { letter: "B", text: "1889 en Suiza", isCorrect: false },
        { letter: "C", text: "1908 en Francia", isCorrect: true },
        { letter: "D", text: "1981 en Chile", isCorrect: false }
      ],
      explanation: "¡Exacto! Fue en 1908 en Francia donde se documentó por primera vez el término 'Psicopedagogía', articulando saberes de medicina, psicología infantil y orientación vocacional escolar."
    },
    {
      id: 3,
      question: "¿Cuáles son los cuatro pilares fundamentales que integran la propuesta de la Tercera Métrica del siglo XXI?",
      options: [
        { letter: "A", text: "Dinero, Poder, Rendimiento y Competencia", isCorrect: false },
        { letter: "B", text: "Bienestar, Sabiduría, Asombro y Generosidad (o compasión)", isCorrect: true },
        { letter: "C", text: "Disciplina, Calificaciones, Memoria y Eficiencia", isCorrect: false },
        { letter: "D", text: "Tecnología, Productividad, Liderazgo y Éxito material", isCorrect: false }
      ],
      explanation: "¡Brillante! La Tercera Métrica propuesta por Arianna Huffington sustituye la obsesión por el dinero y el poder por cuatro pilares trascendentes: Bienestar, Sabiduría, Asombro y Generosidad/Compasión."
    },
    {
      id: 4,
      question: "¿En qué consiste la 'Regla 50/10' recomendada como estrategia digital de autocuidado docente?",
      options: [
        { letter: "A", text: "Trabajar 50 horas semanales y descansar 10 días seguidos", isCorrect: false },
        { letter: "B", text: "Por cada 50 minutos de labor frente a pantallas, tomar 10 minutos de pausa alejado de dispositivos", isCorrect: true },
        { letter: "C", text: "Dedicar 50% de la clase a tecnología y 10% a dinámicas manuales", isCorrect: false },
        { letter: "D", text: "Limitar la vista a 50 cm de distancia y parpadear 10 veces por minuto", isCorrect: false }
      ],
      explanation: "¡Excelente! La Regla 50/10 establece que por cada 50 minutos continuos de pantalla, el educador debe hacer una pausa de 10 minutos desconectado (caminar, beber agua, contemplar sin pantallas) para regenerar la atención y proteger la visión."
    }
  ],

  // Fuentes bibliográficas originales del documento
  references: [
    {
      num: 1,
      title: "Historical Review of Psychopedagogy",
      url: "https://www.scribd.com/document/956159694/Historical-Review-of-Psychopedagogy",
      type: "Revisión Histórica"
    },
    {
      num: 2,
      title: "Orígenes de la Psicopedagogía (siglos XVII-XIX)",
      url: "https://www.scribd.com/document/684188484/Ori-genes-de-la-Psicopedagogi-a-2-6",
      type: "Fundamentos Epistemológicos"
    },
    {
      num: 3,
      title: "Tercera Métrica del Siglo XXI y Éxito Humano",
      url: "https://www.coursehero.com/es/file/205122842/Tercera-métrica-XXI-7383pdf/",
      type: "Marco Conceptual"
    },
    {
      num: 4,
      title: "La vida plena: Bienestar, Sabiduría, Asombro y Compasión",
      url: "https://biblioteca.empresainteligente.com/resources/biblioteca/archivos/la_vida_plena._bienestar_sabiduria_asombro_y_compasion__los_pilares_del_exito.pdf",
      type: "Monografía / Documento"
    },
    {
      num: 5,
      title: "EUN InnovatED - Teachers' Digital Wellbeing in 21st Century Schools",
      url: "http://www.eun.org/documents/411753/11183389/EUN+InnovatED-Teachers'%20digital+wellbeing+in+21st+century+schools_final.pdf",
      type: "Informe Internacional"
    },
    {
      num: 6,
      title: "Digital Wellbeing for Teachers: Finding Balance in a Demanding World",
      url: "https://blog.europeanschoolnetacademy.eu/2025/04/digital-wellbeing-for-teachers-finding-balance-in-a-demanding-digital-world/",
      type: "Guía Pedagógica"
    },
    {
      num: 7,
      title: "Digital Wellbeing Protocol for Educators",
      url: "https://jeisilaguilar.com/digital-wellbeing-protocol-for-educators/",
      type: "Protocolo de Intervención"
    },
    {
      num: 8,
      title: "Línea de Tiempo de la Psicopedagogía en Chile e Iberoamérica",
      url: "https://www.timetoast.com/timelines/historia-de-la-psicopedagogia-75929882-6dba-4ec8-9917-d1b7fc4af4e3",
      type: "Recurso Cronológico"
    }
  ]
};

// Exponer en entorno navegador o módulos
if (typeof window !== "undefined") {
  window.APP_DATA = APP_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = APP_DATA;
}
