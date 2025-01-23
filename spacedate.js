const translations = {
  pt: {
    tooltip: "A data final precisa ser maior que a data inicial.",
    title: "Selecione o Período",
    startPlaceholder: "Data de início",
    endPlaceholder: "Data de término",
    apply: "Aplicar",
    cancel: "Cancelar",
    clear: "Limpar",
    days7: "7 dias",
    days30: "30 dias",
    days90: "90 dias",
    weekdays: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa"],
    months: [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ],
  },
  es: {
    tooltip: "La fecha final debe ser mayor que la fecha inicial.",
    title: "Seleccione el Período",
    startPlaceholder: "Fecha de inicio",
    endPlaceholder: "Fecha de fin",
    apply: "Aplicar",
    cancel: "Cancelar",
    clear: "Limpiar",
    days7: "7 días",
    days30: "30 días",
    days90: "90 días",
    weekdays: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
    months: [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],
  },
  en: {
    tooltip: "The end date must be greater than the start date.",
    title: "Select Period",
    startPlaceholder: "Start date",
    endPlaceholder: "End date",
    apply: "Apply",
    cancel: "Cancel",
    clear: "Clear",
    days7: "7 days",
    days30: "30 days",
    days90: "90 days",
    weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
  },
};

function getLanguageFromPath() {
  const path = window.location.pathname; // Obtém o caminho da URL (ex: "/es/news-duas-rodas/")
  const language = path.split('/')[1]; // Extrai a primeira parte do caminho (ex: "es")
  console.log("Idioma detectado:", language); // Log para depuração
  return translations[language] ? language : 'pt'; // Retorna o idioma ou 'pt' como padrão
}

class SpaceDate {
  constructor(trigger, options = {}) {
    this.trigger = document.querySelector(trigger);
    this.options = {
      format: "DD/MM/YYYY",
      separator: " - ",
      ...options,
    };

    this.language = getLanguageFromPath(); // Obtém o idioma com base no caminho da URL
    this.translations = translations[this.language]; // Obtém as traduções para o idioma selecionado
    console.log("Traduções carregadas:", this.translations); // Log para depuração

    this.startDate = null;
    this.endDate = null;
    this.isSelecting = false;

    this.currentStartDate = new Date();
    this.currentEndDate = new Date();

    this.setupModal();
    this.setupEventListeners();
  }

  setupModal() {
    this.overlay = document.createElement("div");
    this.overlay.className = "spacedate-overlay";

    this.modal = document.createElement("div");
    this.modal.className = "spacedate-modal";

    this.tooltip = document.createElement("div");
    this.tooltip.className = "spacedate-tooltip";
    this.tooltip.textContent = this.translations.tooltip; // Usando tradução
    this.modal.appendChild(this.tooltip);

    const header = document.createElement("div");
    header.className = "spacedate-header";
    header.innerHTML = `
      <h3>${this.translations.title}</h3> <!-- Usando tradução -->
      <div class="spacedate-presets">
        <button class="spacedate-preset-btn" data-days="7">${this.translations.days7}</button>
        <button class="spacedate-preset-btn" data-days="30">${this.translations.days30}</button>
        <button class="spacedate-preset-btn" data-days="90">${this.translations.days90}</button>
      </div>
    `;

    const wrapper = document.createElement("div");
    wrapper.className = "spacedate-wrapper";

    this.leftSection = this.createSection("start");
    this.rightSection = this.createSection("end");

    wrapper.appendChild(this.leftSection);
    wrapper.appendChild(this.rightSection);

    const footer = document.createElement("div");
    footer.className = "spacedate-footer";
    footer.innerHTML = `
      <button class="spacedate-btn apply">${this.translations.apply}</button>
      <button class="spacedate-btn cancel">${this.translations.cancel}</button>
      <button class="spacedate-btn clear">${this.translations.clear}</button>
    `;

    this.modal.appendChild(header);
    this.modal.appendChild(wrapper);
    this.modal.appendChild(footer);

    document.body.appendChild(this.overlay);
    document.body.appendChild(this.modal);

    this.positionModal = () => {
      const triggerRect = this.trigger.getBoundingClientRect();
      const modalRect = this.modal.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let top = triggerRect.bottom + window.scrollY;
      let left = triggerRect.left + window.scrollX + triggerRect.width / 2 - modalRect.width / 2;

      if (left < 0) {
        left = 0;
      } else if (left + modalRect.width > windowWidth) {
        left = windowWidth - modalRect.width;
      }

      if (top + modalRect.height > windowHeight) {
        top = triggerRect.bottom + window.scrollY;
      }

      this.modal.style.top = `${top}px`;
      this.modal.style.left = `${left}px`;
    };
  }

  createSection(type) {
    const section = document.createElement("div");
    section.className = "spacedate-section";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "spacedate-input";
    input.placeholder = type === "start" ? this.translations.startPlaceholder : this.translations.endPlaceholder;

    const calendar = this.createCalendar(type);

    section.appendChild(input);
    section.appendChild(calendar);

    return section;
  }

  createCalendar(type) {
    const calendar = document.createElement("div");
    calendar.className = "spacedate-calendar";

    const header = document.createElement("div");
    header.className = "spacedate-calendar-header";

    const prevBtn = document.createElement("button");
    prevBtn.className = "spacedate-nav-btn";
    prevBtn.innerHTML = "←";
    const nextBtn = document.createElement("button");
    nextBtn.className = "spacedate-nav-btn";
    nextBtn.innerHTML = "→";
    const monthYearText = document.createElement("span");

    header.appendChild(prevBtn);
    header.appendChild(monthYearText);
    header.appendChild(nextBtn);

    calendar.appendChild(header);

    // Usando tradução para os dias da semana
    this.translations.weekdays.forEach((day) => {
      const dayEl = document.createElement("div");
      dayEl.className = "spacedate-day weekday";
      dayEl.textContent = day;
      calendar.appendChild(dayEl);
    });

    this.renderCalendar(calendar, new Date(), type);

    return calendar;
  }

  renderCalendar(calendar, date, type) {
    const year = date.getFullYear();
    const month = date.getMonth();

    calendar.dataset.currentMonth = `${year}-${month + 1}`;

    const monthYearText = calendar.querySelector(".spacedate-calendar-header span");
    monthYearText.textContent = `${this.translations.months[month]} ${year}`; // Usando tradução

    const days = calendar.querySelectorAll(".spacedate-day:not(.weekday)");
    days.forEach((day) => day.remove());

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.className = "spacedate-day disabled";
      calendar.appendChild(emptyDay);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const dayEl = document.createElement("div");
      dayEl.className = "spacedate-day";
      dayEl.textContent = i;

      if (this.isDateInRange(currentDate)) {
        dayEl.classList.add("in-range");
      }

      if (this.isDateSelected(currentDate, type)) {
        dayEl.classList.add("selected");
      }

      dayEl.addEventListener("click", () => this.handleDateSelection(currentDate, type));
      calendar.appendChild(dayEl);
    }
  }

  isDateInRange(date) {
    if (!this.startDate || !this.endDate) return false;
    return date >= this.startDate && date <= this.endDate;
  }

  isDateSelected(date, type) {
    if (type === "start" && this.startDate) {
      return date.toDateString() === this.startDate.toDateString();
    }
    if (type === "end" && this.endDate) {
      return date.toDateString() === this.endDate.toDateString();
    }
    return false;
  }

  handleDateSelection(date, type) {
    if (type === "start") {
      this.startDate = date;
      if (this.endDate && this.startDate > this.endDate) {
        this.endDate = null;
      }
      this.currentStartDate = new Date(date);
    } else {
      if (!this.startDate || date >= this.startDate) {
        this.endDate = date;
      } else {
        this.showTooltip(date);
        return;
      }
      this.currentEndDate = new Date(date);
    }

    this.updateInputs();
    this.renderCalendars();
  }

  showTooltip(date) {
    const dayElement = this.findDayElement(date);
    if (dayElement) {
      const rect = dayElement.getBoundingClientRect();
      const tooltip = this.tooltip;

      const left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2;
      const top = rect.top - tooltip.offsetHeight - 5;

      tooltip.style.left = `${Math.max(10, left)}px`;
      tooltip.style.top = `${Math.max(10, top)}px`;

      tooltip.classList.add("active");

      setTimeout(() => {
        tooltip.classList.remove("active");
      }, 3000);
    } else {
      console.error("Elemento do dia não encontrado!");
    }
  }

  findDayElement(date) {
    const calendar = this.rightSection.querySelector(".spacedate-calendar");
    const [calendarYear, calendarMonth] = calendar.dataset.currentMonth
      .split("-")
      .map((n) => parseInt(n));

    if (
      date.getMonth() !== calendarMonth - 1 ||
      date.getFullYear() !== calendarYear
    ) {
      return null;
    }

    const days = calendar.querySelectorAll(".spacedate-day:not(.disabled)");
    for (const day of days) {
      if (parseInt(day.textContent) === date.getDate()) {
        return day;
      }
    }

    return null;
  }

  updateInputs() {
    const startInput = this.leftSection.querySelector(".spacedate-input");
    const endInput = this.rightSection.querySelector(".spacedate-input");

    startInput.value = this.startDate ? this.formatDate(this.startDate) : "";
    endInput.value = this.endDate ? this.formatDate(this.endDate) : "";
  }

  formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  renderCalendars() {
    const startCalendar = this.leftSection.querySelector(".spacedate-calendar");
    const endCalendar = this.rightSection.querySelector(".spacedate-calendar");

    this.renderCalendar(startCalendar, this.currentStartDate, "start");
    this.renderCalendar(endCalendar, this.currentEndDate, "end");
  }

  setupEventListeners() {
    this.trigger.addEventListener("click", () => {
      this.modal.classList.add("active");
      this.overlay.classList.add("active");
      this.positionModal();
    });

    window.addEventListener("resize", () => {
      if (this.modal.classList.contains("active")) {
        this.positionModal();
      }
    });

    window.addEventListener("scroll", () => {
      if (this.modal.classList.contains("active")) {
        this.positionModal();
      }
    });

    this.modal
      .querySelector(".spacedate-btn.cancel")
      .addEventListener("click", () => {
        this.resetDatePicker();
        this.close();
      });

    this.modal
      .querySelector(".spacedate-btn.apply")
      .addEventListener("click", () => {
        if (this.startDate && this.endDate) {
          const range = {
            startDate: this.startDate,
            endDate: this.endDate,
            formatted: `${this.formatDate(this.startDate)}${
              this.options.separator
            }${this.formatDate(this.endDate)}`,
          };

          const params = {
            since: this.formatDateForUrl(this.startDate),
            until: this.formatDateForUrl(this.endDate),
          };

          const url = new URL(window.location.href);
          url.searchParams.set("since", params.since);
          url.searchParams.set("until", params.until);

          window.location.href = url.href;
        }
        this.close();
      });

    this.overlay.addEventListener("click", () => this.close());

    this.modal.querySelectorAll(".spacedate-preset-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const days = parseInt(btn.dataset.days);
        const now = new Date();

        this.endDate = new Date(now);
        this.currentEndDate = new Date(now);

        this.startDate = new Date(now);
        this.startDate.setDate(this.startDate.getDate() - days);
        this.currentStartDate = new Date(this.startDate);

        this.updateInputs();
        this.renderCalendars();
      });
    });

    this.modal
      .querySelector(".spacedate-btn.clear")
      .addEventListener("click", () => {
        this.resetDatePicker();
        this.updateInputs();
        this.renderCalendars();
      });

    [this.leftSection, this.rightSection].forEach((section) => {
      const calendar = section.querySelector(".spacedate-calendar");
      const type = section === this.leftSection ? "start" : "end";

      if (type === "start") {
        section
          .querySelector(".spacedate-nav-btn:first-child")
          .addEventListener("click", () => {
            this.currentStartDate.setMonth(
              this.currentStartDate.getMonth() - 1
            );
            this.renderCalendar(
              calendar,
              new Date(this.currentStartDate),
              type
            );
          });

        section
          .querySelector(".spacedate-nav-btn:last-child")
          .addEventListener("click", () => {
            this.currentStartDate.setMonth(
              this.currentStartDate.getMonth() + 1
            );
            this.renderCalendar(
              calendar,
              new Date(this.currentStartDate),
              type
            );
          });
      }

      if (type === "end") {
        section
          .querySelector(".spacedate-nav-btn:first-child")
          .addEventListener("click", () => {
            this.currentEndDate.setMonth(this.currentEndDate.getMonth() - 1);
            this.renderCalendar(calendar, new Date(this.currentEndDate), type);
          });

        section
          .querySelector(".spacedate-nav-btn:last-child")
          .addEventListener("click", () => {
            this.currentEndDate.setMonth(this.currentEndDate.getMonth() + 1);
            this.renderCalendar(calendar, new Date(this.currentEndDate), type);
          });
      }

      const input = section.querySelector(".spacedate-input");

      input.addEventListener("change", (e) => {
        const date = this.parseDate(e.target.value);
        if (date) {
          this.handleDateSelection(date, type);
        }
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const date = this.parseDate(e.target.value);
          if (date) {
            this.handleDateSelection(date, type);
          }
        }
      });
    });

    [this.leftSection, this.rightSection].forEach((section) => {
      const input = section.querySelector(".spacedate-input");

      input.addEventListener("input", (e) => {
        const value = e.target.value.replace(/\D/g, "");
        let formattedValue = "";

        if (value.length > 2) {
          formattedValue += value.slice(0, 2) + "/";
          if (value.length > 4) {
            formattedValue += value.slice(2, 4) + "/";
            formattedValue += value.slice(4, 8);
          } else {
            formattedValue += value.slice(2);
          }
        } else {
          formattedValue = value;
        }

        e.target.value = formattedValue;
      });
    });

    [this.leftSection, this.rightSection].forEach((section) => {
      const input = section.querySelector(".spacedate-input");

      input.addEventListener("keydown", (e) => {
        const key = e.key;

        if (
          !/\d/.test(key) &&
          key !== "/" &&
          ![
            "Backspace",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
            "Tab",
          ].includes(key)
        ) {
          e.preventDefault();
        }
      });
    });

    [this.leftSection, this.rightSection].forEach((section) => {
      const input = section.querySelector(".spacedate-input");

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const date = this.parseDate(e.target.value);
          if (date) {
            const type = section === this.leftSection ? "start" : "end";
            this.handleDateSelection(date, type);
          } else {
            alert("Data inválida! Use o formato DD/MM/AAAA.");
          }
        }
      });
    });

    this.modal.querySelectorAll(".spacedate-day").forEach((day) => {
      day.addEventListener("click", () => {
        this.tooltip.classList.remove("active");
      });
    });
  }

  formatDateForUrl(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  parseDate(dateString) {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1;
      const year = parseInt(parts[2]);

      const date = new Date(year, month, day);
      if (
        !isNaN(date.getTime()) &&
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
      ) {
        return date;
      }
    }
    return null;
  }

  resetDatePicker() {
    this.startDate = null;
    this.endDate = null;

    const now = new Date();
    this.currentStartDate = new Date(now);
    this.currentEndDate = new Date(now);

    this.updateInputs();

    this.renderCalendar(
      this.leftSection.querySelector(".spacedate-calendar"),
      this.currentStartDate,
      "start"
    );
    this.renderCalendar(
      this.rightSection.querySelector(".spacedate-calendar"),
      this.currentEndDate,
      "end"
    );
  }

  close() {
    this.modal.classList.remove("active");
    this.overlay.classList.remove("active");
  }
}