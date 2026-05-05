import { useEffect, useMemo, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import MiniQuizPack from '../components/MiniQuizPack'
import { plataformas } from '../data/plataformas'
import { DOC_MICRO_POINTS, preguntasPorDocTopic } from '../data/docTopicQuizzes'
import { getClickUpTheoryUrl } from '../lib/clickUpTheoryUrl'
import {
  isTheoryFichaRead,
  markTheoryFichaRead,
  THEORY_FICHA_READS_UPDATED,
} from '../lib/theoryFichaReadStorage'

function DocTopicView({
  topicId,
  onBack,
  onTopicComplete,
  libraryMode = false,
  /** Ficha abierta desde Modulo 1 (minijuegos): sin subtitulo tipo teoria ni "Continuar al repaso"; solo Jugar / Volver. */
  modoMinijuego = false,
}) {
  const [phase, setPhase] = useState('doc')
  const [fichaLeida, setFichaLeida] = useState(() => libraryMode && isTheoryFichaRead(topicId))

  useEffect(() => {
    if (!libraryMode) return
    const sync = () => setFichaLeida(isTheoryFichaRead(topicId))
    sync()
    window.addEventListener(THEORY_FICHA_READS_UPDATED, sync)
    return () => window.removeEventListener(THEORY_FICHA_READS_UPDATED, sync)
  }, [libraryMode, topicId])

  const plataforma = useMemo(() => plataformas.find((p) => p.id === topicId), [topicId])
  const clickUpTheoryUrl = useMemo(
    () => (topicId === 'clickup' ? getClickUpTheoryUrl() : ''),
    [topicId],
  )
  const title = plataforma?.name || topicId
  const subtitle = modoMinijuego ? '' : libraryMode ? '' : 'Documentacion interna en la app. Luego un repaso corto.'

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
              <div className="max-h-[min(48rem,85vh)] space-y-4 overflow-y-auto pr-1">
                <div className="rounded-xl border border-slate-200 bg-white/95 p-4 shadow-sm shadow-slate-200/40">
                  {!modoMinijuego ? (
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                      Contenido de la ficha
                    </h3>
                  ) : null}
                  <div
                    className={`space-y-3 text-sm leading-relaxed text-slate-700 md:text-base md:leading-relaxed ${modoMinijuego ? '' : 'mt-3'}`}
                  >
                    {plataforma.parrafos.map((bloque, i) => (
                      <p key={i}>{bloque}</p>
                    ))}
                  </div>
                </div>
              </div>
              {topicId === 'clickup' ? (
                <aside className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50/90 to-white p-4 md:p-5 shadow-sm shadow-blue-100/40">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-blue-900">
                    Documentacion viva en ClickUp
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">
                    Listas, plantillas, formularios y permisos finos estan en el workspace del equipo. Desde aqui
                    tienes el resumen; lo demas, en ClickUp.
                  </p>
                  {clickUpTheoryUrl ? (
                    <a
                      href={clickUpTheoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-xl border border-blue-700 bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-700 md:text-base"
                    >
                      Abrir ClickUp
                      <span aria-hidden className="text-lg">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <p className="mt-3 text-xs leading-relaxed text-slate-600 md:text-sm">
                      Pide a tu responsable o Operaciones el enlace al espacio de ClickUp. Cuando lo tengais, se puede
                      configurar en la app con la variable{' '}
                      <code className="rounded bg-blue-100 px-1 font-mono text-xs text-blue-950">
                        VITE_CLICKUP_THEORY_URL
                      </code>{' '}
                      para mostrar el boton aqui.
                    </p>
                  )}
                </aside>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-rose-600">No hay contenido para este tema.</p>
          )}

          <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:border-teal-300 hover:bg-teal-50"
              onClick={onBack}
            >
              {libraryMode || modoMinijuego ? 'Volver' : 'Volver al indice'}
            </button>
            {libraryMode ? (
              fichaLeida ? (
                <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900">
                  <span aria-hidden>✓</span>
                  Leído
                </span>
              ) : (
                <button
                  type="button"
                  className="rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:brightness-105"
                  onClick={() => {
                    markTheoryFichaRead(topicId)
                    setFichaLeida(true)
                  }}
                >
                  Marcar como leído
                </button>
              )
            ) : null}
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
            className="text-sm font-semibold text-blue-800 underline decoration-blue-300 underline-offset-2 hover:text-blue-950"
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
