/**
 * APLICACIÓN INTERACTIVA: Psicopedagogía, Tercera Métrica y Autocuidado Docente
 * Controladores de Diapositivas, Ventanas Emergentes (Modales), Gamificación y Temporizador
 */

document.addEventListener("DOMContentLoaded", () => {
  // Asegurar que los datos estén cargados
  if (typeof APP_DATA === "undefined") {
    console.error("No se encontró el objeto global APP_DATA.");
    return;
  }

  /* ==========================================================================
     1. SISTEMA DE EFECTOS DE SONIDO (WEB AUDIO API SINTETIZADO)
     ========================================================================== */
  const SoundSystem = {
    enabled: true,
    audioCtx: null,

    init() {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    },

    ensureContext() {
      if (!this.audioCtx) this.init();
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
    },

    playTone(freq, type = "sine", duration = 0.15, volume = 0.08) {
      if (!this.enabled) return;
      try {
        this.ensureContext();
        if (!this.audioCtx) return;

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
      } catch (e) {
        // Fallback silencioso si el navegador bloquea audio
      }
    },

    playSlideTransition() {
      this.playTone(320, "sine", 0.08, 0.04);
    },

    playPopup() {
      this.playTone(520, "sine", 0.12, 0.06);
    },

    playSuccess() {
      if (!this.enabled) return;
      this.playTone(587.33, "triangle", 0.15, 0.08); // D5
      setTimeout(() => this.playTone(880, "triangle", 0.25, 0.08), 120); // A5
    },

    playError() {
      if (!this.enabled) return;
      this.playTone(280, "sawtooth", 0.18, 0.07);
    },

    playTimerBell() {
      if (!this.enabled) return;
      this.playTone(659.25, "sine", 0.4, 0.1);
      setTimeout(() => this.playTone(880, "sine", 0.5, 0.1), 250);
    }
  };

  /* ==========================================================================
     2. GESTOR DE DIAPOSITIVAS (SLIDE MANAGER)
     ========================================================================== */
  const SlideManager = {
    currentSlide: 1,
    totalSlides: 7,
    slides: [],
    progressFill: document.getElementById("progress-fill"),
    slideDotsContainer: document.getElementById("slide-dots"),
    slideCounter: document.getElementById("slide-counter"),
    btnPrev: document.getElementById("btn-prev"),
    btnNext: document.getElementById("btn-next"),

    init() {
      this.slides = Array.from(document.querySelectorAll(".slide"));
      this.totalSlides = this.slides.length;
      this.renderDots();
      this.bindEvents();
      this.updateUI();
    },

    renderDots() {
      this.slideDotsContainer.innerHTML = "";
      for (let i = 1; i <= this.totalSlides; i++) {
        const dot = document.createElement("button");
        dot.className = `dot-btn ${i === 1 ? "active" : ""}`;
        dot.setAttribute("aria-label", `Ir a la diapositiva ${i}`);
        dot.addEventListener("click", () => this.goToSlide(i));
        this.slideDotsContainer.appendChild(dot);
      }
    },

    goToSlide(targetIndex) {
      if (targetIndex < 1 || targetIndex > this.totalSlides || targetIndex === this.currentSlide) {
        return;
      }

      const prevIndex = this.currentSlide;
      this.currentSlide = targetIndex;

      this.slides.forEach((slide) => {
        const slideNum = parseInt(slide.getAttribute("data-slide"), 10);
        slide.classList.remove("active", "prev");

        if (slideNum === this.currentSlide) {
          slide.classList.add("active");
        } else if (slideNum < this.currentSlide) {
          slide.classList.add("prev");
        }
      });

      SoundSystem.playSlideTransition();
      this.updateUI();
    },

    nextSlide() {
      if (this.currentSlide < this.totalSlides) {
        this.goToSlide(this.currentSlide + 1);
      }
    },

    prevSlide() {
      if (this.currentSlide > 1) {
        this.goToSlide(this.currentSlide - 1);
      }
    },

    updateUI() {
      // Actualizar contador
      if (this.slideCounter) {
        this.slideCounter.innerHTML = `Diapositiva <span>${this.currentSlide}</span> de ${this.totalSlides}`;
      }

      // Actualizar barra de progreso
      if (this.progressFill) {
        const percentage = ((this.currentSlide) / this.totalSlides) * 100;
        this.progressFill.style.width = `${percentage}%`;
      }

      // Actualizar botones de navegación
      if (this.btnPrev) this.btnPrev.disabled = this.currentSlide === 1;
      if (this.btnNext) {
        this.btnNext.disabled = this.currentSlide === this.totalSlides;
        if (this.currentSlide === this.totalSlides) {
          this.btnNext.textContent = "Finalizado";
        } else {
          this.btnNext.innerHTML = `Siguiente <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
        }
      }

      // Actualizar dots
      const dots = this.slideDotsContainer.querySelectorAll(".dot-btn");
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx + 1 === this.currentSlide);
      });
    },

    bindEvents() {
      if (this.btnPrev) this.btnPrev.addEventListener("click", () => this.prevSlide());
      if (this.btnNext) this.btnNext.addEventListener("click", () => this.nextSlide());

      const btnHeroStart = document.getElementById("btn-hero-start");
      if (btnHeroStart) {
        btnHeroStart.addEventListener("click", () => this.goToSlide(2));
      }

      // Atajos de teclado
      window.addEventListener("keydown", (e) => {
        // Ignorar si el usuario está escribiendo en un input
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

        if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
          e.preventDefault();
          this.nextSlide();
        } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
          e.preventDefault();
          this.prevSlide();
        } else if (e.key >= "1" && e.key <= "7") {
          const num = parseInt(e.key, 10);
          this.goToSlide(num);
        }
      });

      // Gestos táctiles Swipe
      let touchStartX = 0;
      let touchEndX = 0;

      window.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      window.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 60) {
          if (diff < 0) {
            this.nextSlide(); // Swipe izquierda -> avanzar
          } else {
            this.prevSlide(); // Swipe derecha -> retroceder
          }
        }
      }, { passive: true });
    }
  };

  /* ==========================================================================
     3. GESTOR DE VENTANAS EMERGENTES (MODALES POP-UPS ACCESIBLES)
     ========================================================================== */
  const ModalManager = {
    modalOverlay: document.getElementById("global-modal"),
    modalBadge: document.getElementById("modal-badge"),
    modalContent: document.getElementById("modal-body-content"),
    btnClose: document.getElementById("btn-close-modal"),

    helpModal: document.getElementById("help-modal"),
    btnHelp: document.getElementById("btn-help"),
    btnCloseHelp: document.getElementById("btn-close-help-modal"),

    init() {
      if (this.btnClose) {
        this.btnClose.addEventListener("click", () => this.close());
      }
      if (this.modalOverlay) {
        this.modalOverlay.addEventListener("click", (e) => {
          if (e.target === this.modalOverlay) this.close();
        });
      }

      // Modal de ayuda
      if (this.btnHelp && this.helpModal) {
        this.btnHelp.addEventListener("click", () => {
          this.helpModal.classList.add("active");
          this.helpModal.setAttribute("aria-hidden", "false");
          SoundSystem.playPopup();
        });
      }
      if (this.btnCloseHelp && this.helpModal) {
        this.btnCloseHelp.addEventListener("click", () => {
          this.helpModal.classList.remove("active");
          this.helpModal.setAttribute("aria-hidden", "true");
        });
        this.helpModal.addEventListener("click", (e) => {
          if (e.target === this.helpModal) {
            this.helpModal.classList.remove("active");
            this.helpModal.setAttribute("aria-hidden", "true");
          }
        });
      }

      // Tecla Escape para cerrar modales abiertos
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.close();
          if (this.helpModal) {
            this.helpModal.classList.remove("active");
            this.helpModal.setAttribute("aria-hidden", "true");
          }
        }
      });
    },

    open(data) {
      if (!this.modalOverlay || !this.modalContent) return;

      this.modalBadge.textContent = data.badge || "Hito Histórico";

      const keyPointsHTML = data.keyPoints && data.keyPoints.length > 0
        ? `<div class="modal-section-heading">Aspectos Fundamentales</div>
           <ul class="modal-points-list">
             ${data.keyPoints.map(p => `<li>${p}</li>`).join("")}
           </ul>`
        : "";

      this.modalContent.innerHTML = `
        <h3 class="modal-title">${data.title}</h3>
        <div class="modal-context">📍 ${data.context}</div>
        
        <p class="modal-description">${data.description}</p>
        
        ${keyPointsHTML}

        <div class="modal-relevance-box">
          <strong>Relevancia Psicopedagógica:</strong><br>
          ${data.relevance}
        </div>
      `;

      this.modalOverlay.classList.add("active");
      this.modalOverlay.setAttribute("aria-hidden", "false");
      SoundSystem.playPopup();
    },

    close() {
      if (this.modalOverlay) {
        this.modalOverlay.classList.remove("active");
        this.modalOverlay.setAttribute("aria-hidden", "true");
      }
    }
  };

  /* ==========================================================================
     4. RENDERIZADO DE LA LÍNEA DE TIEMPO INTERACTIVA
     ========================================================================== */
  const TimelineRenderer = {
    container: document.getElementById("timeline-cards-container"),
    filtersContainer: document.getElementById("timeline-filters"),
    currentFilter: "all",

    init() {
      this.render();
      this.bindFilters();
    },

    render() {
      if (!this.container || !APP_DATA.timeline) return;

      const items = APP_DATA.timeline.filter(item => {
        if (this.currentFilter === "all") return true;
        return item.category === this.currentFilter;
      });

      this.container.innerHTML = "";

      items.forEach(item => {
        const card = document.createElement("article");
        card.className = "timeline-card";
        card.setAttribute("tabindex", "0");

        card.innerHTML = `
          <div>
            <div class="timeline-card-header">
              <span class="timeline-year-badge">${item.year}</span>
              <span class="timeline-category-tag">${item.categoryName}</span>
            </div>
            <h3 class="timeline-card-title">${item.title}</h3>
            <div class="timeline-author">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              ${item.person}
            </div>
            <p class="timeline-desc">${item.shortDesc}</p>
          </div>
          <button class="timeline-popup-trigger" aria-haspopup="dialog">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            Ver Hito y Cita 
          </button>
        `;

        // Evento para abrir el modal pop-up
        const btnTrigger = card.querySelector(".timeline-popup-trigger");
        btnTrigger.addEventListener("click", () => {
          ModalManager.open(item.modalContent);
        });

        this.container.appendChild(card);
      });
    },

    bindFilters() {
      if (!this.filtersContainer) return;
      const buttons = this.filtersContainer.querySelectorAll(".filter-btn");

      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          buttons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          this.currentFilter = btn.getAttribute("data-filter");
          this.render();
          SoundSystem.playSlideTransition();
        });
      });
    }
  };

  /* ==========================================================================
     5. RENDERIZADO DE LA TERCERA MÉTRICA (BOTONES DESPLEGABLES)
     ========================================================================== */
  const MetricsRenderer = {
    container: document.getElementById("metrics-grid"),

    init() {
      if (!this.container || !APP_DATA.thirdMetric) return;

      this.container.innerHTML = "";

      APP_DATA.thirdMetric.pillars.forEach(pillar => {
        const card = document.createElement("div");
        card.className = "metric-card";
        card.style.setProperty("--pillar-color", pillar.color);

        card.innerHTML = `
          <div>
            <div class="metric-header">
              <span class="metric-number">${pillar.number}</span>
              <div class="metric-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
            </div>
            <h3 class="metric-title">${pillar.title}</h3>
            <div class="metric-subtitle">${pillar.subtitle}</div>
            <p class="metric-desc">${pillar.description}</p>
          </div>

          <div>
            <div class="metric-expanded-content" id="expanded-${pillar.id}">
              <div class="expanded-item">
                <strong>Enfoque Conceptual:</strong>
                ${pillar.expandedDetails.concept}
              </div>
              <div class="expanded-item">
                <strong>Aplicación en Docencia:</strong>
                ${pillar.expandedDetails.docenteAction}
              </div>
              <div class="expanded-item" style="color: ${pillar.color};">
                <strong>Tip de Oro:</strong>
                ${pillar.expandedDetails.practicalTip}
              </div>
            </div>

            <button class="btn-toggle-metric" data-target="expanded-${pillar.id}" style="margin-top: 1rem;">
              <span>Ver Aplicación Docente</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>
        `;

        const btnToggle = card.querySelector(".btn-toggle-metric");
        const contentBox = card.querySelector(`#expanded-${pillar.id}`);

        btnToggle.addEventListener("click", () => {
          const isExpanded = contentBox.classList.toggle("show");
          btnToggle.querySelector("span").textContent = isExpanded ? "Ocultar Detalles" : "Ver Aplicación Docente";
          const icon = btnToggle.querySelector("svg");
          icon.style.transform = isExpanded ? "rotate(180deg)" : "rotate(0deg)";
          SoundSystem.playTone(440, "sine", 0.08, 0.05);
        });

        this.container.appendChild(card);
      });
    }
  };

  /* ==========================================================================
     6. ESTRATEGIAS DE AUTOCUIDADO & TEMPORIZADOR 50/10
     ========================================================================== */
  const SelfCareManager = {
    tabsNav: document.getElementById("selfcare-tabs-nav"),
    panelsContainer: document.getElementById("selfcare-panels-container"),

    init() {
      this.renderTabs();
      TimerWidget.init();
    },

    renderTabs() {
      if (!this.tabsNav || !this.panelsContainer || !APP_DATA.selfCare) return;

      this.tabsNav.innerHTML = "";
      this.panelsContainer.innerHTML = "";

      APP_DATA.selfCare.categories.forEach((cat, index) => {
        // Botón pestaña
        const btn = document.createElement("button");
        btn.className = `tab-btn ${index === 0 ? "active" : ""}`;
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-selected", index === 0 ? "true" : "false");
        btn.innerHTML = `
          <span>${cat.title}</span>
        `;
        btn.addEventListener("click", () => this.selectTab(index));
        this.tabsNav.appendChild(btn);

        // Panel de contenido
        const panel = document.createElement("div");
        panel.className = `tab-content-panel ${index === 0 ? "active" : ""}`;
        panel.setAttribute("role", "tabpanel");

        panel.innerHTML = `
          <div style="margin-bottom: 1.25rem; font-size: 0.95rem; color: #cbd5e1;">
            ${cat.summary}
          </div>
          <div class="selfcare-action-cards">
            ${cat.actions.map(act => `
              <div class="selfcare-card">
                <div class="selfcare-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <h4 class="selfcare-card-title">${act.title}</h4>
                  <p class="selfcare-card-desc">${act.text}</p>
                </div>
              </div>
            `).join("")}
          </div>
        `;
        this.panelsContainer.appendChild(panel);
      });
    },

    selectTab(index) {
      const tabButtons = this.tabsNav.querySelectorAll(".tab-btn");
      const panels = this.panelsContainer.querySelectorAll(".tab-content-panel");

      tabButtons.forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
        btn.setAttribute("aria-selected", i === index ? "true" : "false");
      });

      panels.forEach((panel, i) => {
        panel.classList.toggle("active", i === index);
      });

      SoundSystem.playTone(380, "sine", 0.07, 0.04);
    }
  };

  /* Temporizador 50/10 */
  const TimerWidget = {
    display: document.getElementById("timer-display"),
    modeLabel: document.getElementById("timer-mode-label"),
    btnToggle: document.getElementById("btn-timer-toggle"),
    btnText: document.getElementById("timer-btn-text"),
    btnReset: document.getElementById("btn-timer-reset"),
    btnSwitch: document.getElementById("btn-timer-switch"),
    progressCircle: document.getElementById("timer-progress-circle"),

    timerInterval: null,
    isRunning: false,
    mode: "work", // "work" (50 min) o "break" (10 min)
    totalSeconds: 50 * 60,
    remainingSeconds: 50 * 60,

    init() {
      if (!this.display) return;
      this.updateDisplay();

      if (this.btnToggle) {
        this.btnToggle.addEventListener("click", () => this.toggle());
      }
      if (this.btnReset) {
        this.btnReset.addEventListener("click", () => this.reset());
      }
      if (this.btnSwitch) {
        this.btnSwitch.addEventListener("click", () => this.switchMode());
      }
    },

    toggle() {
      if (this.isRunning) {
        this.pause();
      } else {
        this.start();
      }
    },

    start() {
      this.isRunning = true;
      this.btnText.textContent = "Pausar";
      this.btnToggle.style.background = "#ef4444"; // Rojo al pausar
      SoundSystem.playTone(480, "sine", 0.1, 0.06);

      this.timerInterval = setInterval(() => {
        if (this.remainingSeconds > 0) {
          this.remainingSeconds--;
          this.updateDisplay();
        } else {
          this.complete();
        }
      }, 1000);
    },

    pause() {
      this.isRunning = false;
      clearInterval(this.timerInterval);
      this.btnText.textContent = "Reanudar";
      this.btnToggle.style.background = "var(--color-wellness)";
      SoundSystem.playTone(360, "sine", 0.1, 0.05);
    },

    reset() {
      this.pause();
      this.remainingSeconds = this.totalSeconds;
      this.btnText.textContent = this.mode === "work" ? "Iniciar 50 min" : "Iniciar 10 min";
      this.updateDisplay();
      SoundSystem.playTone(300, "sine", 0.08, 0.04);
    },

    switchMode() {
      this.pause();
      if (this.mode === "work") {
        this.mode = "break";
        this.totalSeconds = 10 * 60;
        this.remainingSeconds = 10 * 60;
        this.modeLabel.textContent = "Descanso / Sin Pantallas";
        this.modeLabel.style.color = "var(--color-primary)";
        this.btnSwitch.textContent = "50m Trabajo";
        this.btnText.textContent = "Iniciar 10 min";
      } else {
        this.mode = "work";
        this.totalSeconds = 50 * 60;
        this.remainingSeconds = 50 * 60;
        this.modeLabel.textContent = "Trabajo Enfocado";
        this.modeLabel.style.color = "var(--color-wellness)";
        this.btnSwitch.textContent = "10m Pausa";
        this.btnText.textContent = "Iniciar 50 min";
      }
      this.updateDisplay();
      SoundSystem.playTone(400, "sine", 0.1, 0.05);
    },

    complete() {
      this.pause();
      SoundSystem.playTimerBell();
      alert(this.mode === "work"
        ? "¡Ciclo de 50 minutos completado! Es hora de tu pausa consciente de 10 minutos alejado de pantallas."
        : "¡Pausa concluida! Regresas con la mente regenerada para continuar.");
      this.switchMode();
    },

    updateDisplay() {
      const minutes = Math.floor(this.remainingSeconds / 60);
      const seconds = this.remainingSeconds % 60;
      this.display.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      // Actualizar SVG de progreso circular
      if (this.progressCircle) {
        const circumference = 2 * Math.PI * 70; // r=70 -> ~439.82
        const progressFraction = (this.totalSeconds - this.remainingSeconds) / this.totalSeconds;
        const offset = circumference * (1 - progressFraction);
        this.progressCircle.style.strokeDashoffset = offset;
      }
    }
  };

  /* ==========================================================================
     7. RENDERIZADO DE VIDEOTECA ACADÉMICA (VIDEOS INCRUSTADOS)
     ========================================================================== */
  const VideoLibraryRenderer = {
    container: document.getElementById("videoteca-grid"),

    init() {
      if (!this.container || !APP_DATA.videos) return;

      this.container.innerHTML = "";

      APP_DATA.videos.forEach(vid => {
        const card = document.createElement("article");
        card.className = "video-card";

        card.innerHTML = `
          <div class="video-embed-wrapper">
            <iframe 
              src="https://www.youtube-nocookie.com/embed/${vid.youtubeId}" 
              title="${vid.title}" 
              loading="lazy" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
          <div class="video-info">
            <div>
              <span class="video-tag">${vid.tag}</span>
              <h3 class="video-title">${vid.title}</h3>
              <p class="video-desc">${vid.description}</p>
            </div>
            <div class="video-source">Fuente: ${vid.source}</div>
          </div>
        `;

        this.container.appendChild(card);
      });
    }
  };

  /* ==========================================================================
     8. MOTOR DEL QUIZ GAMIFICADO (GAMIFICATION ENGINE)
     ========================================================================== */
  const QuizEngine = {
    currentQuestionIndex: 0,
    score: 0,
    answered: false,

    questionIndicator: document.getElementById("quiz-question-indicator"),
    scoreDisplay: document.getElementById("quiz-score"),
    questionText: document.getElementById("quiz-question-text"),
    optionsList: document.getElementById("quiz-options-list"),
    feedbackBox: document.getElementById("quiz-feedback-box"),
    feedbackTitle: document.getElementById("feedback-title"),
    feedbackDesc: document.getElementById("feedback-desc"),
    btnNext: document.getElementById("btn-next-question"),

    cardContainer: document.getElementById("quiz-card"),
    resultsCard: document.getElementById("quiz-results-card"),
    resultsScoreDisplay: document.getElementById("results-score-display"),
    resultsMessage: document.getElementById("results-message"),
    btnRestart: document.getElementById("btn-restart-quiz"),
    btnPrintCert: document.getElementById("btn-print-cert"),

    init() {
      if (!this.cardContainer || !APP_DATA.quiz) return;

      this.bindEvents();
      this.loadQuestion(0);
    },

    bindEvents() {
      if (this.btnNext) {
        this.btnNext.addEventListener("click", () => {
          this.currentQuestionIndex++;
          if (this.currentQuestionIndex < APP_DATA.quiz.length) {
            this.loadQuestion(this.currentQuestionIndex);
          } else {
            this.showResults();
          }
        });
      }

      if (this.btnRestart) {
        this.btnRestart.addEventListener("click", () => this.restart());
      }

      if (this.btnPrintCert) {
        this.btnPrintCert.addEventListener("click", () => {
          window.print();
        });
      }
    },

    loadQuestion(index) {
      this.answered = false;
      const q = APP_DATA.quiz[index];

      // Actualizar encabezados
      this.questionIndicator.textContent = `Pregunta ${index + 1} de ${APP_DATA.quiz.length}`;
      this.questionText.textContent = q.question;

      // Ocultar feedback
      this.feedbackBox.className = "quiz-feedback-box";
      this.feedbackBox.style.display = "none";

      // Renderizar opciones
      this.optionsList.innerHTML = "";

      q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "quiz-option-btn";
        btn.innerHTML = `
          <span class="option-letter">${opt.letter}</span>
          <span>${opt.text}</span>
        `;

        btn.addEventListener("click", () => this.handleAnswer(opt, btn, q));
        this.optionsList.appendChild(btn);
      });
    },

    handleAnswer(selectedOption, clickedBtn, question) {
      if (this.answered) return;
      this.answered = true;

      const optionButtons = this.optionsList.querySelectorAll(".quiz-option-btn");
      optionButtons.forEach(btn => btn.disabled = true);

      if (selectedOption.isCorrect) {
        clickedBtn.classList.add("correct");
        this.score += 25;
        this.scoreDisplay.textContent = this.score;
        SoundSystem.playSuccess();

        this.feedbackBox.className = "quiz-feedback-box correct";
        this.feedbackTitle.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          ¡Respuesta Correcta! (+25 pts)
        `;
      } else {
        clickedBtn.classList.add("incorrect");
        SoundSystem.playError();

        // Resaltar la opción correcta para aprendizaje formativo
        optionButtons.forEach((btn, idx) => {
          if (question.options[idx].isCorrect) {
            btn.classList.add("correct");
          }
        });

        this.feedbackBox.className = "quiz-feedback-box incorrect";
        this.feedbackTitle.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          Respuesta Incorrecta
        `;
      }

      this.feedbackDesc.textContent = question.explanation;
      this.feedbackBox.style.display = "block";

      // Texto de botón siguiente
      if (this.currentQuestionIndex === APP_DATA.quiz.length - 1) {
        this.btnNext.innerHTML = `
          Ver Resultados y Diploma
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        `;
      } else {
        this.btnNext.innerHTML = `
          Siguiente Pregunta
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        `;
      }
    },

    showResults() {
      this.cardContainer.style.display = "none";
      this.resultsCard.classList.add("show");

      this.resultsScoreDisplay.textContent = `${this.score} / 100 Puntos`;

      if (this.score >= 75) {
        this.resultsMessage.textContent = "¡Sobresaliente! Dominas con excelencia los hitos históricos de la psicopedagogía, los cuatro pilares de la Tercera Métrica y las estrategias de autocuidado digital docente.";
        SoundSystem.playSuccess();
      } else {
        this.resultsMessage.textContent = "¡Buen esfuerzo! Has completado el recorrido. Puedes reintentar el desafío para afianzar los conceptos clave de la lectura académica.";
      }
    },

    restart() {
      this.score = 0;
      this.currentQuestionIndex = 0;
      this.scoreDisplay.textContent = "0";
      this.resultsCard.classList.remove("show");
      this.cardContainer.style.display = "block";
      this.loadQuestion(0);
      SoundSystem.playTone(400, "sine", 0.1, 0.05);
    }
  };

  /* ==========================================================================
     9. RENDERIZADO DE FUENTES BIBLIOGRÁFICAS
     ========================================================================== */
  const ReferencesRenderer = {
    container: document.getElementById("references-list"),

    init() {
      if (!this.container || !APP_DATA.references) return;

      this.container.innerHTML = "";

      APP_DATA.references.forEach(ref => {
        const item = document.createElement("div");
        item.className = "reference-item";

        item.innerHTML = `
          <div class="ref-info">
            <span class="ref-title">${ref.num}. ${ref.title}</span>
            <span class="ref-type">${ref.type}</span>
          </div>
          <a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="ref-link-btn" title="Abrir fuente original">
            <span>Visitar</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        `;

        this.container.appendChild(item);
      });
    }
  };

  /* ==========================================================================
     10. CONTROL DE SONIDO Y PANTALLA COMPLETA
     ========================================================================== */
  const btnSoundToggle = document.getElementById("btn-sound-toggle");
  if (btnSoundToggle) {
    btnSoundToggle.addEventListener("click", () => {
      SoundSystem.enabled = !SoundSystem.enabled;
      btnSoundToggle.style.opacity = SoundSystem.enabled ? "1" : "0.4";
      btnSoundToggle.setAttribute("title", SoundSystem.enabled ? "Sonido Activado" : "Sonido Silenciado");
      if (SoundSystem.enabled) SoundSystem.playTone(600, "sine", 0.08, 0.05);
    });
  }

  const btnFullscreen = document.getElementById("btn-fullscreen");
  if (btnFullscreen) {
    btnFullscreen.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => { });
      } else {
        document.exitFullscreen().catch(() => { });
      }
    });
  }

  /* ==========================================================================
     INICIALIZACIÓN GENERAL DE MÓDULOS
     ========================================================================== */
  SoundSystem.init();
  SlideManager.init();
  ModalManager.init();
  TimelineRenderer.init();
  MetricsRenderer.init();
  SelfCareManager.init();
  VideoLibraryRenderer.init();
  QuizEngine.init();
  ReferencesRenderer.init();

  console.log("Diapositiva Interactiva de Psicopedagogía inicializada correctamente.");
});
