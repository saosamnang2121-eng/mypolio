// menu
const toggleBtn = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      html.setAttribute('data-theme', savedTheme);
      toggleBtn.textContent = savedTheme === 'light' ? '☀️' : '🌙';
    } else if (prefersDark) {
      html.setAttribute('data-theme', 'dark');
      toggleBtn.textContent = '🌙';
    } else {
      html.setAttribute('data-theme', 'light');
      toggleBtn.textContent = '☀️';
    }

    // Toggle on click
    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';

      html.setAttribute('data-theme', next);
      toggleBtn.textContent = next === 'light' ? '☀️' : '🌙';
      
      // Save preference
      localStorage.setItem('theme', next);
    });

    // Active menu link on click
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', function(e) {
        document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
      });
    });
    // 