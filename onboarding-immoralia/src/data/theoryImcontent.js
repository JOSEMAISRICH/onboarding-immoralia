/**
 * Teoria interna Imcontent: roles del area de contenido.
 * Contenido orientativo; la version oficial la marca People / el area.
 */

/** @typedef {{ titulo: string, items: string[] }} BloqueResp */

/**
 * @typedef {{
 *   id: string
 *   title: string
 *   reportaA: string
 *   colaboraCon: string
 *   lideraA?: string
 *   contextoExtra?: string
 *   resumen: string
 *   responsabilidades: BloqueResp[]
 *   noResponsabilidades?: string[]
 *   kpis: Array<{ nombre: string, formula?: string, meta: string, nota?: string }>
 * }} ImcontentRole
 */

/** @type {ImcontentRole} */
export const imcontentHead = {
  id: 'head',
  title: 'Head de imcontent',
  reportaA: 'CEO',
  colaboraCon:
    'Heads de otras areas (immedia, imseo, imloyal, immoralia, etc.).',
  lideraA:
    'Coordinador/a de Influencers, UGC creators (internos o externos), equipo de diseno, video, copy y social, segun organigrama vigente.',
  resumen:
    'El Head de imcontent es el responsable maximo de liderar, desarrollar y evolucionar todas las iniciativas relacionadas con la creacion de contenido visual, escrito, audiovisual y social tanto para clientes como para la marca immoral. Su mision es asegurar que el contenido no solo tenga calidad y coherencia creativa, sino que construya marca, conecte con audiencias y este alineado con los objetivos de negocio, integrando creatividad, storytelling, innovacion y resultados. Este rol requiere liderazgo creativo, vision estrategica, orientacion a performance y gestion de equipos diversos.',
  responsabilidades: [
    {
      titulo: 'Direccion estrategica del area de contenido',
      items: [
        'Definir y evolucionar la vision creativa del area, asegurando consistencia y calidad en todos los formatos.',
        'Garantizar que cada pieza o campana de contenido este alineada con la marca, el tono, los objetivos del cliente o de Immoral.',
        'Liderar la integracion de nuevas formas de contenido (IA generativa, motion, UGC, podcast, live, etc.).',
        'Asegurar que la creatividad este al servicio del rendimiento (engagement, CTR, view-through rate, conversiones, etc.).',
      ],
    },
    {
      titulo: 'Gestion estrategica de RRSS y marca',
      items: [
        'Disenar y supervisar la estrategia de redes sociales para Immoral y clientes asignados.',
        'Coordinar la planificacion, ejecucion y seguimiento del calendario de contenido.',
        'Supervisar el tono, estilo, interaccion y crecimiento de comunidad.',
        'Asegurar que las redes reflejen correctamente los valores y objetivos de cada marca.',
      ],
    },
    {
      titulo: 'Gestion de Influencers y UGC',
      items: [
        'Supervisar las estrategias de colaboracion con influencers o creadores (tanto para clientes como para Immoral).',
        'Validar propuestas de perfiles, ideas de campanas y entregables.',
        'Coordinar que el equipo gestione bien los tiempos, negociaciones, contratos y entregas.',
        'Asegurar que el contenido generado por terceros este alineado con la estrategia general.',
      ],
    },
    {
      titulo: 'Relacion con clientes y resultados',
      items: [
        'Ser el referente del area de contenido frente a los clientes, en cuentas asignadas.',
        'Presentar estrategias de contenido, campanas creativas, resultados y aprendizajes.',
        'Asegurar que los clientes reciban contenido relevante, con foco en objetivos y en la evolucion de su marca.',
        'Colaborar con el equipo comercial (CSO y Account Managers) para detectar oportunidades de venta o mejoras de servicio.',
      ],
    },
    {
      titulo: 'Liderazgo del equipo multidisciplinar',
      items: [
        'Coordinar al equipo de disenadores, videografos, copywriters, social media managers, etc.',
        'Garantizar que las tareas se ejecuten en tiempo, forma y con calidad.',
        'Definir prioridades, asignar tareas, establecer flujos de trabajo claros.',
        'Formar al equipo en buenas practicas, nuevas herramientas y tendencias creativas.',
        'Asegurar una cultura de documentacion, autonomia, feedback y mejora continua.',
      ],
    },
    {
      titulo: 'Procesos, herramientas y eficiencia',
      items: [
        'Establecer y optimizar procesos de diseno, aprobacion, revision, publicacion y reporting.',
        'Asegurar que se utilizan correctamente las herramientas del area.',
        'Coordinar con el area de automatizacion/IA para aplicar eficiencia y escalabilidad en el area (creacion con IA, edicion automatica, etc.).',
        'Mantener estandares de entrega en todas las piezas (naming, formatos, tiempos, calidad).',
      ],
    },
    {
      titulo: 'Participacion en New Business',
      items: [
        'Apoyar en la construccion de estrategias para nuevos clientes en conjunto con el Account Manager y el CSO.',
        'Validar que las propuestas de content sean coherentes con las capacidades internas.',
        'Validar que las estimaciones de tiempos de las propuestas de content sean coherentes con las capacidades internas.',
        'Participar en reuniones o presentaciones cuando el potencial cliente requiere explicacion tecnica o estrategica.',
      ],
    },
  ],
  noResponsabilidades: [
    'No ejecuta tareas de diseno, redaccion, edicion o publicacion diaria.',
    'No define precios de propuestas sin validacion del CSO y CFO.',
    'No realiza tareas comerciales salvo colaboracion tecnica o creativa.',
  ],
  kpis: [
    {
      nombre: 'Porcentaje de entregas del area de contenido en tiempo y forma',
      formula: '(Entregas sin retrasos ni errores / Total entregas planificadas)',
      meta: '≥ 95%',
    },
    {
      nombre: 'Rentabilidad promedio de imcontent',
      formula: '(Ingresos del area – Costes del equipo y herramientas) / Ingresos del area',
      meta: '≥ 80% (meta sugerida)',
    },
  ],
}

/** @type {ImcontentRole} */
export const imcontentDisenadorSenior = {
  id: 'disenador-senior',
  title: 'Disenador/a Senior',
  reportaA: 'Head de imcontent',
  colaboraCon:
    'Copy, video, social media, paid media y otras areas segun proyecto (texto oficial en People si difiere).',
  contextoExtra:
    'No lidera personas directamente, pero si colabora en la coordinacion visual de campanas y proyectos.',
  resumen:
    'El Disenador/a Senior es una figura operativa con enfoque creativo, tecnico y estrategico, responsable de ejecutar disenos de alto impacto visual, aportar direccion creativa dentro de los proyectos, mantener la coherencia de marca y elevar el nivel estetico de cada pieza entregada. Este perfil tiene la capacidad de crear, proponer y ejecutar piezas visuales que conectan con la audiencia, cumplen objetivos de marketing y reflejan la calidad de Immoral. Aporta experiencia, criterio visual y capacidad para hacer que las ideas cobren vida.',
  responsabilidades: [
    {
      titulo: 'Diseno grafico para campanas y redes sociales',
      items: [
        'Disenar piezas visuales para campanas de marketing digital, emailings, landing pages, anuncios pagados, contenido para redes sociales, reels, historias, portadas, etc.',
        'Adaptar visuales a multiples formatos y canales (Meta, TikTok, IG, YouTube, newsletters, etc.).',
        'Asegurar calidad tecnica y visual en todas las entregas (tamano, legibilidad, resolucion, consistencia).',
      ],
    },
    {
      titulo: 'Propuesta y desarrollo de conceptos creativos',
      items: [
        'Participar en la conceptualizacion visual de campanas junto al head del area o el Social Media Manager.',
        'Aportar ideas visuales innovadoras, referencias o soluciones creativas segun objetivos del cliente o de Immoral.',
        'Traducir briefs estrategicos en disenos con storytelling visual coherente y potente.',
      ],
    },
    {
      titulo: 'Coherencia de marca y lineamientos visuales',
      items: [
        'Garantizar que todo el diseno respete la identidad visual de cada cliente o proyecto.',
        'Mantener y proponer mejoras en los brandbooks, guias visuales, plantillas y estructuras.',
        'Asegurar la consistencia visual entre distintos formatos, plataformas y canales.',
      ],
    },
    {
      titulo: 'Investigacion, referencias y mejora continua',
      items: [
        'Investigar tendencias visuales, esteticas, motion graphics y estilos emergentes en diseno digital.',
        'Aplicar referencias actuales y frescas sin perder la identidad y objetivos de cada marca.',
        'Proponer ajustes o evoluciones esteticas en funcion de la performance de las piezas (CTR, engagement, shares, etc.).',
      ],
    },
    {
      titulo: 'Colaboracion interdepartamental y feedback',
      items: [
        'Trabajar mano a mano con Copywriters, Content Managers, Paid Media, Social Media o CRM para integrar contenido visual con narrativa y objetivos.',
        'Recibir feedback del head del area, del equipo o de otras areas para iterar sobre piezas y campanas.',
        'Proporcionar feedback visual a otros disenadores (cuando aplique) con foco en mejora de calidad y consistencia.',
      ],
    },
    {
      titulo: 'Documentacion y organizacion',
      items: [
        'Documentar entregas y assets correctamente en las carpetas compartidas, Notion o ClickUp.',
        'Asegurar orden y claridad en archivos editables, tipografias, assets visuales y estructuras.',
        'Respetar flujos de trabajo, fechas de entrega y procesos definidos por el equipo.',
      ],
    },
  ],
  noResponsabilidades: [
    'No lidera ni evalua al equipo de diseno (lo hace el head del area).',
    'No aprueba presupuestos ni toma decisiones estrategicas de servicio.',
    'No tiene contacto directo con el cliente, salvo que se le invite a una revision puntual.',
    'No gestiona redes sociales ni realiza tareas de publicacion.',
  ],
  kpis: [
    {
      nombre: 'Porcentaje de entregas en tiempo segun planificacion',
      formula: '(Entregas a tiempo / Total de entregas planificadas)',
      meta: '≥ 95%',
    },
    {
      nombre: 'Tasa de aprobacion de primeras versiones (a cliente; aclarar internamente)',
      formula: '(Piezas aprobadas en primera entrega / Total de piezas entregadas)',
      meta: '≥ 85%',
    },
    {
      nombre: 'Tasa de aprobacion de primeras versiones internas',
      formula: '(Piezas aprobadas en primera entrega / Total de piezas entregadas)',
      meta: '≥ 70%',
      nota: 'Ambito interno (no cliente).',
    },
  ],
}

/** @type {ImcontentRole} */
export const imcontentDisenadorVideo = {
  id: 'disenador-video',
  title: 'Disenador/a de Video y Motion Design',
  reportaA: 'Head de imcontent',
  colaboraCon: 'Diseno, copy, social media y otras areas segun proyecto.',
  resumen:
    'El Disenador/a de Video y Motion Design es responsable de dar vida a las ideas visuales mediante contenido dinamico, atractivo y estrategico, que conecte con audiencias y potencie los resultados de las marcas. Su rol es crear piezas audiovisuales de alto impacto (anuncios, reels, animaciones, videos narrativos o contenido UGC editado) que combinen creatividad, ritmo, edicion limpia y storytelling visual.',
  responsabilidades: [
    {
      titulo: 'Produccion y edicion de contenido audiovisual',
      items: [
        'Disenar y editar piezas de video para campanas organicas y pagadas (reels, stories, YouTube shorts, ads, videos de producto, testimoniales, etc.).',
        'Aplicar edicion agil, uso estrategico de tipografias, subtitulos, sonido, efectos visuales y animaciones para mejorar la narrativa y la atencion.',
        'Adaptar los videos a los distintos formatos y plataformas segun especificaciones tecnicas (aspect ratio, duracion, subtitulos, etc.).',
      ],
    },
    {
      titulo: 'Diseno de Motion Graphics',
      items: [
        'Crear animaciones graficas para anuncios, intros/outros, pantallas explicativas, transiciones y otros recursos visuales.',
        'Aplicar animacion 2D para branding, contenido de marca y campanas.',
        'Integrar motion graphics en piezas de contenido para aumentar su impacto.',
      ],
    },
    {
      titulo: 'Conceptualizacion creativa y storytelling visual',
      items: [
        'Participar en el desarrollo de ideas junto al head del area, disenadores y social media managers.',
        'Traducir guiones, ideas o conceptos estrategicos en piezas visuales efectivas, claras y atractivas.',
        'Aportar referencias, tendencias o ideas nuevas en formatos de video, ritmo, estilo o edicion.',
      ],
    },
    {
      titulo: 'Postproduccion y ajustes tecnicos',
      items: [
        'Realizar correccion de color, ajustes de audio, efectos visuales y exportaciones optimas.',
        'Asegurar que los archivos entregados esten en el formato adecuado para cada plataforma.',
        'Optimizar peso, calidad y visualizacion para garantizar un buen rendimiento.',
      ],
    },
    {
      titulo: 'Optimizacion orientada a performance',
      items: [
        'Colaborar con Paid Media, Social Media o CRM para adaptar el contenido segun objetivos (CTR, visualizacion, retencion, interaccion, etc.).',
        'Testear formatos, hooks visuales, estilos de edicion o duraciones que impacten mejor en el rendimiento.',
        'Aprender del rendimiento de las piezas para mejorar versiones futuras.',
      ],
    },
    {
      titulo: 'Documentacion y orden',
      items: [
        'Guardar correctamente archivos editables, versiones finales y material crudo.',
        'Nombrar y versionar archivos con logica para facilitar el trabajo del equipo.',
        'Documentar referencias, procesos y flujos de trabajo (si aplica) con claridad.',
      ],
    },
    {
      titulo: 'Investigacion, referencias y mejora continua',
      items: [
        'Investigar tendencias visuales, esteticas, motion graphics y estilos emergentes en diseno digital.',
        'Aplicar referencias actuales y frescas sin perder la identidad y objetivos de cada marca.',
        'Proponer ajustes o evoluciones esteticas en funcion de la performance de las piezas (CTR, engagement, shares, etc.).',
      ],
    },
  ],
  noResponsabilidades: [
    'No lidera equipo ni gestiona personas.',
    'No define la estrategia global de contenido.',
    'No gestiona cuentas de cliente ni tiene relacion directa con ellos (salvo proyectos especiales).',
    'No se encarga de copywriting (aunque colabora con quienes si lo hacen).',
  ],
  kpis: [
    {
      nombre: 'Porcentaje de entregas audiovisuales en tiempo',
      formula: '(Entregas a tiempo / Total entregas planificadas)',
      meta: '≥ 95%',
    },
    {
      nombre: 'Tasa de aprobacion de primera version de video (a cliente; aclarar internamente)',
      formula: '(Videos aprobados sin correccion / Total entregas)',
      meta: '≥ 80%',
    },
    {
      nombre: 'Tasa de aprobacion de primeras versiones internas',
      formula: '(Piezas aprobadas en primera entrega / Total de piezas entregadas)',
      meta: '≥ 70%',
      nota: 'Ambito interno (no cliente).',
    },
  ],
}

/** @type {ImcontentRole} */
export const imcontentCommunityManager = {
  id: 'content-creator-community',
  title: 'Content Creator & Community Manager',
  reportaA: 'Head de imcontent',
  colaboraCon: 'Diseno, copy, video, influencers/UGC y otras areas segun proyecto.',
  contextoExtra:
    'Puede tener contacto con cliente (en marcas asignadas o revisiones de contenido), siempre coordinado por el head del area.',
  resumen:
    'El Content Creator & Community Manager es responsable de planificar, coordinar, ejecutar y supervisar el contenido organico y la actividad en redes sociales de Immoral y/o de las marcas asignadas. Su mision es asegurarse de que el contenido comunique correctamente la identidad de marca, conecte con la audiencia y se alinee con los objetivos de comunicacion y marketing de cada proyecto. Este perfil es el nexo entre la estrategia de contenido, la produccion creativa y la gestion de la comunidad, con un enfoque practico, estetico, proactivo y social.',
  responsabilidades: [
    {
      titulo: 'Planificacion y estrategia de contenido',
      items: [
        'Disenar la estrategia de contenido para redes sociales segun los objetivos y tono de cada marca.',
        'Desarrollar y mantener actualizado el calendario editorial mensual (organico y campanas).',
        'Coordinar que tipo de contenido se publica, en que formato y en que canal.',
        'Adaptar las tematicas de contenido a eventos, campanas, promociones o insights de la comunidad.',
      ],
    },
    {
      titulo: 'Briefing y coordinacion de piezas creativas',
      items: [
        'Redactar briefs claros y detallados para disenadores, copywriters y editores de video.',
        'Coordinar la produccion del contenido visual, asegurando coherencia con la estrategia.',
        'Verificar que las piezas cumplan con los lineamientos de marca, tono y formato requerido.',
        'Adaptar el contenido a cada red (Instagram, TikTok, LinkedIn, X, YouTube Shorts, etc.).',
      ],
    },
    {
      titulo: 'Gestion operativa de redes sociales',
      items: [
        'Programar y/o publicar el contenido en las plataformas definidas.',
        'Asegurar que cada post este correctamente subido con caption, hashtags, ubicacion, etiquetado y formato.',
        'Gestionar el dia a dia de las cuentas: responder comentarios, mensajes y mantener una comunidad activa.',
      ],
    },
    {
      titulo: 'Community building y moderacion',
      items: [
        'Fomentar conversaciones, interaccion y engagement en las redes.',
        'Detectar oportunidades de interaccion (reposts, menciones, UGC, colaboraciones).',
        'Identificar temas sensibles, comentarios criticos o insights relevantes de la comunidad.',
        'Colaborar con el equipo de Influencers/UGC cuando la comunidad genera contenido.',
      ],
    },
    {
      titulo: 'Analisis y mejora continua',
      items: [
        'Medir el rendimiento de cada cuenta, publicacion y campana (alcance, engagement, crecimiento, CTR, etc.).',
        'Identificar que tipo de contenido funciona mejor y por que.',
        'Proponer mejoras y ajustes en la estrategia de contenido basadas en datos.',
        'Preparar reportes internos para el head del area y los clientes si se requiere.',
      ],
    },
    {
      titulo: 'Tendencias y cultura digital',
      items: [
        'Estar al dia con tendencias en plataformas sociales, formatos, audios virales, challenges, etc.',
        'Proponer ideas creativas, nuevos enfoques o contenido experimental alineado con la estrategia de marca.',
        'Colaborar activamente en sesiones de brainstorming o campanas.',
      ],
    },
  ],
  noResponsabilidades: [
    'No disena ni edita videos directamente (pero si da input creativo y coordina).',
    'No define el presupuesto de campanas ni estrategia de paid media.',
    'No toma decisiones de posicionamiento estrategico sin validacion del head del area.',
  ],
  kpis: [
    {
      nombre: 'Porcentaje de publicaciones segun calendario',
      formula: '(Posts publicados en tiempo / Total posts planificados)',
      meta: '100%',
    },
    {
      nombre: 'Tasa de interaccion promedio por canal',
      formula: '(Interacciones / Alcance total)',
      meta: 'Definida por marca (>2% como referencia minima)',
    },
    {
      nombre: 'Crecimiento mensual de comunidad en cuentas gestionadas',
      formula: '(Seguidores actuales – Seguidores anteriores) / Seguidores anteriores',
      nota: 'Meta por canal; metrica sensible a influencers/paid.',
      meta: 'Definida por canal',
    },
    {
      nombre: 'Porcentaje de briefs entregados en tiempo y bien formulados',
      meta: '≥ 100%',
    },
    {
      nombre: 'Tasa de aprobacion de primeras versiones',
      formula: '(Piezas aprobadas en primera entrega / Total de piezas entregadas)',
      meta: '≥ 80%',
    },
  ],
}

/** Orden de lectura en la teoria Imcontent */
export const IMCONTENT_ROLES_ORDER = [
  imcontentHead,
  imcontentDisenadorSenior,
  imcontentDisenadorVideo,
  imcontentCommunityManager,
]
