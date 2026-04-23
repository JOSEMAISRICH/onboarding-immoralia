/** Minijuego: unir frase clave con el valor del manifiesto (10 pts por acierto). */
export const MINI_VALORES_POINTS = 10

export const preguntasMiniValores = [
  {
    id: 1,
    question: 'Que valor dice: "Si no suma, no sirve"?',
    options: ['Servicio', 'Resultados', 'Transparencia', 'Innovacion'],
    correctIndex: 1,
  },
  {
    id: 2,
    question: 'Que valor rechaza "letra pequena" y apuesta por hablar claro?',
    options: ['Innovacion', 'Transparencia', 'Resultados', 'Servicio'],
    correctIndex: 1,
  },
  {
    id: 3,
    question:
      'Que valor encaja con "la innovacion como herramienta para lo que aun no esta resuelto, no como caos"?',
    options: ['Resultados', 'Innovacion', 'Servicio', 'Transparencia'],
    correctIndex: 1,
  },
  {
    id: 4,
    question: 'Que valor implica "ir mas alla de lo esperado" y crecer al cliente?',
    options: ['Transparencia', 'Servicio', 'Resultados', 'Innovacion'],
    correctIndex: 1,
  },
]

export const maxMiniValoresJuego = MINI_VALORES_POINTS * preguntasMiniValores.length
