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
    }
  }
  if (i === 7) {
    return {
      id: 8,
      text: 'Antes de escalar una urgencia conviene revisar contexto y canales acordados con el equipo.',
      correct: true,
    }
  }
  return q
})

export const trueFalseImmedia = [
  { id: 1, text: 'El Head de immedia suele combinar direccion estrategica, equipo y relacion con clientes.', correct: true },
  { id: 2, text: 'El especialista de immedia define la inversion final sin validacion del Head.', correct: false },
  { id: 3, text: 'Documentar optimizaciones en la bitacora ayuda a trazabilidad y aprendizaje.', correct: true },
  { id: 4, text: 'Brandformance for Growth es irrelevante para el servicio paid.', correct: false },
  { id: 5, text: 'Meta, Google y TikTok son ejemplos de plataformas habituales en el area.', correct: true },
  { id: 6, text: 'El especialista no prepara insights para reuniones internas de performance.', correct: false },
  { id: 7, text: 'Coordinar creatividades con diseno/contenido suele ser clave antes de lanzar.', correct: true },
  { id: 8, text: 'El Head no participa nunca en New Business.', correct: false },
  { id: 9, text: 'KPIs como ROAS, CPA o CPL son parte del lenguaje operativo del area.', correct: true },
  { id: 10, text: 'El especialista es siempre el unico interlocutor principal del cliente.', correct: false },
  { id: 11, text: 'Colaborar con el COO puede ayudar a equilibrar cargas de trabajo.', correct: true },
  { id: 12, text: 'Looker Studio u otras herramientas pueden usarse para reporting.', correct: true },
  { id: 13, text: 'Ignorar pixeles y conversiones es una buena practica por defecto.', correct: false },
  { id: 14, text: 'El Head valida que estimaciones de propuestas sean razonables.', correct: true },
  { id: 15, text: 'IFTTT en KPIs se usa para medir semanas con logica if-this-then-that vs objetivos.', correct: true },
  { id: 16, text: 'El area no necesita alineacion con la vision de immoral.', correct: false },
]

export const trueFalseImcontent = [
  { id: 1, text: 'El Head de imcontent lidera iniciativas de contenido visual, escrito, audiovisual y social.', correct: true },
  { id: 2, text: 'El Head ejecuta solo el 100% del diseno diario sin equipo.', correct: false },
  { id: 3, text: 'Definir precios sin CSO y CFO es correcto si hay prisa.', correct: false },
  { id: 4, text: 'UGC e influencers suelen requerir supervision de alineacion estrategica.', correct: true },
  { id: 5, text: 'El Disenador Senior lidera y evalua a todo el equipo de diseno.', correct: false },
  { id: 6, text: 'Video/Motion debe adaptar formatos y especificaciones por plataforma.', correct: true },
  { id: 7, text: 'Community Manager solo publica sin medir rendimiento.', correct: false },
  { id: 8, text: 'Los briefs claros ayudan a coordinar diseno, copy y video.', correct: true },
  { id: 9, text: 'Creatividad debe estar al servicio del rendimiento (engagement, CTR, etc.).', correct: true },
  { id: 10, text: 'El Head no colabora nunca con comercial en oportunidades de servicio.', correct: false },
  { id: 11, text: 'Documentar en Notion o ClickUp es parte de buena practica operativa.', correct: true },
  { id: 12, text: 'KPI de entregas en tiempo mide entregas sin retrasos vs planificadas.', correct: true },
  { id: 13, text: 'El especialista de video define la estrategia global de marca solo.', correct: false },
  { id: 14, text: 'Coordinar calendario editorial es habitual en Content & Community.', correct: true },
  { id: 15, text: 'Influencers: validar perfiles y entregables reduce riesgos de desalineacion.', correct: true },
  { id: 16, text: 'Automatizacion e IA no aplican nunca al area de contenido.', correct: false },
]

export const scrambleGeneral = palabrasRevueltas

export const scrambleImmedia = [
  { id: 1, hint: 'Metrica de retorno (letras revueltas)', scrambled: 'OARS', options: ['ROAS', 'SOAP', 'RASP', 'RATS'], correctIndex: 0 },
  { id: 2, hint: 'Plataforma social (letras revueltas)', scrambled: 'ateM', options: ['Meta', 'Tema', 'Mate', 'Team'], correctIndex: 0 },
  { id: 3, hint: 'Red social corta (letras revueltas)', scrambled: 'TokTik', options: ['TikTok', 'TokTi', 'KitTok', 'TikOk'], correctIndex: 0 },
  { id: 4, hint: 'Coste por accion (siglas)', scrambled: 'APC', options: ['CPA', 'CAP', 'PAC', 'ACP'], correctIndex: 0 },
  { id: 5, hint: 'Metodologia paid+marca', scrambled: 'Brandformance', options: ['Brandformance', 'Brandform', 'Performance', 'Brandforman'], correctIndex: 0 },
]

export const scrambleImcontent = [
  { id: 1, hint: 'Contenido generado por usuarios', scrambled: 'GCU', options: ['UGC', 'GUC', 'CUG', 'UCG'], correctIndex: 0 },
  { id: 2, hint: 'Formato corto vertical', scrambled: 'sleeR', options: ['Reels', 'Seerl', 'Leers', 'Reles'], correctIndex: 0 },
  { id: 3, hint: 'Documento previo al diseno', scrambled: 'feirB', options: ['Brief', 'Fiber', 'Brefi', 'Brife'], correctIndex: 0 },
  {
    id: 4,
    hint: 'Plan de publicaciones',
    scrambled: 'oireladnac',
    options: ['calendario', 'calendarioo', 'calandar', 'calendrio'],
    correctIndex: 0,
  },
  {
    id: 5,
    hint: 'Guia de marca (letras revueltas)',
    scrambled: 'koordnarb',
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
