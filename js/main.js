/* ==========================================================================
   Puente Solidario · js/main.js
   Lógica del directorio: renderizado de tarjetas, búsqueda, filtros,
   ventana de detalle accesible y menú móvil.

   Requiere js/data.js (window.ORGANIZATIONS y window.CAUSE_CATEGORIES).

   Contenido
     1. Datos y estado
     2. Referencias al DOM
     3. Utilidades para crear nodos de forma segura
     4. Filtros y mosaicos de causas
     5. Tarjetas del directorio
     6. Búsqueda y renderizado
     7. Ventana de detalle
     8. Filtros: estado y reinicio
     9. Eventos
    10. Arranque
   ========================================================================== */
(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Datos y estado
     ------------------------------------------------------------------------ */
  const organizations = window.ORGANIZATIONS || [];
  const categories = window.CAUSE_CATEGORIES || [];
  const MAX_CAUSE_TILES = 6;           // Mosaicos mostrados en la sección #causas

  let selectedCategory = '';           // '' = todas las causas
  let lastFocusedElement = null;       // Para devolver el foco al cerrar el detalle

  /* ------------------------------------------------------------------------
     2. Referencias al DOM (se consultan una sola vez)
     ------------------------------------------------------------------------ */
  const $ = selector => document.querySelector(selector);

  const dom = {
    grid: $('#directory-grid'),
    searchInput: $('#search-input'),
    clearSearch: $('#clear-search'),
    locationFilter: $('#location-filter'),
    categoryFilters: $('#category-filters'),
    emptyState: $('#empty-state'),
    resultCount: $('#result-count'),
    causeTiles: $('#cause-tiles'),
    menuToggle: $('.menu-toggle'),
    siteNav: $('#site-nav'),
    modal: $('#detail-modal'),
    modalContent: $('#modal-content'),
    modalClose: $('#modal-close'),
    backdrop: $('#detail-backdrop')
  };

  /* ------------------------------------------------------------------------
     3. Utilidades para crear nodos
        Los datos se insertan con textContent / atributos, nunca como HTML.
     ------------------------------------------------------------------------ */
  /** Crea un elemento con clase y texto opcionales. */
  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  /** Crea un icono decorativo de Bootstrap Icons (oculto a lectores de pantalla). */
  const makeIcon = (iconClass, extraClass = '') => {
    const icon = make('i', `bi ${iconClass} ${extraClass}`.trim());
    icon.setAttribute('aria-hidden', 'true');
    return icon;
  };

  /** Crea un elemento con un icono seguido de texto. */
  const makeWithIcon = (tag, className, iconClass, text) => {
    const element = make(tag, className);
    element.append(makeIcon(iconClass), document.createTextNode(` ${text}`));
    return element;
  };

  /** Crea un enlace; los externos se abren en otra pestaña de forma segura. */
  const makeLink = (url, label, className = '') => {
    const link = make('a', className, label);
    link.href = url;
    if (url.startsWith('http')) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    return link;
  };

  /** Convierte un teléfono en URL tel: (deja solo "+" y dígitos). */
  const telUrl = phone => (phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '');

  /**
   * Crea una imagen con carga opcional diferida.
   * Si falla, el contenedor muestra un fondo alternativo (clase image-fallback).
   */
  const makeImage = (org, container, { lazy = false } = {}) => {
    const img = document.createElement('img');
    img.src = org.image;
    img.alt = org.imageAlt;
    if (lazy) img.loading = 'lazy';
    img.addEventListener('error', () => {
      container.classList.add('image-fallback');
      img.remove();
    }, { once: true });
    return img;
  };

  /* ------------------------------------------------------------------------
     4. Filtros y mosaicos de causas
        Se generan desde los datos para que los contadores no se desincronicen.
     ------------------------------------------------------------------------ */
  /** Rellena el selector de territorios (municipios y zonas, sin repetir). */
  function buildLocationOptions() {
    const places = [...new Set(organizations.flatMap(org => [org.municipality, org.zone]))].sort();
    places.forEach(place => {
      const option = make('option', '', place);
      option.value = place;
      dom.locationFilter.append(option);
    });
  }

  /** Crea un chip de filtro por causa ('' = todas). */
  function makeCategoryChip(label, category, isActive) {
    const chip = make('button', `filter-chip${isActive ? ' is-active' : ''}`, label);
    chip.type = 'button';
    chip.dataset.category = category;
    chip.setAttribute('aria-pressed', String(isActive));
    return chip;
  }

  function buildCategoryChips() {
    dom.categoryFilters.append(makeCategoryChip('Todas las causas', '', true));
    categories.forEach(category => {
      dom.categoryFilters.append(makeCategoryChip(category.name, category.name, false));
    });
  }

  function buildFilters() {
    buildLocationOptions();
    buildCategoryChips();
  }

  /** Mosaico de una causa: icono, nombre, número de organizaciones y flecha. */
  function createCauseTile(category, count) {
    const tile = make('button', `cause-tile ${category.tone}`);
    tile.type = 'button';
    tile.setAttribute('aria-label', `Ver ${category.name}`);

    const icon = make('span', 'cause-icon');
    icon.append(makeIcon(category.icon));

    const name = make('span', 'cause-name', category.name);
    const number = make('span', 'cause-number', `${count} ${count === 1 ? 'organización' : 'organizaciones'}`);

    tile.append(icon, name, number, makeIcon('bi-arrow-up-right', 'cause-arrow'));
    tile.addEventListener('click', () => {
      selectedCategory = category.name;
      syncCategoryChips();
      render();
      $('#directorio').scrollIntoView({ behavior: 'smooth' });
    });
    return tile;
  }

  function buildCauses() {
    categories.slice(0, MAX_CAUSE_TILES).forEach(category => {
      const count = organizations.filter(org => org.tags.includes(category.name)).length;
      if (count) dom.causeTiles.append(createCauseTile(category, count));
    });
  }

  /* ------------------------------------------------------------------------
     5. Tarjetas del directorio
     ------------------------------------------------------------------------ */
  /** Imagen de la tarjeta con la etiqueta de causa superpuesta. */
  function createCardMedia(org) {
    const media = make('div', 'org-media');
    media.append(
      makeImage(org, media, { lazy: true }),
      makeWithIcon('span', 'org-category', org.icon, org.category)
    );
    return media;
  }

  /** Botón de detalle y, si existe teléfono, acceso directo para llamar. */
  function createCardActions(org) {
    const actions = make('div', 'org-actions');

    const detailButton = make('button', 'button button-card', 'Conocer fundación');
    detailButton.type = 'button';
    detailButton.addEventListener('click', () => openDetail(org, detailButton));
    actions.append(detailButton);

    if (org.phone) {
      const call = make('a', 'contact-icon');
      call.href = telUrl(org.phone);
      call.setAttribute('aria-label', `Llamar a ${org.name}`);
      call.append(makeIcon('bi-telephone'));
      actions.append(call);
    }
    return actions;
  }

  function createCardBody(org) {
    const body = make('div', 'org-body');
    const verified = makeWithIcon('span', 'verified-badge', 'bi-patch-check-fill', org.verifiedLabel);
    verified.title = 'Datos básicos cotejados con una fuente institucional enlazada. No es certificación legal.';

    body.append(
      makeWithIcon('p', 'org-location', 'bi-geo-alt', `${org.municipality} · ${org.zone}`),
      make('h3', 'org-title', org.name),
      verified,
      make('p', 'org-description', org.summary),
      createCardActions(org)
    );
    return body;
  }

  function createCard(org) {
    const card = make('article', 'org-card');
    card.append(createCardMedia(org), createCardBody(org));
    return card;
  }

  /* ------------------------------------------------------------------------
     6. Búsqueda y renderizado
     ------------------------------------------------------------------------ */
  /** Texto en minúsculas sobre el que busca el campo de búsqueda. */
  const getSearchableText = org =>
    [org.name, org.municipality, org.zone, org.category, org.population, org.summary, org.mission, org.search]
      .join(' ')
      .toLocaleLowerCase('es');

  /** Aplica a la vez: texto, territorio (zona o municipio) y causa. */
  function getVisibleOrganizations() {
    const query = dom.searchInput.value.trim().toLocaleLowerCase('es');
    const place = dom.locationFilter.value;

    return organizations.filter(org => {
      const matchesQuery = !query || getSearchableText(org).includes(query);
      const matchesPlace = !place || org.zone === place || org.municipality === place;
      const matchesCategory = !selectedCategory || org.tags.includes(selectedCategory);
      return matchesQuery && matchesPlace && matchesCategory;
    });
  }

  function render() {
    const matches = getVisibleOrganizations();
    dom.grid.replaceChildren(...matches.map(createCard));
    dom.grid.setAttribute('aria-busy', 'false');
    dom.emptyState.hidden = matches.length > 0;
    dom.resultCount.textContent = matches.length;
    dom.clearSearch.hidden = dom.searchInput.value.length === 0;
  }

  /* ------------------------------------------------------------------------
     7. Ventana de detalle
     ------------------------------------------------------------------------ */
  /** Lista de datos (sede, teléfono, web...). Omite los campos vacíos. */
  function createFactList(org) {
    const list = make('dl', 'detail-facts');

    const addFact = (label, value, href) => {
      if (!value) return;
      const term = make('dt', '', label);
      const description = make('dd');
      if (href) description.append(makeLink(href, value));
      else description.textContent = value;
      list.append(term, description);
    };

    addFact('Sede publicada', org.address);
    addFact('Teléfono', org.phone, telUrl(org.phone));
    if (org.whatsapp) addFact('WhatsApp institucional', 'Abrir chat', `https://wa.me/${org.whatsapp}`);
    addFact('Sitio web', org.website, org.website);
    if (org.contact && org.contact !== org.website) {
      addFact('Contacto / participación', 'Consultar canal institucional', org.contact);
    }
    if (org.donation) {
      addFact('Opciones de apoyo', 'Consultar directamente con la organización', org.donation);
    }
    return list;
  }

  function createSourceList(org) {
    const list = make('ul', 'source-list');
    org.sources.forEach(source => {
      const item = make('li');
      item.append(makeLink(source.url, source.label));
      list.append(item);
    });
    return list;
  }

  /** Texto principal del detalle; los id se enlazan con aria-labelledby/describedby. */
  function createDetailContent(org) {
    const wrapper = make('div', 'detail-content');

    const title = make('h2', '', org.name);
    title.id = 'detail-title';
    const summary = make('p', 'detail-summary', org.summary);
    summary.id = 'detail-summary';

    wrapper.append(
      make('span', 'eyebrow', `${org.category} · ${org.municipality}`),
      title,
      summary,
      make('h3', '', 'Su labor'),
      make('p', '', org.mission),
      make('h3', '', 'A quién acompaña'),
      make('p', '', org.population),
      make('h3', '', 'Ubicación y contacto'),
      createFactList(org),
      make('h3', '', 'Fuentes y revisión'),
      createSourceList(org),
      make('p', 'review-date', `Revisado el ${org.verified}. La información puede cambiar; confirma con la organización.`)
    );
    return wrapper;
  }

  /** Abre el diálogo, recuerda el elemento de origen y lleva el foco al botón de cierre. */
  function openDetail(org, trigger) {
    lastFocusedElement = trigger;

    const hero = make('div', 'detail-hero');
    hero.append(makeImage(org, hero));

    dom.modalContent.replaceChildren(hero, createDetailContent(org));
    dom.modal.hidden = false;
    dom.backdrop.hidden = false;
    document.body.classList.add('modal-open');
    dom.modalClose.focus();
  }

  function closeDetail() {
    dom.modal.hidden = true;
    dom.backdrop.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  /** Mantiene el foco del teclado dentro del diálogo abierto. */
  function trapFocus(event) {
    const focusable = [...dom.modal.querySelectorAll('a[href], button:not([disabled])')];
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /* ------------------------------------------------------------------------
     8. Filtros: estado y reinicio
     ------------------------------------------------------------------------ */
  /** Refleja la causa seleccionada en los chips (clase y aria-pressed). */
  function syncCategoryChips() {
    dom.categoryFilters.querySelectorAll('button').forEach(chip => {
      const isActive = chip.dataset.category === selectedCategory;
      chip.classList.toggle('is-active', isActive);
      chip.setAttribute('aria-pressed', String(isActive));
    });
  }

  function resetFilters() {
    dom.searchInput.value = '';
    dom.locationFilter.value = '';
    selectedCategory = '';
    syncCategoryChips();
    render();
    dom.searchInput.focus();
  }

  /* ------------------------------------------------------------------------
     9. Eventos
     ------------------------------------------------------------------------ */
  function setMenuOpen(isOpen) {
    dom.menuToggle.setAttribute('aria-expanded', String(isOpen));
    dom.menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    dom.siteNav.classList.toggle('is-open', isOpen);
  }

  function bindNavigationEvents() {
    dom.menuToggle.addEventListener('click', () => {
      setMenuOpen(dom.menuToggle.getAttribute('aria-expanded') !== 'true');
    });
    // Al elegir un enlace, el menú móvil se cierra.
    document.querySelectorAll('#site-nav a').forEach(link => {
      link.addEventListener('click', () => setMenuOpen(false));
    });
  }

  function bindFilterEvents() {
    dom.searchInput.addEventListener('input', render);
    dom.locationFilter.addEventListener('change', render);
    dom.categoryFilters.addEventListener('click', event => {
      const chip = event.target.closest('button[data-category]');
      if (!chip) return;
      selectedCategory = chip.dataset.category;
      syncCategoryChips();
      render();
    });
    dom.clearSearch.addEventListener('click', () => {
      dom.searchInput.value = '';
      render();
      dom.searchInput.focus();
    });
    $('#reset-filters').addEventListener('click', resetFilters);
    $('#empty-reset').addEventListener('click', resetFilters);
  }

  function bindModalEvents() {
    dom.modalClose.addEventListener('click', closeDetail);
    dom.backdrop.addEventListener('click', closeDetail);
    document.addEventListener('keydown', event => {
      if (dom.modal.hidden) return;
      if (event.key === 'Escape') closeDetail();
      else if (event.key === 'Tab') trapFocus(event);
    });
  }

  /* ------------------------------------------------------------------------
     10. Arranque
     ------------------------------------------------------------------------ */
  function init() {
    $('#current-year').textContent = new Date().getFullYear();
    buildFilters();
    buildCauses();
    bindNavigationEvents();
    bindFilterEvents();
    bindModalEvents();
    render();
  }

  init();
})();