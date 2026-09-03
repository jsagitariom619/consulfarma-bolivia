document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const contact = {
    whatsappDisplay: '+591 759 19302',
    whatsappUrl: 'https://wa.me/59175919302',
    hours: 'Lunes a domingo · 08:00 a 23:00',
    address: 'Calle Strongest N.º 15 y Av. Miguel de Cervantes'
  };

  document.querySelectorAll('.floating-whatsapp, [data-whatsapp]').forEach(link => {
    link.setAttribute('href', contact.whatsappUrl);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
    link.setAttribute('aria-label', 'Escribir a Consulfarma por WhatsApp');
  });

  const homeContactItems = document.querySelectorAll('.contact-info > div');
  if (homeContactItems.length >= 3) {
    const hours = homeContactItems[0].querySelector('small');
    const address = homeContactItems[1].querySelector('small');
    const whatsapp = homeContactItems[2].querySelector('small');
    if (hours) hours.textContent = contact.hours;
    if (address) address.textContent = contact.address;
    if (whatsapp) whatsapp.textContent = contact.whatsappDisplay;
  }

  if (document.body.dataset.page === 'inicio') {
    const heroLinks = document.querySelectorAll('.hero-actions a');
    if (heroLinks[1]) {
      heroLinks[1].setAttribute('href', contact.whatsappUrl);
      heroLinks[1].setAttribute('target', '_blank');
      heroLinks[1].setAttribute('rel', 'noopener');
      heroLinks[1].innerHTML = 'Hablar por WhatsApp <i data-lucide="message-circle"></i>';
    }
    if (window.lucide) lucide.createIcons();
  }

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

  const institutionalDialog = document.getElementById('institutional-dialog');
  const dialogTitle = institutionalDialog?.querySelector('[data-dialog-title]');
  const dialogContent = institutionalDialog?.querySelector('[data-dialog-content]');
  let lastTrigger = null;

  const institutionalContent = {
    vision: {
      title: 'Visión de Consulfarma',
      html: '<p>Ser la farmacia integral líder y más confiable de Bolivia, reconocida por brindar soluciones completas de salud con excelencia, innovación y atención humana, mejorando la calidad de vida de nuestros pacientes y convirtiéndonos en un referente de bienestar para las familias que confían en nosotros.</p>'
    },
    mision: {
      title: 'Misión de Consulfarma',
      html: '<p>Brindar atención integral en salud a través de nuestros servicios de farmacia, consultorio médico y enfermería, ofreciendo productos de calidad, atención profesional y un trato cálido y humano. Trabajamos cada día con compromiso, responsabilidad y pasión por servir, para contribuir al bienestar y la salud de nuestra comunidad.</p>'
    },
    filosofia: {
      title: 'Nuestra filosofía',
      html: '<p>En CONSULFARMA creemos que los medicamentos pueden venderse en muchos lugares, pero la confianza y el trato humano se ganan cada día.</p><p>Nuestro compromiso es que cada paciente que ingrese a CONSULFARMA salga sintiéndose escuchado, respetado y bien atendido.</p><p>Cada colaborador representa la imagen de CONSULFARMA.</p><p>No importa el cargo.</p><p>Todos somos responsables de brindar una experiencia extraordinaria.</p>'
    }
  };

  document.querySelectorAll('[data-institutional-open]').forEach(button => {
    button.addEventListener('click', () => {
      const item = institutionalContent[button.dataset.institutionalOpen];
      if (!item || !institutionalDialog) return;
      lastTrigger = button;
      if (dialogTitle) dialogTitle.textContent = item.title;
      if (dialogContent) dialogContent.innerHTML = item.html;
      document.body.classList.add('modal-open');
      institutionalDialog.showModal();
    });
  });

  const closeInstitutionalDialog = () => {
    if (!institutionalDialog?.open) return;
    institutionalDialog.close();
    document.body.classList.remove('modal-open');
    lastTrigger?.focus();
  };

  institutionalDialog?.querySelector('[data-dialog-close]')?.addEventListener('click', closeInstitutionalDialog);
  institutionalDialog?.addEventListener('click', event => {
    if (event.target === institutionalDialog) closeInstitutionalDialog();
  });
  institutionalDialog?.addEventListener('close', () => document.body.classList.remove('modal-open'));
});


// Galerías compactas de fotografías reales
document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const main = gallery.querySelector('.gallery-main');
  const title = gallery.querySelector('.gallery-caption strong');
  const caption = gallery.querySelector('.gallery-caption span');
  const dots = [...gallery.querySelectorAll('.gallery-dot')];
  const previous = gallery.querySelector('.gallery-prev');
  const next = gallery.querySelector('.gallery-next');
  let current = Math.max(0, dots.findIndex((dot) => dot.classList.contains('is-active')));

  const show = (index) => {
    current = (index + dots.length) % dots.length;
    const selected = dots[current];
    main.classList.add('is-changing');
    const preload = new Image();
    preload.onload = () => {
      main.src = selected.dataset.src;
      main.alt = selected.dataset.alt || '';
      main.width = Number(selected.dataset.width) || main.width;
      main.height = Number(selected.dataset.height) || main.height;
      main.classList.toggle('is-contain', selected.dataset.fit === 'contain');
      title.textContent = selected.dataset.title || '';
      caption.textContent = selected.dataset.caption || '';
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === current;
        dot.classList.toggle('is-active', active);
        if (active) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      main.classList.remove('is-changing');
    };
    preload.onerror = () => main.classList.remove('is-changing');
    preload.src = selected.dataset.src;
  };

  dots.forEach((dot, index) => dot.addEventListener('click', () => show(index)));
  previous?.addEventListener('click', () => show(current - 1));
  next?.addEventListener('click', () => show(current + 1));
  gallery.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
  });
});