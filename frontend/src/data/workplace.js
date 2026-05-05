/** @typedef {'general' | 'immoralia' | 'imcontent' | 'immedia'} WorkplaceId */

/** @type {WorkplaceId[]} */
export const WORKPLACE_IDS = ['immoralia', 'imcontent', 'immedia']

/**
 * Espacio efectivo del onboarding. El valor legacy `general` se unifica con Immoralia.
 * @param {unknown} v
 * @returns {'immoralia' | 'imcontent' | 'immedia'}
 */
export function normalizeWorkplaceId(v) {
  if (v === 'imcontent' || v === 'immedia') return v
  return 'immoralia'
}

/** Opciones al iniciar (sin “General”: la biblioteca va por marca / Immoralia como base). */
export const WORKPLACE_OPTIONS = [
  {
    id: /** @type {const} */ ('immoralia'),
    label: 'Immoralia',
    hint: 'Teoria interna: herramientas (n8n, ClickUp…), procesos y enlaces a formacion en video cuando los comparta el equipo.',
    emoji: '✨',
    hasSpecificDocs: true,
  },
  {
    id: /** @type {const} */ ('imcontent'),
    label: 'Imcontent',
    hint: 'Opcion reservada; contenido especifico proximamente.',
    emoji: '📌',
    hasSpecificDocs: false,
  },
  {
    id: /** @type {const} */ ('immedia'),
    label: 'Immedia',
    hint: 'Opcion reservada; contenido especifico proximamente.',
    emoji: '📌',
    hasSpecificDocs: false,
  },
]
