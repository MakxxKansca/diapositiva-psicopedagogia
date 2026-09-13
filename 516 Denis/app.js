/**
 * RECURSO DIGITAL INTERACTIVO: PSICOPEDAGOGÍA, TERCERA MÉTRICA Y AUTOCUIDADO
 * Controlador Principal e Interactividad - Denis (516)
 * Lógica modular: Renderizado, Modales, Acordeones, Temporizador, Respiración y Quiz Gamificado
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================================================
  // 1. SISTEMA DE AUDIO SINTETIZADO (WEB AUDIO API)
  // ========================================================================
  const AudioSystem = {
    ctx: null,
    enabled: true,

    init() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      } catch (e) {
        console.warn('Web Audio no disponible:', e);
      }
    },

    playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
      if (!this.enabled) return;
      try {
        if (!this.ctx) this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Ignorar errores de audio
      }
    },

    click() {
      this.playTone(600, 'triangle', 0.08, 0.05);
    },

    modalOpen() {
      this.playTone(520, 'sine', 0.25, 0.08);
      setTimeout(() => this.playTone(680, 'sine', 0.25, 0.08), 80);
    },

    correct() {
      this.playTone(523.25, 'sine', 0.2, 0.08); // C5
      setTimeout(() => this.playTone(659.25, 'sine', 0.2, 0.08), 100); // E5
      setTimeout(() => this.playTone(783.99, 'sine', 0.35, 0.1), 200); // G5
    },

    wrong() {
      this.playTone(320, 'sawtooth', 0.25, 0.06);
      setTimeout(() => this.playTone(280, 'sawtooth', 0.3, 0.06), 120);
    },

    celebrate() {
      [523, 659, 783, 1046].forEach((f, idx) => {
        setTimeout(() => this.playTone(f, 'triangle', 0.3, 0.1), idx * 120);
      });
    }
  };

  // ========================================================================
  // 2. NARRADOR POR VOZ (WEB SPEECH API)
  // ========================================================================
  const VoiceNarrator = {
    synth: window.speechSynthesis || null,
    isSpeaking: false,
    utterance: null,

    toggle() {
      if (!this.synth) {
        alert('El sintetizador de voz no es compatible con este navegador.');
        return;
      }

      if (this.isSpeaking) {
        this.synth.cancel();
        this.isSpeaking = false;
        this.updateBtnState(false);
      } else {
        const textToNarrate = `Recurso interactivo sobre la evolución histórica de la Psicopedagogía, la Tercera Métrica y el autocuidado docente. 
        A finales del siglo diecinueve, la pedagogía y la psicología experimental confluyeron para dar origen a la psicopedagogía. 
        Arianna Huffington propone cuatro pilares del éxito humano: bienestar, sabiduría, asombro y generosidad. 
        Para los docentes, el autocuidado exige realizar pausas activas, reflexionar sobre la práctica pedagógica, reconocer los logros de los alumnos y mantener redes de apoyo colaborativas.`;

        this.utterance = new SpeechSynthesisUtterance(textToNarrate);
        this.utterance.lang = 'es-ES';
        this.utterance.rate = 1.0;

        this.utterance.onend = () => {
          this.isSpeaking = false;
          this.updateBtnState(false);
        };

        this.utterance.onerror = () => {
          this.isSpeaking = false;
          this.updateBtnState(false);
        };

        this.synth.speak(this.utterance);
        this.isSpeaking = true;
        this.updateBtnState(true);
      }
    },

    updateBtnState(active) {
      const btn = document.getElementById('btn-narrator');
      if (btn) {
        if (active) {
          btn.classList.add('active');
          btn.setAttribute('title', 'Pausar narración por voz');
        } else {
          btn.classList.remove('active');
          btn.setAttribute('title', 'Escuchar narración del recurso por voz');
        }
      }
    }
  };

  // ========================================================================
  // 3. GESTIÓN DE ACCESIBILIDAD Y TEMA
  // ========================================================================
  const Accessibility = {
    currentFontSize: 16,

    init() {
      // Cambio de tema Claro / Oscuro
      const themeBtn = document.getElementById('btn-theme-toggle');
      const savedTheme = localStorage.getItem('site-theme') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
      this.updateThemeIcon(savedTheme);

      if (themeBtn) {
        themeBtn.addEventListener('click', () => {
          AudioSystem.click();
          const current = document.documentElement.getAttribute('data-theme');
          const nextTheme = current === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', nextTheme);
          localStorage.setItem('site-theme', nextTheme);
          this.updateThemeIcon(nextTheme);
        });
      }

      // Tamaño de fuente
      const decBtn = document.getElementById('btn-font-dec');
      const incBtn = document.getElementById('btn-font-inc');

      if (decBtn) {
        decBtn.addEventListener('click', () => {
          AudioSystem.click();
          if (this.currentFontSize > 13) {
            this.currentFontSize -= 1;
            document.documentElement.style.fontSize = `${this.currentFontSize}px`;
          }
        });
      }

      if (incBtn) {
        incBtn.addEventListener('click', () => {
          AudioSystem.click();
          if (this.currentFontSize < 21) {
            this.currentFontSize += 1;
            document.documentElement.style.fontSize = `${this.currentFontSize}px`;
          }
        });
      }

      // Conmutador de Sonido
      const audioBtn = document.getElementById('btn-audio-fx');
      if (audioBtn) {
        audioBtn.addEventListener('click', () => {
          AudioSystem.enabled = !AudioSystem.enabled;
          audioBtn.style.opacity = AudioSystem.enabled ? '1' : '0.4';
          audioBtn.setAttribute('title', AudioSystem.enabled ? 'Silenciar efectos de sonido' : 'Activar efectos de sonido');
          if (AudioSystem.enabled) AudioSystem.click();
        });
      }

      // Narrador por voz
      const narratorBtn = document.getElementById('btn-narrator');
      if (narratorBtn) {
        narratorBtn.addEventListener('click', () => {
          AudioSystem.click();
          VoiceNarrator.toggle();
        });
      }

      // Menú Móvil
      const mobileBtn = document.getElementById('btn-mobile-menu');
      const navLinks = document.getElementById('nav-links');
      if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
          AudioSystem.click();
          navLinks.classList.toggle('mobile-open');
        });

        // Cerrar menú móvil al hacer clic en un enlace
        navLinks.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-open');
          });
        });
      }

      // Barra de lectura de scroll
      window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const bar = document.getElementById('reading-progress');
        if (bar) bar.style.width = `${scrolled}%`;
      });
    },

    updateThemeIcon(theme) {
      const icon = document.getElementById('theme-icon');
      if (!icon) return;
      if (theme === 'light') {
        // Icono Luna para cambiar a oscuro
        icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
      } else {
        // Icono Sol para cambiar a claro
        icon.innerHTML = `
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        `;
      }
    }
  };

  // ========================================================================
  // 4. VENTANAS EMERGENTES (POP-UP MODAL REUTILIZABLE)
  // ========================================================================
  const ModalManager = {
    modalEl: document.getElementById('app-modal'),
    badgeEl: document.getElementById('modal-badge-label'),
    headlineEl: document.getElementById('modal-headline'),
    quoteEl: document.getElementById('modal-quote-text'),
    contextEl: document.getElementById('modal-context-desc'),
    impactEl: document.getElementById('modal-impact-desc'),

    init() {
      const closeBtn = document.getElementById('btn-close-modal');
      const okBtn = document.getElementById('btn-modal-ok');

      if (closeBtn) closeBtn.addEventListener('click', () => this.close());
      if (okBtn) okBtn.addEventListener('click', () => this.close());

      if (this.modalEl) {
        this.modalEl.addEventListener('click', (e) => {
          if (e.target === this.modalEl) this.close();
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modalEl && this.modalEl.classList.contains('active')) {
          this.close();
        }
      });
    },

    open(popupData) {
      if (!this.modalEl || !popupData) return;
      AudioSystem.modalOpen();

      this.badgeEl.textContent = popupData.badge || 'Hito Histórico';
      this.headlineEl.textContent = popupData.title;
      this.quoteEl.textContent = popupData.quote;
      this.contextEl.textContent = popupData.context;
      this.impactEl.textContent = popupData.pedagogicalImpact;

      this.modalEl.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    close() {
      if (!this.modalEl) return;
      AudioSystem.click();
      this.modalEl.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // ========================================================================
  // 5. RENDERIZADO DE CONTENIDOS DINÁMICOS
  // ========================================================================
  const ContentRenderer = {
    init() {
      this.renderTimeline();
      this.renderThirdMetric();
      this.renderSelfCare();
      this.renderSources();
    },

    // 1. Línea de tiempo con botones que despliegan pop-ups
    renderTimeline() {
      const container = document.getElementById('timeline-cards-container');
      if (!container || !window.APP_DATA) return;

      container.innerHTML = APP_DATA.timeline.map((item) => `
        <div class="timeline-item" id="item-${item.id}">
          <div class="timeline-node" aria-hidden="true"></div>
          <div class="timeline-content-box">
            <span class="timeline-date-badge">${item.period}</span>
            <h3 class="timeline-item-title">${item.title}</h3>
            <p class="timeline-item-desc">${item.milestone}</p>
            
            <div class="timeline-highlight-box">
              <strong>Aporte a la Psicopedagogía:</strong> ${item.contribution}
            </div>

            <button class="btn-popup-trigger" data-popup-id="${item.id}" aria-label="Ver ventana emergente con detalles y citas de ${item.title}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span>Ver Hito y Cita (Pop-up)</span>
            </button>
          </div>
        </div>
      `).join('');

      // Eventos para abrir pop-up
      container.querySelectorAll('.btn-popup-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-popup-id');
          const found = APP_DATA.timeline.find(t => t.id === id);
          if (found && found.popup) {
            ModalManager.open(found.popup);
          }
        });
      });
    },

    // 2. Tercera Métrica con botones interactivos que despliegan la aplicación docente
    renderThirdMetric() {
      const container = document.getElementById('pillars-container');
      if (!container || !window.APP_DATA) return;

      container.innerHTML = APP_DATA.thirdMetric.pillars.map((p) => `
        <div class="pillar-card ${p.colorClass}">
          <div>
            <div class="pillar-header">
              <div class="pillar-icon-box" aria-hidden="true">${p.icon}</div>
              <div class="pillar-title-wrap">
                <span class="pillar-pill">${p.tag}</span>
                <h3>${p.name}</h3>
              </div>
            </div>
            <p class="pillar-definition">${p.definition}</p>
          </div>

          <div class="pillar-interactive-toggle">
            <button class="btn-toggle-app" aria-expanded="false" aria-controls="drawer-${p.id}">
              <span>Ver Aplicación Docente</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="pillar-drawer" id="drawer-${p.id}">
              <div class="drawer-content">
                <h5>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                  Aplicación en la Labor Docente:
                </h5>
                <p>${p.teacherApplication}</p>
                <div class="drawer-prompt">
                  <strong>💡 Pregunta de Reflexión:</strong><br>
                  ${p.reflectionQuestion}
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join('');

      // Evento acordeón / despliegue en cada pilar
      container.querySelectorAll('.btn-toggle-app').forEach(btn => {
        btn.addEventListener('click', (e) => {
          AudioSystem.click();
          const isExpanded = btn.getAttribute('aria-expanded') === 'true';
          const drawer = btn.nextElementSibling;

          btn.setAttribute('aria-expanded', !isExpanded);
          if (isExpanded) {
            drawer.classList.remove('open');
            btn.querySelector('span').textContent = 'Ver Aplicación Docente';
          } else {
            drawer.classList.add('open');
            btn.querySelector('span').textContent = 'Ocultar Aplicación Docente';
          }
        });
      });
    },

    // 3. Estrategias de autocuidado docente
    renderSelfCare() {
      const container = document.getElementById('strategies-container');
      if (!container || !window.APP_DATA) return;

      container.innerHTML = APP_DATA.selfCare.map((sc) => `
        <div class="strategy-card">
          <div class="strategy-icon" aria-hidden="true">${sc.icon}</div>
          <div class="strategy-info">
            <h4>${sc.title}</h4>
            <p>${sc.description}</p>
            <div class="strategy-benefit-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Beneficio: ${sc.benefit}</span>
            </div>
          </div>
        </div>
      `).join('');
    },


    // 5. Fuentes consultadas citadas de manera sencilla
    renderSources() {
      const container = document.getElementById('sources-container');
      if (!container || !window.APP_DATA) return;

      container.innerHTML = APP_DATA.references.map((ref) => `
        <li class="source-item">
          <div class="source-num">${ref.num}</div>
          <div class="source-details">
            <h5>${ref.title}</h5>
            <p><strong>Autor / Entidad:</strong> ${ref.author} (${ref.year})</p>
            <p style="font-size: 0.775rem; color: var(--text-dim);">${ref.note}</p>
          </div>
        </li>
      `).join('');
    }
  };

  // ========================================================================
  // 6. WIDGET INTERACTIVO DE AUTOCUIDADO (TEMPORIZADOR 50/10 Y RESPIRACIÓN)
  // ========================================================================
  const SelfCareWidget = {
    // Temporizador
    timerInterval: null,
    totalSeconds: 50 * 60, // 50 minutos iniciales
    remainingSeconds: 50 * 60,
    isRunning: false,
    mode: 'work', // 'work' (50m) o 'pause' (10m)

    // Respiración
    breathInterval: null,
    isBreathing: false,

    init() {
      // Cambio de pestañas
      const tabBtns = document.querySelectorAll('.widget-tab-btn');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          AudioSystem.click();
          const targetId = e.currentTarget.getAttribute('data-tab');

          tabBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          document.querySelectorAll('.widget-tab-panel').forEach(p => p.classList.remove('active'));

          e.currentTarget.classList.add('active');
          e.currentTarget.setAttribute('aria-selected', 'true');
          const panel = document.getElementById(targetId);
          if (panel) panel.classList.add('active');
        });
      });

      // Controles Temporizador
      const startTimerBtn = document.getElementById('btn-start-timer');
      const resetTimerBtn = document.getElementById('btn-reset-timer');

      if (startTimerBtn) {
        startTimerBtn.addEventListener('click', () => this.toggleTimer());
      }
      if (resetTimerBtn) {
        resetTimerBtn.addEventListener('click', () => this.resetTimer());
      }

      // Controles Respiración 4-7-8
      const startBreathBtn = document.getElementById('btn-start-breath');
      const stopBreathBtn = document.getElementById('btn-stop-breath');

      if (startBreathBtn) {
        startBreathBtn.addEventListener('click', () => this.startBreathing());
      }
      if (stopBreathBtn) {
        stopBreathBtn.addEventListener('click', () => this.stopBreathing());
      }

      // Checklist diario
      const checkboxes = document.querySelectorAll('#daily-checklist-items input[type="checkbox"]');
      const feedback = document.getElementById('checklist-feedback');
      checkboxes.forEach(chk => {
        chk.addEventListener('change', () => {
          AudioSystem.click();
          const checkedCount = Array.from(checkboxes).filter(c => c.checked).length;
          if (feedback) {
            if (checkedCount === 0) {
              feedback.textContent = '¡Cada pequeño hábito protege tu salud física y mental!';
              feedback.style.color = '#34d399';
            } else if (checkedCount < 3) {
              feedback.textContent = `¡Buen comienzo! Has cumplido ${checkedCount} de 5 hábitos saludables.`;
              feedback.style.color = '#38bdf8';
            } else if (checkedCount < 5) {
              feedback.textContent = `¡Excelente ritmo! ${checkedCount} hábitos consolidados hoy.`;
              feedback.style.color = '#a855f7';
            } else {
              feedback.textContent = `🎉 ¡Extraordinario! Has alcanzado el 100% de tus compromisos de autocuidado de hoy.`;
              feedback.style.color = '#f59e0b';
              AudioSystem.celebrate();
            }
          }
        });
      });
    },

    // Lógica Temporizador 50/10
    toggleTimer() {
      AudioSystem.click();
      const startBtn = document.getElementById('btn-start-timer');
      const label = document.getElementById('timer-start-label');

      if (this.isRunning) {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        if (label) label.textContent = 'Reanudar Pausa';
      } else {
        this.isRunning = true;
        if (label) label.textContent = 'Pausar';
        this.timerInterval = setInterval(() => this.tickTimer(), 1000);
      }
    },

    tickTimer() {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.updateTimerDisplay();
      } else {
        // Alternar modo
        clearInterval(this.timerInterval);
        this.isRunning = false;
        AudioSystem.celebrate();

        if (this.mode === 'work') {
          this.mode = 'pause';
          this.totalSeconds = 10 * 60; // 10 minutos de pausa
          this.remainingSeconds = this.totalSeconds;
          alert('🔔 ¡Tiempo de trabajo cumplido! Ahora tómate 10 minutos de pausa activa sin pantallas.');
        } else {
          this.mode = 'work';
          this.totalSeconds = 50 * 60; // 50 minutos de trabajo
          this.remainingSeconds = this.totalSeconds;
          alert('🔔 ¡Pausa finalizada! Regresas renovado a tu labor pedagógica.');
        }

        const label = document.getElementById('timer-start-label');
        if (label) label.textContent = 'Iniciar';
        this.updateTimerDisplay();
      }
    },

    resetTimer() {
      AudioSystem.click();
      clearInterval(this.timerInterval);
      this.isRunning = false;
      this.mode = 'work';
      this.totalSeconds = 50 * 60;
      this.remainingSeconds = this.totalSeconds;
      const label = document.getElementById('timer-start-label');
      if (label) label.textContent = 'Iniciar Pausa';
      this.updateTimerDisplay();
    },

    updateTimerDisplay() {
      const minutes = Math.floor(this.remainingSeconds / 60);
      const seconds = this.remainingSeconds % 60;
      const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      const textEl = document.getElementById('timer-display-text');
      const modeEl = document.getElementById('timer-mode-label');
      const circleFill = document.getElementById('timer-circle-fill');

      if (textEl) textEl.textContent = timeStr;
      if (modeEl) {
        modeEl.textContent = this.mode === 'work' ? 'Modo Trabajo Enfocado (50m)' : 'Modo Pausa Activa (10m)';
        modeEl.style.color = this.mode === 'work' ? 'var(--accent-cyan)' : '#10b981';
      }

      if (circleFill) {
        // Perímetro aproximado = 2 * PI * r = 2 * 3.1416 * 75 ≈ 471.2
        const progress = this.remainingSeconds / this.totalSeconds;
        const offset = 471.2 * (1 - progress);
        circleFill.style.strokeDashoffset = offset;
        circleFill.style.stroke = this.mode === 'work' ? 'var(--accent-indigo)' : '#10b981';
      }
    },

    // Lógica Respiración 4-7-8
    startBreathing() {
      if (this.isBreathing) return;
      AudioSystem.click();
      this.isBreathing = true;

      const circle = document.getElementById('breath-visual-circle');
      const statusText = document.getElementById('breath-status-text');
      const counterText = document.getElementById('breath-timer-counter');

      const breathCycle = () => {
        if (!this.isBreathing) return;

        // Fase 1: Inhala 4 segundos
        if (circle) {
          circle.className = 'breath-circle inhale';
        }
        if (statusText) statusText.textContent = '🌬️ Inhala suave y profundamente por la nariz... (4s)';
        if (counterText) counterText.textContent = 'Llena tus pulmones de oxígeno';

        setTimeout(() => {
          if (!this.isBreathing) return;
          // Fase 2: Retén 7 segundos
          if (circle) {
            circle.className = 'breath-circle hold';
          }
          if (statusText) statusText.textContent = '⏸️ Mantén el aire en tus pulmones... (7s)';
          if (counterText) counterText.textContent = 'Siente la quietud y calma interior';

          setTimeout(() => {
            if (!this.isBreathing) return;
            // Fase 3: Exhala 8 segundos
            if (circle) {
              circle.className = 'breath-circle exhale';
            }
            if (statusText) statusText.textContent = '💨 Exhala lentamente por la boca... (8s)';
            if (counterText) counterText.textContent = 'Libera toda la tensión y fatiga mental';

            setTimeout(() => {
              if (this.isBreathing) {
                breathCycle();
              }
            }, 8000);
          }, 7000);
        }, 4000);
      };

      breathCycle();
    },

    stopBreathing() {
      AudioSystem.click();
      this.isBreathing = false;
      const circle = document.getElementById('breath-visual-circle');
      const statusText = document.getElementById('breath-status-text');
      const counterText = document.getElementById('breath-timer-counter');

      if (circle) circle.className = 'breath-circle';
      if (statusText) statusText.textContent = 'Presiona Iniciar para calmar el sistema nervioso';
      if (counterText) counterText.textContent = 'Inhala (4s) • Retén (7s) • Exhala (8s)';
    }
  };

  // ========================================================================
  // 7. MOTOR DE GAMIFICACIÓN (DESAFÍO PSICOPEDAGÓGICO & DIPLOMA)
  // ========================================================================
  const QuizEngine = {
    currentIndex: 0,
    score: 0,
    answersState: [],

    init() {
      this.renderQuestion();

      const nextBtn = document.getElementById('btn-next-q');
      const retryBtn = document.getElementById('btn-retry-quiz');
      const printBtn = document.getElementById('btn-print-cert');

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          AudioSystem.click();
          this.currentIndex++;
          if (this.currentIndex < APP_DATA.quiz.length) {
            this.renderQuestion();
          } else {
            this.showResults();
          }
        });
      }

      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          AudioSystem.click();
          this.reset();
        });
      }

      if (printBtn) {
        printBtn.addEventListener('click', () => {
          AudioSystem.click();
          window.print();
        });
      }

      // Fecha automática en diploma
      const dateEl = document.getElementById('cert-date-text');
      if (dateEl) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = today.toLocaleDateString('es-ES', options);
      }
    },

    renderQuestion() {
      const q = APP_DATA.quiz[this.currentIndex];
      if (!q) return;

      // Elementos del DOM
      const stepText = document.getElementById('quiz-step-text');
      const progressBar = document.getElementById('quiz-progress-bar');
      const scoreCount = document.getElementById('quiz-score-count');
      const catText = document.getElementById('quiz-q-category');
      const titleText = document.getElementById('quiz-q-title');
      const optionsBox = document.getElementById('quiz-options-box');
      const feedbackBox = document.getElementById('quiz-feedback-box');
      const nextBtn = document.getElementById('btn-next-q');

      // Actualizar estado general
      if (stepText) stepText.textContent = `Pregunta ${this.currentIndex + 1} de ${APP_DATA.quiz.length}`;
      if (progressBar) progressBar.style.width = `${((this.currentIndex + 1) / APP_DATA.quiz.length) * 100}%`;
      if (scoreCount) scoreCount.textContent = this.score;
      if (catText) catText.textContent = q.category;
      if (titleText) titleText.textContent = q.question;

      // Ocultar feedback y botón siguiente
      if (feedbackBox) feedbackBox.classList.remove('visible');
      if (nextBtn) nextBtn.classList.remove('visible');

      // Renderizar opciones
      if (optionsBox) {
        optionsBox.innerHTML = q.options.map((opt, idx) => `
          <button class="quiz-option-btn" data-index="${idx}">
            <span class="option-prefix">${opt.letter}</span>
            <span>${opt.text}</span>
          </button>
        `).join('');

        // Evento clic en cada opción
        optionsBox.querySelectorAll('.quiz-option-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const optIdx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
            this.evaluateAnswer(optIdx);
          });
        });
      }
    },

    evaluateAnswer(selectedIdx) {
      const q = APP_DATA.quiz[this.currentIndex];
      const optionsBox = document.getElementById('quiz-options-box');
      const feedbackBox = document.getElementById('quiz-feedback-box');
      const fbTitle = document.getElementById('quiz-fb-title');
      const fbDesc = document.getElementById('quiz-fb-desc');
      const fbIcon = document.getElementById('quiz-fb-icon');
      const nextBtn = document.getElementById('btn-next-q');
      const scoreCount = document.getElementById('quiz-score-count');

      const buttons = optionsBox.querySelectorAll('.quiz-option-btn');
      buttons.forEach(b => b.disabled = true); // Desactivar para que no cambie

      const isCorrect = q.options[selectedIdx].isCorrect;

      if (isCorrect) {
        AudioSystem.correct();
        buttons[selectedIdx].classList.add('correct');
        this.score += 100;
        if (scoreCount) scoreCount.textContent = this.score;

        if (fbIcon) fbIcon.textContent = '🌟';
        if (fbTitle) {
          fbTitle.textContent = '¡Respuesta Correcta!';
          fbTitle.style.color = '#34d399';
        }
      } else {
        AudioSystem.wrong();
        buttons[selectedIdx].classList.add('wrong');
        // Resaltar la correcta
        const correctIdx = q.options.findIndex(o => o.isCorrect);
        if (correctIdx !== -1) {
          buttons[correctIdx].classList.add('correct');
        }

        if (fbIcon) fbIcon.textContent = '💡';
        if (fbTitle) {
          fbTitle.textContent = 'Respuesta Incorrecta - Explicación Formativa:';
          fbTitle.style.color = '#f87171';
        }
      }

      if (fbDesc) fbDesc.textContent = q.explanation;
      if (feedbackBox) feedbackBox.classList.add('visible');

      // Texto de botón final o siguiente
      if (nextBtn) {
        const isLast = this.currentIndex === APP_DATA.quiz.length - 1;
        nextBtn.querySelector('span').textContent = isLast ? 'Ver Diploma y Resultados' : 'Siguiente Pregunta';
        nextBtn.classList.add('visible');
      }
    },

    showResults() {
      AudioSystem.celebrate();
      const questionView = document.getElementById('quiz-question-view');
      const resultView = document.getElementById('quiz-result-view');
      const scoreSummary = document.getElementById('result-score-summary');

      if (questionView) questionView.style.display = 'none';
      if (resultView) resultView.classList.add('visible');

      const maxScore = APP_DATA.quiz.length * 100;
      if (scoreSummary) {
        scoreSummary.textContent = `Has obtenido ${this.score} de ${maxScore} puntos (${Math.round((this.score / maxScore) * 100)}%)`;
      }
    },

    reset() {
      this.currentIndex = 0;
      this.score = 0;
      const questionView = document.getElementById('quiz-question-view');
      const resultView = document.getElementById('quiz-result-view');

      if (resultView) resultView.classList.remove('visible');
      if (questionView) questionView.style.display = 'block';

      this.renderQuestion();
    }
  };

  // ========================================================================
  // 8. NAVEGACIÓN SUAVE Y SEGUIMIENTO DE SECCIÓN ACTIVA
  // ========================================================================
  const NavigationTracker = {
    init() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-link');

      window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
          const sectionTop = section.offsetTop - 120;
          const sectionHeight = section.offsetHeight;
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });
      });
    }
  };

  // Inicialización de Todos los Módulos
  Accessibility.init();
  ModalManager.init();
  ContentRenderer.init();
  SelfCareWidget.init();
  QuizEngine.init();
  NavigationTracker.init();
});
