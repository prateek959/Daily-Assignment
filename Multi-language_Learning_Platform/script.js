// Localization texts
const translations = {
  en: {
    app_title: "Language Learning Platform",
    select_language: "Select Language:",
    dark_theme: "Dark Theme:",
    font_size: "Font Size:",
    small: "Small",
    medium: "Medium",
    large: "Large",
    lessons: "Lessons",
    progress: "Progress",
    achievements: "Achievements",
    certificate: "Certificate",
    certificate_text: "Congratulations! You completed all lessons in this language.",
    lesson_1: "Introduction",
    lesson_2: "Basic Grammar",
    lesson_3: "Conversation",
    achievement_1: "First Lesson Completed",
    achievement_2: "Halfway There",
    achievement_3: "All Lessons Completed",
  },
  es: {
    app_title: "Plataforma de Aprendizaje de Idiomas",
    select_language: "Seleccionar idioma:",
    dark_theme: "Tema oscuro:",
    font_size: "Tamaño de fuente:",
    small: "Pequeño",
    medium: "Medio",
    large: "Grande",
    lessons: "Lecciones",
    progress: "Progreso",
    achievements: "Logros",
    certificate: "Certificado",
    certificate_text: "¡Felicidades! Has completado todas las lecciones en este idioma.",
    lesson_1: "Introducción",
    lesson_2: "Gramática Básica",
    lesson_3: "Conversación",
    achievement_1: "Primera Lección Completada",
    achievement_2: "A mitad de camino",
    achievement_3: "Todas las Lecciones Completadas",
  },
  fr: {
    app_title: "Plateforme d'Apprentissage des Langues",
    select_language: "Choisir la langue :",
    dark_theme: "Thème sombre :",
    font_size: "Taille de police :",
    small: "Petit",
    medium: "Moyen",
    large: "Grand",
    lessons: "Leçons",
    progress: "Progrès",
    achievements: "Réalisations",
    certificate: "Certificat",
    certificate_text: "Félicitations ! Vous avez terminé toutes les leçons dans cette langue.",
    lesson_1: "Introduction",
    lesson_2: "Grammaire de base",
    lesson_3: "Conversation",
    achievement_1: "Première leçon terminée",
    achievement_2: "À mi-chemin",
    achievement_3: "Toutes les leçons terminées",
  }
};

// Sample lessons per language (keys)
const lessonsData = ["lesson_1", "lesson_2", "lesson_3"];
const achievementsData = ["achievement_1", "achievement_2", "achievement_3"];

let state = {
  language: localStorage.getItem("language") || "en",
  completedLessons: JSON.parse(localStorage.getItem("completedLessons")) || {},
  theme: localStorage.getItem("theme") || "light",
  fontSize: localStorage.getItem("fontSize") || "medium",
};

function translatePage() {
  document.querySelectorAll("[data-key]").forEach(elem => {
    const key = elem.getAttribute("data-key");
    if (translations[state.language][key]) {
      elem.textContent = translations[state.language][key];
    }
  });
}

function saveState() {
  localStorage.setItem("language", state.language);
  localStorage.setItem("completedLessons", JSON.stringify(state.completedLessons));
  localStorage.setItem("theme", state.theme);
  localStorage.setItem("fontSize", state.fontSize);
}

function loadSettings() {
  // Set language select
  document.getElementById("language-select").value = state.language;
  // Set theme toggle
  document.getElementById("theme-toggle").checked = (state.theme === "dark");
  // Set font size
  document.getElementById("font-size").value = state.fontSize;

  // Apply theme and font size
  document.body.classList.toggle("dark", state.theme === "dark");
  document.body.classList.remove("font-small", "font-medium", "font-large");
  document.body.classList.add(`font-${state.fontSize}`);
}

function renderLessons() {
  const lessonsList = document.getElementById("lessons-list");
  lessonsList.innerHTML = "";
  const completedForLang = state.completedLessons[state.language] || [];

  lessonsData.forEach((lessonKey, i) => {
    const li = document.createElement("li");
    li.className = "lesson-item";
    if (completedForLang.includes(i)) {
      li.classList.add("completed");
    }
    li.textContent = translations[state.language][lessonKey];
    li.addEventListener("click", () => {
      toggleLesson(i);
    });
    lessonsList.appendChild(li);
  });
}

function toggleLesson(index) {
  if (!state.completedLessons[state.language]) {
    state.completedLessons[state.language] = [];
  }
  const arr = state.completedLessons[state.language];
  const idx = arr.indexOf(index);
  if (idx === -1) {
    arr.push(index);
  } else {
    arr.splice(idx, 1);
  }
  saveState();
  renderLessons();
  renderProgress();
  renderAchievements();
  checkCertificate();
}

function renderProgress() {
  const completedForLang = state.completedLessons[state.language] || [];
  const progressText = document.getElementById("progress-text");
  progressText.textContent = `${completedForLang.length} / ${lessonsData.length} lessons completed`;
}

function renderAchievements() {
  const achievementsList = document.getElementById("achievements-list");
  achievementsList.innerHTML = "";
  const completedForLang = state.completedLessons[state.language] || [];
  if (completedForLang.length === 0) return;

  if (completedForLang.length >= 1) {
    const li = document.createElement("li");
    li.textContent = translations[state.language]["achievement_1"];
    achievementsList.appendChild(li);
  }
  if (completedForLang.length >= Math.floor(lessonsData.length / 2)) {
    const li = document.createElement("li");
    li.textContent = translations[state.language]["achievement_2"];
    achievementsList.appendChild(li);
  }
  if (completedForLang.length === lessonsData.length) {
    const li = document.createElement("li");
    li.textContent = translations[state.language]["achievement_3"];
    achievementsList.appendChild(li);
  }
}

function checkCertificate() {
  const completedForLang = state.completedLessons[state.language] || [];
  const certSection = document.getElementById("certificate-section");
  const certText = document.getElementById("certificate-text");

  if (completedForLang.length === lessonsData.length) {
    certSection.style.display = "block";
    certText.textContent = translations[state.language]["certificate_text"];
  } else {
    certSection.style.display = "none";
  }
}

function init() {
  loadSettings();
  translatePage();
  renderLessons();
  renderProgress();
  renderAchievements();
  checkCertificate();

  // Event listeners
  document.getElementById("language-select").addEventListener("change", (e) => {
    state.language = e.target.value;
    saveState();
    translatePage();
    renderLessons();
    renderProgress();
    renderAchievements();
    checkCertificate();
  });

  document.getElementById("theme-toggle").addEventListener("change", (e) => {
    state.theme = e.target.checked ? "dark" : "light";
    saveState();
    document.body.classList.toggle("dark", state.theme === "dark");
  });

  document.getElementById("font-size").addEventListener("change", (e) => {
    state.fontSize = e.target.value;
    saveState();
    document.body.classList.remove("font-small", "font-medium", "font-large");
    document.body.classList.add(`font-${state.fontSize}`);
  });
}

window.onload = init;
