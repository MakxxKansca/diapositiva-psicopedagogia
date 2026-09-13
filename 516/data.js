/**
 * RECURSO DIGITAL INTERACTIVO: PSICOPEDAGOGÍA, TERCERA MÉTRICA Y AUTOCUIDADO
 * Base de Datos Estructurada de Contenidos - Denis (516)
 * Fuente Primaria: Información .md
 */

const APP_DATA = {
  // 1. LÍNEA DE TIEMPO: EVOLUCIÓN HISTÓRICA DE LA PSICOPEDAGOGÍA
  timeline: [
    {
      id: "antigua-grecia",
      period: "Antigua Grecia",
      title: "Filosofía Educativa y Aprendizaje Humano",
      milestone: "Sócrates, Platón y Aristóteles reflexionan sobre educación, carácter y aprendizaje.",
      contribution: "Se comienzan a estudiar aspectos fundamentales relacionados con la formación del carácter y el aprendizaje humano.",
      tag: "Filosofía Clásica",
      popup: {
        title: "Sócrates, Platón y Aristóteles: Raíces del Aprendizaje",
        subtitle: "Antigua Grecia - Fundamentos del Pensamiento Pedagógico",
        quote: "«El conocimiento empieza en el asombro; educar la mente sin educar el corazón no es educar en absoluto.»",
        context: "Desde las reflexiones filosóficas de Sócrates (mayéutica como descubrimiento guiado), Platón (la academia y las ideas innatas) y Aristóteles (la experiencia y el hábito en el carácter), la humanidad comenzó a sistematizar cómo aprenden las personas y cómo influyen los factores éticos y cognitivos.",
        pedagogicalImpact: "Establece las bases para comprender que el aprendizaje no es una mera transmisión pasiva de datos, sino un proceso de desarrollo personal, introspección y construcción del carácter.",
        badge: "Epistemología Inicial"
      }
    },
    {
      id: "finales-siglo-xix",
      period: "Finales del siglo XIX",
      title: "Confluencia de Pedagogía y Psicología Experimental",
      milestone: "Confluencia entre pedagogía y psicología experimental en Europa.",
      contribution: "Surge la Psicopedagogía como campo de estudio sistemático, especialmente en el continente europeo.",
      tag: "Origen Científico",
      popup: {
        title: "Nacimiento de la Psicopedagogía como Disciplina Científica",
        subtitle: "Europa - Finales del Siglo XIX",
        quote: "«La educación debe fundarse en el conocimiento científico de la mente infantil y de sus procesos de maduración.»",
        context: "A finales del siglo XIX, con el surgimiento de los primeros laboratorios de psicología experimental (como el de Wilhelm Wundt en Leipzig) y los avances pedagógicos, los investigadores reconocieron que para enseñar eficazmente era indispensable estudiar científicamente la conducta, la percepción y la memoria del aprendiz.",
        pedagogicalImpact: "Marca la transición del empirismo intuitivo a una disciplina con base empírica, uniendo el rigor metodológico psicológico con la finalidad formativa de la pedagogía.",
        badge: "Confluencia Disciplinar"
      }
    },
    {
      id: "ano-1908",
      period: "Año 1908",
      title: "Aparición Documentada del Término «Psicopedagogía»",
      milestone: "Aparece documentado formalmente el término «psicopedagogía».",
      contribution: "Se relaciona inicialmente con técnicas psicométricas utilizadas para la clasificación y diagnóstico de escolares.",
      tag: "Consolidación Terminológica",
      popup: {
        title: "Primeros Usos Documentados del Término y la Psicometría",
        subtitle: "1908 - Diagnóstico y Clasificación Escolar",
        quote: "«Medir y diagnosticar para comprender las necesidades específicas de cada escolar.»",
        context: "En 1908 el vocablo 'psicopedagogía' se registra en publicaciones científicas europeas. En esta época pionera, la disciplina estuvo íntimamente ligada al desarrollo de tests mentales (como los trabajos de Alfred Binet y Théodore Simon) orientados a evaluar capacidades intelectuales y detectar rezagos en el aula.",
        pedagogicalImpact: "Permitió visibilizar que no todos los alumnos aprenden al mismo ritmo y legitimó la necesidad de diseñar instrumentos diagnósticos adaptados a la realidad escolar.",
        badge: "Registro Documental"
      }
    },
    {
      id: "ano-1946",
      period: "Año 1946",
      title: "Primeros Centros Psicopedagógicos en Francia",
      milestone: "Apertura de los primeros centros psicopedagógicos en Francia tras la Segunda Guerra Mundial.",
      contribution: "Se orientan principalmente a apoyar y acompañar a estudiantes con dificultades escolares.",
      tag: "Intervención Clínica y Educativa",
      popup: {
        title: "Francia 1946: De la Clasificación a la Intervención Integral",
        subtitle: "Creación de Centros Psicopedagógicos Asistenciales",
        quote: "«El objetivo no es etiquetar al alumno, sino restituir su capacidad de aprender y su bienestar integral.»",
        context: "Figuras como George Mauco y Françoise Dolto impulsaron centros psicopedagógicos médicos en Francia para atender el trauma y el rezago académico de posguerra. Por primera vez, médicos, psicólogos, psicoanalistas y maestros trabajaron en equipo para atender dificultades escolares de forma interdisciplinaria.",
        pedagogicalImpact: "Representó un salto cualitativo decisivo: la psicopedagogía dejó de ser meramente evaluativa para transformarse en una práctica clínica, terapéutica y reeducativa orientada al rescate del estudiante.",
        badge: "Modelo Interdisciplinar"
      }
    },
    {
      id: "desde-1961",
      period: "Desde 1961 en adelante",
      title: "Período de Desarrollo y Consolidación Global",
      milestone: "Período de desarrollo, especialización y consolidación institucional de la disciplina.",
      contribution: "Se fortalecen conceptos sobre dificultades específicas del aprendizaje (DEA) y nacen asociaciones especializadas a nivel mundial.",
      tag: "Consolidación Contemporánea",
      popup: {
        title: "Madurez Científica y Expansión Institucional",
        subtitle: "Desde 1961 hasta el Siglo XXI",
        quote: "«Comprender la neurodiversidad y garantizar la equidad educativa como derecho humano inalienable.»",
        context: "A partir de la década de 1960, el concepto de 'Learning Disabilities' (dificultades específicas de aprendizaje) acuñado por Samuel Kirk en 1963 catalizó la creación de colegios profesionales, carreras universitarias especializadas y marcos normativos inclusivos en América Latina y Europa.",
        pedagogicalImpact: "Consolida a la psicopedagogía como un pilar imprescindible en las instituciones educativas, transitando de un modelo médico tradicional a un enfoque humanista, inclusivo y neurodidáctico.",
        badge: "Enfoque Inclusivo XXI"
      }
    }
  ],

  // 2. LOS CUATRO PILARES DE LA TERCERA MÉTRICA (ARIANNA HUFFINGTON)
  thirdMetric: {
    author: "Arianna Huffington",
    concept: "Propone ampliar la idea tradicional de éxito. En lugar de considerar únicamente dinero y poder, incorpora cuatro elementos fundamentales para alcanzar una vida plena: bienestar, sabiduría, asombro y generosidad.",
    pillars: [
      {
        id: "bienestar",
        name: "Bienestar",
        icon: "🌿",
        colorClass: "pillar-wellbeing",
        tag: "Pilar 1",
        definition: "Consiste en cuidar la salud física y mental, comprendiendo que el éxito no depende de trabajar más horas, sino de utilizar el tiempo de manera saludable y de calidad.",
        teacherApplication: "Descansar adecuadamente, realizar pausas activas durante la jornada laboral y cuidar conscientemente la salud mental y emocional.",
        reflectionQuestion: "¿Estás sacrificando tus horas de sueño y descanso creyendo que eso te hace mejor profesional?",
        actionTip: "Aplica la regla de desconexión nocturna: apaga pantallas 45 minutos antes de dormir."
      },
      {
        id: "sabiduria",
        name: "Sabiduría",
        icon: "🧠",
        colorClass: "pillar-wisdom",
        tag: "Pilar 2",
        definition: "Se relaciona con conectar con el conocimiento interior y la experiencia acumulada, y no solamente con tener o acumular mucha información.",
        teacherApplication: "Reflexionar sobre las experiencias de enseñanza diarias y aprender constructivamente de los errores y logros profesionales.",
        reflectionQuestion: "¿Cuánto tiempo dedicas a reflexionar sobre tu práctica pedagógica frente al tiempo que pasas reaccionando a urgencias?",
        actionTip: "Lleva una bitácora breve al final del día anotando una lección aprendida de tu aula."
      },
      {
        id: "asombro",
        name: "Asombro",
        icon: "✨",
        colorClass: "pillar-wonder",
        tag: "Pilar 3",
        definition: "Es la capacidad de maravillarse y apreciar la naturaleza, el arte y las experiencias de la vida cotidiana. Ayuda a combatir el estrés y la desconexión personal.",
        teacherApplication: "Valorar los pequeños logros de los estudiantes y disfrutar plenamente de los momentos positivos y luminosos de la labor educativa.",
        reflectionQuestion: "¿Cuándo fue la última vez que te detuviste a celebrar el avance silencioso de un alumno con dificultades?",
        actionTip: "Celebra un micro-éxito al inicio o cierre de cada sesión pedagógica."
      },
      {
        id: "generosidad",
        name: "Generosidad",
        icon: "🤝",
        colorClass: "pillar-giving",
        tag: "Pilar 4",
        definition: "Es la disposición de aportar a los demás mediante la empatía, la compasión y el servicio genuino hacia la comunidad.",
        teacherApplication: "Apoyar a estudiantes y compañeros de labor docente, escuchar activamente sus necesidades y colaborar con la comunidad educativa.",
        reflectionQuestion: "¿Cómo enriqueces el ambiente escolar escuchando a tus colegas sin juzgar?",
        actionTip: "Ofrece un espacio de mentoría o escucha empática a un colega novel una vez por semana."
      }
    ]
  },

  // 3. ESTRATEGIAS DE AUTOCUIDADO Y CALIDAD DE VIDA PARA DOCENTES
  selfCare: [
    {
      id: "pausas-activas",
      number: "1",
      icon: "🧘",
      title: "Realizar pausas activas y manejar el estrés",
      description: "Durante la jornada laboral, el docente puede realizar pequeñas pausas para estirarse, respirar conscientemente y relajar la musculatura y la visión.",
      benefit: "Ayuda a disminuir la tensión acumulada y favorece el bienestar físico y mental.",
      practicalGuide: "Aplica la regla 50/10: tras 50 minutos de trabajo, tómate 10 minutos para despegar la mirada de las pantallas, estirar la espalda y respirar profundamente."
    },
    {
      id: "reflexion-personal",
      number: "2",
      icon: "📖",
      title: "Dedicar espacios a la reflexión personal",
      description: "Reservar unos minutos para reflexionar sobre las experiencias vividas durante la jornada: qué salió bien, qué se puede mejorar y cómo se pueden afrontar situaciones difíciles.",
      benefit: "Fortalece el autoconocimiento y permite aprender de la experiencia profesional acumulada.",
      practicalGuide: "Realiza una pausa reflexiva de 5 minutos al terminar la jornada con la pregunta: ¿Qué decisión pedagógica de hoy me hizo sentir orgullo?"
    },
    {
      id: "reconocer-logros",
      number: "3",
      icon: "🌟",
      title: "Reconocer y disfrutar los logros",
      description: "Tomarse un momento para valorar los avances propios y los de los estudiantes, incluso cuando sean pequeños.",
      benefit: "Fortalece la motivación interna y permite mantener una actitud positiva frente al trabajo diario.",
      practicalGuide: "Crea una 'caja de logros' física o digital donde anotes los pequeños progresos de alumnos con barreras de aprendizaje."
    },
    {
      id: "redes-apoyo",
      number: "4",
      icon: "🤝",
      title: "Mantener redes de apoyo",
      description: "Compartir experiencias, inquietudes y estrategias con otros docentes y brindar apoyo solidario a compañeros y estudiantes.",
      benefit: "Favorece las relaciones saludables y disminuye significativamente el aislamiento profesional.",
      practicalGuide: "Participa en círculos pedagógicos o grupos de diálogo donde se puedan compartir emociones y buenas prácticas sin temor al juicio."
    }
  ],

  // 4. GAMIFICACIÓN: DESAFÍO PSICOPEDAGÓGICO (5 PREGUNTAS CLAVE)
  quiz: [
    {
      id: 1,
      category: "Evolución Histórica",
      question: "¿A finales de qué siglo se produjo la confluencia entre pedagogía y psicología experimental que originó la Psicopedagogía?",
      options: [
        { letter: "A", text: "A mediados del siglo XVII con la Ilustración", isCorrect: false },
        { letter: "B", text: "A finales del siglo XIX en Europa", isCorrect: true },
        { letter: "C", text: "A principios del siglo XXI con las TIC", isCorrect: false },
        { letter: "D", text: "Durante el Renacimiento italiano", isCorrect: false }
      ],
      explanation: "¡Correcto! A finales del siglo XIX, la pedagogía confluyó con la psicología experimental en Europa, dando nacimiento formal a la psicopedagogía como campo científico de estudio."
    },
    {
      id: 2,
      category: "Hitos y Psicometría",
      question: "En 1908 aparece documentado el término «psicopedagogía». ¿Con qué técnicas se relacionó inicialmente?",
      options: [
        { letter: "A", text: "Con el uso de plataformas virtuales de aprendizaje", isCorrect: false },
        { letter: "B", text: "Con técnicas psicométricas para la clasificación de escolares", isCorrect: true },
        { letter: "C", text: "Exclusivamente con la formación universitaria de docentes", isCorrect: false },
        { letter: "D", text: "Con terapias de relajación en el aula", isCorrect: false }
      ],
      explanation: "¡Exacto! En 1908 el término documentado se vinculó con el auge de las técnicas psicométricas y tests mentales para evaluar y clasificar las capacidades de los escolares."
    },
    {
      id: 3,
      category: "Tercera Métrica",
      question: "¿Cuáles son los cuatro pilares fundamentales propuestos por Arianna Huffington para redefinir el éxito?",
      options: [
        { letter: "A", text: "Dinero, poder, estatus y productividad acelerada", isCorrect: false },
        { letter: "B", text: "Bienestar, sabiduría, asombro y generosidad", isCorrect: true },
        { letter: "C", text: "Evaluación, disciplina, calificaciones y memoria", isCorrect: false },
        { letter: "D", text: "Tecnología, conectividad, competitividad e influencia", isCorrect: false }
      ],
      explanation: "¡Excelente! La Tercera Métrica amplía la idea de éxito incorporando cuatro elementos esenciales: Bienestar, Sabiduría, Asombro y Generosidad."
    },
    {
      id: 4,
      category: "Aplicación Docente",
      question: "Según el pilar de la Sabiduría en la labor docente, ¿en qué consiste su aplicación práctica?",
      options: [
        { letter: "A", text: "En acumular la mayor cantidad de títulos y memorizar manuales", isCorrect: false },
        { letter: "B", text: "En reflexionar sobre las experiencias de enseñanza y aprender de errores y logros", isCorrect: true },
        { letter: "C", text: "En trabajar horas extra para responder mensajes a toda hora", isCorrect: false },
        { letter: "D", text: "En corregir evaluaciones sin tomar pausas", isCorrect: false }
      ],
      explanation: "¡Muy bien! La sabiduría docente no es solo tener información, sino conectar con la experiencia interior, reflexionando sobre la práctica y aprendiendo tanto de los errores como de los logros."
    },
    {
      id: 5,
      category: "Autocuidado Docente",
      question: "¿Cuál es el principal beneficio de realizar pausas activas y manejar el estrés en la labor cotidiana?",
      options: [
        { letter: "A", text: "Ayuda a disminuir la tensión y favorece el bienestar físico y mental", isCorrect: true },
        { letter: "B", text: "Permite aislarse de la comunidad escolar", isCorrect: false },
        { letter: "C", text: "Evita tener que preparar clases", isCorrect: false },
        { letter: "D", text: "Reemplaza la necesidad de dormir en las noches", isCorrect: false }
      ],
      explanation: "¡Correcto! Las pausas activas (estirarse, respirar, desconectar brevemente) reducen la fatiga muscular y mental, previniendo el burnout y promoviendo la calidad de vida."
    }
  ],

  // 5. VIDEOTECA ACADÉMICA CONFIABLE
  videos: [
    {
      id: "arianna-ted",
      title: "Arianna Huffington: La Tercera Métrica y el Éxito por el Bienestar",
      source: "Conferencia Oficial TED",
      tag: "Tercera Métrica & Bienestar",
      youtubeId: "nncY-MA1Iu8",
      description: "Conferencia oficial donde Arianna Huffington expone el poder del descanso, la lucidez mental y la superación del agotamiento (burnout) para alcanzar una vida plena y equilibrada."
    },
    {
      id: "rita-pierson",
      title: "Rita Pierson: Todo Niño Necesita un Campeón (El Vínculo Pedagógico)",
      source: "Conferencia Oficial TED Talks Education",
      tag: "Psicopedagogía & Vínculo",
      youtubeId: "SFnMTHhKdkw",
      description: "Una de las charlas docentes más inspiradoras del mundo sobre pedagogía humanista, empatía, generosidad y el impacto transformador del vínculo educador-estudiante."
    },
    {
      id: "ken-robinson",
      title: "Sir Ken Robinson: La Creatividad y el Aprendizaje en la Educación",
      source: "Conferencia Oficial TED",
      tag: "Aprendizaje & Diversidad",
      youtubeId: "iG9CE55wbtY",
      description: "Disertación magistral sobre cómo transformar los entornos educativos para potenciar las inteligencias múltiples y comprender las diversas formas de aprender."
    }
  ],

  // 6. FUENTES CONSULTADAS CITADAS DE MANERA SENCILLA
  references: [
    {
      num: 1,
      title: "Evolución histórica de la Psicopedagogía y fundamentos epistemológicos",
      author: "Material Académico Institucional",
      year: "2024",
      note: "Documento base de análisis sobre los hitos desde la Antigua Grecia hasta la consolidación post-1961."
    },
    {
      num: 2,
      title: "Thrive: The Third Metric to Redefining Success and Creating a Life of Well-Being, Wisdom, and Wonder",
      author: "Huffington, Arianna",
      year: "2014",
      note: "Obra fundamental sobre los 4 pilares: bienestar, sabiduría, asombro y generosidad."
    },
    {
      num: 3,
      title: "Teachers' Digital Wellbeing in 21st Century Schools (InnovatED)",
      author: "European Schoolnet",
      year: "2023",
      note: "Informe y recomendaciones internacionales sobre desconexión digital, pausas activas y calidad de vida docente."
    },
    {
      num: 4,
      title: "Orígenes y evolución de la intervención psicopedagógica en el contexto escolar",
      author: "Revista Iberoamericana de Educación",
      year: "2022",
      note: "Revisión sobre centros psicopedagógicos de 1946 y atención interdisciplinaria a las dificultades de aprendizaje."
    }
  ]
};

// Exposición global
if (typeof window !== "undefined") {
  window.APP_DATA = APP_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = APP_DATA;
}
