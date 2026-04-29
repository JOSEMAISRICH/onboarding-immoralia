import { useCallback, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import CurrentLessonBanner from '../components/CurrentLessonBanner'
import LearningPath from '../components/LearningPath'
import ModuleScoreCelebration from '../components/ModuleScoreCelebration'
import ProgressBar from '../components/ProgressBar'
import { getUnitForStep } from '../data/learningUnits'
import { EXTRA_GAME_KEYS } from '../data/extraMinijuegos10'
import { WORKPLACE_OPTIONS, normalizeWorkplaceId } from '../data/workplace'
import {
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
  getWordleConfig,
} from '../lib/workplacePack'
import { mergeQuizQuestions, mergeTrueFalseItems } from '../lib/contentMerge'
import { getModuleKeyForStep } from '../lib/moduleStepMap'
import { FINISH_STEP, EXTRA_START_STEP, STEPS } from '../lib/onboardingSteps'
import { GamesStepContent } from './gamesStepContent'

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

  const appBase = useMemo(() => {
    const b = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
    return `${typeof window !== 'undefined' ? window.location.origin : ''}${b}`
  }, [])
  const theoryTo = useMemo(() => `${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}/teoria`, [])
  const theoryUrl = useMemo(() => `${appBase}/teoria`, [appBase])
  const theoryLinkLabel = useMemo(() => {
    const label = WORKPLACE_OPTIONS.find((o) => o.id === wpId)?.label || 'General'
    return `Teoria · ${label}`
  }, [wpId])
  const quizPreguntas = useMemo(
    () => mergeQuizQuestions(getQuizPreguntas(workplace), remoteContent, wpId),
    [workplace, remoteContent, wpId],
  )
  const tfItems = useMemo(
    () => mergeTrueFalseItems(getPreguntasTrueFalse(workplace), remoteContent, wpId),
    [workplace, remoteContent, wpId],
  )
  const matchPairs = useMemo(() => getParesHerramienta(workplace), [workplace])
  const scrambleRounds = useMemo(() => getPalabrasRevueltas(workplace), [workplace])
  const oddQuestions = useMemo(() => getPreguntasIntruso(workplace), [workplace])
  const puzzleSteps = useMemo(() => getPasosProceso(workplace), [workplace])
  const modulo1Items = useMemo(() => getModulo1RepasoItems(workplace), [workplace])
  const scenarioRounds = useMemo(() => getScenarioRounds(workplace), [workplace])
  const memoryPairs = useMemo(() => getMemoryPairs(workplace), [workplace])
  const wordleConfig = useMemo(() => getWordleConfig(workplace), [workplace])
  const whoAskRounds = useMemo(() => getWhoAskRounds(workplace), [workplace])

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
      if (celebrationTimerRef.current) window.clearTimeout(celebrationTimerRef.current)
      pendingAdvanceRef.current = updateScore
      setCelebration({ points: earnedPoints, title })
      celebrationTimerRef.current = window.setTimeout(flushCelebration, 2400)
    },
    [flushCelebration],
  )

  const resetAndGoHome = () => {
    handleReset()
    navigate('/', { replace: true })
  }

  if (!userName) {
    return <Navigate to="/" replace />
  }

  /** Mapa compacto también en hubs / paso 0: evita tener el mapa solo en pantallas grandes. */
  const pathStripe =
    stepIndex <= FINISH_STEP ? (
      <div className="mx-auto mb-6 w-[92%] max-w-6xl lg:hidden">
        <LearningPath units={learningUnits} currentStep={stepIndex} compact />
      </div>
    ) : null

  if (stepIndex === 0) {
    return (
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
            <div className="order-1 min-w-0 space-y-6">
              <div className="theory-hero-pulse animate-fade-up rounded-2xl border border-cyan-400/45 bg-gradient-to-br from-cyan-500/20 via-indigo-950/50 to-slate-950/80 p-6 shadow-lg shadow-cyan-900/20 ring-1 ring-cyan-300/15 md:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200/90">
                  Siguiente paso · Paso 1
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                  Ir a la teoría
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-cyan-100/90 md:text-lg">
                  Antes de sumar puntos, revisa la <strong className="text-white">biblioteca de teoría</strong> de tu
                  espacio: documentación y fichas. Es el paso protagonista; los minijuegos vienen después.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/teoria"
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300 px-8 py-3.5 text-base font-bold text-slate-900 shadow-lg transition hover:scale-[1.02] hover:brightness-105 active:scale-[0.99] md:text-lg"
                  >
                    Ir a la teoría
                  </Link>
                  <a
                    href={theoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-cyan-400/50 bg-cyan-950/40 px-5 py-3.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-900/50"
                  >
                    Abrir teoría en otra pestaña
                  </a>
                </div>
              </div>

              <div
                className="animate-fade-up rounded-2xl border border-slate-600/50 bg-slate-950/50 p-6 md:p-7"
                style={{ animationDelay: '90ms', animationFillMode: 'both' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Después · Paso 2</p>
                <h3 className="mt-2 text-lg font-bold text-slate-200 md:text-xl">Minijuegos (repaso y puntos)</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400 md:text-base">
                  Cuando hayas leído lo que necesites en teoría, vuelve aquí y entra al recorrido gamificado.
                </p>
                <button
                  type="button"
                  className="mt-5 w-full max-w-md rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 to-rose-900/20 px-6 py-3 text-base font-bold text-amber-100 transition hover:brightness-110 sm:w-auto"
                  onClick={() => beginMinijuegos()}
                >
                  Empezar minijuegos
                </button>
              </div>
            </div>
            <aside className="order-2 hidden min-w-0 lg:block lg:sticky lg:top-28">
              <LearningPath units={learningUnits} currentStep={stepIndex} />
            </aside>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      {celebration ? (
        <ModuleScoreCelebration
          points={celebration.points}
          title={celebration.title}
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
              wpId={wpId}
              workplace={workplace}
              quizPreguntas={quizPreguntas}
              tfItems={tfItems}
              matchPairs={matchPairs}
              scrambleRounds={scrambleRounds}
              oddQuestions={oddQuestions}
              puzzleSteps={puzzleSteps}
              modulo1Items={modulo1Items}
              scenarioRounds={scenarioRounds}
              memoryPairs={memoryPairs}
              wordleConfig={wordleConfig}
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
  )
}

export default GamesPage
