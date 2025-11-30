// JavaScript educativo: interacción mínima y comentada para estudiantes

document.addEventListener('DOMContentLoaded', function(){
  const themeBtn = document.getElementById('themeBtn');
  const body = document.body;
  const navToggle = document.getElementById('navToggle');
  
  const navList = document.querySelector('.nav-list');
  const showHintBtn = document.getElementById('showHint');

 
  // --- MENÚ HAMBURGUESA ---
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('show');
    });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav && menuToggle) {
        mainNav.classList.remove('show');
        menuToggle.classList.remove('active');
      }
    });
  });

  // Tema: persistir elección en localStorage
  const currentTheme = localStorage.getItem('animelab-theme');
  if (currentTheme === 'light') body.classList.add('light');

  if (themeBtn) {
    themeBtn.addEventListener('click', function(){
      body.classList.toggle('light');
      const isLight = body.classList.contains('light');
      localStorage.setItem('animelab-theme', isLight ? 'light' : 'dark');
      themeBtn.textContent = isLight ? '☀️' : '🌙';
    });
  }

  // Navegación en móvil
  if (navToggle && navList) {
    navToggle.addEventListener('click', function(){
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', !expanded);
      navList.classList.toggle('show');
      navToggle.classList.toggle('active');
    });
  }

  // Lightbox funciones
  window.openLightbox = function(src){
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (lightbox && img) {
      img.src = src;
      lightbox.style.display = 'flex';
    }
  };

  window.closeLightbox = function(e){
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (!lightbox || !img) return;

    if (e.target.id === 'lightbox' || e.target.id === 'lightboxImg') {
      lightbox.style.display = 'none';
      img.src = '';
    }
  };

  // Perfil simple
  window.showProfile = function(name){
    const bio = {
      'Radamanthys': 'Radamanthys — uno de los tres jueces del inframundo más poderoso del ejército de Hades.',
      'Shaka': 'Shaka — caballero dorado que custodia el sexto templo del santuario de Atena.',
      'Hypnos': 'Hypnos — dios del sueño, consejero de Hades, hermano gemelo de Thanatos.',
      'Camus': 'Camus — caballero dorado que cuida el onceavo templo del santuario de Atena.'
    };
    const message = bio[name] || 'Perfil no encontrado';
    alert(message);
  };

  // Ejemplo de validación de formulario simple
  const form = document.getElementById('contactForm');

  function showError(input, message) {
    clearError(input);
    input.classList.add('error');

    const small = document.createElement('small');
    small.className = 'error-message';
    small.textContent = message;

    input.parentElement.appendChild(small);
  }

  function showSuccess(input) {
    clearError(input);
    input.classList.add('success');
  }

  function clearError(input) {
    input.classList.remove('error','success');
    const oldMsg = input.parentElement.querySelector('.error-message');
    if (oldMsg) oldMsg.remove();
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test((email));
  }

  if (form) {
    form.addEventListener('submit', function(ev){
      ev.preventDefault();

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      let valid = true;

      if (name.value.trim() === "") {
        showError(name, "El nombre es obligatorio");
        valid = false;
      } else showSuccess(name);

      if (email.value.trim() === "") {
        showError(email, "El correo es obligatorio");
        valid = false;
      } else if (!validateEmail(email.value.trim())) {
        showError(email, "El correo no es válido");
        valid = false;
      } else showSuccess(email);

      if (message.value.trim() === "") {
        showError(message, "El mensaje no puede estar vacío");
        valid = false;
      } else showSuccess(message);

      if (valid) {
        alert("¡Gracias! Tu mensaje ha sido enviado con éxito.");
        form.reset();
        [name, email, message].forEach(input => clearError(input));
      }
    });
  }

  // ------ ESTO LO MUEVO AQUÍ DENTRO (ANTES ESTABA FUERA Y ROMPÍA EL SCRIPT) ------
  if (showHintBtn) {
    showHintBtn.addEventListener('click', function(){
      const hint = document.createElement('div');
      hint.className = 'hint';
      hint.textContent = 'Pista: Revisa css/style.css para encontrar variables y layout. Revisa js/main.js para ver eventos.';
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.appendChild(hint);
        setTimeout(()=> hint.remove(), 6000);
      }
    });
  }

  const newData = {
    1:{
      title: "nuevo anime anuciado para 2026",
      Text: "La nueva serie contará con animadores de alto presupuesto. Se espera su estreno en Japon a medidades del proximo año."
    },
    2:{ title:"", Text:"" },
    3:{ title:"", Text:"" }
  };

  window.openNewsModal = function(id){
    const modal = document.getElementById('newsModal');
    const title = document.getElementById('newsModalTitle');
    const bodyText = document.getElementById('newsModalBody');

    if (modal && title && bodyText) {
      title.textContent = newData[id].title;
      bodyText.textContent = newData[id].Text;
      modal.classList.add('show');
    }
  };

  window.closeNewsModal = function(e){
    if(e.target.id === 'newsModal' || e.target.id === 'closeNewsModalBtn'){
      const modal = document.getElementById('newsModal');
      if (modal) modal.classList.remove('show');
    }
  };

  // --- Año dinámico en el footer ---
  const yearSpan = document.getElementById('currentYear');
  if(yearSpan){
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- Control de música ---
  const music = document.getElementById("animeMusic");  
  const playPauseBtn = document.getElementById("playPauseBtn");
  const muteBtn = document.getElementById("muteBtn");
  const volumeControl = document.getElementById("volumeControl");

  if (music) music.pause(); // No autoplay (correcto)

  // Play / Pause
  if (music && playPauseBtn) {
    playPauseBtn.addEventListener("click", () => {
      if (music.paused) {
        music.play();
        playPauseBtn.textContent = "⏸️ Pausar";
      } else {
        music.pause();
        playPauseBtn.textContent = "▶️ Reproducir";
      }
    });
  }

  // Mute / Unmute
  if (music && muteBtn) {
    muteBtn.addEventListener("click", () => {
      music.muted = !music.muted;
      muteBtn.textContent = music.muted ? "🔊 Activar sonido" : "🔇 Silenciar";
    });
  }

  // Control de volumen
  if (music && volumeControl) {
    volumeControl.addEventListener("input", () => {
      music.volume = volumeControl.value;
    });
  }

  // --- Acerca de (mostrar/ocultar) ---
  const aboutBtn = document.getElementById("aboutBtn");
  const aboutContent = document.querySelector(".about-content");

  if (aboutBtn && aboutContent) {
    aboutBtn.addEventListener("click", () => {
      aboutContent.classList.toggle("show");

      if (aboutContent.classList.contains("show")) {
        aboutBtn.textContent = "Cerrar";
      } else {
        aboutBtn.textContent = "Acerca de";
      }
    });
  }

}); // cierre DOMContentLoaded
