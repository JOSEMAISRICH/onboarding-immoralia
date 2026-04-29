/** 10 minijuegos extra: uno por pantalla. Puntos por acierto completo en esa pantalla. */
export const EXTRA_POINTS_EACH = 12

export const EXTRA_GAME_KEYS = [
  'extra01',
  'extra02',
  'extra03',
  'extra04',
  'extra05',
  'extra06',
  'extra07',
  'extra08',
  'extra09',
  'extra10',
]

/**
 * type: 'mcq' (4 opciones) | 'tf' (verdadero / falso)
 * correctIndex: indice opcion correcta (mcq)
 * correct: boolean (tf)
 */
export const extraGames = [
  {
    key: 'extra01',
    listTitle: 'Extra 1: Manifiesto',
    badge: '1/10',
    title: 'Vision',
    subtitle: `${EXTRA_POINTS_EACH} pts si aciertas.`,
    type: 'mcq',
    question: 'Como queremos que las marcas nos vean, segun la vision?',
    options: [
      'Solo como proveedores externos',
      'Como socio estrategico que empuja y hace que las cosas pasen',
      'Como reemplazo temporal del CEO del cliente',
      'Como equipo que evita medir resultados',
    ],
    correctIndex: 1,
    explanation:
      'Queremos que las marcas nos vean como socio estrategico que empuja resultados eticos, no como mero proveedor externo.',
  },
  {
    key: 'extra02',
    listTitle: 'Extra 2: Valores',
    badge: '2/10',
    title: 'Verdadero o falso',
    subtitle: `${EXTRA_POINTS_EACH} pts si aciertas.`,
    type: 'tf',
    question: 'Los cuatro valores del manifiesto incluyen Servicio y Transparencia.',
    correct: true,
    explanation:
      'Los cuatro valores oficiales son Servicio, Transparencia, Innovacion y Resultados; Servicio y Transparencia estan incluidos.',
  },
  {
    key: 'extra03',
    listTitle: 'Extra 3: Holded',
    badge: '3/10',
    title: 'Fichaje',
    subtitle: `${EXTRA_POINTS_EACH} pts si aciertas.`,
    type: 'mcq',
    question: 'Flujo recomendado si hubo ausencia justificada o error de fichaje:',
    options: [
      'Avisar al responsable, rellenar el formulario del canal de Slack y esperar confirmacion',
      'Corregirlo solo en Holded sin avisar ni dejar constancia en Slack',
      'Pedir a Administracion que lo cambien sin copiar a tu responsable',
      'Dejar constancia solo en comentario de tarea de cliente, sin canal de solicitudes',
    ],
    correctIndex: 0,
  },
  {
    key: 'extra04',
    listTitle: 'Extra 4: Vacaciones',
    badge: '4/10',
    title: 'Antes de desconectar',
    subtitle: `${EXTRA_POINTS_EACH} pts si aciertas.`,
    type: 'mcq',
    question: 'Antes de vacaciones, que ayuda mas al equipo?',
    options: [
      'Ocultar tareas abiertas',
      'Dejar continuidad clara (quien cubre, pendientes, fechas) + estado Slack + email OOO',
      'Silenciar solo el movil',
      'Archivar el proyecto en ClickUp sin avisar',
    ],
    correctIndex: 1,
  },
  {
    key: 'extra05',
    listTitle: 'Extra 5: Calendario',
    badge: '5/10',
    title: 'Festivos',
    subtitle: `${EXTRA_POINTS_EACH} pts si aciertas.`,
    type: 'tf',
    question:
      'Si un festivo importante de tu pais no esta en el calendario compartido, conviene avisar al responsable con antelacion.',
    correct: true,
  },
  {
    key: 'extra06',
    listTitle: 'Extra 6: COO',
    badge: '6/10',
    title: 'Motor operativo',
    subtitle: `${EXTRA_POINTS_EACH} pts si aciertas.`,
    type: 'mcq',
    question:
      'Que encaja mejor con el COO: metodologias, verticales (Immedia, Imcontent, Immoralia…) y mejora continua?',
    options: [
      'Disenar y velar por procesos escalables y uso correcto de herramientas operativas',
      'Emitir todas las facturas sin coordinar con nadie',
      'Definir el salario de cada persona sin People ni direccion',
      'Sustituir al CEO en todas las decisiones de marca',
    ],
    correctIndex: 0,
  },
  {
    key: 'extra07',
    listTitle: 'Extra 7: immedia',
    badge: '7/10',
    title: 'Paid Media',
    subtitle: `${EXTRA_POINTS_EACH} pts si aciertas.`,
    type: 'mcq',
    question: 'En new business, el Head de immedia suele:',
    options: [
      'Ignorar propuestas de paid',
      'Validar coherencia, capacidad interna y estimaciones razonables junto a AM y CSO',
      'Sustituir al cliente en contratos legales',
      'Definir sueldos del equipo comercial',
    ],
    correctIndex: 1,
  },
  {
    key: 'extra08',
    listTitle: 'Extra 8: Immoralia',
    badge: '8/10',
    title: 'Tech',
    subtitle: `${EXTRA_POINTS_EACH} pts si aciertas.`,
    type: 'tf',
    question:
      'El Head de Immoralia impulsa automatizacion e IA, documenta flujos y coordina gobernanza tecnologica etica.',
    correct: true,
  },
  {
    key: 'extra09',
    listTitle: 'Extra 9: Incentivos',
    badge: '9/10',
    title: 'Cuentas',
    subtitle: `${EXTRA_POINTS_EACH} pts si aciertas.`,
    type: 'mcq',
    question: 'Donde ves de que cuentas eres responsable o supervisor para incentivos?',
    options: [
      'Solo en un chat privado sin historial',
      'En el Directorio de Cuentas (y con tu responsable si tienes dudas)',
      'No existe referencia interna',
      'Solo en papel en recepcion',
    ],
    correctIndex: 1,
  },
  {
    key: 'extra10',
    listTitle: 'Extra 10: Referidos',
    badge: '10/10',
    title: 'Generar oportunidades',
    subtitle: `${EXTRA_POINTS_EACH} pts si aciertas.`,
    type: 'mcq',
    question:
      'Cliente ideal para recomendar: que encaja mejor con lo que busca Immoral?',
    options: [
      'Marcas que busquen solo volumen de piezas sin medir ni alinear con etica de Immoral',
      'E-commerce, servicios B2C/B2B o instituciones que valoren transparencia, innovacion etica y resultados',
      'Cualquier PYME local aunque no haya encaje cultural ni capacidad de pago',
      'Proyectos one-shot sin posibilidad de relacion ni datos',
    ],
    correctIndex: 1,
  },
]
