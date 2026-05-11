/** Minijuego: unir frase clave con el valor del manifiesto (10 pts por acierto). */
export const MINI_VALORES_POINTS = 10

export const preguntasMiniValores = [
  {
    id: 1,
    question: 'Que valor dice: "Si no suma, no sirve"?',
    options: ['Servicio', 'Resultados', 'Transparencia', 'Innovacion'],
    correctIndex: 1,
    explanation:
      'Esa frase resume el valor Resultados: medimos impacto en el negocio y el equipo; si no aporta, no lo mantenemos.',
  },
  {
    id: 2,
    question: 'Que valor rechaza "letra pequena" y apuesta por hablar claro?',
    options: ['Innovacion', 'Transparencia', 'Resultados', 'Servicio'],
    correctIndex: 1,
    explanation:
      'Transparencia es hablar claro, sin promesas vacias, y construir confianza con hechos visibles para cliente y equipo.',
  },
  {
    id: 3,
    question:
      'Que valor encaja con "la innovacion como herramienta para lo que aun no esta resuelto, no como caos"?',
    options: ['Resultados', 'Innovacion', 'Servicio', 'Transparencia'],
    correctIndex: 1,
    explanation:
      'Innovacion en Immoralia es herramienta con criterio: resolver lo pendiente con orden, no usar "innovar" como excusa para el desorden.',
  },
  {
    id: 4,
    question: 'Que valor implica "ir mas alla de lo esperado" y crecer al cliente?',
    options: ['Transparencia', 'Servicio', 'Resultados', 'Innovacion'],
    correctIndex: 1,
    explanation:
      'Servicio es acompanar y ayudar a crecer al cliente, involucrarse y pensar con el; no limitarse a ejecutar tareas sueltas.',
  },
  {
    id: 5,
    question:
      'Que valor agrupa la idea de que el trabajo debe notarse en negocio que crece, equipo que puede respirar y marca que avanza?',
    options: ['Transparencia', 'Innovacion', 'Servicio', 'Resultados'],
    correctIndex: 3,
    explanation:
      'Resultados: decisiones con impacto real en cliente y equipo; el mantra es que si no suma al triple impacto, sobra.',
  },
  {
    id: 6,
    question: 'Antes de enseñar una metrica al cliente, explicas bien como la calculamos y que cubre: que valor nos representa?',
    options: ['Servicio', 'Resultados', 'Innovacion', 'Transparencia'],
    correctIndex: 3,
    explanation:
      'Transparencia es hablar claro: datos honestos, metodo visible y sin promesas cosmeticas.',
  },
  {
    id: 7,
    question:
      'Observamos tendencias, probamos con orden y nos quedamos con lo que aporta: sin esa lectura estariamos sin que valor?',
    options: ['Innovacion', 'Servicio', 'Transparencia', 'Resultados'],
    correctIndex: 0,
    explanation:
      'Innovacion con criterio: herramienta para cerrar huecos reales, no postureo.',
  },
  {
    id: 8,
    question: 'Un cliente nos contrata como aliados estrategicos, no como ejecutores mudos: eso encaja sobre todo con...',
    options: ['Resultados', 'Servicio', 'Innovacion', 'Transparencia'],
    correctIndex: 1,
    explanation:
      'Servicio: pensamos contigo, acompanamos y sumamos mas alla del checklist cerrado.',
  },
  {
    id: 9,
    question:
      'Alguien propone "revolucionar todo el proceso" sin problema que resolver ni evidencias: que valor nos pide frenar el postureo?',
    options: ['Transparencia', 'Innovacion', 'Servicio', 'Resultados'],
    correctIndex: 1,
    explanation:
      'Innovacion aplicada: resolver lo pendiente con orden; caos disfrazado no encaja en el manifiesto.',
  },
  {
    id: 10,
    question:
      'Compartimos limitaciones del dato y lo que si podemos comprometer frente a lo que es hipotesis: conducta de...',
    options: ['Servicio', 'Resultados', 'Transparencia', 'Innovacion'],
    correctIndex: 2,
    explanation:
      'Transparencia construye confianza con hechos y claridad, sin letra pequena.',
  },
]

export const maxMiniValoresJuego = MINI_VALORES_POINTS * preguntasMiniValores.length
