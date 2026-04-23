/** Textos al subir de rango de recorrido (solo entonces se muestra el overlay). */

const TITLES = {
  bronze: 'Nuevo rango: Bronce',
  silver: 'Nuevo rango: Plata',
  gold: 'Nuevo rango: Oro',
  platinum: 'Nuevo rango: Platino',
  starting: 'Sigues avanzando',
}

const SUBS = {
  bronze: 'Has cruzado el primer umbral del recorrido. Sigue cuando quieras.',
  silver: 'Mitad del camino superada con buen ritmo.',
  gold: 'Ya queda poco para cerrar el onboarding.',
  platinum: 'Recorrido al maximo: ultimo empujon antes de la pantalla final.',
  starting: '',
}

export function getTierUpTitle(newTierId) {
  return TITLES[newTierId] || 'Progreso'
}

export function getTierUpSubtitle(newTierId) {
  return SUBS[newTierId] || ''
}
