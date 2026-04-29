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
import MiniMemory from '../modules/MiniMemory'
import MiniScenario from '../modules/MiniScenario'
import MiniWhoToAsk from '../modules/MiniWhoToAsk'
import MiniWordle from '../modules/MiniWordle'
import { EXTRA_GAME_KEYS } from '../data/extraMinijuegos10'
import ModuleWrapper from '../components/ModuleWrapper'

/**
 * Contenido principal del recorrido (/minijuegos) según paso.
 */
export function GamesStepContent({
  stepIndex,
  finishStep,
  extraStartStep,
  wpId,
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
  wordleConfig,
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
        gameIndex={gi}
        onComplete={(pts) => {
          const key = EXTRA_GAME_KEYS[gi]
          beat(pts, `Extra ${gi + 1}`, () => recordModuleScore(key, pts))
        }}
      />
    )
  }

  switch (stepIndex) {
    case 1:
      return wpId === 'immoralia' ? (
        <MiniHerramientasJuego
          onComplete={(earnedPoints) =>
            beat(earnedPoints, 'Modulo 1: documentacion', () =>
              () => recordModuleScore('registros', earnedPoints),
            )
          }
        />
      ) : (
        <MiniModulo1Repaso
          workplace={workplace}
          items={modulo1Items}
          onComplete={(earnedPoints) =>
            beat(earnedPoints, 'Modulo 1: repaso', () =>
              () => recordModuleScore('registros', earnedPoints),
            )
          }
        />
      )
    case 2:
      return (
        <MiniValoresJuego
          onComplete={(earnedPoints) =>
            beat(earnedPoints, 'Valores del manifiesto', () =>
              () => recordModuleScore('valores', earnedPoints),
            )
          }
        />
      )
    case 3:
      return (
        <Quiz
          questions={quizPreguntas}
          onComplete={(earnedPoints) =>
            beat(earnedPoints, 'Gran quiz', () => () => recordModuleScore('quiz', earnedPoints))
          }
        />
      )
    case 4:
      return (
        <Puzzle
          steps={puzzleSteps}
          onComplete={(earnedPoints) =>
            beat(earnedPoints, 'Ordena el proceso', () =>
              () => recordModuleScore('puzzle', earnedPoints),
            )
          }
        />
      )
    case 5:
      return (
        <MiniTrueFalse
          items={tfItems}
          onComplete={(earned) =>
            beat(earned, 'Verdadero o falso', () => () => recordModuleScore('miniTrueFalse', earned))
          }
        />
      )
    case 6:
      return (
        <MiniMatch
          pairs={matchPairs}
          onComplete={(earned) =>
            beat(earned, 'Empareja', () => () => recordModuleScore('miniMatch', earned))
          }
        />
      )
    case 7:
      return (
        <MiniScramble
          rounds={scrambleRounds}
          onComplete={(earned) =>
            beat(earned, 'Palabra revuelta', () => () => recordModuleScore('miniScramble', earned))
          }
        />
      )
    case 8:
      return (
        <MiniOddOne
          questions={oddQuestions}
          onComplete={(earned) =>
            beat(earned, 'El intruso', () => () => recordModuleScore('miniOdd', earned))
          }
        />
      )
    case 9:
      return (
        <MiniScenario
          rounds={scenarioRounds}
          onComplete={(earned) => beat(earned, 'Escenarios', () => recordModuleScore('miniScenario', earned))}
        />
      )
    case 10:
      return (
        <MiniMemory
          pairs={memoryPairs}
          onComplete={(earned) => beat(earned, 'Memoria', () => recordModuleScore('miniMemory', earned))}
        />
      )
    case 11:
      return (
        <MiniWordle
          config={wordleConfig}
          onComplete={(earned) => beat(earned, 'Palabra oculta', () => recordModuleScore('miniWordle', earned))}
        />
      )
    case 12:
      return (
        <MiniWhoToAsk
          rounds={whoAskRounds}
          onComplete={(earned) => beat(earned, 'A quien consultar', () => recordModuleScore('miniWhoToAsk', earned))}
        />
      )
    default:
      return null
  }
}
