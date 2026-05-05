import Finish from '../modules/Finish'
import MiniExtraSingle from '../modules/MiniExtraSingle'
import MiniMatch from '../modules/MiniMatch'
import MiniOddOne from '../modules/MiniOddOne'
import MiniScramble from '../modules/MiniScramble'
import MiniTrueFalse from '../modules/MiniTrueFalse'
import Puzzle from '../modules/Puzzle'
import Quiz from '../modules/Quiz'
import MiniModulo1Repaso from '../modules/MiniModulo1Repaso'
import MiniValoresJuego from '../modules/MiniValoresJuego'
import MiniMemory from '../modules/MiniMemory'
import MiniScenario from '../modules/MiniScenario'
import MiniWhoToAsk from '../modules/MiniWhoToAsk'
import MiniWordleTriple from '../modules/MiniWordleTriple'
import { EXTRA_GAME_KEYS } from '../data/extraMinijuegos10'
import ModuleWrapper from '../components/ModuleWrapper'
import { clearGameResume } from '../lib/minigameResumeStorage'
import { getModuleKeyForStep } from '../lib/moduleStepMap'

/**
 * Contenido principal del recorrido (/minijuegos) según paso.
 */
export function GamesStepContent({
  stepIndex,
  finishStep,
  extraStartStep,
  workplace,
  quizPreguntas,
  tfItems,
  matchPairs,
  scrambleRounds,
  oddQuestions,
  puzzleSteps,
  modulo1Items,
  scenarioRounds,
  memoryPairs,
  wordlePool,
  whoAskRounds,
  completeAfterBeat,
  recordModuleScore,
  userName,
  totalPoints,
  maxPoints,
  scoreByModule,
  maxByModule,
  startedAt,
  onReset,
  beginReplayModule,
}) {
  const beat = completeAfterBeat

  const beatClear = (stepForModule, earnedPoints, title, updateScore) => {
    const mk = getModuleKeyForStep(stepForModule)
    if (mk) clearGameResume(workplace, mk)
    beat(earnedPoints, title, updateScore)
  }

  if (stepIndex === finishStep) {
    return (
      <ModuleWrapper title="Onboarding completado" subtitle="Buen trabajo.">
        <Finish
          userName={userName}
          workplace={workplace}
          totalPoints={totalPoints}
          maxPoints={maxPoints}
          scoreByModule={scoreByModule}
          maxByModule={maxByModule}
          startedAt={startedAt}
          onReset={onReset}
          beginReplayModule={beginReplayModule}
        />
      </ModuleWrapper>
    )
  }

  if (stepIndex >= extraStartStep && stepIndex < finishStep) {
    const gi = stepIndex - extraStartStep
    return (
      <MiniExtraSingle
        key={EXTRA_GAME_KEYS[gi]}
        workplace={workplace}
        gameIndex={gi}
        onComplete={(pts) => {
          const key = EXTRA_GAME_KEYS[gi]
          beatClear(extraStartStep + gi, pts, `Extra ${gi + 1}`, () => recordModuleScore(key, pts))
        }}
      />
    )
  }

  switch (stepIndex) {
    case 1:
      return (
        <MiniModulo1Repaso
          workplace={workplace}
          items={modulo1Items}
          onComplete={(earnedPoints) =>
            beatClear(1, earnedPoints, 'Modulo 1: test rapido', () => () =>
              recordModuleScore('registros', earnedPoints),
            )
          }
        />
      )
    case 2:
      return (
        <MiniValoresJuego
          workplace={workplace}
          onComplete={(earnedPoints) =>
            beatClear(2, earnedPoints, 'Valores del manifiesto', () =>
              () => recordModuleScore('valores', earnedPoints),
            )
          }
        />
      )
    case 3:
      return (
        <Quiz
          workplace={workplace}
          questions={quizPreguntas}
          onComplete={(earnedPoints) =>
            beatClear(3, earnedPoints, 'Gran quiz', () => () => recordModuleScore('quiz', earnedPoints))
          }
        />
      )
    case 4:
      return (
        <Puzzle
          workplace={workplace}
          steps={puzzleSteps}
          onComplete={(earnedPoints) =>
            beatClear(4, earnedPoints, 'Ordena el proceso', () =>
              () => recordModuleScore('puzzle', earnedPoints),
            )
          }
        />
      )
    case 5:
      return (
        <MiniTrueFalse
          workplace={workplace}
          items={tfItems}
          onComplete={(earned) =>
            beatClear(5, earned, 'Verdadero o falso', () => () => recordModuleScore('miniTrueFalse', earned))
          }
        />
      )
    case 6:
      return (
        <MiniMatch
          workplace={workplace}
          pairs={matchPairs}
          onComplete={(earned) =>
            beatClear(6, earned, 'Empareja', () => () => recordModuleScore('miniMatch', earned))
          }
        />
      )
    case 7:
      return (
        <MiniScramble
          workplace={workplace}
          rounds={scrambleRounds}
          onComplete={(earned) =>
            beatClear(7, earned, 'Palabra revuelta', () => () => recordModuleScore('miniScramble', earned))
          }
        />
      )
    case 8:
      return (
        <MiniOddOne
          workplace={workplace}
          questions={oddQuestions}
          onComplete={(earned) =>
            beatClear(8, earned, 'El intruso', () => () => recordModuleScore('miniOdd', earned))
          }
        />
      )
    case 9:
      return (
        <MiniScenario
          workplace={workplace}
          rounds={scenarioRounds}
          onComplete={(earned) =>
            beatClear(9, earned, 'Escenarios', () => recordModuleScore('miniScenario', earned))
          }
        />
      )
    case 10:
      return (
        <MiniMemory
          workplace={workplace}
          pairs={memoryPairs}
          onComplete={(earned) =>
            beatClear(10, earned, 'Memoria', () => recordModuleScore('miniMemory', earned))
          }
        />
      )
    case 11:
      return (
        <MiniWordleTriple
          workplace={workplace}
          wordlePool={wordlePool}
          onComplete={(earned) =>
            beatClear(11, earned, 'Palabra oculta', () => recordModuleScore('miniWordle', earned))
          }
        />
      )
    case 12:
      return (
        <MiniWhoToAsk
          workplace={workplace}
          rounds={whoAskRounds}
          onComplete={(earned) =>
            beatClear(12, earned, 'A quien consultar', () => recordModuleScore('miniWhoToAsk', earned))
          }
        />
      )
    default:
      return null
  }
}
