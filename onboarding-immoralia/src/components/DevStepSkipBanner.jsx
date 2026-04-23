import { useLocation } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import { FINISH_STEP } from '../lib/onboardingSteps'

/**
 * Barra temporal (dev): flecha para avanzar paso sin completar minijuegos.
 * Quitar este componente y skipStepDev del contexto antes de produccion.
 */
export default function DevStepSkipBanner() {
  const { pathname } = useLocation()
  const { userName, hydrated, stepIndex, skipStepDev } = useOnboarding()

  const showHere =
    pathname === '/teoria' ||
    pathname.startsWith('/teoria/') ||
    pathname === '/minijuegos'

  if (!hydrated || !userName || !showHere) return null

  const atEnd = stepIndex >= FINISH_STEP

  return (
    <div
      className="sticky top-0 z-[100] flex flex-wrap items-center justify-center gap-3 border-b border-amber-500/50 bg-amber-950/95 px-3 py-2 text-amber-50 backdrop-blur-sm"
      role="region"
      aria-label="Atajo de desarrollo"
    >
      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300/90">
        Dev — quitar luego
      </span>
      <button
        type="button"
        disabled={atEnd}
        title={atEnd ? 'Ultimo paso del recorrido' : 'Avanza un paso sin jugar (guarda progreso)'}
        className="inline-flex items-center gap-2 rounded-lg border border-amber-400/60 bg-amber-500/20 px-3 py-1.5 text-sm font-semibold text-amber-50 transition hover:bg-amber-500/30 disabled:cursor-not-allowed disabled:opacity-40"
        onClick={skipStepDev}
      >
        <span aria-hidden className="text-lg leading-none">
          →
        </span>
        Saltar paso
      </button>
      <span className="text-[11px] text-amber-200/80">
        paso {stepIndex} / {FINISH_STEP}
      </span>
    </div>
  )
}
