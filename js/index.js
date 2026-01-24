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