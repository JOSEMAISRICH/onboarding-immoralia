/**
 * Enlace opcional a ClickUp para la ficha de teoria (workspace, lista o doc).
 * Definir en .env: VITE_CLICKUP_THEORY_URL=https://app.clickup.com/...
 */
export function getClickUpTheoryUrl() {
  const raw = import.meta.env.VITE_CLICKUP_THEORY_URL
  if (typeof raw !== 'string') return ''
  const t = raw.trim()
  return t || ''
}
