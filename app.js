document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = [...document.querySelectorAll('main section[id], header[id]')];
  const navLinks = [...document.querySelectorAll('.main-nav a')];

  const updateActiveLink = () => {
    const y = window.scrollY + 140;
    let current = 'inicio';
    sections.forEach(section => {
      if (section.offsetTop <= y) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll('.article-toggle').forEach(button => {
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      const summary = button.nextElementSibling;
      const open = summary?.classList.toggle('open');
      button.setAttribute('aria-expanded', String(Boolean(open)));
      button.firstChild.textContent = open ? 'Ocultar resumen ' : 'Ver resumen ';
    });
  });
});
