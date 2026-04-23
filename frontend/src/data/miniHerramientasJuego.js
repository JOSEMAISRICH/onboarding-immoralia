import { DOC_TOPIC_IDS } from './docTopicOrder'
import { DOC_MICRO_POINTS } from './docTopicQuizzes'

/** Puntos por acierto en el repaso rapido de cada ficha de documentacion. */
export const MINI_HERRAMIENTAS_POINTS = DOC_MICRO_POINTS

/** Maximo del modulo 1: una pregunta por ficha (10 pts) x numero de fichas. */
export const maxMiniHerramientasJuego = DOC_TOPIC_IDS.length * DOC_MICRO_POINTS
