document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.setAttribute('aria-label', 'Abrir menú');
    });
  });

  const currentPage = document.body.dataset.page;
  document.querySelectorAll('.main-nav a[data-nav]').forEach(link => {
    link.classList.toggle('active', link.dataset.nav === currentPage);
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll('.article-toggle').forEach(button => {
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      const summary = button.nextElementSibling;
      const open = summary?.classList.toggle('open');
      button.setAttribute('aria-expanded', String(Boolean(open)));
      const label = button.querySelector('.toggle-label');
      if (label) label.textContent = open ? 'Ocultar resumen' : 'Ver resumen';
    });
  });
});
