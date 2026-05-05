import { DOC_TOPIC_IDS } from '../data/docTopicOrder'

const KEY = 'immoralia-theory-ficha-read-v1'

/** @fires CustomEvent#THEORY_FICHA_READS_UPDATED */
export const THEORY_FICHA_READS_UPDATED = 'immoralia-theory-ficha-reads-updated'

/**
 * @returns {Record<string, number>} topicId → timestamp
 */
export function getTheoryFichaReadMap() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const data = JSON.parse(raw)
    return typeof data === 'object' && data !== null ? data : {}
  } catch {
    return {}
  }
}

/**
 * @param {string} topicId
 */
export function markTheoryFichaRead(topicId) {
  try {
    const map = { ...getTheoryFichaReadMap(), [topicId]: Date.now() }
    localStorage.setItem(KEY, JSON.stringify(map))
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(THEORY_FICHA_READS_UPDATED))
    }
  } catch {
    /* ignore quota / private mode */
  }
}

/**
 * @param {string} topicId
 */
export function isTheoryFichaRead(topicId) {
  return Boolean(getTheoryFichaReadMap()[topicId])
}

export function countImmoraliaTheoryFichasRead() {
  const map = getTheoryFichaReadMap()
  return DOC_TOPIC_IDS.filter((id) => map[id]).length
}

export function allImmoraliaTheoryFichasRead() {
  const map = getTheoryFichaReadMap()
  return DOC_TOPIC_IDS.every((id) => map[id])
}
