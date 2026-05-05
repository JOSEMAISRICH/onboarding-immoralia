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
  miniScenario: 'Minijuego: Escenarios',
  miniMemory: 'Minijuego: Memoria',
  miniWordle: 'Minijuego: Palabra oculta',
  miniWhoToAsk: 'Minijuego: A quien consultar',
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
  workplace = 'immoralia',
  totalPoints,
  maxPoints,
  scoreByModule,
  maxByModule,
  startedAt,
  onReset,
  beginReplayModule,
}) {
  const percentScore = maxPoints === 0 ? 0 : Math.round((totalPoints / maxPoints) * 100)
  const perfectScore = totalPoints >= maxPoints
  const medal = getScoreMedal(percentScore)

  const moduleKeys = Object.keys(maxByModule)
  const workplaceLabel = WORKPLACE_OPTIONS.find((o) => o.id === workplace)?.label ?? 'Immoralia'

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
        className="mx-auto mt-6 max-w-2xl px-2 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 md:text-4xl lg:text-5xl"
        id="finish-welcome"
      >
        {userName ? (
          <>
            <span className="bg-gradient-to-r from-blue-800 via-teal-700 to-emerald-700 bg-clip-text text-transparent">
              {userName}
            </span>
            {', ya eres parte de '}
            <span className="bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent">
              Immoralia
            </span>
            .
          </>
        ) : (
          <>
            Ya eres parte de{' '}
            <span className="bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent">
              Immoralia
            </span>
            .
          </>
        )}
      </p>
      <p className="mt-4 text-2xl font-semibold text-teal-800 md:text-3xl">Enhorabuena</p>

      <p className="mt-2 text-xs text-slate-600">
        La medalla depende de tu <strong className="text-slate-800">puntuacion en los minijuegos</strong> (
        {percentScore}% del maximo), no del recorrido.
      </p>
      <h2 className="mt-4 text-xl font-bold text-slate-900 md:text-2xl">Onboarding completado</h2>

      <p className="mt-2 text-xs text-slate-600">
        Espacio elegido al empezar: <strong className="text-slate-800">{workplaceLabel}</strong>
      </p>
      <p className="mt-3 text-sm text-slate-700">
        <strong className="text-emerald-800">100% del recorrido</strong> completado (todos los modulos).
        Tu <strong className="text-blue-900">rango Platino</strong> en la barra superior refleja haber
        cerrado el onboarding — bienvenida o bienvenido al equipo.
      </p>

      <p className="mt-2 font-medium text-slate-700">Tu puntuacion total es:</p>
      <p className="my-2 text-4xl font-extrabold text-teal-800">
        {totalPoints} / {maxPoints} pts
        <span className="ml-2 text-lg font-semibold text-slate-600">({percentScore}%)</span>
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

      <p className="mt-4 text-sm font-medium text-slate-700">Tiempo empleado: {formatElapsed(startedAt)}</p>

      <div className="mx-auto mt-6 max-w-lg rounded-2xl border border-blue-200/95 bg-gradient-to-b from-white to-slate-50/90 p-4 text-left shadow-md shadow-blue-100/40">
        <h3 className="text-sm font-semibold text-blue-950">Desglose por modulo</h3>
        <ul className="mt-2 max-h-80 space-y-2 overflow-y-auto text-sm text-slate-700">
          {moduleKeys.map((key) => (
            <li
              key={key}
              className="flex flex-col gap-2 border-b border-slate-200 pb-2 last:border-0 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3"
            >
              <span className="min-w-0 flex-1">{labels[key] || key}</span>
              <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
                <span className="font-mono font-semibold text-blue-950 tabular-nums">
                  {scoreByModule[key] ?? 0} / {maxByModule[key]} pts
                </span>
                {beginReplayModule ? (
                  <button
                    type="button"
                    className="rounded-lg border border-blue-300 bg-blue-600 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-blue-700"
                    onClick={() => beginReplayModule(key)}
                  >
                    Mejorar mi puntuacion
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-6 max-w-lg text-left">
        <h3 className="text-sm font-semibold text-slate-900">Proximos pasos sugeridos</h3>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-700">
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
          className="mx-auto mt-10 block w-full max-w-md rounded-2xl border-2 border-slate-800 bg-slate-900 px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-slate-900/25 transition hover:bg-slate-800"
          onClick={onReset}
        >
          Repetir recorrido desde el inicio
        </button>
      ) : null}
    </div>
  )
}

export default Finish
