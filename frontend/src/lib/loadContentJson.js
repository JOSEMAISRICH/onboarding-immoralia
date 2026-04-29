/**
 * Carga opcional de JSON remoto (p. ej. Google Sheet publicado como JSON o archivo en Drive).
 * Define `VITE_CONTENT_JSON_URL` en `.env` con una URL publica (GET, CORS permitido).
 *
 * Formato esperado: ver `mergeQuizQuestions` / `mergeTrueFalseItems` en `contentMerge.js`.
 *
 * @returns {Promise<unknown | null>}
 */
export async function fetchOptionalContentJson() {
  const url = import.meta.env.VITE_CONTENT_JSON_URL
  if (!url || typeof url !== 'string') return null
  try {
    const r = await fetch(url, { credentials: 'omit' })
    if (!r.ok) return null
    return await r.json()
  } catch {
    return null
  }
}
