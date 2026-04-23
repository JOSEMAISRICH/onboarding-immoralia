import { extraGames } from '../data/extraMinijuegos10'
import { WORKPLACE_OPTIONS } from '../data/workplace'
import { getScoreMedal } from '../lib/finishMedal'

const baseLabels = {
  registros: 'Modulo 1: Documentacion interna (fichas + repaso)',
  valores: 'Minijuego 2: Valores del manifiesto',
  quiz: 'Minijuego 3: Gran quiz cultura y procesos',
  puzzle: 'Minijuego 4: Ordena el proceso',
  miniTrueFalse: 'Minijuego: Verdadero / falso',
  miniMatch: 'Minijuego: Empareja rol',
  miniScramble: 'Minijuego: Palabra revuelta',
  miniOdd: 'Minijuego: El intruso',
}

const extraLabels = Object.fromEntries(extraGames.map((g) => [g.key, g.listTitle]))

const labels = { ...baseLabels, ...extraLabels }

function formatElapsed(startedAt) {
  if (!startedAt) return 'N/A'
  const elapsedMs = Date.now() - startedAt
  const totalSeconds = Math.floor(elapsedMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}m ${seconds}s`
}

function Finish({
  userName,
  workplace = 'general',
  totalPoints,
  maxPoints,
  scoreByModule,
  maxByModule,
  startedAt,
  onReset,
}) {
  const percentScore = maxPoints === 0 ? 0 : Math.round((totalPoints / maxPoints) * 100)
  const perfectScore = totalPoints >= maxPoints
  const medal = getScoreMedal(percentScore)

  const moduleKeys = Object.keys(maxByModule)
  const workplaceLabel = WORKPLACE_OPTIONS.find((o) => o.id === workplace)?.label ?? 'General'

  return (
    <div className="text-center">
      <div className="flex justify-center">
        <div
          className={`inline-flex h-24 w-24 items-center justify-center rounded-full text-5xl ${medal.ringClass}`}
          aria-hidden
        >
          {medal.emoji}
        </div>
      </div>
      <p
        className="mx-auto mt-6 max-w-2xl px-2 text-3xl font-extrabold leading-[1.15] tracking-tight text-white md:text-4xl lg:text-5xl"
        id="finish-welcome"
      >
        {userName ? (
          <>
            <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-sky-200 bg-clip-text text-transparent">
              {userName}
            </span>
            {', ya eres parte de '}
            <span className="bg-gradient-to-r from-fuchsia-300 to-amber-200 bg-clip-text text-transparent">
              Immoralia
            </span>
            .
          </>
        ) : (
          <>
            Ya eres parte de{' '}
            <span className="bg-gradient-to-r from-fuchsia-300 to-amber-200 bg-clip-text text-transparent">
              Immoralia
            </span>
            .
          </>
        )}
      </p>
      <p className="mt-4 text-2xl font-semibold text-amber-100 md:text-3xl">Enhorabuena</p>

      <p className="mt-2 text-xs text-slate-500">
        La medalla depende de tu <strong className="text-slate-400">puntuacion en los minijuegos</strong> (
        {percentScore}% del maximo), no del recorrido.
      </p>
      <h2 className="mt-4 text-xl font-bold text-white md:text-2xl">Onboarding completado</h2>

      <p className="mt-2 text-xs text-slate-500">
        Espacio elegido al empezar: <strong className="text-slate-400">{workplaceLabel}</strong>
      </p>
      <p className="mt-3 text-sm text-slate-400">
        <strong className="text-emerald-300">100% del recorrido</strong> completado (todos los modulos).
        Tu <strong className="text-violet-300">rango Platino</strong> en la barra superior refleja haber
        cerrado el onboarding — bienvenida o bienvenido al equipo.
      </p>

      <p className="mt-2 text-slate-300">Tu puntuacion total es:</p>
      <p className="my-2 text-4xl font-extrabold text-cyan-200">
        {totalPoints} / {maxPoints} pts
        <span className="ml-2 text-lg font-semibold text-slate-400">({percentScore}%)</span>
      </p>

      <div
        className={`mx-auto mt-4 max-w-md rounded-2xl border px-5 py-4 text-left shadow-lg ${medal.cardClass}`}
      >
        <p className="text-center text-lg font-bold text-white">{medal.label}</p>
        <p className={`mt-2 text-sm leading-relaxed ${medal.textClass}`}>{medal.phrase}</p>
        {perfectScore ? (
          <p className="mt-3 border-t border-white/15 pt-3 text-center text-sm font-medium text-amber-100">
            Ademas: puntuacion maxima en todos los minijuegos.
          </p>
        ) : null}
      </div>

      <p className="mt-4 text-sm text-slate-300">Tiempo empleado: {formatElapsed(startedAt)}</p>

      <div className="mx-auto mt-6 max-w-lg rounded-2xl border border-cyan-300/25 bg-slate-950/50 p-4 text-left">
        <h3 className="text-sm font-semibold text-cyan-200">Desglose por modulo</h3>
        <ul className="mt-2 max-h-80 space-y-2 overflow-y-auto text-sm text-slate-300">
          {moduleKeys.map((key) => (
            <li
              key={key}
              className="flex justify-between gap-2 border-b border-slate-700/50 pb-2 last:border-0"
            >
              <span>{labels[key] || key}</span>
              <span className="shrink-0 font-mono text-cyan-100">
                {scoreByModule[key] ?? 0} / {maxByModule[key]} pts
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-6 max-w-lg text-left">
        <h3 className="text-sm font-semibold text-slate-200">Proximos pasos sugeridos</h3>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-400">
          <li>
            Tu avance y puntuacion quedan guardados en tu cuenta; puedes cerrar el navegador y retomar cuando
            quieras.
          </li>
          <li>
            Plantillas muy largas, contratos y archivos pesados siguen en los espacios internos de la empresa
            (ClickUp, Drive, etc.); tu responsable te indica donde estan.
          </li>
          <li>
            La guia de herramientas y normas (texto adaptado) esta en el panel que aparece al terminar el minijuego
            1; el manifiesto completo, tras el minijuego 2.
          </li>
          <li>Saluda en Slack, revisa ClickUp y agenda tu sync con tu responsable o buddy.</li>
        </ul>
      </div>

      {onReset ? (
        <button
          type="button"
          className="mt-8 rounded-xl border border-slate-500 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
          onClick={onReset}
        >
          Repetir recorrido desde el inicio
        </button>
      ) : null}
    </div>
  )
}

export default Finish
