/* ==========================================================================
  Puente Solidario · js/data.js
  Catálogo estático de organizaciones y categorías de causas.

  Expone dos variables globales que lee js/main.js:
    - window.ORGANIZATIONS    → lista de fichas
    - window.CAUSE_CATEGORIES → categorías para filtros y mosaicos

  Contenido
    1. Constantes reutilizables (zonas, causas, fecha de revisión)
    2. Helpers para escribir fichas sin repetir texto
    3. Fichas de organizaciones
    4. Categorías de causas

  Esquema de una ficha (todos los campos de texto son obligatorios;
  usa '' cuando el dato no esté publicado y la web lo omitirá)
    id            Identificador único (slug)
    name          Nombre oficial
    municipality  Municipio de la sede publicada
    zone          Zona (ZONE.*)
    category      Causa principal que se muestra en la tarjeta (CAUSE.*)
    icon          Clase de Bootstrap Icons
    summary       Resumen breve para la tarjeta
    population    A quién acompaña
    mission       Labor / misión ampliada para el detalle
    address       Sede publicada (o aviso si no hay dirección exacta)
    phone         Teléfono con indicativo (genera enlace tel:)
    whatsapp      Solo dígitos con indicativo, sin "+" (genera https://wa.me/)
    website       Sitio oficial
    contact       Canal de contacto o participación
    donation      Canal oficial de apoyo, si existe
    image/imageAlt Fotografía ilustrativa y su texto alternativo
    sources       Fuentes consultadas → source(etiqueta, url)
    verified      Fecha ISO de la última revisión
    verifiedLabel Etiqueta de verificación mostrada en la tarjeta
    search        Palabras clave extra para el buscador
    tags          Causas por las que puede filtrarse (CAUSE.*)

  Fotografías ilustrativas (Unsplash), salvo que una ficha indique lo contrario.
   ========================================================================== */
(() => {
  'use strict';

  /* ------------------------------------------------------------------------
    1. Constantes reutilizables
     ------------------------------------------------------------------------ */
  const ZONE = {
    ABURRA: 'Valle de Aburrá',
    ORIENTE: 'Oriente Antioqueño'
  };

  const CAUSE = {
    CHILDHOOD: 'Infancia y juventud',
    ELDERLY: 'Adultos mayores',
    EDUCATION: 'Educación',
    FOOD: 'Alimentación y seguridad alimentaria',
    INCLUSION: 'Inclusión y discapacidad',
    HEALTH: 'Salud y bienestar',
    COMMUNITY: 'Desarrollo comunitario',
    ANIMALS: 'Protección animal'
  };

  const REVIEW_DATE = '2026-10-15';        // Actualiza al revisar las fuentes
  const LABEL_INSTITUTIONAL = 'Fuente institucional';

  /* ------------------------------------------------------------------------
      2. Helpers
     ------------------------------------------------------------------------ */
  /** Crea una referencia a una fuente consultada. */
  const source = (label, url) => ({ label, url });

  /** Construye la URL de una fotografía de Unsplash a partir de su identificador. */
  const photo = id =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

  /* ------------------------------------------------------------------------
      3. Organizaciones
     ------------------------------------------------------------------------ */
  window.ORGANIZATIONS = [
    {
      id: 'fan',
      name: 'Fundación de Atención a la Niñez (FAN)',
      municipality: 'Medellín',
      zone: ZONE.ABURRA,
      category: CAUSE.CHILDHOOD,
      icon: 'bi-balloon-heart',
      summary: 'Promueve el desarrollo integral de niñas y niños mediante experiencias pedagógicas, nutricionales y psicosociales; acompaña también procesos de bienestar emocional.',
      population: 'Niñas, niños, adolescentes y familias.',
      mission: 'FAN desarrolla educación inicial, acompañamiento familiar y atención psicosocial. Su modelo Jugar para Sanar acompaña a personas que han vivido violencia y afectaciones emocionales.',
      address: 'Calle 43B #81-51, Medellín',
      phone: '+57 604 448 0288',
      whatsapp: '573103385698',
      website: 'https://fan.org.co/que-hacemos/',
      contact: 'https://fan.org.co/',
      donation: 'https://fan.org.co/',
      image: photo('photo-1503454537195-1dcabb73ffb9'),
      imageAlt: 'Niña jugando al aire libre; imagen ilustrativa de infancia',
      sources: [
        source('Qué hacemos — FAN', 'https://fan.org.co/que-hacemos/'),
        source('Federación Antioqueña de ONG — ficha FAN', 'https://faong.org/federadas/')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'educación primera infancia pedagogía nutrición bienestar emocional atención psicosocial',
      tags: [CAUSE.CHILDHOOD, CAUSE.EDUCATION, CAUSE.HEALTH]
    },
    {
      id: 'integrar',
      name: 'Fundación Integrar',
      municipality: 'Medellín',
      zone: ZONE.ABURRA,
      category: CAUSE.INCLUSION,
      icon: 'bi-universal-access',
      summary: 'Acompaña el desarrollo, la inclusión y el bienestar de personas con autismo, discapacidad intelectual y otras necesidades del desarrollo.',
      population: 'Personas con necesidades en su desarrollo y sus familias.',
      mission: 'Ofrece intervención temprana, habilitación, apoyo a la inclusión, formación y espacios para el bienestar y la participación de las personas y sus familias.',
      address: 'Carrera 66B #32-28, Belén–Malibú, Medellín',
      phone: '+57 604 265 7517',
      whatsapp: '',
      website: 'https://www.fundacionintegrar.org/',
      contact: 'https://www.fundacionintegrar.org/contactenos/',
      donation: '',
      image: photo('photo-1516627145497-ae6968895b74'),
      imageAlt: 'Niño acompañado durante una actividad; imagen ilustrativa',
      sources: [
        source('Contacto — Fundación Integrar', 'https://www.fundacionintegrar.org/contactenos/'),
        source('Nuestro equipo — Fundación Integrar', 'https://www.fundacionintegrar.org/nuestro-equipo/')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'autismo discapacidad cognitiva déficit de atención intervención temprana inclusión bienestar',
      tags: [CAUSE.INCLUSION, CAUSE.CHILDHOOD, CAUSE.HEALTH]
    },
    {
      id: 'golondrinas',
      name: 'Fundación Las Golondrinas',
      municipality: 'Medellín',
      zone: ZONE.ABURRA,
      category: CAUSE.CHILDHOOD,
      icon: 'bi-book-half',
      summary: 'Organización social con programas de desarrollo y oportunidades para niñas, niños y familias en contextos vulnerables.',
      population: 'Niñas, niños, jóvenes y familias.',
      mission: 'La fundación trabaja por el desarrollo integral de comunidades y ofrece oportunidades educativas y sociales. Publica canales para donaciones, voluntariado y aportes en especie.',
      address: 'Calle 57 #7-97, Medellín',
      phone: '+57 604 560 9350',
      whatsapp: '',
      website: 'https://www.fundacionlasgolondrinas.org/',
      contact: 'https://www.fundacionlasgolondrinas.org/donaciones',
      donation: 'https://www.fundacionlasgolondrinas.org/donaciones',
      image: photo('photo-1497486751825-1233686d5d80'),
      imageAlt: 'Grupo de estudiantes en un espacio de aprendizaje; imagen ilustrativa',
      sources: [
        source('Donaciones y contacto — Las Golondrinas', 'https://www.fundacionlasgolondrinas.org/donaciones')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'educación desarrollo social familias infancia voluntariado donaciones en especie',
      tags: [CAUSE.CHILDHOOD, CAUSE.EDUCATION, CAUSE.COMMUNITY]
    },
    {
      id: 'banco-alimentos',
      name: 'Fundación Banco Arquidiocesano de Alimentos de Medellín',
      municipality: 'Medellín',
      zone: ZONE.ABURRA,
      category: CAUSE.FOOD,
      icon: 'bi-basket2-heart',
      summary: 'Conecta excedentes y aportes del sector alimentario con iniciativas que atienden a personas en situación de vulnerabilidad.',
      population: 'Personas y familias en situación de inseguridad alimentaria, a través de entidades vinculadas.',
      mission: 'Trabaja para recuperar y distribuir alimentos y promover la seguridad alimentaria. Su sitio oficial publica sus programas, ubicación y canales para donar.',
      address: 'Carrera 52 #30A-97, Medellín',
      phone: '+57 604 448 3888',
      whatsapp: '',
      website: 'https://bancodealimentos.co/site/',
      contact: 'https://bancodealimentos.co/site/',
      donation: 'https://bancodealimentos.co/site/',
      image: photo('photo-1593113598332-cd288d649433'),
      imageAlt: 'Alimentos frescos organizados para distribución; imagen ilustrativa',
      sources: [
        source('Sitio oficial — Banco de Alimentos Medellín', 'https://bancodealimentos.co/site/'),
        source('Telealimentón 2025 — Arquidiócesis de Medellín', 'https://arqmedellin.co/noticias/telealimenton-2025/')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'hambre nutrición alimentos excedentes solidaridad seguridad alimentaria familias',
      tags: [CAUSE.FOOD, CAUSE.COMMUNITY]
    },
    {
      id: 'carla-cristina',
      name: 'Fundación Educadora Infantil Carla Cristina',
      municipality: 'Medellín',
      zone: ZONE.ABURRA,
      category: CAUSE.CHILDHOOD,
      icon: 'bi-balloon-heart',
      summary: 'Cuida a niñas y niños en primera infancia, acompaña a sus familias y forma cuidadores con un modelo profesional y cercano.',
      population: 'Niñas y niños en primera infancia, familias y cuidadores.',
      mission: 'Su misión es potenciar el desarrollo integral infantil mediante cuidado, acompañamiento familiar y formación de cuidadores. La web institucional presenta opciones para vincularse como Amigos Carla Cristina.',
      address: 'Carrera 42 #46-58, Medellín',
      phone: '+57 317 510 6623',
      whatsapp: '',
      website: 'https://carlacristina.org/',
      contact: 'https://carlacristina.org/',
      donation: 'https://carlacristina.org/',
      image: photo('photo-1476231682828-37e571bc172f'),
      imageAlt: 'Cuidadora acompañando a una niña en actividad; imagen ilustrativa',
      sources: [
        source('Sitio oficial — Fundación Carla Cristina', 'https://carlacristina.org/'),
        source('Nosotros — Fundación Carla Cristina', 'https://carlacristina.org/nosotros/')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'primera infancia educación cuidado nutrición familias desarrollo infantil',
      tags: [CAUSE.CHILDHOOD, CAUSE.EDUCATION, CAUSE.HEALTH]
    },
    {
      id: 'gente-unida',
      name: 'Fundación Gente Unida',
      municipality: 'Medellín',
      zone: ZONE.ABURRA,
      category: CAUSE.COMMUNITY,
      icon: 'bi-people',
      summary: 'Impulsa oportunidades para niñas, niños y jóvenes; en su sitio invita a participar como voluntario, padrino o donante.',
      population: 'Niñas, niños y jóvenes.',
      mission: 'La Fundación Gente Unida publica programas, oportunidades de participación y canales de contacto desde su sitio oficial.',
      address: 'Carrera 89A #27-25, Belén–Villa Café, Medellín',
      phone: '+57 301 763 4428',
      whatsapp: '',
      website: 'https://genteunida.org.co/',
      contact: 'https://genteunida.org.co/',
      donation: 'https://genteunida.org.co/',
      image: photo('photo-1529390079861-591de354faf5'),
      imageAlt: 'Jóvenes compartiendo en una actividad grupal; imagen ilustrativa',
      sources: [
        source('Sitio oficial — Fundación Gente Unida', 'https://genteunida.org.co/')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'juventud infancia voluntariado padrinos donantes educación comunidad',
      tags: [CAUSE.CHILDHOOD, CAUSE.EDUCATION, CAUSE.COMMUNITY]
    },
    {
      id: 'cba-san-jose',
      name: 'Centro de Bienestar del Anciano San José',
      municipality: 'Marinilla',
      zone: ZONE.ORIENTE,
      category: CAUSE.ELDERLY,
      icon: 'bi-person-hearts',
      summary: 'Organización sin ánimo de lucro dedicada al cuidado integral, la dignidad y el bienestar de personas mayores.',
      population: 'Personas mayores, con prioridad en situaciones de vulnerabilidad.',
      mission: 'Busca mejorar la calidad de vida de las personas mayores mediante cuidado físico y mental, actividades sociales y ocupacionales.',
      address: 'Marinilla, Antioquia. Consulta la ubicación y atención directamente en el sitio oficial.',
      phone: '',
      whatsapp: '',
      website: 'https://cbasanjosemarinilla.com/',
      contact: 'https://cbasanjosemarinilla.com/',
      donation: '',
      image: photo('photo-1544005313-94ddf0286df2'),
      imageAlt: 'Persona mayor sonriendo; imagen ilustrativa',
      sources: [
        source('Sitio oficial — CBA San José Marinilla', 'https://cbasanjosemarinilla.com/')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'adulto mayor ancianos bienestar cuidado dignidad salud marinilla',
      tags: [CAUSE.ELDERLY, CAUSE.HEALTH]
    },
    {
      id: 'fusoan',
      name: 'Fundación Solidaria Oriente Antioqueño (FUSOAN)',
      municipality: 'Rionegro',
      zone: ZONE.ORIENTE,
      category: CAUSE.COMMUNITY,
      icon: 'bi-diagram-3',
      summary: 'Promueve la economía social y solidaria en el Oriente Antioqueño mediante cooperación, educación, asesoría y articulación regional.',
      population: 'Cooperativas, organizaciones y comunidades del Oriente Antioqueño.',
      mission: 'FUSOAN fortalece capacidades y competencias de organizaciones y comunidades, promueve el sector solidario y apoya procesos de formación e investigación social y económica.',
      address: 'Calle 49 #50-59, Centro Comercial Ganadero, oficina 407, Rionegro',
      phone: '+57 604 615 2036',
      whatsapp: '',
      website: 'https://fusoan.org.co/',
      contact: 'https://fusoan.org.co/',
      donation: '',
      image: photo('photo-1529156069898-49953e39b3ac'),
      imageAlt: 'Personas conversando en un encuentro comunitario; imagen ilustrativa',
      sources: [
        source('Sitio oficial — FUSOAN', 'https://fusoan.org.co/')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'economía social solidaria cooperación educación organizaciones Rionegro desarrollo sostenible',
      tags: [CAUSE.COMMUNITY, CAUSE.EDUCATION]
    },
    {
      id: 'fnesa',
      name: 'Fundación Néstor Esteban Sanínt Arbeláez (FNESA)',
      municipality: 'Rionegro',
      zone: ZONE.ORIENTE,
      category: CAUSE.EDUCATION,
      icon: 'bi-mortarboard',
      summary: 'Promueve la educación de jóvenes rionegreros mediante estímulos educativos, capacitación y créditos para educación superior.',
      population: 'Niños y jóvenes nacidos o residentes en Rionegro.',
      mission: 'Entidad sin ánimo de lucro que fomenta la educación en Rionegro y apoya entidades con objeto educativo. Publica información sobre estímulos educativos, becas y líneas de crédito.',
      address: 'Carrera 51 #49-07, oficina 203, Rionegro',
      phone: '+57 604 561 1481',
      whatsapp: '',
      website: 'https://www.fnesa.org/page/',
      contact: 'https://www.fnesa.org/page/index.php/component/contact/contact/15-contacto/1',
      donation: '',
      image: photo('photo-1427504494785-3a9ca7044f45'),
      imageAlt: 'Estudiantes en un aula de clase; imagen ilustrativa',
      sources: [
        source('Quiénes somos — FNESA', 'https://fnesa.org/page/index.php/conocenos'),
        source('Contacto — FNESA', 'https://www.fnesa.org/page/index.php/component/contact/contact/15-contacto/1')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'educación jóvenes rionegreros becas estímulos créditos estudios superiores',
      tags: [CAUSE.EDUCATION, CAUSE.CHILDHOOD]
    },
    {
      id: 'compasion',
      name: 'Fundación Compasión',
      municipality: 'Medellín',
      zone: ZONE.ABURRA,
      category: CAUSE.COMMUNITY,
      icon: 'bi-house-heart',
      summary: 'Trabaja con familias campesinas en sectores del Oriente Antioqueño y otros territorios, enfocada en vivienda digna y bienestar integral.',
      population: 'Familias campesinas en situación de necesidad.',
      mission: 'La fundación declara que canaliza esfuerzos de responsabilidad social empresarial hacia hogares campesinos y sus necesidades de vivienda, alimentación, educación, salud y recreación.',
      address: 'Carrera 80A #33-28, Medellín',
      phone: '+57 604 448 9197',
      whatsapp: '573188222267',
      website: 'https://fundacioncompasion.org/',
      contact: 'https://fundacioncompasion.org/contactenos/',
      donation: 'https://fundacioncompasion.org/',
      image: photo('photo-1469571486292-0ba58a3f068b'),
      imageAlt: 'Personas reunidas en un espacio comunitario; imagen ilustrativa',
      sources: [
        source('Contáctenos — Fundación Compasión', 'https://fundacioncompasion.org/contactenos/'),
        source('Código de ética y misión — Fundación Compasión', 'https://fundacioncompasion.org/codigo-de-etica-compasion/')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'familias campesinas vivienda alimentación educación salud recreación oriente antioqueño',
      tags: [CAUSE.COMMUNITY, CAUSE.FOOD]
    },
    {
      id: 'otro-rumbo',
      name: 'Otro Rumbo Fundación',
      municipality: 'Marinilla',
      zone: ZONE.ORIENTE,
      category: CAUSE.HEALTH,
      icon: 'bi-heart-pulse',
      summary: 'Desarrolla procesos de salud integral y salud mental con personas y comunidades del Oriente Antioqueño.',
      population: 'Personas y comunidades del Oriente Antioqueño.',
      mission: 'La fundación ofrece procesos de acompañamiento relacionados con salud mental e integral, con atención publicada desde su sede de Marinilla.',
      address: 'Carrera 36 #24-10, barrio San Juan de Dios, Marinilla',
      phone: '+57 313 615 4077',
      whatsapp: '',
      website: 'https://www.otrorumbofundacion.com/',
      contact: 'https://www.otrorumbofundacion.com/contacto/',
      donation: '',
      image: photo('photo-1544027993-37dbfe43562a'),
      imageAlt: 'Personas conversando en un espacio tranquilo; imagen ilustrativa de bienestar',
      sources: [
        source('Contacto — Otro Rumbo Fundación', 'https://www.otrorumbofundacion.com/contacto/'),
        source('Informe de gestión — Otro Rumbo Fundación', 'https://otrorumbofundacion.com/wp-content/uploads/2025/07/Informe-de-Gestion-2025-ORF.pdf')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'salud mental bienestar integral Marinilla Oriente Antioqueño acompañamiento',
      tags: [CAUSE.HEALTH, CAUSE.COMMUNITY]
    },
    {
      id: 'vida-justicia-paz',
      name: 'Corporación Vida, Justicia y Paz del Oriente Antioqueño',
      municipality: 'Rionegro',
      zone: ZONE.ORIENTE,
      category: CAUSE.COMMUNITY,
      icon: 'bi-peace',
      summary: 'Promueve el desarrollo humano, el tejido social, la educación para la paz y el diálogo en el Oriente Antioqueño.',
      population: 'Personas, familias, comunidades e instituciones del Oriente Antioqueño.',
      mission: 'Trabaja en procesos orientados a fortalecer el tejido social, promover los derechos humanos, la participación comunitaria, el diálogo y la construcción de paz territorial.',
      address: 'Calle 51 #47-31, Rionegro',
      phone: '+57 604 531 7999',
      whatsapp: '',
      website: 'https://vidajusticiaypaz.org/',
      contact: 'https://vidajusticiaypaz.org/corporacion/',
      donation: '',
      image: photo('photo-1529156069898-49953e39b3ac'),
      imageAlt: 'Personas reunidas en diálogo comunitario; imagen ilustrativa',
      sources: [
        source('La Corporación — Vida, Justicia y Paz', 'https://vidajusticiaypaz.org/corporacion/'),
        source('Pastoral Social — Vida, Justicia y Paz', 'https://www.pasocial.org/nuestras-delegaciones/vida-justicia-y-paz')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'paz justicia vida tejido social derechos humanos diálogo participación comunidad Rionegro',
      tags: [CAUSE.COMMUNITY]
    },
    {
      id: 'hablemos-por-ellos',
      name: 'Fundación Hablemos por Ellos',
      municipality: 'Rionegro',
      zone: ZONE.ORIENTE,
      category: CAUSE.ANIMALS,
      icon: 'bi-paw',
      summary: 'Rescata, rehabilita y reubica animales; su sitio institucional publica canales de contacto y participación.',
      population: 'Animales rescatados, incluidas especies vulnerables.',
      mission: 'La fundación facilita la rehabilitación de animales que han sufrido maltrato y busca que recuperen confianza y bienestar antes de su reubicación.',
      address: 'Rionegro, Antioquia. La ubicación detallada se consulta directamente con la fundación.',
      phone: '+57 323 455 5690',
      whatsapp: '573234555690',
      website: 'https://www.fundacionhablemosporellos.org/',
      contact: 'https://www.fundacionhablemosporellos.org/',
      donation: '',
      image: photo('photo-1450778869180-41d0601e046e'),
      imageAlt: 'Perro acompañado por una persona; imagen ilustrativa de protección animal',
      sources: [
        source('Sitio oficial — Fundación Hablemos por Ellos', 'https://www.fundacionhablemosporellos.org/'),
        source('Quiénes somos — Fundación Hablemos por Ellos', 'https://www.fundacionhablemosporellos.com/quienes-somos')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'animales rescate rehabilitación reubicación bienestar animal Rionegro',
      tags: [CAUSE.ANIMALS]
    },
    {
      id: 'funitser',
      name: 'Fundación Integral para el Ser (FUNITSER)',
      municipality: 'Medellín',
      zone: ZONE.ABURRA,
      category: CAUSE.ELDERLY,
      icon: 'bi-person-hearts',
      summary: 'Brinda cuidado integral, alojamiento, alimentación, salud y actividades para que las personas mayores vivan con dignidad.',
      population: 'Personas adultas mayores.',
      mission: 'FUNITSER declara que ofrece techo, vestuario, recreación y alimentación, procurando un entorno seguro y de cuidado para sus residentes.',
      address: 'Carrera 52 #44-04, oficina 206, Medellín',
      phone: '+57 313 458 2737',
      whatsapp: '',
      website: 'https://funitser.org/',
      contact: 'https://funitser.org/',
      donation: 'https://funitser.org/',
      image: photo('photo-1544005313-94ddf0286df2'),
      imageAlt: 'Persona mayor sonriendo; imagen ilustrativa',
      sources: [
        source('Sitio oficial — FUNITSER', 'https://funitser.org/')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'adulto mayor dignidad cuidado alojamiento alimentación salud bienestar Medellín',
      tags: [CAUSE.ELDERLY, CAUSE.HEALTH]
    },
    {
      id: 'hogar-desvalido',
      name: 'Fundación Hogar del Desvalido',
      municipality: 'La Estrella',
      zone: ZONE.ABURRA,
      category: CAUSE.INCLUSION,
      icon: 'bi-universal-access',
      summary: 'Ofrece atención integral a personas en situación de abandono y a personas con discapacidad física o mental.',
      population: 'Personas desamparadas y con discapacidad.',
      mission: 'La Fundación brinda cuidado y acompañamiento a personas que han quedado sin red de apoyo y requieren atención integral.',
      address: 'Carrera 55 #79 Sur-15, sector San Agustín, La Estrella',
      phone: '+57 604 557 4838',
      whatsapp: '573228861466',
      website: 'https://hogardeldesvalidocolombia.org/',
      contact: 'https://hogardeldesvalidocolombia.org/',
      donation: 'https://hogardeldesvalidocolombia.org/',
      image: photo('photo-1576765608535-5f04d1e3f289'),
      imageAlt: 'Persona mayor acompañada; imagen ilustrativa de cuidado',
      sources: [
        source('Sitio oficial — Hogar del Desvalido', 'https://hogardeldesvalidocolombia.org/')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'adultos mayores discapacidad abandono vulnerabilidad cuidado La Estrella',
      tags: [CAUSE.INCLUSION, CAUSE.ELDERLY]
    },
    {
      id: 'betania',
      name: 'Fundación Betania Integral Colombia',
      municipality: 'Medellín',
      zone: ZONE.ABURRA,
      category: CAUSE.COMMUNITY,
      icon: 'bi-house-heart',
      summary: 'Promueve la restauración integral de familias de su comunidad con acciones espirituales, educativas y sociales.',
      population: 'Niñas, niños, jóvenes, personas mayores y familias de su comunidad.',
      mission: 'Fundación Betania se describe como una casa de restauración integral para familias; desarrolla acompañamiento comunitario, refuerzo escolar y un comedor comunitario.',
      address: 'Medellín, Colombia. Consulta la ubicación exacta con la organización.',
      phone: '',
      whatsapp: '573242062332',
      website: 'https://fundacionbetania.co/',
      contact: 'https://fundacionbetania.co/',
      donation: 'https://fundacionbetania.co/',
      image: photo('photo-1488521787991-ed7bbaae773c'),
      imageAlt: 'Niños participando en una actividad educativa; imagen ilustrativa',
      sources: [
        source('Sitio oficial — Fundación Betania', 'https://fundacionbetania.co/')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'familias comunidad comedor alimentación refuerzo escolar infancia formación Medellín',
      tags: [CAUSE.COMMUNITY, CAUSE.CHILDHOOD, CAUSE.EDUCATION, CAUSE.FOOD]
    },
    {
      id: 'ximena-rico',
      name: 'Fundación Ximena Rico Llano',
      municipality: 'Medellín',
      zone: ZONE.ABURRA,
      category: CAUSE.CHILDHOOD,
      icon: 'bi-balloon-heart',
      summary: 'Desarrolla proyectos sociales para niñas, niños y familias con acciones de educación, nutrición, salud y acompañamiento.',
      population: 'Niñas, niños y familias en situación de vulnerabilidad.',
      mission: 'La Fundación trabaja por el bienestar y desarrollo integral de la niñez y sus familias. Su sitio oficial publica programas, contacto y opciones de participación.',
      address: 'Calle 47 #36A-96, Medellín',
      phone: '+57 604 216 1815',
      whatsapp: '',
      website: 'https://ximenarico.org/',
      contact: 'https://ximenarico.org/',
      donation: 'https://ximenarico.org/',
      image: photo('photo-1503919005314-30d93d07d823'),
      imageAlt: 'Niños participando en una actividad al aire libre; imagen ilustrativa',
      sources: [
        source('Sitio oficial — Fundación Ximena Rico Llano', 'https://ximenarico.org/'),
        source('Nosotros — Fundación Ximena Rico Llano', 'https://ximenarico.org/nosotros/')
      ],
      verified: REVIEW_DATE,
      verifiedLabel: LABEL_INSTITUTIONAL,
      search: 'infancia niñez educación nutrición salud desarrollo integral familias Medellín',
      tags: [CAUSE.CHILDHOOD, CAUSE.EDUCATION, CAUSE.HEALTH]
    }
  ];

  /* ------------------------------------------------------------------------
    4. Categorías de causas (filtros del directorio y mosaicos de #causas)
        tone → clase CSS de color definida en css/styles.css
     ------------------------------------------------------------------------ */
  window.CAUSE_CATEGORIES = [
    { name: CAUSE.CHILDHOOD,  icon: 'bi-balloon-heart',   tone: 'peach' },
    { name: CAUSE.ELDERLY,    icon: 'bi-person-hearts',   tone: 'lilac' },
    { name: CAUSE.EDUCATION,  icon: 'bi-book-half',       tone: 'blue' },
    { name: CAUSE.FOOD,       icon: 'bi-basket2-heart',   tone: 'yellow' },
    { name: CAUSE.INCLUSION,  icon: 'bi-universal-access', tone: 'mint' },
    { name: CAUSE.HEALTH,     icon: 'bi-heart-pulse',     tone: 'rose' },
    { name: CAUSE.COMMUNITY,  icon: 'bi-people',          tone: 'green' },
    { name: CAUSE.ANIMALS,    icon: 'bi-paw',             tone: 'peach' }
  ];
})();