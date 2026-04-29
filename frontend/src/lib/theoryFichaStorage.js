const KEY = 'immoralia-theory-ficha-quiz-v1'

/** Se dispara en `window` cuando se guarda una puntuacion de repaso (misma pestaña). */
export const THEORY_FICHA_SCORES_UPDATED = 'immoralia-theory-ficha-quiz-recorded'

/**
 * Ultima puntuacion del micro-quiz por ficha de teoria (/teoria/ficha/:id), solo en este navegador.
 * @param {string} topicId
 * @param {number} points
 */
export function recordTheoryFichaQuizScore(topicId, points) {
  try {
    const raw = localStorage.getItem(KEY)
    /** @type {Record<string, { points: number, at: number }>} */
    const map = raw && typeof raw === 'string' ? JSON.parse(raw) : {}
    map[topicId] = { points: Number(points) || 0, at: Date.now() }
    localStorage.setItem(KEY, JSON.stringify(map))
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(THEORY_FICHA_SCORES_UPDATED))
    }
  } catch {
    /* ignore quota / private mode */
  }
}

/**
 * @returns {Record<string, { points: number, at: number }>}
 */
export function getTheoryFichaQuizScores() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const data = JSON.parse(raw)
    return typeof data === 'object' && data !== null ? data : {}
  } catch {
    return {}
  }
}
