/** PRNG determinista por semilla (orden estable entre recargas y compatible con resume). */
function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function seedFromNumber(id) {
  const n = Number(id)
  if (!Number.isFinite(n)) return 1
  return (Math.imul(n, 2654435761) >>> 0) ^ 0x9e3779b9
}

/**
 * Baraja opciones de forma estable por `id` de pregunta y recalcula `correctIndex`.
 * Si hay textos duplicados en opciones, no altera la fila (evita ambigüedad).
 * @template {{ id?: number, options: string[], correctIndex: number }} Q
 * @param {Q} q
 * @returns {Q}
 */
export function shuffleQuizOptionsDeterministic(q) {
  if (!q?.options?.length) return q
  const opts = [...q.options]
  if (new Set(opts).size !== opts.length) return q
  const correctLabel = opts[q.correctIndex]
  const rand = mulberry32(seedFromNumber(q.id ?? 0))
  for (let i = opts.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    ;[opts[i], opts[j]] = [opts[j], opts[i]]
  }
  const correctIndex = opts.indexOf(correctLabel)
  if (correctIndex < 0) return q
  return { ...q, options: opts, correctIndex }
}
