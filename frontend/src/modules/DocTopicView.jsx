import { useMemo, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import MiniQuizPack from '../components/MiniQuizPack'
import { plataformas } from '../data/plataformas'
import { DOC_MICRO_POINTS, preguntasPorDocTopic } from '../data/docTopicQuizzes'
import { getClickUpTheoryUrl } from '../lib/clickUpTheoryUrl'

function DocTopicView({
  topicId,
  onBack,
  onTopicComplete,
  libraryMode = false,
  /** Ficha abierta desde Modulo 1 (minijuegos): sin subtitulo tipo teoria ni "Continuar al repaso"; solo Jugar / Volver. */
  modoMinijuego = false,
}) {
  const [phase, setPhase] = useState('doc')

  const plataforma = useMemo(() => plataformas.find((p) => p.id === topicId), [topicId])
  const clickUpTheoryUrl = useMemo(
    () => (topicId === 'clickup' ? getClickUpTheoryUrl() : ''),
    [topicId],
  )
  const title = plataforma?.name || topicId
  const subtitle = modoMinijuego
    ? ''
    : libraryMode
      ? 'Modo consulta: solo lectura de la ficha.'
      : 'Documentacion interna en la app (sin enlaces externos). Luego un repaso corto.'

  const questions = preguntasPorDocTopic[topicId] || []
  const quizReady = questions.length > 0

  const handleTopicFinish = (points) => {
    onTopicComplete(topicId, points)
    onBack()
  }

  return (
    <ModuleWrapper title={title} subtitle={subtitle}>
      {phase === 'doc' || libraryMode ? (
        <div className="space-y-5">
          {plataforma ? (
            <div className="space-y-4">
              <div className="max-h-[min(32rem,72vh)] space-y-4 overflow-y-auto pr-1">
                <div className="rounded-xl border border-slate-700/55 bg-slate-950/50 p-4">
                  {!modoMinijuego ? (
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-cyan-300/90">
                      Contenido de la ficha
                    </h3>
                  ) : null}
                  <div
                    className={`space-y-3 text-sm leading-relaxed text-slate-300 md:text-base md:leading-relaxed ${modoMinijuego ? '' : 'mt-3'}`}
                  >
                    {plataforma.parrafos.map((bloque, i) => (
                      <p key={i}>{bloque}</p>
                    ))}
                  </div>
                </div>
              </div>
              {topicId === 'clickup' ? (
                <aside className="rounded-xl border border-violet-500/35 bg-gradient-to-br from-violet-950/50 to-slate-950/60 p-4 md:p-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-violet-300/90">
                    Documentacion viva en ClickUp
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-violet-100/85 md:text-base">
                    Listas, plantillas, formularios y permisos finos estan en el workspace del equipo. Desde aqui
                    tienes el resumen; lo demas, en ClickUp.
                  </p>
                  {clickUpTheoryUrl ? (
                    <a
                      href={clickUpTheoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-xl border border-violet-400/50 bg-violet-500/20 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-violet-500/30 md:text-base"
                    >
                      Abrir ClickUp
                      <span aria-hidden className="text-lg">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <p className="mt-3 text-xs leading-relaxed text-slate-500 md:text-sm">
                      Pide a tu responsable o Operaciones el enlace al espacio de ClickUp. Cuando lo tengais, se puede
                      configurar en la app con la variable{' '}
                      <code className="rounded bg-slate-800 px-1 text-violet-200">VITE_CLICKUP_THEORY_URL</code> para
                      mostrar el boton aqui.
                    </p>
                  )}
                </aside>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-rose-300">No hay contenido para este tema.</p>
          )}

          <div className="flex flex-wrap items-center gap-3 border-t border-slate-700/50 pt-4">
            <button
              type="button"
              className="rounded-xl border border-slate-600 bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
              onClick={onBack}
            >
              {libraryMode || modoMinijuego ? 'Volver' : 'Volver al indice'}
            </button>
            {!libraryMode && quizReady ? (
              <button
                type="button"
                className={
                  modoMinijuego
                    ? 'rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 px-6 py-3 text-sm font-bold text-slate-900 shadow-lg hover:brightness-105 sm:ml-auto md:text-base'
                    : 'rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900'
                }
                onClick={() => setPhase('quiz')}
              >
                {modoMinijuego ? 'Jugar' : 'Continuar al repaso rapido'}
              </button>
            ) : null}
          </div>
        </div>
      ) : !libraryMode ? (
        <div className="space-y-4">
          <button
            type="button"
            className="text-sm text-cyan-400 underline decoration-cyan-400/40 underline-offset-2 hover:text-cyan-300"
            onClick={() => setPhase('doc')}
          >
            {modoMinijuego ? 'Volver' : 'Volver a leer la ficha'}
          </button>
          <MiniQuizPack
            variant="embedded"
            questions={questions}
            pointsPerCorrect={DOC_MICRO_POINTS}
            modoMinijuego={modoMinijuego}
            onComplete={handleTopicFinish}
          />
        </div>
      ) : null}
    </ModuleWrapper>
  )
}

export default DocTopicView
