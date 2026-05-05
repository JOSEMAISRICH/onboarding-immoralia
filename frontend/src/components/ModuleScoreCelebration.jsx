import { useMemo } from 'react'
import MiniConfetti from './MiniConfetti'
import { getUnitForStep } from '../data/learningUnits'
import {
  pickLevelDoneHeadline,
  pickLevelDoneSub,
  pickNextIntro,
} from '../lib/minigameTransitionCopy'

/**
 * Transición entre minijuegos (tono Duolingo): celebra lo hecho y presenta el siguiente reto.
 *
 * @param {{ points: number, title?: string, finishedStepIndex: number, finishStepIndex: number, onDone: () => void }} props
 */
function ModuleScoreCelebration({
  points,
  title = 'Módulo completado',
  finishedStepIndex,
  finishStepIndex,
  onDone,
}) {
  const doneUnit = useMemo(
    () => getUnitForStep(finishedStepIndex, finishStepIndex),
    [finishedStepIndex, finishStepIndex],
  )
  const nextUnit = useMemo(
    () => getUnitForStep(finishedStepIndex + 1, finishStepIndex),
    [finishedStepIndex, finishStepIndex],
  )

  const headline = useMemo(
    () => pickLevelDoneHeadline(finishedStepIndex, Number(points) || 0),
    [finishedStepIndex, points],
  )
  const sub = useMemo(() => pickLevelDoneSub(finishedStepIndex, Number(points) || 0), [finishedStepIndex, points])
  const nextIntro = useMemo(() => pickNextIntro(finishedStepIndex), [finishedStepIndex])

  const isLastBeforeFinish = nextUnit?.stepIndex === finishStepIndex

  return (
    <div
      className="animate-step-complete-in fixed inset-0 z-[140] flex items-center justify-center bg-emerald-950/25 p-4 backdrop-blur-[10px] md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cele-headline"
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <MiniConfetti density={26} />
      </div>

      <div className="relative z-[1] w-full max-w-2xl animate-fade-up overflow-hidden rounded-3xl border border-emerald-200/90 bg-gradient-to-b from-white via-emerald-50/40 to-blue-50/50 p-7 shadow-2xl shadow-emerald-200/40 md:p-10 lg:max-w-3xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-300/25 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-teal-300/20 blur-3xl" aria-hidden />

        <p className="text-center text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-700">
          {headline}
        </p>

        <div className="mt-4 flex flex-col items-center gap-2 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-emerald-300 bg-white text-4xl shadow-md shadow-emerald-100">
            {doneUnit?.emoji ?? '⭐'}
          </span>
          <h2 id="cele-headline" className="font-display text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
            {doneUnit?.title ?? title}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">{sub}</p>
        </div>

        <div className="mx-auto mt-5 flex max-w-xs flex-col items-center rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-4 shadow-inner shadow-amber-100">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-900/80">Puntos en este reto</p>
          <p className="font-display mt-1 text-5xl font-extrabold tabular-nums text-amber-950 md:text-6xl">
            +{points}
          </p>
          <p className="mt-1 text-center text-[11px] text-amber-900/70">{title}</p>
        </div>

        {nextUnit ? (
          <div className="mt-6 rounded-2xl border border-blue-200/90 bg-white/90 p-4 shadow-sm md:p-5">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.22em] text-blue-800">
              {nextIntro}
            </p>
            <div className="mt-3 flex items-start gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-2xl">
                {nextUnit.emoji}
              </span>
              <div className="min-w-0 text-left">
                <p className="font-display text-lg font-bold text-slate-900 md:text-xl">{nextUnit.title}</p>
                <p className="mt-1 text-sm leading-snug text-slate-600">{nextUnit.objective}</p>
                <p className="mt-2 text-xs font-semibold text-blue-800">
                  ~{nextUnit.minutes} min ·{' '}
                  {isLastBeforeFinish ? 'último empujón antes del cierre 🏁' : 'dale sin miedo'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-6 text-center text-sm font-semibold text-slate-600">
            ¡Último esfuerzo! Siguiente pantalla cargando…
          </p>
        )}

        <button
          type="button"
          className="mt-8 w-full rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 py-4 text-lg font-bold text-white shadow-lg shadow-teal-600/25 transition hover:brightness-[1.06] active:scale-[0.99] md:py-5 md:text-xl"
          onClick={onDone}
        >
          Continuar al siguiente reto
        </button>
      </div>
    </div>
  )
}

export default ModuleScoreCelebration
