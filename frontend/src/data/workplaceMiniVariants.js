/**
 * Variantes de minijuegos (TF, emparejar, revueltas, intruso) para general, immedia e imcontent.
 * Immoralia usa los arrays originales de minijuegos.js.
 */
import {
  palabrasRevueltas,
  preguntasIntruso,
  preguntasTrueFalse,
  paresHerramienta,
} from './minijuegos'

/** Misma logica de roles que el pack original: encaja con cultura general del grupo. */
export const matchGeneral = paresHerramienta

export const matchImmedia = [
  { id: 'a', tool: 'Head immedia', use: 'Estrategia paid, cuentas asignadas, resultados y equipo' },
  { id: 'b', tool: 'Especialista immedia', use: 'Ejecucion y optimizacion en plataformas y reporting' },
  { id: 'c', tool: 'Reporting / datos', use: 'Dashboards, validacion y analisis de performance' },
  { id: 'd', tool: 'Creatividad', use: 'Feedback a piezas antes de lanzamientos' },
  { id: 'e', tool: 'Account Manager', use: 'Contexto comercial y acuerdos con el cliente' },
  { id: 'f', tool: 'COO', use: 'Carga operativa, procesos y equilibrio interno' },
  { id: 'g', tool: 'Automatizacion', use: 'Flujos y alertas que apoyan campanas' },
  { id: 'h', tool: 'Cliente (cuenta)', use: 'Objetivos, presupuesto y prioridades de negocio' },
]

export const matchImcontent = [
  { id: 'a', tool: 'Head imcontent', use: 'Vision creativa, redes, influencers y resultados de contenido' },
  { id: 'b', tool: 'Disenador/a Senior', use: 'Piezas de alto impacto y coherencia de marca' },
  { id: 'c', tool: 'Video / Motion', use: 'Piezas audiovisuales y motion alineadas al brief' },
  { id: 'd', tool: 'Content & Community', use: 'Calendario, publicacion y comunidad' },
  { id: 'e', tool: 'Copywriting', use: 'Narrativa y mensajes alineados a tono de marca' },
  { id: 'f', tool: 'Account Manager', use: 'Puente con cliente y expectativas' },
  { id: 'g', tool: 'CSO / propuestas', use: 'Viabilidad comercial y estandares en ofertas' },
  { id: 'h', tool: 'COO', use: 'Procesos, eficiencia y coordinacion operativa' },
]

/** Sustituye dos afirmaciones muy verticales del pack base por neutras. */
export const trueFalseGeneral = preguntasTrueFalse.map((q, i) => {
  if (i === 6) {
    return {
      id: 7,
      text: 'Coordinar con otras areas (paid, contenido, SEO) ayuda a entregar campanas mas coherentes.',
      correct: true,
      explanation:
        'Integrar verticales evita mensajes contradictorios y mejora la experiencia del cliente en todos los puntos de contacto.',
    }
  }
  if (i === 7) {
    return {
      id: 8,
      text: 'Antes de escalar una urgencia conviene revisar contexto y canales acordados con el equipo.',
      correct: true,
      explanation:
        'Escalar con contexto y por los canales definidos reduce ruido y protege la relacion interna y con cliente.',
    }
  }
  return q
})

export const trueFalseImmedia = [
  {
    id: 1,
    text: 'El Head de immedia suele combinar direccion estrategica, equipo y relacion con clientes.',
    correct: true,
    explanation:
      'El Head cubre estrategia paid, relacion con cuentas clave y desarrollo del equipo.',
  },
  {
    id: 2,
    text: 'El especialista de immedia define la inversion final sin validacion del Head.',
    correct: false,
    explanation:
      'Presupuesto e inversion se validan con Head o direccion segun governance del servicio.',
  },
  {
    id: 3,
    text: 'Documentar optimizaciones en la bitacora ayuda a trazabilidad y aprendizaje.',
    correct: true,
    explanation:
      'La bitacora permite repetir buenas practicas y auditar cambios en cuentas.',
  },
  {
    id: 4,
    text: 'Brandformance for Growth es irrelevante para el servicio paid.',
    correct: false,
    explanation:
      'Brandformance conecta marca y rendimiento; es relevante para muchas cuentas paid.',
  },
  {
    id: 5,
    text: 'Meta, Google y TikTok son ejemplos de plataformas habituales en el area.',
    correct: true,
    explanation:
      'Es habitual trabajar multicanal en paid social y search segun estrategia.',
  },
  {
    id: 6,
    text: 'El especialista no prepara insights para reuniones internas de performance.',
    correct: false,
    explanation:
      'Insights y reporting son parte central del rol ante cliente e internamente.',
  },
  {
    id: 7,
    text: 'Coordinar creatividades con diseno/contenido suele ser clave antes de lanzar.',
    correct: true,
    explanation:
      'Creatividades alineadas mejoran resultado y evitan rechazos en plataforma.',
  },
  {
    id: 8,
    text: 'El Head no participa nunca en New Business.',
    correct: false,
    explanation:
      'El Head suele participar en validaciones de paid en nuevas oportunidades.',
  },
  {
    id: 9,
    text: 'KPIs como ROAS, CPA o CPL son parte del lenguaje operativo del area.',
    correct: true,
    explanation:
      'Las metricas de negocio orientan optimizacion y conversaciones con cliente.',
  },
  {
    id: 10,
    text: 'El especialista es siempre el unico interlocutor principal del cliente.',
    correct: false,
    explanation:
      'Interlocucion depende de cuenta y governance; suelen participar Head y AM.',
  },
  {
    id: 11,
    text: 'Colaborar con el COO puede ayudar a equilibrar cargas de trabajo.',
    correct: true,
    explanation:
      'El COO ayuda a priorizar capacidad cuando hay tension entre cuentas.',
  },
  {
    id: 12,
    text: 'Looker Studio u otras herramientas pueden usarse para reporting.',
    correct: true,
    explanation:
      'Los dashboards centralizan datos y reducen friccion en revisiones.',
  },
  {
    id: 13,
    text: 'Ignorar pixeles y conversiones es una buena practica por defecto.',
    correct: false,
    explanation:
      'Sin conversiones medibles las optimizaciones pierden senal; hay que cuidar tracking.',
  },
  {
    id: 14,
    text: 'El Head valida que estimaciones de propuestas sean razonables.',
    correct: true,
    explanation:
      'El Head revisa coherencia estrategica y numeros antes de comprometer al equipo.',
  },
  {
    id: 15,
    text: 'IFTTT en KPIs se usa para medir semanas con logica if-this-then-that vs objetivos.',
    correct: true,
    explanation:
      'La logica if-this-then-that ayuda a ver cumplimiento semanal frente a metas.',
  },
  {
    id: 16,
    text: 'El area no necesita alineacion con la vision de immoral.',
    correct: false,
    explanation:
      'Paid Media debe alinear tactica con valores y vision del grupo.',
  },
]

export const trueFalseImcontent = [
  {
    id: 1,
    text: 'El Head de imcontent lidera iniciativas de contenido visual, escrito, audiovisual y social.',
    correct: true,
    explanation:
      'El Head marca direccion creativa y cobertura multiformato en redes y proyectos.',
  },
  {
    id: 2,
    text: 'El Head ejecuta solo el 100% del diseno diario sin equipo.',
    correct: false,
    explanation:
      'El Head coordina especialistas; la ejecucion la reparte el equipo.',
  },
  {
    id: 3,
    text: 'Definir precios sin CSO y CFO es correcto si hay prisa.',
    correct: false,
    explanation:
      'Precios y margen deben validarse con comercial y finanzas segun proceso.',
  },
  {
    id: 4,
    text: 'UGC e influencers suelen requerir supervision de alineacion estrategica.',
    correct: true,
    explanation:
      'Supervisar brief y entregables protege marca y cumplimiento normativo.',
  },
  {
    id: 5,
    text: 'El Disenador Senior lidera y evalua a todo el equipo de diseno.',
    correct: false,
    explanation:
      'El Senior ejecuta alto impacto; el liderazgo de equipo corresponde al Head.',
  },
  {
    id: 6,
    text: 'Video/Motion debe adaptar formatos y especificaciones por plataforma.',
    correct: true,
    explanation:
      'Cada red tiene specs distintas; adaptar evita cortes y mal rendimiento.',
  },
  {
    id: 7,
    text: 'Community Manager solo publica sin medir rendimiento.',
    correct: false,
    explanation:
      'Community combina publicacion con moderacion y metricas de engagement.',
  },
  {
    id: 8,
    text: 'Los briefs claros ayudan a coordinar diseno, copy y video.',
    correct: true,
    explanation:
      'El brief alinea mensaje, plazos y KPIs entre disciplinas.',
  },
  {
    id: 9,
    text: 'Creatividad debe estar al servicio del rendimiento (engagement, CTR, etc.).',
    correct: true,
    explanation:
      'El contenido busca resultado medible ademas de calidad creativa.',
  },
  {
    id: 10,
    text: 'El Head no colabora nunca con comercial en oportunidades de servicio.',
    correct: false,
    explanation:
      'Head y comercial suelen alinearse en propuestas y expansion de cuenta.',
  },
  {
    id: 11,
    text: 'Documentar en Notion o ClickUp es parte de buena practica operativa.',
    correct: true,
    explanation:
      'La documentacion reduce reprocesos y da contexto al equipo.',
  },
  {
    id: 12,
    text: 'KPI de entregas en tiempo mide entregas sin retrasos vs planificadas.',
    correct: true,
    explanation:
      'La puntualidad protege calendarios editoriales y confianza del cliente.',
  },
  {
    id: 13,
    text: 'El especialista de video define la estrategia global de marca solo.',
    correct: false,
    explanation:
      'La estrategia global la marca direccion y Head; video ejecuta piezas.',
  },
  {
    id: 14,
    text: 'Coordinar calendario editorial es habitual en Content & Community.',
    correct: true,
    explanation:
      'Calendarizar permite anticipar picos y recursos creativos.',
  },
  {
    id: 15,
    text: 'Influencers: validar perfiles y entregables reduce riesgos de desalineacion.',
    correct: true,
    explanation:
      'Due diligence de influencers evita crisis de marca y cumplimiento.',
  },
  {
    id: 16,
    text: 'Automatizacion e IA no aplican nunca al area de contenido.',
    correct: false,
    explanation:
      'Herramientas de IA y automatizacion pueden apoyar produccion y moderacion con criterio.',
  },
]

export const scrambleGeneral = palabrasRevueltas

export const scrambleImmedia = [
  {
    id: 1,
    hint: 'Metrica de retorno (letras revueltas)',
    scrambled: 'OARS',
    answer: 'ROAS',
    options: ['ROAS', 'SOAP', 'RASP', 'RATS'],
    correctIndex: 0,
  },
  {
    id: 2,
    hint: 'Plataforma social (letras revueltas)',
    scrambled: 'ateM',
    answer: 'Meta',
    options: ['Meta', 'Tema', 'Mate', 'Team'],
    correctIndex: 0,
  },
  {
    id: 3,
    hint: 'Red social corta (letras revueltas)',
    scrambled: 'TokTik',
    answer: 'TikTok',
    options: ['TikTok', 'TokTi', 'KitTok', 'TikOk'],
    correctIndex: 0,
  },
  {
    id: 4,
    hint: 'Coste por accion (siglas)',
    scrambled: 'APC',
    answer: 'CPA',
    options: ['CPA', 'CAP', 'PAC', 'ACP'],
    correctIndex: 0,
  },
  {
    id: 5,
    hint: 'Metodologia paid+marca',
    scrambled: 'Brandformance',
    answer: 'Brandformance',
    options: ['Brandformance', 'Brandform', 'Performance', 'Brandforman'],
    correctIndex: 0,
  },
]

export const scrambleImcontent = [
  {
    id: 1,
    hint: 'Contenido generado por usuarios',
    scrambled: 'GCU',
    answer: 'UGC',
    options: ['UGC', 'GUC', 'CUG', 'UCG'],
    correctIndex: 0,
  },
  {
    id: 2,
    hint: 'Formato corto vertical',
    scrambled: 'sleeR',
    answer: 'Reels',
    options: ['Reels', 'Seerl', 'Leers', 'Reles'],
    correctIndex: 0,
  },
  {
    id: 3,
    hint: 'Documento previo al diseno',
    scrambled: 'feirB',
    answer: 'Brief',
    options: ['Brief', 'Fiber', 'Brefi', 'Brife'],
    correctIndex: 0,
  },
  {
    id: 4,
    hint: 'Plan de publicaciones',
    scrambled: 'oireladnac',
    answer: 'calendario',
    options: ['calendario', 'calendarioo', 'calandar', 'calendrio'],
    correctIndex: 0,
  },
  {
    id: 5,
    hint: 'Guia de marca (letras revueltas)',
    scrambled: 'koordnarb',
    answer: 'Brandbook',
    options: ['Brandbook', 'Bookbrand', 'Brandbok', 'Branbook'],
    correctIndex: 0,
  },
]

/** Intruso: primera mitad cultura grupo; segunda mitad afinada al area. */
export const intrusoGeneral = preguntasIntruso

export const intrusoImmedia = [
  preguntasIntruso[0],
  preguntasIntruso[1],
  preguntasIntruso[2],
  preguntasIntruso[3],
  {
    id: 5,
    question: 'Cual NO encaja con un KPI tipico del especialista de immedia?',
    options: [
      'Campanas lanzadas vs plan cuando hay estructura',
      'Ignorar por completo el reporting',
      'Objetivos mensuales de performance',
      'Uso de IFTTT segun definicion interna',
    ],
    oddIndex: 1,
  },
  {
    id: 6,
    question: 'Cual NO es responsabilidad principal del Head de immedia?',
    options: [
      'Direccion estrategica del servicio paid',
      'Emitir nominas del equipo sin People',
      'Cuentas asignadas y relacion con cliente en su rol',
      'Liderar al equipo operativo',
    ],
    oddIndex: 1,
  },
  {
    id: 7,
    question: 'Cual NO es buena practica en optimizacion?',
    options: [
      'Revisar rendimiento y documentar cambios',
      'Apagar campanas sin analisis ni hipotesis',
      'Coordinar creatividades antes de lanzar',
      'Alinear con KPIs del cliente',
    ],
    oddIndex: 1,
  },
  {
    id: 8,
    question: 'Cual NO describe el trabajo del especialista?',
    options: [
      'Configurar campanas en plataformas',
      'Definir solo el presupuesto final sin Head',
      'Analizar ROAS/CPA/CPL segun caso',
      'Preparar reporting y validar datos',
    ],
    oddIndex: 1,
  },
]

export const intrusoImcontent = [
  preguntasIntruso[0],
  preguntasIntruso[1],
  preguntasIntruso[2],
  {
    id: 4,
    question: 'Cual NO encaja con el Head de imcontent?',
    options: [
      'Liderar vision creativa y equipo multidisciplinar',
      'Ejecutar siempre el 100% del copy sin equipo',
      'Supervisar influencers y UGC',
      'Coordinar estrategia de redes',
    ],
    oddIndex: 1,
  },
  {
    id: 5,
    question: 'Cual NO corresponde al Disenador Senior?',
    options: [
      'Ejecutar piezas de alto impacto',
      'Liderar y evaluar a todo el equipo como head',
      'Mantener coherencia de marca',
      'Iterar con feedback del area',
    ],
    oddIndex: 1,
  },
  {
    id: 6,
    question: 'Cual NO es foco principal de Video/Motion?',
    options: [
      'Postproduccion y exportaciones por plataforma',
      'Definir la estrategia global sin datos',
      'Motion graphics y edicion',
      'Optimizar hooks y formatos',
    ],
    oddIndex: 1,
  },
  {
    id: 7,
    question: 'Cual NO deberia hacer el Community Manager?',
    options: [
      'Medir y proponer mejoras con datos',
      'Definir presupuesto paid sin validacion',
      'Coordinar briefs con creativos',
      'Moderar comunidad y comentarios',
    ],
    oddIndex: 1,
  },
  {
    id: 8,
    question: 'Cual NO es KPI razonable del area de contenido?',
    options: [
      'Entregas en tiempo y forma vs plan',
      'Ignorar completamente la rentabilidad del area',
      'Rentabilidad media del area',
      'Aprobacion de primeras versiones (definicion interna)',
    ],
    oddIndex: 1,
  },
]
