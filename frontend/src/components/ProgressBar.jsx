import { isApiConfigured } from '../api/onboarding'
import JourneyRing from './JourneyRing'
import {
  getJourneyTier,
  getNextTierHint,
} from '../lib/journeyTier'
import PointsBadge from './PointsBadge'

function ProgressBar({
  currentStep,
  totalSteps,
  points,
  userName,
  journeyCompletionPercent,
  showJourneyTier,
  showRestart = false,
  onRestart,
  streakDays = 0,
  /** URL absoluta a la pagina solo-teoria (nueva pestana) */
  theoryUrl,
  /** Texto del enlace; por defecto indica el espacio si pasas workplaceLabel */
  theoryLinkLabel = 'Teoria (otra pagina)',
}) {
  const tier = getJourneyTier(journeyCompletionPercent)
  const nextHint = getNextTierHint(journeyCompletionPercent)
  const barWidth = journeyCompletionPercent

  return (
    <header className="sticky top-0 z-20 border-b border-amber-400/25 bg-indigo-950/90 px-5 py-4 shadow-md shadow-amber-950/30 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 space-y-1">
          <p className="flex flex-wrap items-baseline gap-x-2 text-lg font-bold md:text-xl">
            <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-sky-200 bg-clip-text text-transparent">
              Immoralia · Onboarding
            </span>
            <span className="text-sm font-semibold text-amber-100/90">(modo divertido)</span>
          </p>
          <p className="text-xs font-medium text-amber-100/75 md:text-sm">
            Paso {currentStep} de {totalSteps}
            {' · '}
            <span
              className={
                isApiConfigured()
                  ? 'rounded px-1.5 py-0.5 font-medium text-lime-300'
                  : 'rounded px-1.5 py-0.5 font-medium text-slate-500'
              }
              title={
                isApiConfigured()
                  ? 'VITE_API_URL definida: sincronizacion con backend activa'
                  : 'Sin VITE_API_URL: solo localStorage. Copia .env.example a .env y reinicia npm run dev'
              }
            >
              API: {isApiConfigured() ? 'sí' : 'no'}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-amber-50/95 md:text-base">
          {theoryUrl ? (
            <a
              href={theoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/40 bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-100 shadow-sm shadow-violet-900/20 transition hover:bg-violet-500/25 hover:brightness-105"
              title="Abre la teoria solo de tu espacio en otra pestana"
            >
              <span aria-hidden>📚</span>
              {theoryLinkLabel}
            </a>
          ) : null}
          {userName ? (
            <span className="text-base font-semibold text-white md:text-lg">
              Hola, {userName}
            </span>
          ) : (
            <span className="text-base text-amber-100/90">Nuevo miembro</span>
          )}
          {streakDays > 0 ? (
            <span
              className="inline-flex items-center gap-1 rounded-full border border-orange-400/30 bg-orange-500/15 px-2 py-0.5 text-xs font-semibold text-orange-100"
              title="Dias seguidos con sesion de estudio en este navegador"
            >
              <span aria-hidden>🔥</span>
              Racha {streakDays}
            </span>
          ) : null}
          <PointsBadge points={points} />
          {showRestart && onRestart ? (
            <button
              type="button"
              className="text-xs text-amber-200/60 underline-offset-2 hover:text-amber-100 hover:underline"
              onClick={onRestart}
              title="Vuelve al primer paso; tu progreso anterior sigue en el servidor si usas API"
            >
              Repetir desde el inicio
            </button>
          ) : null}
        </div>
      </div>

      {showJourneyTier ? (
        <div className="mx-auto mt-3 flex w-full max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-start gap-3">
            <JourneyRing percent={journeyCompletionPercent} size={64} stroke={5} />
            <div
              className={`inline-flex max-w-full min-w-0 flex-1 items-center gap-2 rounded-xl border px-3 py-2 text-left ${tier.badgeClass}`}
            >
              <span className="text-xl" aria-hidden>
                {tier.emoji}
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Rango del recorrido</p>
                <p className="mt-1 text-lg font-bold text-white md:text-xl">
                  {tier.label}{' '}
                  <span className="text-base font-normal text-white/75">· {journeyCompletionPercent}%</span>
                </p>
                <p className="mt-1 text-sm leading-snug text-white/75">{tier.description}</p>
              </div>
            </div>
          </div>
          {nextHint ? (
            <p className="text-xs text-amber-200/75 sm:max-w-xs sm:text-right">
              <span className="text-amber-100/50">Siguiente: </span>
              {nextHint}
            </p>
          ) : (
            <p className="text-xs font-medium text-amber-200 sm:text-right">Recorrido completado</p>
          )}
        </div>
      ) : null}

      <div
        className="mx-auto mt-3 h-2.5 w-full max-w-6xl overflow-hidden rounded-full bg-slate-800/80 ring-1 ring-amber-500/15"
        role="progressbar"
        aria-valuenow={barWidth}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Recorrido del onboarding al ${barWidth} por ciento`}
      >
        <div
          className={`progress-playful-fill h-full rounded-full bg-gradient-to-r transition-all duration-500 ${tier.barClass}`}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </header>
  )
}

export default ProgressBar
