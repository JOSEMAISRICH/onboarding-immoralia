import { useCallback, useEffect, useRef } from 'react'
import { getJourneyCompletionPercent } from '../lib/journeyTier'
import { getTierUpSubtitle, getTierUpTitle } from '../lib/tierUpCopy'
import JourneyRing from './JourneyRing'
import MiniConfetti from './MiniConfetti'

const AUTO_MS = 2200

/**
 * Solo se muestra al **subir de rango** del recorrido (Bronce, Plata…), no tras cada modulo.
 */
function StepCompleteOverlay({ fromStep, newTierId, onContinue }) {
  const previewPercent = getJourneyCompletionPercent(fromStep + 1)
  const timerRef = useRef(null)
  const doneRef = useRef(false)

  const go = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    if (timerRef.current) clearTimeout(timerRef.current)
    onContinue()
  }, [onContinue])

  useEffect(() => {
    timerRef.current = setTimeout(go, AUTO_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [go])

  const title = getTierUpTitle(newTierId)
  const sub = getTierUpSubtitle(newTierId)

  return (
    <div
      className="animate-step-complete-in fixed inset-0 z-[100] flex items-center justify-center bg-indigo-950/80 p-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tier-up-title"
    >
      <MiniConfetti density={34} />
      <div className="celebration-glow relative z-[1] max-w-md rounded-3xl border border-amber-400/35 bg-gradient-to-b from-amber-500/20 via-rose-500/10 to-indigo-950/90 p-8 text-center shadow-2xl">
        <div
          className="animate-check-pop mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-300/70 bg-gradient-to-br from-amber-400/30 to-orange-500/25 text-3xl text-amber-100"
          aria-hidden
        >
          <span className="animate-wiggle-soft inline-block">🚀</span>
        </div>
        <h2
          id="tier-up-title"
          className="bg-gradient-to-r from-amber-100 via-rose-100 to-sky-100 bg-clip-text text-xl font-bold text-transparent md:text-2xl"
        >
          {title}
        </h2>
        {sub ? (
          <p className="mt-3 text-sm leading-relaxed text-amber-50/90">{sub}</p>
        ) : null}
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-amber-300/90">
            Recorrido ahora
          </p>
          <JourneyRing percent={previewPercent} size={88} stroke={6} tone="dark" />
        </div>
        <button
          type="button"
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-orange-900/30 transition hover:scale-[1.02] hover:brightness-110 active:scale-[0.99]"
          onClick={go}
        >
          ¡Vamos! →
        </button>
        <p className="mt-2 text-xs text-amber-200/50">O espera un momento; seguirá solo.</p>
      </div>
    </div>
  )
}

export default StepCompleteOverlay
