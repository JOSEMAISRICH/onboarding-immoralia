import { normalizeWorkplaceId } from '../data/workplace'

/**
 * JSON opcional publicado (p. ej. desde Sheet→JSON). Mezcla por `id` sin sustituir arrays enteros.
 *
 * Forma esperada:
 * ```
 * {
 *   "quiz": { "general": [{ "id": 1, "explanation": "..." }], "immoralia": [...] },
 *   "trueFalse": { "immedia": [{ "id": 2, "explanation": "..." }] }
 * }
 * ```
 * Tambien `quiz.all` / `trueFalse.all` para todos los espacios.
 *
 * @param {unknown} remote
 * @param {string} workplace
 */
function patchListFor(remote, branch, workplace) {
  if (!remote || typeof remote !== 'object') return null
  const r = /** @type {Record<string, unknown>} */ (remote)
  const block = r[branch]
  if (!block || typeof block !== 'object') return null
  const b = /** @type {Record<string, unknown>} */ (block)
  const wp = normalizeWorkplaceId(workplace)
  const all = b.all
  const specific = b[wp]
  if (Array.isArray(specific)) return specific
  if (Array.isArray(all)) return all
  return null
}

/**
 * @template {{ id: number }} T
 * @param {T[]} base
 * @param {unknown} remote
 * @param {string} workplace
 * @returns {T[]}
 */
export function mergeQuizQuestions(base, remote, workplace) {
  const patchList = patchListFor(remote, 'quiz', workplace)
  if (!patchList) return base
  const byId = new Map(
    patchList.filter((p) => p && typeof p === 'object' && typeof p.id === 'number').map((p) => [p.id, p]),
  )
  return base.map((q) => {
    const patch = byId.get(q.id)
    return patch ? /** @type {T} */ ({ ...q, ...patch }) : q
  })
}

/**
 * @template {{ id: number }} T
 * @param {T[]} base
 * @param {unknown} remote
 * @param {string} workplace
 */
export function mergeTrueFalseItems(base, remote, workplace) {
  const patchList = patchListFor(remote, 'trueFalse', workplace)
  if (!patchList) return base
  const byId = new Map(
    patchList.filter((p) => p && typeof p === 'object' && typeof p.id === 'number').map((p) => [p.id, p]),
  )
  return base.map((q) => {
    const patch = byId.get(q.id)
    return patch ? /** @type {T} */ ({ ...q, ...patch }) : q
  })
}
