import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import SopsNavLink from '../components/SopsNavLink'
import CurrentLessonBanner from '../components/CurrentLessonBanner'
import LearningPath from '../components/LearningPath'
import ModuleScoreCelebration from '../components/ModuleScoreCelebration'
import ProgressBar from '../components/ProgressBar'
import { getUnitForStep } from '../data/learningUnits'
import { EXTRA_GAME_KEYS } from '../data/extraMinijuegos10'
import { WORKPLACE_OPTIONS, normalizeWorkplaceId } from '../data/workplace'
import {
  getHangmanBank,
  getMemoryPairs,
  getModulo1RepasoItems,
  getPalabrasRevueltas,
  getParesHerramienta,
  getPasosProceso,
  getPreguntasIntruso,
  getPreguntasTrueFalse,
  getQuizPreguntas,
  getScenarioRounds,
  getWhoAskRounds,
  getWordlePool,
} from '../lib/workplacePack'
import { mergeQuizQuestions, mergeTrueFalseItems } from '../lib/contentMerge'
import {
  prepareHangmanRounds,
  prepareModulo1Items,
  prepareOddItems,
  prepareScrambleRounds,
  prepareTrueFalseItems,
} from '../lib/examQuestionSelection'
import { getModuleKeyForStep } from '../lib/moduleStepMap'
import { allImmoraliaTheoryFichasRead, THEORY_FICHA_READS_UPDATED } from '../lib/theoryFichaReadStorage'
import { FINISH_STEP, EXTRA_START_STEP, STEPS } from '../lib/onboardingSteps'
import { buildExamProgressPlan } from '../lib/examProgressPlan'
import { ExamProgressProvider } from '../context/ExamProgressContext'
import { GamesStepContent } from './gamesStepContent'

const EXAM_WARMUP_FALLBACK = {
  question: '¿Dónde suele quedar mejor registrado el trabajo por hacer y su estado?',
  options: [
    'Solo en hilos largos de Slack',
    'En la tarea de ClickUp con fecha, responsable y estado actualizado',
    'En un mensaje directo sin copiar a nadie',
  ],
  correctIndex: 1,
}

/** Vista previa sin puntos: muestra el formato tipo examen antes de entrar al recorrido. */
function ExamWarmupPreview({ question }) {
  const [picked, setPicked] = useState(null)
  if (!question?.options?.length) return null

  const showResult = picked !== null
  const isCorrect = picked === question.correctIndex

  return (
    <div className="mt-8 rounded-2xl border border-blue-200 bg-gradient-to-br from-white via-blue-50/85 to-emerald-50/60 p-5 shadow-lg shadow-blue-100/50 md:p-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-800">Vista previa · no cuenta para puntos</p>
      <p className="mt-3 text-base font-medium leading-snug text-slate-900 md:text-lg">{question.question}</p>
      <div className="mt-4 grid gap-2">
        {question.options.map((opt, i) => {
          const letter = String.fromCharCode(65 + i)
          const selected = picked === i
          const isRight = i === question.correctIndex
          let btnClass =
            'w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition md:text-base '
          if (!showResult) {
            btnClass += 'border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-blue-50'
          } else if (isRight) {
            btnClass += 'border-emerald-400 bg-emerald-50 text-emerald-950'
          } else if (selected && !isRight) {
            btnClass += 'border-rose-400 bg-rose-50 text-rose-950'
          } else {
            btnClass += 'border-slate-100 bg-slate-50 text-slate-400'
          }
          return (
            <button
              key={i}
              type="button"
              disabled={showResult}
              className={btnClass}
              onClick={() => setPicked(i)}
            >
              <span className="mr-2 font-mono text-blue-700">{letter}.</span>
              {opt}
            </button>
          )
        })}
      </div>
      {showResult ? (
        <p
          className={`mt-4 text-sm font-semibold md:text-base ${isCorrect ? 'text-emerald-700' : 'text-amber-800'}`}
          role="status"
        >
          {isCorrect
            ? 'Correcto. En el examen real cada acierto suma puntos y verás más tipos de retos.'
            : 'Así verás la corrección al momento; en el recorrido completo habrá más preguntas y formatos.'}
        </p>
      ) : (
        <p className="mt-3 text-xs text-slate-500 md:text-sm">Pulsa una opción para ver cómo responde la interfaz.</p>
      )}
    </div>
  )
}

function GamesPage() {
  const navigate = useNavigate()
  const {
    userName,
    workplace,
    stepIndex,
    completeModuleWithScore,
    handleReset,
    scoreByModule,
    recordModuleScore,
    totalPoints,
    maxPoints,
    maxByModule,
    startedAt,
    journeyCompletionPercent,
    learningUnits,
    streakDays,
    beginMinijuegos,
    remoteContent,
    beginReplayModule,
  } = useOnboarding()

  const wpId = normalizeWorkplaceId(workplace)

  const [immoraliaTheoryComplete, setImmoraliaTheoryComplete] = useState(
    () => wpId !== 'immoralia' || allImmoraliaTheoryFichasRead(),
  )

  useEffect(() => {
    if (wpId !== 'immoralia') {
      setImmoraliaTheoryComplete(true)
      return
    }
    const sync = () => setImmoraliaTheoryComplete(allImmoraliaTheoryFichasRead())
    sync()
    window.addEventListener(THEORY_FICHA_READS_UPDATED, sync)
    return () => window.removeEventListener(THEORY_FICHA_READS_UPDATED, sync)
  }, [wpId])

  const theoryTo = useMemo(() => `${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}/teoria`, [])
  const theoryLinkLabel = useMemo(() => {
    const label = WORKPLACE_OPTIONS.find((o) => o.id === wpId)?.label || 'Immoralia'
    return `Teoria · ${label}`
  }, [wpId])
  const quizPreguntas = useMemo(
    () => mergeQuizQuestions(getQuizPreguntas(workplace), remoteContent, wpId),
    [workplace, remoteContent, wpId],
  )
  const hangmanBank = useMemo(() => getHangmanBank(workplace), [workplace])
  const hangmanPrepared = useMemo(() => prepareHangmanRounds(wpId, hangmanBank), [wpId, hangmanBank])
  const warmupQuestion = useMemo(
    () => (quizPreguntas.length > 0 ? quizPreguntas[0] : EXAM_WARMUP_FALLBACK),
    [quizPreguntas],
  )
  const tfItems = useMemo(() => {
    const merged = mergeTrueFalseItems(getPreguntasTrueFalse(workplace), remoteContent, wpId)
    return prepareTrueFalseItems(wpId, merged)
  }, [workplace, remoteContent, wpId])
  const matchPairs = useMemo(() => getParesHerramienta(workplace), [workplace])
  const scrambleRounds = useMemo(
    () => prepareScrambleRounds(wpId, getPalabrasRevueltas(workplace)),
    [workplace, wpId],
  )
  const oddQuestions = useMemo(
    () => prepareOddItems(wpId, getPreguntasIntruso(workplace)),
    [workplace, wpId],
  )
  const puzzleSteps = useMemo(() => getPasosProceso(workplace), [workplace])
  const modulo1Items = useMemo(
    () => prepareModulo1Items(wpId, getModulo1RepasoItems(workplace)),
    [workplace, wpId],
  )
  const scenarioRounds = useMemo(() => getScenarioRounds(workplace), [workplace])
  const memoryPairs = useMemo(() => getMemoryPairs(workplace), [workplace])
  const wordlePool = useMemo(() => getWordlePool(workplace), [workplace])
  const whoAskRounds = useMemo(() => getWhoAskRounds(workplace), [workplace])

  const examProgressPlan = useMemo(
    () =>
      buildExamProgressPlan({
        modulo1Len: modulo1Items.length,
        quizLen: hangmanPrepared.length,
        puzzleLen: puzzleSteps.length,
        tfLen: tfItems.length,
        matchLen: matchPairs.length,
        scrambleLen: scrambleRounds.length,
        oddLen: oddQuestions.length,
        scenarioLen: scenarioRounds.length,
        memoryLen: memoryPairs.length,
        whoLen: whoAskRounds.length,
        extraLen: EXTRA_GAME_KEYS.length,
      }),
    [
      modulo1Items.length,
      hangmanPrepared.length,
      puzzleSteps.length,
      tfItems.length,
      matchPairs.length,
      scrambleRounds.length,
      oddQuestions.length,
      scenarioRounds.length,
      memoryPairs.length,
      whoAskRounds.length,
      EXTRA_GAME_KEYS.length,
    ],
  )

  const [celebration, setCelebration] = useState(null)
  const pendingAdvanceRef = useRef(null)
  const celebrationTimerRef = useRef(null)

  const currentModulePointsCap = useMemo(() => {
    const mk = getModuleKeyForStep(stepIndex)
    if (!mk) return null
    const n = maxByModule[mk]
    return typeof n === 'number' && n > 0 ? n : null
  }, [stepIndex, maxByModule])

  const flushCelebration = useCallback(() => {
    if (celebrationTimerRef.current) {
      window.clearTimeout(celebrationTimerRef.current)
      celebrationTimerRef.current = null
    }
    const fn = pendingAdvanceRef.current
    pendingAdvanceRef.current = null
    setCelebration(null)
    if (fn) completeModuleWithScore(fn)
  }, [completeModuleWithScore])

  const completeAfterBeat = useCallback(
    (earnedPoints, title, updateScore) => {
      if (celebrationTimerRef.current) {
        window.clearTimeout(celebrationTimerRef.current)
        celebrationTimerRef.current = null
      }

      const skipCelebrationUi = stepIndex === 1
      if (skipCelebrationUi) {
        completeModuleWithScore(updateScore)
        return
      }

      pendingAdvanceRef.current = updateScore
      setCelebration({ points: earnedPoints, title, finishedStepIndex: stepIndex })
    },
    [completeModuleWithScore, stepIndex],
  )

  const resetAndGoHome = () => {
    handleReset()
    navigate('/', { replace: true })
  }

  if (!userName) {
    return <Navigate to="/" replace />
  }

  const theoryBlockedImmoralia = wpId === 'immoralia' && !immoraliaTheoryComplete

  /** Mapa compacto también en hubs / paso 0: evita tener el mapa solo en pantallas grandes. */
  const pathStripe =
    stepIndex <= FINISH_STEP ? (
      <div className="mx-auto mb-6 w-[92%] max-w-6xl lg:hidden">
        <LearningPath units={learningUnits} currentStep={stepIndex} compact />
      </div>
    ) : null

  if (stepIndex === 0) {
    return (
      <ExamProgressProvider stepIndex={stepIndex} plan={examProgressPlan}>
        <>
          <ProgressBar
          currentStep={1}
          totalSteps={STEPS.length}
          points={totalPoints}
          userName={userName}
          journeyCompletionPercent={journeyCompletionPercent}
          showJourneyTier={false}
          showRestart={false}
          streakDays={streakDays}
          theoryTo={theoryTo}
          theoryLinkLabel={theoryLinkLabel}
        />
        <main className="mx-auto my-6 w-[92%] max-w-6xl pb-8">
          {pathStripe}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)] lg:items-start">
            <div className="order-1 min-w-0 space-y-8">
              <section className="animate-fade-up relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-white via-blue-50/90 to-emerald-50/55 p-6 shadow-xl shadow-blue-100/50 md:p-10">
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-sky-300/28 blur-3xl"
                  aria-hidden
                />
                <div className="relative">
                  <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-900 shadow-sm">
                    <span aria-hidden>✏️</span>
                    Examen interactivo
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                    Modo test: retos variados y puntos
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                    Tests de opción múltiple, verdadero/falso, ahorcado sin tiempo y otros retos con feedback al momento.{' '}
                    <Link to="/teoria" className="font-semibold text-blue-800 underline-offset-2 hover:text-blue-950 hover:underline">
                      Teoría
                    </Link>
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-3">
                    <li className="rounded-xl border border-blue-200 bg-blue-50/90 px-3 py-2 text-xs font-semibold text-blue-950 md:text-sm">
                      Opción múltiple
                    </li>
                    <li className="rounded-xl border border-blue-200 bg-blue-50/90 px-3 py-2 text-xs font-semibold text-blue-950 md:text-sm">
                      Verdadero / falso
                    </li>
                    <li className="rounded-xl border border-blue-200 bg-blue-50/90 px-3 py-2 text-xs font-semibold text-blue-950 md:text-sm">
                      Ahorcado sin tiempo
                    </li>
                    <li className="rounded-xl border border-blue-200 bg-blue-50/90 px-3 py-2 text-xs font-semibold text-blue-950 md:text-sm">
                      Cronómetro solo en algunos retos
                    </li>
                    <li className="rounded-xl border border-blue-200 bg-blue-50/90 px-3 py-2 text-xs font-semibold text-blue-950 md:text-sm">
                      Puntos y rachas
                    </li>
                  </ul>

                  <ExamWarmupPreview key={warmupQuestion.question} question={warmupQuestion} />

                  <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-blue-200/80 pt-8">
                    <button
                      type="button"
                      disabled={theoryBlockedImmoralia}
                      title={
                        theoryBlockedImmoralia
                          ? 'Completa la biblioteca de teoría (fichas leídas) para desbloquear'
                          : undefined
                      }
                      className={`inline-flex min-h-[3rem] items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 px-8 py-3.5 text-base font-bold text-slate-900 shadow-lg transition hover:brightness-105 md:text-lg ${
                        theoryBlockedImmoralia ? 'cursor-not-allowed opacity-40 hover:brightness-100' : ''
                      }`}
                      onClick={() => beginMinijuegos()}
                    >
                      Comenzar examen interactivo
                    </button>
                    <Link
                      to="/teoria"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 md:text-base"
                    >
                      Ir a teoría
                    </Link>
                    <SopsNavLink />
                  </div>
                  {!theoryBlockedImmoralia ? (
                    <p className="mt-4 text-xs text-slate-500 md:text-sm">
                      El resultado de la vista previa no guarda puntuación; sirve solo para familiarizarte con el formato.
                    </p>
                  ) : null}
                </div>
              </section>
            </div>
            <aside className="order-2 hidden min-w-0 lg:block lg:sticky lg:top-28">
              <LearningPath units={learningUnits} currentStep={stepIndex} />
            </aside>
          </div>
        </main>
        </>
      </ExamProgressProvider>
    )
  }

  return (
    <ExamProgressProvider stepIndex={stepIndex} plan={examProgressPlan}>
      <>
      {celebration ? (
        <ModuleScoreCelebration
          points={celebration.points}
          title={celebration.title}
          finishedStepIndex={celebration.finishedStepIndex}
          finishStepIndex={FINISH_STEP}
          onDone={flushCelebration}
        />
      ) : null}
      <ProgressBar
        currentStep={stepIndex + 1}
        totalSteps={STEPS.length}
        points={totalPoints}
        userName={userName}
        journeyCompletionPercent={journeyCompletionPercent}
        showJourneyTier={stepIndex > 0}
        showRestart={stepIndex > 0}
        onRestart={resetAndGoHome}
        streakDays={streakDays}
        theoryTo={theoryTo}
        theoryLinkLabel={theoryLinkLabel}
      />

      <main className="mx-auto my-8 w-[92%] max-w-6xl pb-6">
        {pathStripe}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:items-start">
          <div className="order-1 min-w-0 space-y-6">
            {stepIndex <= FINISH_STEP ? (
              <CurrentLessonBanner
                unit={getUnitForStep(stepIndex, FINISH_STEP)}
                pointsCap={currentModulePointsCap}
              />
            ) : null}

            <GamesStepContent
              stepIndex={stepIndex}
              finishStep={FINISH_STEP}
              extraStartStep={EXTRA_START_STEP}
              workplace={workplace}
              hangmanRounds={hangmanPrepared}
              tfItems={tfItems}
              matchPairs={matchPairs}
              scrambleRounds={scrambleRounds}
              oddQuestions={oddQuestions}
              puzzleSteps={puzzleSteps}
              modulo1Items={modulo1Items}
              scenarioRounds={scenarioRounds}
              memoryPairs={memoryPairs}
              wordlePool={wordlePool}
              whoAskRounds={whoAskRounds}
              completeAfterBeat={completeAfterBeat}
              recordModuleScore={recordModuleScore}
              userName={userName}
              totalPoints={totalPoints}
              maxPoints={maxPoints}
              scoreByModule={scoreByModule}
              maxByModule={maxByModule}
              startedAt={startedAt}
              onReset={resetAndGoHome}
              beginReplayModule={beginReplayModule}
            />
          </div>

          {stepIndex <= FINISH_STEP ? (
            <aside className="order-2 hidden min-w-0 lg:block lg:sticky lg:top-28">
              <LearningPath units={learningUnits} currentStep={stepIndex} />
            </aside>
          ) : null}
        </div>
      </main>
    </>
    </ExamProgressProvider>
  )
}

export default GamesPage
