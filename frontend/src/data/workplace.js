/** @typedef {'general' | 'immoralia' | 'imcontent' | 'immedia'} WorkplaceId */

/** @type {WorkplaceId[]} */
export const WORKPLACE_IDS = ['general', 'immoralia', 'imcontent', 'immedia']

/**
 * @param {unknown} v
 * @returns {WorkplaceId}
 */
export function normalizeWorkplaceId(v) {
  if (v === 'general' || v === 'immoralia' || v === 'imcontent' || v === 'immedia') return v
  return 'general'
}

/** Opciones al iniciar: elige antes de poner el nombre (orden UX). */
export const WORKPLACE_OPTIONS = [
  {
    id: /** @type {const} */ ('general'),
    label: 'General',
    hint: 'Contenido comun para cualquier equipo del grupo.',
    emoji: '🌐',
    hasSpecificDocs: false,
  },
  {
    id: /** @type {const} */ ('immoralia'),
    label: 'Immoralia',
    hint: 'Documentacion y cultura Immoralia en la biblioteca de teoria.',
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
