/**
 * MiniScenario, MiniMemory, MiniWordle, MiniWhoToAsk — variantes por espacio.
 * Puntos maximos coherentes con getMaxByModuleForWorkplace (workplacePack).
 */

/** @typedef {{ id: number, situation: string, choices: { label: string, correct: boolean }[], explanation: string }} ScenarioRound */

/** Escenarios: 4 rondas × 15 pts = 60 */
export const scenarioImmoralia = /** @type {ScenarioRound[]} */ ([
  {
    id: 1,
    situation: 'Un cliente escala una urgencia sin contexto en Slack el viernes tarde.',
    choices: [
      { label: 'Responder rapido con datos del canal y estado real antes de prometer fechas', correct: true },
      { label: 'Ignorar hasta el lunes porque ya es fin de semana', correct: false },
      { label: 'Prometer entrega sin revisar backlog ni responsables', correct: false },
    ],
    explanation:
      'Antes de comprometer fechas conviene alinear contexto, estado en herramientas y cobertura del equipo.',
  },
  {
    id: 2,
    situation: 'Detectas un error en fichaje en Holded.',
    choices: [
      { label: 'Avisar al responsable y usar el canal/formulario acordado para corregirlo', correct: true },
      { label: 'Borrar silenciosamente la entrada sin avisar', correct: false },
      { label: 'Pedir a otro companero que fiche por ti', correct: false },
    ],
    explanation:
      'Los errores de fichaje se corrigen con transparencia y el flujo oficial para que Administracion lo registre bien.',
  },
  {
    id: 3,
    situation: 'Antes de vacaciones tienes tareas abiertas en ClickUp.',
    choices: [
      {
        label: 'Dejar continuidad clara (quien cubre), estado en Slack y respuesta automatica en email',
        correct: true,
      },
      { label: 'Marcar todo como hecho para limpiar la vista', correct: false },
      { label: 'Silenciar notificaciones sin delegar', correct: false },
    ],
    explanation:
      'La continuidad protege al cliente y al equipo; el email fuera de oficina y Slack ayudan a gestionar expectativas.',
  },
  {
    id: 4,
    situation: 'Un proveedor pide datos sensibles del cliente por email personal.',
    choices: [
      { label: 'Redirigir a canales y politicas acordadas; no compartir fuera de lo autorizado', correct: true },
      { label: 'Reenviar todo para ir mas rapido', correct: false },
      { label: 'Compartir credenciales por chat informal', correct: false },
    ],
    explanation:
      'Los datos y accesos siguen politicas de seguridad y los canales oficiales del proyecto.',
  },
])

export const scenarioGeneral = /** @type {ScenarioRound[]} */ ([
  {
    id: 1,
    situation: 'Dos areas piden prioridad distinta el mismo dia.',
    choices: [
      { label: 'Subir contexto al responsable y acordar un orden con impacto visible para el cliente', correct: true },
      { label: 'Elegir solo la tarea que mas te guste', correct: false },
      { label: 'Hacer ambas a medias sin avisar', correct: false },
    ],
    explanation:
      'Cuando chocan prioridades, la direccion o el responsable ayuda a ordenar segun impacto y acuerdos con cliente.',
  },
  {
    id: 2,
    situation: 'Un compañero no contesta y bloquea tu entrega.',
    choices: [
      { label: 'Escalar con contexto y en el canal acordado; copiar a responsable si no hay respuesta', correct: true },
      { label: 'Asignar la culpa en publico sin datos', correct: false },
      { label: 'Esperar indefinidamente sin avisar al cliente', correct: false },
    ],
    explanation:
      'Escalar con contexto y siguiendo acuerdos internos reduce friccion y protege plazos.',
  },
  {
    id: 3,
    situation: 'Hay una reunion con cliente y falta documentacion en Drive.',
    choices: [
      { label: 'Pedir el enlace oficial o plantilla al AM/buddy antes de improvisar', correct: true },
      { label: 'Inventar numeros para cubrir el hueco', correct: false },
      { label: 'Cancelar la reunion sin avisar', correct: false },
    ],
    explanation:
      'Mejor pedir la fuente de verdad (Drive, ClickUp) que improvisar datos ante el cliente.',
  },
  {
    id: 4,
    situation: 'Un feedback creativo llega tarde y pone en riesgo el lanzamiento.',
    choices: [
      { label: 'Dejar constancia, proponer mitigacion (alcance/fecha) y avisar a responsables', correct: true },
      { label: 'Lanzar igual sin revisar calidad', correct: false },
      { label: 'Ignorar el riesgo para no molestar', correct: false },
    ],
    explanation:
      'La trazabilidad y las opciones de mitigacion ayudan al equipo y al cliente a decidir con datos.',
  },
])

export const scenarioImmedia = /** @type {ScenarioRound[]} */ ([
  {
    id: 1,
    situation: 'El cliente pide subir presupuesto sin revisar creatividades.',
    choices: [
      { label: 'Coordinar con Head/especialista y validar coherencia antes de escalar in inversion', correct: true },
      { label: 'Subir solo porque presiona', correct: false },
      { label: 'Apagar campanas sin analizar metricas', correct: false },
    ],
    explanation:
      'En paid conviene alinear presupuesto con creatividades, tracking y criterios del Head antes de escalar.',
  },
  {
    id: 2,
    situation: 'Pixel de conversion falla tras un cambio en la web.',
    choices: [
      { label: 'Documentar incidencia, revisar GTM/pixel y coordinar con cliente o tech', correct: true },
      { label: 'Ignorar porque el gasto sigue', correct: false },
      { label: 'Duplicar campanas sin diagnosticar', correct: false },
    ],
    explanation:
      'Sin conversiones fiables las optimizaciones pierden sentido; hay que corregir tracking.',
  },
  {
    id: 3,
    situation: 'Reporting mensual: el cliente pide otro formato distinto al dashboard habitual.',
    choices: [
      {
        label: 'Acordar fuente unica de datos y si el nuevo formato es recurrente o puntual',
        correct: true,
      },
      { label: 'Enviar tres excels distintos sin version unica', correct: false },
      { label: 'Negarse sin alternativa', correct: false },
    ],
    explanation:
      'Alinear formato y periodicidad evita confusion y trabajo duplicado.',
  },
  {
    id: 4,
    situation: 'Creatividades nuevas llegan tarde para una fecha de lanzamiento.',
    choices: [
      { label: 'Levantar riesgo a Head/AM y ver alcance reducido o nueva fecha', correct: true },
      { label: 'Publicar creatividades sin revision', correct: false },
      { label: 'Apagar campanas sin avisar', correct: false },
    ],
    explanation:
      'La coordinacion creativa-operativa es clave para cumplir launch con calidad.',
  },
])

export const scenarioImcontent = /** @type {ScenarioRound[]} */ ([
  {
    id: 1,
    situation: 'El cliente pide piezas fuera de tono de marca.',
    choices: [
      { label: 'Subir el conflicto al Head/AM con referencias de brandbook y alternativas', correct: true },
      { label: 'Publicar igual para no discutir', correct: false },
      { label: 'Eliminar el brandbook del proyecto', correct: false },
    ],
    explanation:
      'La coherencia de marca se defiende con argumentos y escalado al Head cuando hay tension creativa.',
  },
  {
    id: 2,
    situation: 'Un influencer entrega contenido fuera de brief.',
    choices: [
      { label: 'Revisar contrato/brief y pedir ajustes con plazo claro', correct: true },
      { label: 'Aceptar todo sin supervisar', correct: false },
      { label: 'Publicar sin etiquetar segun normativa', correct: false },
    ],
    explanation:
      'Los entregables de influencers deben alinearse al brief y cumplir normativa de publicidad.',
  },
  {
    id: 3,
    situation: 'Hay que mover la fecha del calendario editorial.',
    choices: [
      { label: 'Actualizar herramientas, avisar a cliente y equipo con nuevo hito', correct: true },
      { label: 'Cambiar solo en chat sin documentar', correct: false },
      { label: 'Asumir que nadie lee el calendario', correct: false },
    ],
    explanation:
      'El calendario editorial es contrato operativo: conviene actualizarlo y comunicarlo.',
  },
  {
    id: 4,
    situation: 'Video final pesa demasiado para Meta.',
    choices: [
      { label: 'Pedir export adaptado a especificaciones o comprimir sin perder mensaje clave', correct: true },
      { label: 'Subir el archivo bruto sin optimizar', correct: false },
      { label: 'Publicar enlace externo sin estrategia', correct: false },
    ],
    explanation:
      'Cada plataforma tiene especificaciones; adaptar formato evita rechazos y mala experiencia.',
  },
])

/** Memoria: pares (term -> match); 4 pares × 15 = 60 */
export const memoryImmoralia = [
  { id: 'a', left: 'Vision', right: 'Proposito y etica' },
  { id: 'b', left: 'Manifiesto', right: 'Valores compartidos' },
  { id: 'c', left: 'Holded', right: 'Fichaje' },
  { id: 'd', left: 'ClickUp', right: 'Tareas y owners' },
]

export const memoryGeneral = [
  { id: 'a', left: 'Documentacion', right: 'Fuente de verdad' },
  { id: 'b', left: 'Cliente', right: 'Objetivos y contexto' },
  { id: 'c', left: 'Feedback', right: 'Mejora continua' },
  { id: 'd', left: 'Slack', right: 'Comunicacion rapida' },
]

export const memoryImmedia = [
  { id: 'a', left: 'ROAS', right: 'Eficiencia retorno' },
  { id: 'b', left: 'Pixel', right: 'Conversiones' },
  { id: 'c', left: 'Audiencias', right: 'Segmentacion' },
  { id: 'd', left: 'Creative', right: 'Mensajes y formatos' },
]

export const memoryImcontent = [
  { id: 'a', left: 'Brandbook', right: 'Tono visual' },
  { id: 'b', left: 'Brief', right: 'Objetivos creativos' },
  { id: 'c', left: 'UGC', right: 'Contenido autentico' },
  { id: 'd', left: 'Community', right: 'Interaccion y tono' },
]

/** Palabras de 5 letras (sin acentos). En cada sesión se eligen 3 distintas al azar del pool del espacio. */
export const WORDLE_ROUNDS_PER_SESSION = 3

/** @typedef {{ word: string, clue: string }} WordleEntry */

export const wordlePoolImmoralia = /** @type {WordleEntry[]} */ ([
  { word: 'ETICA', clue: 'Base del manifiesto' },
  { word: 'NORMA', clue: 'Lo que acordamos cumplir entre todos' },
  { word: 'VALOR', clue: 'Principio que guia decisiones dificiles' },
  { word: 'METAS', clue: 'Resultados concretos que persigues' },
  { word: 'PASOS', clue: 'Orden en el proceso interno' },
  { word: 'GUIAS', clue: 'Referencias para hacer bien el trabajo' },
  { word: 'FICHA', clue: 'Documento corto que resume lo esencial' },
  { word: 'PLAZO', clue: 'Tiempo acordado para entregar' },
  { word: 'ORDEN', clue: 'Claridad en prioridades y siguientes pasos' },
  { word: 'PAUSA', clue: 'Momento para revisar antes de seguir' },
])

export const wordlePoolGeneral = /** @type {WordleEntry[]} */ ([
  { word: 'DATOS', clue: 'Decision con evidencia' },
  { word: 'LISTA', clue: 'Check simple para no olvidar pasos' },
  { word: 'BASES', clue: 'Criterios minimos antes de avanzar' },
  { word: 'AUDAZ', clue: 'Propuesta arriesgada pero fundamentada' },
  { word: 'HECHO', clue: 'Estado cuando algo ya esta cerrado' },
  { word: 'FOCO', clue: 'Prioridad clara entre muchas tareas' },
  { word: 'IDEAS', clue: 'Semillas de soluciones antes del plan' },
  { word: 'CALMA', clue: 'Actitud ante urgencias falsas' },
  { word: 'LOGRO', clue: 'Resultado que cerraste con criterio' },
  { word: 'ORDEN', clue: 'Todo en su sitio para avanzar rapido' },
])

export const wordlePoolImmedia = /** @type {WordleEntry[]} */ ([
  { word: 'MARCA', clue: 'Identidad que el cliente refuerza con paid' },
  { word: 'PAUTA', clue: 'Inversion y alcance en medios de pago' },
  { word: 'PIEZA', clue: 'Creativo que sube a la plataforma' },
  { word: 'CANAL', clue: 'Donde impacta la inversion' },
  { word: 'VIDEO', clue: 'Formato que suele pedir mas variantes' },
  { word: 'MEDIO', clue: 'Plataforma donde compras impresiones' },
  { word: 'CREAR', clue: 'Primera fase antes de testear creatividades' },
  { word: 'PIXEL', clue: 'Sirve para medir conversiones' },
  { word: 'BRIEF', clue: 'Acuerdo corto de objetivo y mensaje' },
  { word: 'CAMPA', clue: 'Conjunto de anuncios con un mismo objetivo' },
])

export const wordlePoolImcontent = /** @type {WordleEntry[]} */ ([
  { word: 'TEXTO', clue: 'Copy que lee la gente' },
  { word: 'REDES', clue: 'Donde publicas y conversas' },
  { word: 'VIRAL', clue: 'Contenido que se comparte solo' },
  { word: 'GUION', clue: 'Linea base antes de grabar o animar' },
  { word: 'TREND', clue: 'Ola cultural que adaptas con criterio' },
  { word: 'EDITA', clue: 'Recorta y pulsa antes de publicar' },
  { word: 'NOTAS', clue: 'Ideas sueltas que luego ordenas' },
  { word: 'STORY', clue: 'Formato corto vertical habitual' },
  { word: 'AUDIO', clue: 'Podcast voz o pieza sonora' },
  { word: 'VIDEO', clue: 'Pieza en movimiento para el feed' },
])

export const wordleImmoralia = wordlePoolImmoralia[0]
export const wordleGeneral = wordlePoolGeneral[0]
export const wordleImmedia = wordlePoolImmedia[0]
export const wordleImcontent = wordlePoolImcontent[0]


/** @typedef {{ id: number, prompt: string, options: { label: string, correct: boolean }[], explanation: string }} WhoAskRound */

export const whoAskImmoralia = /** @type {WhoAskRound[]} */ ([
  {
    id: 1,
    prompt: 'Duda sobre automatizacion etica y flujos en n8n.',
    options: [
      { label: 'Head Immoralia / especialista automatizacion', correct: true },
      { label: 'Solo el cliente, sin revisar internamente', correct: false },
      { label: 'Cualquier externo sin NDA', correct: false },
    ],
    explanation:
      'Temas de automatizacion e IA etica suelen pasar por Immoralia tech con gobernanza interna.',
  },
  {
    id: 2,
    prompt: 'Conflicto de prioridades entre dos cuentas.',
    options: [
      { label: 'Tu responsable / COO segun gravedad', correct: true },
      { label: 'El ultimo que escribio en Slack', correct: false },
      { label: 'Nadie; cada uno decide solo', correct: false },
    ],
    explanation:
      'Los cuellos de botella de capacidad se coordinan con responsable u operativa.',
  },
  {
    id: 3,
    prompt: 'Factura incorrecta de un proveedor.',
    options: [
      { label: 'Administracion + copia a tu responsable si afecta cliente', correct: true },
      { label: 'Pagar sin revisar', correct: false },
      { label: 'Eliminar el correo', correct: false },
    ],
    explanation:
      'Administracion gestiona facturacion; si hay impacto en cuenta, involucrar al AM/responsable.',
  },
  {
    id: 4,
    prompt: 'Oferta comercial fuera de margen.',
    options: [
      { label: 'CSO / revision comercial antes de enviar', correct: true },
      { label: 'Enviar ya para ganar tiempo', correct: false },
      { label: 'Duplicar propuesta sin CFO', correct: false },
    ],
    explanation:
      'Las propuestas deben pasar controles de viabilidad y estandares antes de salir.',
  },
  {
    id: 5,
    prompt: 'Duda legal en contrato.',
    options: [
      { label: 'Direccion / legal segun proceso interno', correct: true },
      { label: 'Firma el becario sin revisar', correct: false },
      { label: 'Pedir consejo solo al cliente', correct: false },
    ],
    explanation:
      'Los temas legales siguen el circuito definido por la empresa, no improvisaciones.',
  },
])

export const whoAskGeneral = /** @type {WhoAskRound[]} */ ([
  {
    id: 1,
    prompt: 'No sabes que plantilla usar para un entregable.',
    options: [
      { label: 'Buddy / responsable / Drive oficial del proyecto', correct: true },
      { label: 'Inventar formato nuevo cada vez', correct: false },
      { label: 'Copiar de internet sin revisar', correct: false },
    ],
    explanation:
      'Las plantillas y fuentes oficiales mantienen calidad y consistencia.',
  },
  {
    id: 2,
    prompt: 'Cliente pide cambio de alcance grande.',
    options: [
      { label: 'Account Manager / responsable de cuenta', correct: true },
      { label: 'Aceptar sin estimar impacto', correct: false },
      { label: 'Negarte sin alternativa', correct: false },
    ],
    explanation:
      'Los cambios de alcance suelen negociarse con AM y direccion segun contrato.',
  },
  {
    id: 3,
    prompt: 'Problema de salud laboral recurrente.',
    options: [
      { label: 'People & Cultura / canal privado acordado', correct: true },
      { label: 'Ventilar solo en redes publicas', correct: false },
      { label: 'Ignorarlo por completo', correct: false },
    ],
    explanation:
      'People existe para acompanar situaciones sensibles con confidencialidad.',
  },
  {
    id: 4,
    prompt: 'Diseno bloqueado sin feedback.',
    options: [
      { label: 'Escalar a Head creativo / AM con contexto', correct: true },
      { label: 'Entregar sin revision', correct: false },
      { label: 'Duplicar trabajo en paralelo sin avisar', correct: false },
    ],
    explanation:
      'Escalar con contexto acelera decisiones sin sacrificar calidad.',
  },
  {
    id: 5,
    prompt: 'Urgencia fuera de horario.',
    options: [
      { label: 'Seguir protocolo del cliente/servicio y avisar a responsable', correct: true },
      { label: 'Ignorar hasta el mes siguiente', correct: false },
      { label: 'Responder desde cuenta personal sin registro', correct: false },
    ],
    explanation:
      'Las urgencias siguen lo acordado con cliente y equipo; se documenta lo necesario.',
  },
])

export const whoAskImmedia = /** @type {WhoAskRound[]} */ ([
  {
    id: 1,
    prompt: 'Validar estrategia paid antes de escalar presupuesto.',
    options: [
      { label: 'Head immedia', correct: true },
      { label: 'Solo el cliente', correct: false },
      { label: 'Soporte de la plataforma sin contexto', correct: false },
    ],
    explanation:
      'El Head valida coherencia estrategica y capacidad antes de grandes cambios de inversion.',
  },
  {
    id: 2,
    prompt: 'Pixel / tracking roto.',
    options: [
      { label: 'Especialista immedia + soporte tech si aplica', correct: true },
      { label: 'Seguir optimizando a ciegas', correct: false },
      { label: 'Apagar cuenta sin avisar', correct: false },
    ],
    explanation:
      'Sin datos fiables el especialista y tech deben corregir tracking.',
  },
  {
    id: 3,
    prompt: 'Cliente pide nuevo formato de reporting.',
    options: [
      { label: 'Head / AM para alinear periodicidad y datos', correct: true },
      { label: 'Enviar datos crudos sin contexto', correct: false },
      { label: 'Negarse siempre', correct: false },
    ],
    explanation:
      'Reporting debe ser sostenible y alineado con AM y cliente.',
  },
  {
    id: 4,
    prompt: 'Creatividad rechazada por politicas del anunciante.',
    options: [
      { label: 'Coordinar revision creativa y nueva subida', correct: true },
      { label: 'Duplicar identico en otra cuenta', correct: false },
      { label: 'Ignorar politicas', correct: false },
    ],
    explanation:
      'Las politicas de plataforma se respetan iterando creatividades validas.',
  },
  {
    id: 5,
    prompt: 'Conflicto de prioridad entre dos cuentas paid.',
    options: [
      { label: 'Head / COO segun impacto y capacidad', correct: true },
      { label: 'La cuenta que mas paga siempre gana sin analisis', correct: false },
      { label: 'Rotar al azar', correct: false },
    ],
    explanation:
      'La prioridad operativa la ordena Head u operativa con visibilidad completa.',
  },
])

export const whoAskImcontent = /** @type {WhoAskRound[]} */ ([
  {
    id: 1,
    prompt: 'Decision sobre tono de marca en campana grande.',
    options: [
      { label: 'Head imcontent', correct: true },
      { label: 'Solo el pasante nuevo', correct: false },
      { label: 'El cliente sin revision interna', correct: false },
    ],
    explanation:
      'El Head marca la direccion creativa y coherencia de marca.',
  },
  {
    id: 2,
    prompt: 'Pieza de video no cumple especificaciones.',
    options: [
      { label: 'Video/motion + revision Head antes de enviar', correct: true },
      { label: 'Publicar para cumplir fecha', correct: false },
      { label: 'Eliminar el brief', correct: false },
    ],
    explanation:
      'Formato y specs por canal son obligatorios para buen rendimiento.',
  },
  {
    id: 3,
    prompt: 'UGC no encaja con valores del cliente.',
    options: [
      { label: 'Content + AM para feedback al creador / brief', correct: true },
      { label: 'Ignorar porque ya esta pagado', correct: false },
      { label: 'Publicar igual', correct: false },
    ],
    explanation:
      'Supervision de UGC protege marca y cumplimiento.',
  },
  {
    id: 4,
    prompt: 'Conflicto en fecha de entrega editorial.',
    options: [
      { label: 'Head / AM para negociar nueva fecha con cliente', correct: true },
      { label: 'Saltarse revision de calidad', correct: false },
      { label: 'Eliminar posts sin plan', correct: false },
    ],
    explanation:
      'Las fechas se mueven con consenso cliente-equipo y calidad.',
  },
  {
    id: 5,
    prompt: 'Influencer pide cambiar mensaje clave.',
    options: [
      { label: 'Head / CSO segun alcance contractual', correct: true },
      { label: 'Aceptar cualquier cambio verbal', correct: false },
      { label: 'Romper contrato sin hablar', correct: false },
    ],
    explanation:
      'Cambios contractuales o de mensaje pasan por roles que firman o aprueban.',
  },
])

/** Puntos por escenario acertado */
export const SCENARIO_PTS_PER_ROUND = 15
/** Puntos por par encontrado en memoria */
export const MEMORY_PTS_PER_PAIR = 15
/** Wordle: puntos si aciertas una palabra; el paso completo suma hasta WORDLE_MAX × WORDLE_ROUNDS_PER_SESSION */
export const WORDLE_MAX = 60
/** Intentos máximos (progreso en barra y reglas del minijuego). */
export const WORDLE_MAX_TRIES = 6
/** WhoToAsk: 5 × 12 */
export const WHO_ASK_PTS = 12
