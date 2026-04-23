/** Max puntos por minijuego (usado en App y modulos) */
export const MINI_POINTS = {
  trueFalsePerHit: 8,
  matchPerPair: 10,
  scramblePerHit: 10,
  oddPerHit: 10,
}

export const preguntasTrueFalse = [
  {
    id: 1,
    text: 'La vision de Immoralia es quedarnos como "solo una agencia" sin mas ambicion.',
    correct: false,
  },
  {
    id: 2,
    text: 'En cultura, buscamos innovacion con etica y transparencia, no innovacion por el caos.',
    correct: true,
  },
  {
    id: 3,
    text: '"Si no suma, no sirve" esta alineado con el valor Resultados del manifiesto.',
    correct: true,
  },
  {
    id: 4,
    text: 'Un principio claro es: el cliente es lo primero y cumplir mis compromisos.',
    correct: true,
  },
  {
    id: 5,
    text: 'Si un checklist interno retrasa la entrega, esta bien saltarlo y documentar la aprobacion cuando haya hueco.',
    correct: false,
  },
  {
    id: 6,
    text: 'El COO impulsa procesos internos, herramientas operativas (ClickUp, Slack…) y mejora continua para que los equipos ejecuten sin friccion.',
    correct: true,
  },
  {
    id: 7,
    text: 'El Head de imcontent lidera la vision del area pero no suele ejecutar el 100% del diseno, video o copy del dia a dia.',
    correct: true,
  },
  {
    id: 8,
    text: 'El especialista de immedia suele tener comunicacion directa con el cliente como regla general, sin pasar por el Head.',
    correct: false,
  },
  {
    id: 9,
    text: 'El Head de Immoralia impulsa automatizacion (n8n, Make, etc.) e IA alineada a criterios eticos y colabora con el COO en prioridades.',
    correct: true,
  },
  {
    id: 10,
    text: 'El programa de referidos puede incluir un porcentaje de la facturacion del cliente el primer ano cuando el acuerdo aplica y el cliente se convierte gracias a tu conexion.',
    correct: true,
  },
  {
    id: 11,
    text: 'Si el curso dura menos de un dia, no hace falta registrarlo en ClickUp ni compartir hallazgos en Slack.',
    correct: false,
  },
  {
    id: 12,
    text: 'Una frase alineada a la cultura de crecimiento es: "El esfuerzo es el camino hacia resultados excepcionales."',
    correct: true,
  },
  {
    id: 13,
    text: 'Antes de cargar a un companero con urgencias, conviene mirar su estado en Slack y adaptar el tono si no esta al 100%.',
    correct: true,
  },
  {
    id: 14,
    text: 'Los Growth Meets buscan dialogo abierto, reconocer logros y dejar acuerdos documentados para revisar progreso despues.',
    correct: true,
  },
  {
    id: 15,
    text: 'La primera tarjeta amarilla suele ir con reunion con el supervisor, registro del motivo y plan de accion en feedback meet.',
    correct: true,
  },
  {
    id: 16,
    text: 'Los gastos de empresa se pueden hacer sin aprobacion previa si luego adjunto todos los tickets.',
    correct: false,
  },
]

export const maxMiniTrueFalse = MINI_POINTS.trueFalsePerHit * preguntasTrueFalse.length

/** Izquierda = rol; derecha = foco (minijuego emparejar) */
export const paresHerramienta = [
  { id: 'a', tool: 'COO', use: 'Operaciones, procesos, eficiencia y herramientas internas' },
  { id: 'b', tool: 'CFO', use: 'Planificacion financiera, presupuesto y rentabilidad' },
  { id: 'c', tool: 'CSO', use: 'Validar propuestas, funnel comercial y alineacion de margen' },
  { id: 'd', tool: 'People', use: 'Talento, onboarding interno y Growth Meets' },
  { id: 'e', tool: 'Administracion', use: 'Facturacion, pagos y documentacion ordenada' },
  { id: 'f', tool: 'Head immedia', use: 'Estrategia Paid, cuentas asignadas, resultados y equipo' },
  { id: 'g', tool: 'Esp. immedia', use: 'Ejecucion y optimizacion en Meta, Google, TikTok y reporting' },
  { id: 'h', tool: 'Head Immoralia', use: 'Automatizacion, IA e innovacion tecnologica interna y clientes' },
]

export const maxMiniMatch = MINI_POINTS.matchPerPair * paresHerramienta.length

export const palabrasRevueltas = [
  {
    id: 1,
    hint: 'Valor del manifiesto (letras revueltas)',
    scrambled: 'oicivreS',
    options: ['Servicio', 'Servidor', 'Superficie', 'Severidad'],
    correctIndex: 0,
  },
  {
    id: 2,
    hint: 'Automatizaciones (letras revueltas)',
    scrambled: 'n8n',
    options: ['n8n', 'npm', 'n9n', 'ngn'],
    correctIndex: 0,
  },
  {
    id: 3,
    hint: 'Valor: claridad y honestidad (letras revueltas)',
    scrambled: 'enacrasianrpT',
    options: ['Transparencia', 'Transferencia', 'Trascendencia', 'Temperatura'],
    correctIndex: 0,
  },
  {
    id: 4,
    hint: 'Control horario interno (letras revueltas)',
    scrambled: 'eddHlo',
    options: ['Holded', 'Holdeo', 'Hadoop', 'Hosted'],
    correctIndex: 0,
  },
  {
    id: 5,
    hint: 'Herramienta de tareas (letras revueltas)',
    scrambled: 'pUkilCc',
    options: ['ClickUp', 'Slack', 'Notion', 'Trello'],
    correctIndex: 0,
  },
]

export const preguntasIntruso = [
  {
    id: 1,
    question: 'Cual NO es un valor del manifiesto?',
    options: ['Servicio', 'Transparencia', 'Excelencia', 'Resultados'],
    oddIndex: 2,
  },
  {
    id: 2,
    question: 'Cual NO es un pilar de cultura descrito?',
    options: [
      'Pasion por el crecimiento',
      'Alianza estrategica',
      'Ownership total del cliente sin coordinar con equipo',
      'Excelencia',
    ],
    oddIndex: 2,
  },
  {
    id: 3,
    question: 'Cual no encaja con "comunicacion profesional con clientes"?',
    options: [
      'Responder en menos de 1h en horario laboral',
      'Avisar si no llegas a una fecha',
      'Responder siempre en un plazo de hasta 4 horas habiles como regla general',
      'Ser claro en compromisos',
    ],
    oddIndex: 2,
  },
  {
    id: 4,
    question: 'Cual NO describe el espiritu del manifiesto?',
    options: [
      'Marketing con etica y proposito',
      'Dejar huella que sume e inspire',
      'Priorizar volumen de publicaciones sobre impacto medible y etico',
      'Trabajar con transparencia',
    ],
    oddIndex: 2,
  },
  {
    id: 5,
    question: 'Cual NO es foco tipico del COO?',
    options: [
      'Detectar cuellos de botella operativos',
      'Dashboards de eficiencia y carga de trabajo',
      'Liderar solo la ejecucion creativa de campanas como rol principal',
      'Mejora continua de procesos y estandares',
    ],
    oddIndex: 2,
  },
  {
    id: 6,
    question: 'Cual NO encaja con el rol de Content Creator & Community Manager?',
    options: [
      'Planificar calendario y publicar en redes',
      'Definir el presupuesto global de paid sin validacion del head',
      'Gestionar comunidad, comentarios y mensajes',
      'Coordinar briefs con diseno y copy',
    ],
    oddIndex: 1,
  },
  {
    id: 7,
    question: 'Cual NO es un activo / vertical del ecosistema Immoral Marketing?',
    options: ['Imfilms', 'Imfashion', 'Immoralia', 'Marca ajena no relacionada con el grupo'],
    oddIndex: 3,
  },
  {
    id: 8,
    question: 'Cual NO encaja con los Team Coffee Meets?',
    options: [
      'Quincenal viernes 13h Espana',
      'Participacion voluntaria',
      'Duracion minima obligatoria de dos horas para contar la asistencia',
      'Calendario compartido y recordatorios en Slack',
    ],
    oddIndex: 2,
  },
]

export const maxMiniScramble = MINI_POINTS.scramblePerHit * palabrasRevueltas.length
export const maxMiniOdd = MINI_POINTS.oddPerHit * preguntasIntruso.length
