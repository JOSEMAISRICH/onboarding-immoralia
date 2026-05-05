/**
 * Medalla final segun % de PUNTOS (total / maximo en minijuegos).
 * No usa el % del recorrido: eso siempre es 100% al llegar aqui.
 *
 * Tres tonos visuales: dorada (alto), marrón/bronce (medio), gris (bajo) — siempre con mensaje positivo.
 */
/** @typedef {'gold' | 'bronze' | 'gray'} MedalTone */

/**
 * @returns {{
 *   id: string,
 *   label: string,
 *   emoji: string,
 *   phrase: string,
 *   cardClass: string,
 *   ringClass: string,
 *   tone: MedalTone,
 *   textClass: string,
 * }}
 */
export function getScoreMedal(percentScore) {
  const p = Math.max(0, Math.min(100, percentScore))
  if (p >= 95) {
    return {
      id: 'platinum',
      label: 'Medalla platino',
      emoji: '💎',
      phrase:
        'Rendimiento excelente: dominas el contenido y estas muy bien preparado o preparada para el dia a dia.',
      tone: 'gold',
      ringClass:
        'ring-4 ring-amber-300/80 shadow-[0_0_40px_rgba(251,191,36,0.35)] bg-gradient-to-br from-amber-400/30 to-yellow-600/20',
      cardClass:
        'border-amber-500/55 bg-gradient-to-br from-amber-900/85 via-amber-950/80 to-slate-950/90',
      textClass: 'text-amber-50',
    }
  }
  if (p >= 75) {
    return {
      id: 'gold',
      label: 'Medalla dorada',
      emoji: '🥇',
      phrase:
        'Muy buen resultado: bases solidas y criterio claro en los minijuegos. Sigue asi en el equipo.',
      tone: 'gold',
      ringClass:
        'ring-4 ring-amber-400/70 shadow-[0_0_32px_rgba(245,158,11,0.3)] bg-gradient-to-br from-amber-500/35 to-orange-700/25',
      cardClass: 'border-amber-500/50 bg-gradient-to-br from-amber-900/80 to-orange-950/85',
      textClass: 'text-amber-50',
    }
  }
  if (p >= 50) {
    return {
      id: 'silver',
      label: 'Medalla plateada',
      emoji: '🥈',
      phrase:
        'Buen equilibrio: has integrado gran parte del onboarding. Refuerza lo que te costo mas cuando puedas.',
      tone: 'bronze',
      ringClass:
        'ring-4 ring-stone-400/50 bg-gradient-to-br from-stone-600/40 to-amber-900/30',
      cardClass: 'border-stone-500/40 bg-gradient-to-br from-stone-700/35 to-amber-950/40',
      textClass: 'text-stone-100',
    }
  }
  if (p >= 25) {
    return {
      id: 'bronze',
      label: 'Medalla bronce',
      emoji: '🥉',
      phrase:
        'Has completado el recorrido: eso ya es un logro. Repasa los modulos con menor puntuacion con calma.',
      tone: 'bronze',
      ringClass:
        'ring-4 ring-orange-900/60 bg-gradient-to-br from-orange-900/50 to-amber-950/50',
      cardClass: 'border-orange-900/50 bg-gradient-to-br from-orange-950/45 to-stone-900/50',
      textClass: 'text-orange-50/95',
    }
  }
  return {
    id: 'start',
    label: 'Medalla gris',
    emoji: '🏅',
    phrase:
      'Recorrido terminado: lo importante es haber llegado al final. Mejora poco a poco lo que quieras reforzar.',
    tone: 'gray',
    ringClass: 'ring-4 ring-slate-500/50 bg-gradient-to-br from-slate-700/50 to-slate-900/60',
    cardClass: 'border-slate-500/45 bg-gradient-to-br from-slate-800/60 to-slate-950/70',
    textClass: 'text-slate-200',
  }
}
