const html = document.documentElement;
const toggleBtn = document.querySelector('.theme-toggle');

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);
} else if (prefersDark) {
  html.setAttribute('data-theme', 'dark');
} else {
  html.setAttribute('data-theme', 'light');
}

// We don't need updateIcon() anymore – CSS handles everything based on data-theme

toggleBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Your other code (active menu link) remains unchanged
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', function(e) {
    document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
    this.classList.add('active');
  });
});

// ... your existing code ...

const logoImg = document.querySelector('.logo img');

function updateLogo() {
  const theme = html.getAttribute('data-theme');
  if (theme === 'dark') {
    logoImg.src = 'img/logo/mypolio-logo-white.png';
  } else {
    logoImg.src = 'img/logo/mypolio-logo.png';
  }
}

// Call on load
updateLogo();

// Call when toggling
toggleBtn.addEventListener('click', () => {
  // ... your existing toggle code ...

  // After changing theme
  updateLogo();
});

// Language toggle
const flagToggle = document.querySelector('.flag-toggle');

// i18n.js (or at bottom of your main script)
const translations = {};
let currentLang = localStorage.getItem('lang') || 'en'; // default English

async function loadTranslations() {
  if (Object.keys(translations).length > 0) return; // already loaded

  const en = await fetch('translations/en.json').then(r => r.json());
  const km = await fetch('translations/km.json').then(r => r.json());

  translations['en'] = en;
  translations['km'] = km;
}

function t(key) {
  return translations[currentLang]?.[key] || translations['en'][key] || key;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;           // helps screen readers + SEO
  document.body.setAttribute('data-lang', lang);  // optional for CSS targeting
  updateAllText();
}

function updateAllText() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });

  // Add this for title attributes
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.getAttribute('data-i18n-title'));
  });

  // Also update flag visibility (your existing toggle)
  const flagToggle = document.querySelector('.flag-toggle');
  if (flagToggle) {
    // your CSS already handles visibility via html[lang="km"]
  }
}

// Initialize
loadTranslations().then(() => {
  setLanguage(currentLang);
});

// Your flag toggle (update your existing listener)
document.querySelector('.flag-toggle')?.addEventListener('click', () => {
  const next = currentLang === 'km' ? 'en' : 'km';
  setLanguage(next);
});

// Animate on scroll using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Optional: stop observing after animation (performance)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,          // start when 15% visible
      rootMargin: '0px 0px -10% 0px' // slight offset
    }
  );

  elements.forEach(el => observer.observe(el));
});

// Fade-up on scroll – super lightweight
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: stop observing after animation (better performance)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,               // start when ~15% visible
      rootMargin: '0px 0px -60px 0px' // slight top offset
    }
  );

  // Watch exactly your elements (no extra classes needed)
  document.querySelectorAll('.welcome_text, .welcome_description, .explore-image, .btn-explore').forEach(el => {
    observer.observe(el);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      menu.classList.toggle('active');
      
      // Optional: change icon to X when open (if you later add a close icon)
      const img = toggle.querySelector('img');
      img.src = menu.classList.contains('active') 
        ? 'img/icon/times.svg' 
        : 'img/icon/menu-right-alt.svg';
    });

    // Close menu when clicking a link (very common mobile behavior)
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });
  }
});