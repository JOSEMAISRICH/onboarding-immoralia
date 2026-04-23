/**
 * SOPs internos: titulos por grupo, texto en app y/o enlace externo (p. ej. ClickUp).
 * Videos: URL de embed (YouTube, Loom, etc.); no se alojan archivos pesados en el front.
 */

/** @typedef {{ id: string, label: string }} SopGroup */

/** @type {SopGroup[]} */
export const SOP_GROUPS = [
  { id: 'operaciones', label: 'Operaciones' },
  { id: 'contenido', label: 'Contenido' },
]

/**
 * @typedef {{
 *   id: string
 *   groupId: string
 *   title: string
 *   paragraphs?: string[]
 *   externalUrl?: string
 *   externalLabel?: string
 *   videoEmbedUrl?: string
 * }} SopItem
 */

/** @type {SopItem[]} */
export const SOPS = [
  {
    id: 'ejemplo-fichaje',
    groupId: 'operaciones',
    title: 'Errores o cambios en fichaje (proceso interno)',
    paragraphs: [
      'Resumen: si detectas un error en el registro o necesitas una correccion, sigue el canal y el formulario que marque tu responsable.',
      'El texto del procedimiento vive aqui; el enlace de abajo es solo para profundizar en la tarea o doc en ClickUp cuando exista.',
    ],
    externalUrl: undefined,
    externalLabel: 'Profundizar en ClickUp (cuando exista el enlace)',
    /** Vídeo de prueba embebido en la app; sustituir por el real del equipo. */
    videoEmbedUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
  },
  {
    id: 'ejemplo-brief',
    groupId: 'contenido',
    title: 'Brief creativo: que debe incluir (minimo)',
    paragraphs: [
      'Objetivo del mensaje, publico, tono de marca, plazos, formatos y referencias si las hay.',
      'La plantilla o checklist larga puede estar en ClickUp; aqui va el resumen que necesitas en pantalla.',
    ],
    externalUrl: undefined,
    externalLabel: 'Profundizar en ClickUp / plantilla (cuando exista el enlace)',
    videoEmbedUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
  },
]

/**
 * @param {string} groupId
 */
export function getGroupLabel(groupId) {
  return SOP_GROUPS.find((g) => g.id === groupId)?.label || groupId
}

/**
 * Convierte enlace de visionado de YouTube a URL de embed si hace falta.
 * @param {string | undefined} url
 * @returns {string | null}
 */
export function normalizeVideoEmbedUrl(url) {
  if (!url || typeof url !== 'string') return null
  const t = url.trim()
  if (t.includes('youtube.com/embed/')) return t
  const m = t.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/)
  if (m) return `https://www.youtube.com/embed/${m[1]}`
  if (t.includes('loom.com/embed')) return t
  if (t.includes('drive.google.com') && t.includes('/preview')) return t
  return t
}

/**
 * @param {string} sopId
 * @returns {SopItem | undefined}
 */
export function getSopById(sopId) {
  return SOPS.find((s) => s.id === sopId)
}
