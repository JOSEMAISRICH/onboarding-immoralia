import { useMemo } from 'react'

const VIBES = [
  'Modo concentración: activado (con buen rollo).',
  'Respira, lee el objetivo y a jugar.',
  'Cada acierto suma — y cada fallo ensena.',
  'Tu cerebro ya esta calentando motores.',
]

/**
 * @param {{
 *   unit: { title: string, objective: string, minutes: number, emoji: string } | undefined
 *   pointsCap?: number | null
 * }} props
 */
function CurrentLessonBanner({ unit, pointsCap }) {
  const vibe = useMemo(() => {
    if (!unit) return VIBES[0]
    const i = (unit.title.length + unit.minutes * 7) % VIBES.length
    return VIBES[i]
  }, [unit])

  if (!unit) return null

  return (
    <div className="animate-bounce-in-soft mb-6 overflow-hidden rounded-2xl border border-blue-100/90 bg-gradient-to-r from-emerald-50/90 via-sky-50 to-blue-50/80 px-4 py-3 shadow-lg shadow-blue-100/30 ring-1 ring-white/70">
      <div className="flex flex-wrap items-center gap-2 gap-y-1">
        <span className="animate-emoji-pop text-3xl" aria-hidden>
          {unit.emoji}
        </span>
        <p className="text-[11px] font-bold uppercase tracking-widest text-blue-900">Mision actual</p>
        <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-blue-950 shadow-sm">
          ~{unit.minutes} min
        </span>
        {typeof pointsCap === 'number' && pointsCap > 0 ? (
          <span className="ml-auto text-xs font-semibold text-blue-900">Hasta {pointsCap} pts</span>
        ) : null}
      </div>
      <p className="mt-2 text-xl font-bold leading-tight text-slate-900 md:text-2xl">{unit.title}</p>
      <p className="mt-2 text-base leading-relaxed text-slate-700 md:text-lg">{unit.objective}</p>
      <p className="mt-3 text-xs italic text-slate-400 md:text-sm">{vibe}</p>
    </div>
  )
}

export default CurrentLessonBanner
