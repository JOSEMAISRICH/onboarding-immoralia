import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ModuleWrapper from '../components/ModuleWrapper'
import { pasosProceso as defaultPasos } from '../data/pasosProceso'
import { useReportExamQuestionProgress } from '../context/ExamProgressContext'
import { fingerprintSteps, readGameResume, writeGameResume } from '../lib/minigameResumeStorage'

function isPermutation(ordered, canon) {
  if (!ordered?.length || ordered.length !== canon.length) return false
  const a = [...ordered].sort()
  const b = [...canon].sort()
  return a.every((x, i) => x === b[i])
}

function shuffle(items) {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function SortableStep({ id, label }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.92 : 1,
    zIndex: isDragging ? 10 : undefined,
  }
  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-stretch gap-2 rounded-2xl border border-cyan-300/30 bg-slate-950/60 shadow-lg shadow-slate-950/30"
    >
      <button
        type="button"
        className="flex cursor-grab touch-none items-center rounded-l-2xl border-r border-cyan-300/20 bg-slate-900/80 px-3 py-3 text-slate-400 hover:bg-slate-800/80 active:cursor-grabbing"
        aria-label="Arrastrar para reordenar"
        {...attributes}
        {...listeners}
      >
        <span className="text-lg leading-none" aria-hidden>
          ⋮⋮
        </span>
      </button>
      <span className="flex flex-1 items-center py-3 pr-3 text-sm text-slate-100">{label}</span>
    </li>
  )
}

function Puzzle({ workplace = 'immoralia', onComplete, steps = defaultPasos }) {
  const fingerprint = useMemo(() => fingerprintSteps(steps), [steps])
  const hydratedForFp = useRef(null)

  const [orderedSteps, setOrderedSteps] = useState(() => shuffle(steps))
  const [validated, setValidated] = useState(false)

  useLayoutEffect(() => {
    if (!steps.length) return
    if (hydratedForFp.current === fingerprint) return
    hydratedForFp.current = fingerprint
    const s = readGameResume(workplace, 'puzzle', fingerprint)
    if (s?.orderedSteps && isPermutation(s.orderedSteps, steps)) {
      setOrderedSteps(s.orderedSteps)
      setValidated(Boolean(s.validated))
      return
    }
    setOrderedSteps(shuffle(steps))
    setValidated(false)
  }, [workplace, fingerprint, steps])

  useEffect(() => {
    if (!steps.length || hydratedForFp.current !== fingerprint) return
    writeGameResume(workplace, 'puzzle', fingerprint, { orderedSteps, validated })
  }, [workplace, fingerprint, steps.length, orderedSteps, validated])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const isCorrect = useMemo(() => {
    return orderedSteps.every((step, index) => step === steps[index])
  }, [orderedSteps, steps])

  const correctPositions = useMemo(
    () => orderedSteps.reduce((n, step, i) => n + (step === steps[i] ? 1 : 0), 0),
    [orderedSteps, steps],
  )
  const puzzleProgressIdx = useMemo(() => {
    if (!steps.length) return 0
    if (validated && isCorrect) return steps.length - 1
    return Math.min(Math.max(0, correctPositions - 1), steps.length - 1)
  }, [steps.length, validated, isCorrect, correctPositions])

  useReportExamQuestionProgress(puzzleProgressIdx, steps.length, steps.length > 0)

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setOrderedSteps((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        if (oldIndex === -1 || newIndex === -1) return items
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <ModuleWrapper
      title="Minijuego 4: Puzzle del proceso"
      subtitle="Arrastra y ordena. Valida cuando creas que esta bien (+50 pts si aciertas)."
    >
      <p className="mb-3 text-sm text-slate-400">
        Usa el asa ⋮⋮ para arrastrar (tambien funciona con teclado en orden de lista).
      </p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={orderedSteps} strategy={verticalListSortingStrategy}>
          <ol className="grid list-none gap-3 pl-0">
            {orderedSteps.map((step) => (
              <SortableStep key={step} id={step} label={step} />
            ))}
          </ol>
        </SortableContext>
      </DndContext>

      {!validated ? (
        <button
          type="button"
          className="mt-4 rounded-xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-2 font-semibold text-slate-900 transition hover:brightness-105"
          onClick={() => setValidated(true)}
        >
          Validar orden
        </button>
      ) : (
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className={`text-sm font-semibold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
            {isCorrect
              ? 'Excelente! Orden correcto, ganas 50 puntos.'
              : 'Todavia no es correcto. Reordena y vuelve a validar.'}
          </p>
          <div className="flex gap-2">
            {!isCorrect ? (
              <button
                type="button"
                className="rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
                onClick={() => setValidated(false)}
              >
                Seguir reordenando
              </button>
            ) : null}
            <button
              type="button"
              className="rounded-xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-2 font-semibold text-slate-900 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45"
              disabled={!isCorrect}
              onClick={() => onComplete(50)}
            >
              Ver resultado final
            </button>
          </div>
        </div>
      )}
    </ModuleWrapper>
  )
}

export default Puzzle
