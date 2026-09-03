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


// Sistema reutilizable de galerías y visor ampliado.
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.hidden = true;
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Visor de fotografía ampliada');
  lightbox.innerHTML = `
    <div class="lightbox-shell">
      <button class="lightbox-close" type="button" aria-label="Cerrar imagen ampliada"><i data-lucide="x"></i></button>
      <button class="lightbox-arrow lightbox-previous" type="button" aria-label="Imagen anterior"><i data-lucide="chevron-left"></i></button>
      <figure class="lightbox-figure">
        <img class="lightbox-image" alt="">
        <figcaption class="lightbox-caption"><strong></strong><span></span></figcaption>
      </figure>
      <button class="lightbox-arrow lightbox-next" type="button" aria-label="Imagen siguiente"><i data-lucide="chevron-right"></i></button>
    </div>`;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxTitle = lightbox.querySelector('.lightbox-caption strong');
  const lightboxDescription = lightbox.querySelector('.lightbox-caption span');
  const closeButton = lightbox.querySelector('.lightbox-close');
  const previousButton = lightbox.querySelector('.lightbox-previous');
  const nextButton = lightbox.querySelector('.lightbox-next');
  let lightboxItems = [];
  let lightboxIndex = 0;
  let lightboxTrigger = null;
  let touchStartX = 0;

  const paintLightbox = (index) => {
    if (!lightboxItems.length) return;
    lightboxIndex = (index + lightboxItems.length) % lightboxItems.length;
    const item = lightboxItems[lightboxIndex];
    lightboxImage.src = item.full || item.src;
    lightboxImage.alt = item.alt || item.title || 'Fotografía ampliada';
    lightboxTitle.textContent = item.title || '';
    lightboxDescription.textContent = item.caption || '';
    lightbox.querySelector('.lightbox-caption').hidden = !item.title && !item.caption;
    const multiple = lightboxItems.length > 1;
    previousButton.hidden = !multiple;
    nextButton.hidden = !multiple;
  };

  const openLightbox = (items, index, trigger) => {
    lightboxItems = items;
    lightboxTrigger = trigger;
    paintLightbox(index);
    lightbox.hidden = false;
    document.body.classList.add('modal-open', 'lightbox-open');
    closeButton.focus();
  };

  const closeLightbox = () => {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    lightboxImage.removeAttribute('src');
    document.body.classList.remove('modal-open', 'lightbox-open');
    lightboxTrigger?.focus();
  };

  const galleryItems = (dots) => dots.map((dot) => ({
    src: dot.dataset.src,
    full: dot.dataset.full || dot.dataset.src,
    alt: dot.dataset.alt || '',
    title: dot.dataset.title || '',
    caption: dot.dataset.caption || ''
  }));

  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const main = gallery.querySelector('.gallery-main');
    const title = gallery.querySelector('.gallery-caption strong');
    const caption = gallery.querySelector('.gallery-caption span');
    const dots = [...gallery.querySelectorAll('.gallery-dot')];
    const previous = gallery.querySelector('.gallery-prev');
    const next = gallery.querySelector('.gallery-next');
    let current = Math.max(0, dots.findIndex((dot) => dot.classList.contains('is-active')));

    const expand = document.createElement('button');
    expand.className = 'gallery-expand';
    expand.type = 'button';
    expand.setAttribute('aria-label', 'Ampliar fotografía');
    expand.innerHTML = '<i data-lucide="maximize-2"></i>';
    gallery.querySelector('.gallery-stage')?.appendChild(expand);

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

    const openCurrent = () => openLightbox(galleryItems(dots), current, expand);
    expand.addEventListener('click', openCurrent);
    main.addEventListener('click', openCurrent);
    main.setAttribute('tabindex', '0');
    main.setAttribute('role', 'button');
    main.setAttribute('aria-label', 'Ampliar fotografía seleccionada');
    main.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCurrent();
      }
    });
    dots.forEach((dot, index) => dot.addEventListener('click', () => show(index)));
    previous?.addEventListener('click', () => show(current - 1));
    next?.addEventListener('click', () => show(current + 1));
    gallery.addEventListener('keydown', (event) => {
      if (lightbox.hidden && event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
      if (lightbox.hidden && event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
    });
  });

  const standalone = [...document.querySelectorAll('[data-lightbox-item]')];
  standalone.forEach((item) => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', item.getAttribute('aria-label') || 'Ampliar fotografía');
    const openStandalone = () => {
      const group = item.dataset.lightboxGroup || 'default';
      const groupElements = standalone.filter((candidate) => (candidate.dataset.lightboxGroup || 'default') === group);
      const items = groupElements.map((element) => ({
        src: element.dataset.lightboxSrc || element.currentSrc || element.src,
        full: element.dataset.lightboxFull || element.dataset.lightboxSrc || element.currentSrc || element.src,
        alt: element.alt || '',
        title: element.dataset.lightboxTitle || '',
        caption: element.dataset.lightboxCaption || ''
      }));
      openLightbox(items, groupElements.indexOf(item), item);
    };
    item.addEventListener('click', openStandalone);
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openStandalone();
      }
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  previousButton.addEventListener('click', () => paintLightbox(lightboxIndex - 1));
  nextButton.addEventListener('click', () => paintLightbox(lightboxIndex + 1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target.classList.contains('lightbox-shell') || event.target.classList.contains('lightbox-figure')) closeLightbox();
  });
  lightbox.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0]?.clientX || 0;
  }, { passive: true });
  lightbox.addEventListener('touchend', (event) => {
    const distance = (event.changedTouches[0]?.clientX || 0) - touchStartX;
    if (Math.abs(distance) < 55) return;
    paintLightbox(distance > 0 ? lightboxIndex - 1 : lightboxIndex + 1);
  }, { passive: true });
  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') { event.preventDefault(); paintLightbox(lightboxIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); paintLightbox(lightboxIndex + 1); }
    if (event.key === 'Tab') {
      const controls = [closeButton, previousButton, nextButton].filter((control) => !control.hidden);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  const productCatalog = [
    { slug: 'vinagre-noni', name: 'Vinagre de noni', summary: 'Perfil ácido y frutal para complementar preparaciones cotidianas.', description: 'Vinagre artesanal de noni, pensado para aportar un perfil ácido y frutal a preparaciones cotidianas.', benefits: ['Aporta un sabor ácido característico.', 'Complementa aderezos, salsas y marinados.', 'Elaborado artesanalmente con cultivo madre.'] },
    { slug: 'vinagre-pitahaya-pina', name: 'Vinagre de pitahaya y piña', summary: 'Combinación frutal para realzar recetas y preparaciones frescas.', description: 'Combinación artesanal de pitahaya y piña con un perfil frutal equilibrado para realzar recetas y preparaciones frescas.', benefits: ['Aporta notas frutales de pitahaya y piña.', 'Ideal para complementar aderezos y marinados.', 'Elaborado artesanalmente con cultivo madre.'] },
    { slug: 'vinagre-uva', name: 'Vinagre de uva', summary: 'Sabor frutal y acidez definida para preparaciones culinarias.', description: 'Vinagre artesanal de uva con sabor frutal y acidez definida, apropiado para complementar distintas preparaciones culinarias.', benefits: ['Aporta una nota frutal de uva.', 'Complementa ensaladas, salsas y marinados.', 'Elaborado artesanalmente con cultivo madre.'] },
    { slug: 'vinagre-perejil', name: 'Vinagre de perejil', summary: 'Perfil herbal para complementar aderezos y recetas saladas.', description: 'Vinagre artesanal de perejil con un perfil herbal, creado para complementar aderezos y recetas saladas.', benefits: ['Aporta un perfil herbal de perejil.', 'Ideal para complementar preparaciones saladas.', 'Elaborado artesanalmente con cultivo madre.'] },
    { slug: 'vinagre-coco', name: 'Vinagre de coco', summary: 'Alternativa de sabor suave y tropical para la cocina diaria.', description: 'Vinagre artesanal de coco, una alternativa de sabor suave y tropical para incorporar variedad a la cocina diaria.', benefits: ['Aporta una nota suave y tropical.', 'Complementa aderezos, salsas y marinados.', 'Elaborado artesanalmente con cultivo madre.'] },
    { slug: 'vinagre-manzana', name: 'Vinagre de manzana', summary: 'Acidez equilibrada y perfil frutal para distintas recetas.', description: 'Vinagre artesanal de manzana con una acidez equilibrada y perfil frutal, versátil para diferentes recetas.', benefits: ['Aporta el sabor frutal de la manzana.', 'Versátil para aderezos, salsas y marinados.', 'Elaborado artesanalmente con cultivo madre.'] },
    { slug: 'vinagre-pina', name: 'Vinagre de piña', summary: 'Notas tropicales para aportar variedad a las preparaciones.', description: 'Vinagre artesanal de piña con notas tropicales, pensado para aportar variedad y un toque frutal a las preparaciones.', benefits: ['Aporta notas tropicales de piña.', 'Complementa aderezos, salsas y marinados.', 'Elaborado artesanalmente con cultivo madre.'] }
  ];
  const productTrack = document.querySelector('[data-product-track]');
  const productDialog = document.querySelector('.product-dialog');
  if (productTrack && productDialog) {
    const dialogImage = productDialog.querySelector('.product-dialog-visual img');
    const dialogCategory = productDialog.querySelector('.product-dialog-category');
    const dialogTitle = productDialog.querySelector('#product-dialog-title');
    const dialogDescription = productDialog.querySelector('.product-dialog-description');
    const dialogBenefits = productDialog.querySelector('.product-dialog-benefits');
    const dialogPresentation = productDialog.querySelector('.product-dialog-presentation span');
    const dialogWhatsApp = productDialog.querySelector('.product-dialog-whatsapp');
    const dialogClose = productDialog.querySelector('.product-dialog-close');
    let productTrigger = null;

    productCatalog.forEach((product) => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `<button class="product-image-button" type="button" aria-label="Ver ${product.name}"><img src="assets/productos/thumbs/${product.slug}.webp" alt="Botella de ${product.name.toLowerCase()} artesanal" width="439" height="780" loading="lazy"></button><div class="product-card-body"><span class="product-category">Vinagre artesanal</span><h3>${product.name}</h3><p>${product.summary}</p><ul><li>${product.benefits[0]}</li><li>Elaborado con cultivo madre.</li></ul><div class="product-presentation">1 litro · 5% de acidez</div><div class="product-actions"><button class="btn product-view" type="button">Ver producto</button><a class="product-whatsapp" href="https://wa.me/59175919302?text=${encodeURIComponent(`Hola, quisiera consultar la disponibilidad del ${product.name.toLowerCase()}`)}" target="_blank" rel="noopener">Consultar disponibilidad</a></div></div>`;
      const openProduct = (trigger) => {
        productTrigger = trigger;
        dialogImage.src = `assets/productos/full/${product.slug}.webp`;
        dialogImage.alt = `Botella de ${product.name.toLowerCase()} artesanal`;
        dialogCategory.textContent = 'Vinagre artesanal con cultivo madre';
        dialogTitle.textContent = product.name;
        dialogDescription.textContent = product.description;
        dialogBenefits.replaceChildren(...product.benefits.map((benefit) => {
          const item = document.createElement('li');
          item.textContent = benefit;
          return item;
        }));
        dialogPresentation.textContent = 'Botella de 1 litro · 5% de acidez';
        dialogWhatsApp.href = `https://wa.me/59175919302?text=${encodeURIComponent(`Hola, quisiera consultar la disponibilidad del ${product.name.toLowerCase()}`)}`;
        productDialog.showModal();
        document.body.classList.add('modal-open');
        dialogClose.focus();
      };
      card.querySelector('.product-image-button').addEventListener('click', (event) => openProduct(event.currentTarget));
      card.querySelector('.product-view').addEventListener('click', (event) => openProduct(event.currentTarget));
      productTrack.appendChild(card);
    });

    const closeProduct = () => productDialog.close();
    dialogClose.addEventListener('click', closeProduct);
    productDialog.addEventListener('click', (event) => {
      if (event.target === productDialog) closeProduct();
    });
    productDialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      closeProduct();
    });
    productDialog.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      productTrigger?.focus();
    });
    const carousel = document.querySelector('[data-product-carousel]');
    const scrollProducts = (direction) => productTrack.scrollBy({ left: direction * Math.max(280, productTrack.clientWidth * .82), behavior: 'smooth' });
    carousel?.querySelector('.product-carousel-prev')?.addEventListener('click', () => scrollProducts(-1));
    carousel?.querySelector('.product-carousel-next')?.addEventListener('click', () => scrollProducts(1));
  }

  if (window.lucide) lucide.createIcons();
});
