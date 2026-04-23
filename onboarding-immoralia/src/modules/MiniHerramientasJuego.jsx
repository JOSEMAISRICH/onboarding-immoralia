import { useMemo, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import DocTopicView from './DocTopicView'
import { DOC_TOPIC_IDS } from '../data/docTopicOrder'
import { maxMiniHerramientasJuego } from '../data/miniHerramientasJuego'
import { plataformas } from '../data/plataformas'

function topicLabel(id) {
  return plataformas.find((p) => p.id === id)?.name || id
}

function MiniHerramientasJuego({ onComplete }) {
  const [openTopicId, setOpenTopicId] = useState(null)
  const [pointsByTopic, setPointsByTopic] = useState({})

  const completedIds = useMemo(() => new Set(Object.keys(pointsByTopic)), [pointsByTopic])
  const totalEarned = useMemo(
    () => Object.values(pointsByTopic).reduce((a, b) => a + b, 0),
    [pointsByTopic],
  )

  const allDone = DOC_TOPIC_IDS.every((id) => completedIds.has(id))
  const doneCount = completedIds.size
  const totalTopics = DOC_TOPIC_IDS.length

  const handleTopicComplete = (id, pts) => {
    setPointsByTopic((prev) => ({ ...prev, [id]: pts }))
  }

  if (openTopicId) {
    return (
      <DocTopicView
        modoMinijuego
        topicId={openTopicId}
        onBack={() => setOpenTopicId(null)}
        onTopicComplete={handleTopicComplete}
      />
    )
  }

  return (
    <ModuleWrapper
      title="Modulo 1: Documentacion interna"
      subtitle={`Cada ficha abre en pantalla completa: lee el bloque y luego el repaso rapido de esa misma ficha. Maximo del modulo: ${maxMiniHerramientasJuego} pts.`}
    >
      <div className="rounded-xl border border-cyan-300/20 bg-slate-950/45 p-4 text-sm leading-relaxed text-slate-300">
        <p>
          Abre cada ficha, lee el texto y pulsa <strong className="text-cyan-200">Jugar</strong> para el repaso con
          puntos. Completa las {totalTopics} para seguir el onboarding.
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Logins y documentos vivos los coordina tu responsable u Operaciones.
        </p>
      </div>

      <p className="mt-4 text-sm text-cyan-200/90">
        Fichas completadas:{' '}
        <span className="font-mono font-semibold text-cyan-100">
          {doneCount}/{totalTopics}
        </span>
        {allDone ? (
          <span className="ml-2 text-emerald-300"> · Listo para continuar</span>
        ) : null}
      </p>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {DOC_TOPIC_IDS.map((id) => {
          const done = completedIds.has(id)
          const pts = pointsByTopic[id]
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => setOpenTopicId(id)}
                className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                  done
                    ? 'border-emerald-400/35 bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500/15'
                    : 'border-slate-600/70 bg-slate-900/60 text-slate-100 hover:border-cyan-300/40 hover:bg-slate-900/90'
                }`}
              >
                <span className="min-w-0 truncate">{topicLabel(id)}</span>
                <span className="shrink-0 text-xs font-normal text-slate-400">
                  {done ? `${pts ?? 0} pts` : 'Abrir ficha'}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {allDone ? (
        <div className="mt-6 rounded-2xl border border-emerald-300/30 bg-emerald-500/10 p-4 text-center">
          <p className="text-sm text-emerald-100">
            Puntos en este modulo:{' '}
            <span className="font-mono text-lg font-bold text-emerald-200">
              {totalEarned} / {maxMiniHerramientasJuego}
            </span>
          </p>
          <button
            type="button"
            className="mt-4 rounded-xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-6 py-2.5 text-sm font-semibold text-slate-900"
            onClick={() => onComplete(totalEarned)}
          >
            Continuar onboarding
          </button>
        </div>
      ) : (
        <p className="mt-6 text-center text-xs text-slate-500">
          Completa el repaso de cada ficha para desbloquear el boton de continuar.
        </p>
      )}
    </ModuleWrapper>
  )
}

export default MiniHerramientasJuego
