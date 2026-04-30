/* shared.js — caricato da tutte le pagine */

// ── Carica componenti ───────────────────────────────────────────────────────
async function loadComponent(id, file) {
  try {
    const res  = await fetch(file);
    const html = await res.text();
    const el   = document.getElementById(id);
    if (el) el.innerHTML = html;
  } catch (err) {
    console.warn('Componente non caricato:', file, err);
  }
}

// ── Evidenzia il link attivo nella navbar ───────────────────────────────────
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'web3.html')) {
      a.classList.add('active');
    }
  });
}

// ── Scroll reveal ───────────────────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── Hero slider ─────────────────────────────────────────────────────────────
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  if (slides.length < 2) return;

  let i = 0;
  slides[0].classList.add('active');

  setInterval(() => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  }, 4500);
}

// ── Bootstrap ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {

  await loadComponent('navbar', 'navbar.html');

  await loadComponent('hero', 'hero.html');

  requestAnimationFrame(() => {
    initSlider();
  });

  await loadComponent('footer', 'footer.html');

  setActiveNav();
  initReveal();
});
