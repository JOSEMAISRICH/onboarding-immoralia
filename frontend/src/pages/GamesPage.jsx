import { useMemo } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import CurrentLessonBanner from '../components/CurrentLessonBanner'
import LearningPath from '../components/LearningPath'
import ModuleWrapper from '../components/ModuleWrapper'
import ProgressBar from '../components/ProgressBar'
import { getUnitForStep } from '../data/learningUnits'
import Finish from '../modules/Finish'
import MiniExtraSingle from '../modules/MiniExtraSingle'
import MiniMatch from '../modules/MiniMatch'
import MiniOddOne from '../modules/MiniOddOne'
import MiniScramble from '../modules/MiniScramble'
import MiniTrueFalse from '../modules/MiniTrueFalse'
import Puzzle from '../modules/Puzzle'
import Quiz from '../modules/Quiz'
import MiniHerramientasJuego from '../modules/MiniHerramientasJuego'
import MiniModulo1Repaso from '../modules/MiniModulo1Repaso'
import MiniValoresJuego from '../modules/MiniValoresJuego'
import { EXTRA_GAME_KEYS } from '../data/extraMinijuegos10'
import { normalizeWorkplaceId } from '../data/workplace'
import {
  getModulo1RepasoItems,
  getPalabrasRevueltas,
  getParesHerramienta,
  getPasosProceso,
  getPreguntasIntruso,
  getPreguntasTrueFalse,
  getQuizPreguntas,
} from '../lib/workplacePack'
import { FINISH_STEP, EXTRA_START_STEP, STEPS } from '../lib/onboardingSteps'

function GamesPage() {
  const navigate = useNavigate()
  const {
    userName,
    workplace,
    stepIndex,
    completeModuleWithScore,
    handleReset,
    scoreByModule,
    setScoreByModule,
    totalPoints,
    maxPoints,
    maxByModule,
    startedAt,
    journeyCompletionPercent,
    learningUnits,
    streakDays,
    beginMinijuegos,
  } = useOnboarding()

  const wpId = normalizeWorkplaceId(workplace)
  const quizPreguntas = useMemo(() => getQuizPreguntas(workplace), [workplace])
  const tfItems = useMemo(() => getPreguntasTrueFalse(workplace), [workplace])
  const matchPairs = useMemo(() => getParesHerramienta(workplace), [workplace])
  const scrambleRounds = useMemo(() => getPalabrasRevueltas(workplace), [workplace])
  const oddQuestions = useMemo(() => getPreguntasIntruso(workplace), [workplace])
  const puzzleSteps = useMemo(() => getPasosProceso(workplace), [workplace])
  const modulo1Items = useMemo(() => getModulo1RepasoItems(workplace), [workplace])

  const resetAndGoHome = () => {
    handleReset()
    navigate('/', { replace: true })
  }

  if (!userName) {
    return <Navigate to="/" replace />
  }

  if (stepIndex === 0) {
    return (
      <main className="mx-auto my-16 w-[92%] max-w-lg pb-6">
        <ModuleWrapper title="Minijuegos" subtitle="Solo actividades, repasos y puntos en esta ruta.">
          <p className="text-sm leading-relaxed text-slate-400">
            Pulsa para empezar el recorrido. Podras pausar y volver aqui cuando quieras.
          </p>
          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 px-6 py-3.5 text-base font-bold text-slate-900 shadow-lg hover:brightness-105"
            onClick={() => beginMinijuegos()}
          >
            Empezar minijuegos
          </button>
        </ModuleWrapper>
      </main>
    )
  }

  return (
    <>
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
      />

      <main className="mx-auto my-8 w-[92%] max-w-6xl pb-6">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] xl:items-start">
          <div className="order-1 min-w-0 space-y-6">
            {stepIndex <= FINISH_STEP ? (
              <CurrentLessonBanner unit={getUnitForStep(stepIndex, FINISH_STEP)} />
            ) : null}

            {stepIndex === 1 &&
              (wpId === 'immoralia' ? (
                <MiniHerramientasJuego
                  onComplete={(earnedPoints) => {
                    completeModuleWithScore(() =>
                      setScoreByModule((s) => ({ ...s, registros: earnedPoints })),
                    )
                  }}
                />
              ) : (
                <MiniModulo1Repaso
                  workplace={workplace}
                  items={modulo1Items}
                  onComplete={(earnedPoints) => {
                    completeModuleWithScore(() =>
                      setScoreByModule((s) => ({ ...s, registros: earnedPoints })),
                    )
                  }}
                />
              ))}

            {stepIndex === 2 && (
              <MiniValoresJuego
                onComplete={(earnedPoints) => {
                  completeModuleWithScore(() =>
                    setScoreByModule((s) => ({ ...s, valores: earnedPoints })),
                  )
                }}
              />
            )}

            {stepIndex === 3 && (
              <Quiz
                questions={quizPreguntas}
                onComplete={(earnedPoints) => {
                  completeModuleWithScore(() =>
                    setScoreByModule((s) => ({ ...s, quiz: earnedPoints })),
                  )
                }}
              />
            )}

            {stepIndex === 4 && (
              <Puzzle
                steps={puzzleSteps}
                onComplete={(earnedPoints) => {
                  completeModuleWithScore(() =>
                    setScoreByModule((s) => ({ ...s, puzzle: earnedPoints })),
                  )
                }}
              />
            )}

            {stepIndex === 5 && (
              <MiniTrueFalse
                items={tfItems}
                onComplete={(earned) => {
                  completeModuleWithScore(() =>
                    setScoreByModule((s) => ({ ...s, miniTrueFalse: earned })),
                  )
                }}
              />
            )}

            {stepIndex === 6 && (
              <MiniMatch
                pairs={matchPairs}
                onComplete={(earned) => {
                  completeModuleWithScore(() =>
                    setScoreByModule((s) => ({ ...s, miniMatch: earned })),
                  )
                }}
              />
            )}

            {stepIndex === 7 && (
              <MiniScramble
                rounds={scrambleRounds}
                onComplete={(earned) => {
                  completeModuleWithScore(() =>
                    setScoreByModule((s) => ({ ...s, miniScramble: earned })),
                  )
                }}
              />
            )}

            {stepIndex === 8 && (
              <MiniOddOne
                questions={oddQuestions}
                onComplete={(earned) => {
                  completeModuleWithScore(() =>
                    setScoreByModule((s) => ({ ...s, miniOdd: earned })),
                  )
                }}
              />
            )}

            {stepIndex >= EXTRA_START_STEP && stepIndex < FINISH_STEP ? (
              <MiniExtraSingle
                key={EXTRA_GAME_KEYS[stepIndex - EXTRA_START_STEP]}
                gameIndex={stepIndex - EXTRA_START_STEP}
                onComplete={(pts) => {
                  const key = EXTRA_GAME_KEYS[stepIndex - EXTRA_START_STEP]
                  completeModuleWithScore(() =>
                    setScoreByModule((s) => ({ ...s, [key]: pts })),
                  )
                }}
              />
            ) : null}

            {stepIndex === FINISH_STEP && (
              <ModuleWrapper title="Onboarding completado" subtitle="Buen trabajo.">
                <Finish
                  userName={userName}
                  workplace={workplace}
                  totalPoints={totalPoints}
                  maxPoints={maxPoints}
                  scoreByModule={scoreByModule}
                  maxByModule={maxByModule}
                  startedAt={startedAt}
                  onReset={resetAndGoHome}
                />
              </ModuleWrapper>
            )}
          </div>
          {stepIndex <= FINISH_STEP ? (
            <aside className="order-2 min-w-0 xl:sticky xl:top-28">
              <LearningPath units={learningUnits} currentStep={stepIndex} />
            </aside>
          ) : null}
        </div>
      </main>
    </>
  )
}

export default GamesPage
