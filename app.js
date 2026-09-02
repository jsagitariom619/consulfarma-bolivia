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

  const medicalPhoto = document.querySelector('[data-medical-photo]');
  const medicalHero = document.querySelector('.medical-hero-photo');
  if (medicalPhoto || medicalHero) {
    fetch('assets/consultorio-medico-consulfarma-inline.txt', { cache: 'no-cache' })
      .then(response => {
        if (!response.ok) throw new Error('No se pudo cargar la imagen del consultorio');
        return response.text();
      })
      .then(dataUri => {
        const imageSource = dataUri.trim();
        if (!imageSource.startsWith('data:image/')) throw new Error('Formato de imagen inválido');
        if (medicalPhoto) medicalPhoto.src = imageSource;
        if (medicalHero) {
          medicalHero.style.backgroundImage = `linear-gradient(145deg,rgba(15,90,62,.06),rgba(255,255,255,.08)),url("${imageSource}")`;
          medicalHero.style.backgroundSize = 'cover';
          medicalHero.style.backgroundPosition = 'center';
        }
      })
      .catch(error => console.error(error));
  }

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
