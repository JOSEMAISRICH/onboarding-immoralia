import { Link } from 'react-router-dom'
import JourneyRing from './JourneyRing'
import SopsNavLink from './SopsNavLink'
import {
  getJourneyTier,
  getNextTierHint,
} from '../lib/journeyTier'
import PointsBadge from './PointsBadge'
import { useExamProgressContext } from '../context/ExamProgressContext'

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
  /** Ruta interna (SPA) a la biblioteca de teoría; preferir a `theoryUrl`. */
  theoryTo,
  /** URL absoluta a solo-teoría (nueva pestaña); solo si no usas `theoryTo`. */
  theoryUrl,
  /** Texto del enlace; por defecto indica el espacio si pasas workplaceLabel */
  theoryLinkLabel = 'Teoria (otra pagina)',
}) {
  const { examProgressLine } = useExamProgressContext()
  const tier = getJourneyTier(journeyCompletionPercent)
  const nextHint = getNextTierHint(journeyCompletionPercent)
  const barWidth = journeyCompletionPercent

  return (
    <header className="sticky top-0 z-20 border-b border-blue-100/95 bg-white/90 px-5 py-4 shadow-md shadow-blue-100/40 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 space-y-1">
          <p className="text-lg font-bold md:text-xl">
            <span className="bg-gradient-to-r from-blue-800 via-teal-700 to-emerald-700 bg-clip-text text-transparent">
              Immoralia · Onboarding
            </span>
          </p>
          <p className="text-xs font-medium text-slate-600 md:text-sm">
            Paso {currentStep} de {totalSteps}
          </p>
          {examProgressLine ? (
            <p className="text-xs font-bold tabular-nums text-teal-800 md:text-sm">{examProgressLine}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-800 md:text-base">
          {theoryTo ? (
            <Link
              to={theoryTo}
              className="inline-flex min-h-[2.75rem] shrink-0 items-center gap-2 rounded-xl border border-blue-200/90 bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-950 shadow-sm transition hover:bg-blue-100 hover:brightness-[1.02] md:min-h-[3rem] md:gap-2.5 md:px-5 md:py-3 md:text-base"
              title="Biblioteca de teoría de tu espacio. Tu paso en el examen se guarda: al volver sigues donde ibas."
            >
              <span className="text-lg md:text-xl" aria-hidden>
                📚
              </span>
              {theoryLinkLabel}
            </Link>
          ) : theoryUrl ? (
            <a
              href={theoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[2.75rem] shrink-0 items-center gap-2 rounded-xl border border-blue-200/90 bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-950 shadow-sm transition hover:bg-blue-100 hover:brightness-[1.02] md:min-h-[3rem] md:gap-2.5 md:px-5 md:py-3 md:text-base"
              title="Abre la teoría en otra pestaña"
            >
              <span className="text-lg md:text-xl" aria-hidden>
                📚
              </span>
              {theoryLinkLabel}
            </a>
          ) : null}
          <SopsNavLink compact />
          {userName ? (
            <span className="text-base font-semibold text-slate-900 md:text-lg">
              Hola, {userName}
            </span>
          ) : (
            <span className="text-base text-slate-700">Nuevo miembro</span>
          )}
          {streakDays > 0 ? (
            <span
              className="inline-flex items-center gap-1 rounded-full border border-orange-300/70 bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-900"
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
              className="inline-flex min-h-[2.5rem] shrink-0 items-center rounded-xl border-2 border-slate-800 bg-slate-900 px-3 py-2 text-xs font-bold text-white shadow-md shadow-slate-900/20 transition hover:bg-slate-800 md:text-sm"
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
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Rango del recorrido</p>
                <p className="mt-1 text-lg font-bold text-slate-900 md:text-xl">
                  {tier.label}{' '}
                  <span className="text-base font-normal text-slate-600">· {journeyCompletionPercent}%</span>
                </p>
                <p className="mt-1 text-sm leading-snug text-slate-700">{tier.description}</p>
              </div>
            </div>
          </div>
          {nextHint ? (
            <p className="text-xs text-slate-600 sm:max-w-xs sm:text-right">
              <span className="text-slate-500">Siguiente: </span>
              {nextHint}
            </p>
          ) : (
            <p className="text-xs font-medium text-emerald-800 sm:text-right">Recorrido completado</p>
          )}
        </div>
      ) : null}

      <div
        className="mx-auto mt-3 h-2.5 w-full max-w-6xl overflow-hidden rounded-full bg-blue-50 ring-1 ring-blue-200/55"
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
