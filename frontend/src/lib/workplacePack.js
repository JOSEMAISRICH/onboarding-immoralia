/**
 * Minijuegos y quiz alineados al espacio elegido (teoria propia).
 */
import {
  paresHerramienta as paresImmoralia,
  palabrasRevueltas as scrambleImmoralia,
  preguntasIntruso as intrusoImmoralia,
  preguntasTrueFalse as trueFalseImmoralia,
} from '../data/minijuegos'
import { preguntas as quizImmoralia } from '../data/preguntas'
import { preguntasMiniValores } from '../data/miniValoresJuego'
import { pasosProceso as pasosGeneral } from '../data/pasosProceso'
import { quizGeneral } from '../data/workplaceQuizGeneral'
import { modulo1Imcontent, modulo1General, modulo1Immoralia, modulo1Immedia } from '../data/workplaceModulo1Repaso'
import { quizImcontent, quizImmedia } from '../data/workplaceQuizVertical'
import {
  intrusoGeneral,
  intrusoImcontent,
  intrusoImmedia,
  matchGeneral,
  matchImcontent,
  matchImmedia,
  scrambleGeneral,
  scrambleImcontent,
  scrambleImmedia,
  trueFalseGeneral,
  trueFalseImcontent,
  trueFalseImmedia,
} from '../data/workplaceMiniVariants'
import {
  SCENARIO_PTS_PER_ROUND,
  MEMORY_PTS_PER_PAIR,
  WORDLE_MAX,
  WORDLE_ROUNDS_PER_SESSION,
  WHO_ASK_PTS,
  scenarioGeneral,
  scenarioImmoralia,
  scenarioImcontent,
  scenarioImmedia,
  memoryGeneral,
  memoryImmoralia,
  memoryImcontent,
  memoryImmedia,
  wordlePoolGeneral,
  wordlePoolImmoralia,
  wordlePoolImcontent,
  wordlePoolImmedia,
  whoAskGeneral,
  whoAskImmoralia,
  whoAskImcontent,
  whoAskImmedia,
} from '../data/workplaceMiniNewFour'
import { normalizeWorkplaceId } from '../data/workplace'
import { EXAM_CAPS } from './examQuestionCaps'

/** @param {string} wp */
export function getScenarioRounds(wp) {
  const w = normalizeWorkplaceId(wp)
  if (w === 'immoralia') return scenarioImmoralia
  if (w === 'general') return scenarioGeneral
  if (w === 'immedia') return scenarioImmedia
  return scenarioImcontent
}

/** @param {string} wp */
export function getMemoryPairs(wp) {
  const w = normalizeWorkplaceId(wp)
  if (w === 'immoralia') return memoryImmoralia
  if (w === 'general') return memoryGeneral
  if (w === 'immedia') return memoryImmedia
  return memoryImcontent
}

/** Pool de palabras (5 letras); cada sesión del paso elige 3 al azar. */
export function getWordlePool(wp) {
  const w = normalizeWorkplaceId(wp)
  if (w === 'immoralia') return wordlePoolImmoralia
  if (w === 'general') return wordlePoolGeneral
  if (w === 'immedia') return wordlePoolImmedia
  return wordlePoolImcontent
}

/** Primera entrada del pool (compat). */
export function getWordleConfig(wp) {
  return getWordlePool(wp)[0]
}

/** @param {string} wp */
export function getWhoAskRounds(wp) {
  const w = normalizeWorkplaceId(wp)
  if (w === 'immoralia') return whoAskImmoralia
  if (w === 'general') return whoAskGeneral
  if (w === 'immedia') return whoAskImmedia
  return whoAskImcontent
}

const PUZZLE_MAX = 50
const VALORES_MAX = 10 * preguntasMiniValores.length

/** @param {string} wp */
export function getQuizPreguntas(wp) {
  const w = normalizeWorkplaceId(wp)
  if (w === 'immoralia') return quizImmoralia
  if (w === 'general') return quizGeneral
  if (w === 'immedia') return quizImmedia
  return quizImcontent
}

/** @param {string} wp */
export function getPreguntasTrueFalse(wp) {
  const w = normalizeWorkplaceId(wp)
  if (w === 'immoralia') return trueFalseImmoralia
  if (w === 'general') return trueFalseGeneral
  if (w === 'immedia') return trueFalseImmedia
  return trueFalseImcontent
}

/** @param {string} wp */
export function getParesHerramienta(wp) {
  const w = normalizeWorkplaceId(wp)
  if (w === 'immoralia') return paresImmoralia
  if (w === 'general') return matchGeneral
  if (w === 'immedia') return matchImmedia
  return matchImcontent
}

/** @param {string} wp */
export function getPalabrasRevueltas(wp) {
  const w = normalizeWorkplaceId(wp)
  if (w === 'immoralia') return scrambleImmoralia
  if (w === 'general') return scrambleGeneral
  if (w === 'immedia') return scrambleImmedia
  return scrambleImcontent
}

/** @param {string} wp */
export function getPreguntasIntruso(wp) {
  const w = normalizeWorkplaceId(wp)
  if (w === 'immoralia') return intrusoImmoralia
  if (w === 'general') return intrusoGeneral
  if (w === 'immedia') return intrusoImmedia
  return intrusoImcontent
}

/** @param {string} wp */
export function getPasosProceso(wp) {
  const w = normalizeWorkplaceId(wp)
  if (w === 'immoralia') return pasosGeneral
  if (w === 'general') return pasosGeneral
  if (w === 'immedia') {
    return [
      'Alinear objetivos de negocio y KPIs con el cliente',
      'Definir estructura de campanas y presupuestos por plataforma',
      'Implementar tracking, creatividades y lanzamientos',
      'Optimizar y documentar cambios con criterio de performance',
      'Reportar resultados, aprendizajes y siguientes pasos',
    ]
  }
  return [
    'Entender marca, tono y objetivos de contenido',
    'Planificar calendario y briefs con equipo creativo',
    'Producir y revisar piezas (diseno, copy, video)',
    'Publicar, moderar comunidad y medir rendimiento',
    'Iterar con datos y alinear con cliente / estrategia',
  ]
}

/** Modulo 1: micro-tests tipo examen para todos los espacios (lista en workplaceModulo1Repaso). */
export function getModulo1RepasoItems(wp) {
  const w = normalizeWorkplaceId(wp)
  if (w === 'immoralia') return modulo1Immoralia
  if (w === 'general') return modulo1General
  if (w === 'immedia') return modulo1Immedia
  if (w === 'imcontent') return modulo1Imcontent
  return modulo1General
}

export function getMaxModulo1Registros(wp) {
  void wp
  return EXAM_CAPS.modulo1 * 10
}

/**
 * Maximos por clave scoreByModule segun espacio (mismas claves que siempre).
 * @param {string} workplace
 */
export function getMaxByModuleForWorkplace(workplace) {
  const wp = normalizeWorkplaceId(workplace)
  const pairs = getParesHerramienta(wp)
  const scenario = getScenarioRounds(wp)
  const memory = getMemoryPairs(wp)
  const whoAsk = getWhoAskRounds(wp)

  return {
    registros: EXAM_CAPS.modulo1 * 10,
    valores: VALORES_MAX,
    quiz: EXAM_CAPS.quiz * 20,
    puzzle: PUZZLE_MAX,
    miniTrueFalse: EXAM_CAPS.trueFalse * 8,
    miniMatch: pairs.length * 10,
    miniScramble: EXAM_CAPS.scramble * 10,
    miniOdd: EXAM_CAPS.oddOne * 10,
    miniScenario: scenario.length * SCENARIO_PTS_PER_ROUND,
    miniMemory: memory.length * MEMORY_PTS_PER_PAIR,
    miniWordle: WORDLE_MAX * WORDLE_ROUNDS_PER_SESSION,
    miniWhoToAsk: whoAsk.length * WHO_ASK_PTS,
  }
}
