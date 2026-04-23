import { preguntas } from './preguntas'

/** 20 preguntas tipo cultura / procesos / grupo (sin foco en una sola vertical). */
const IDS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 21, 22, 23, 24, 31, 32]

export const quizGeneral = IDS.map((i, idx) => ({ ...preguntas[i], id: idx + 1 }))
