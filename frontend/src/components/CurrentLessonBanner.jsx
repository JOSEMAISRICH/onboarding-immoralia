import { useMemo } from 'react'

const VIBES = [
  'Modo concentración: activado (con buen rollo).',
  'Respira, lee el objetivo y a jugar.',
  'Cada acierto suma — y cada fallo ensena.',
  'Tu cerebro ya esta calentando motores.',
]

/**
 * @param {{ unit: { title: string, objective: string, minutes: number, emoji: string } | undefined }} props
 */
function CurrentLessonBanner({ unit }) {
  const vibe = useMemo(() => {
    if (!unit) return VIBES[0]
    const i = (unit.title.length + unit.minutes * 7) % VIBES.length
    return VIBES[i]
  }, [unit])

  if (!unit) return null

  return (
    <div className="animate-bounce-in-soft mb-6 overflow-hidden rounded-2xl border border-cyan-400/35 bg-gradient-to-r from-cyan-950/70 via-indigo-950/55 to-violet-950/45 px-4 py-3 shadow-lg shadow-cyan-900/20 ring-1 ring-white/5">
      <div className="flex flex-wrap items-center gap-2 gap-y-1">
        <span className="animate-emoji-pop text-3xl" aria-hidden>
          {unit.emoji}
        </span>
        <p className="text-[11px] font-bold uppercase tracking-widest text-cyan-200/95">Mision actual</p>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-100">
          ~{unit.minutes} min
        </span>
        <span className="ml-auto text-xs font-semibold text-fuchsia-200/90">+XP al completar</span>
      </div>
      <p className="mt-2 text-xl font-bold leading-tight text-white md:text-2xl">{unit.title}</p>
      <p className="mt-2 text-base leading-relaxed text-cyan-100/90 md:text-lg">{unit.objective}</p>
      <p className="mt-3 text-xs italic text-slate-400 md:text-sm">{vibe}</p>
    </div>
  )
}

export default CurrentLessonBanner
