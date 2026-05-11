import { useMemo } from 'react'
import MiniQuizPack from '../components/MiniQuizPack'
import {
  MINI_VALORES_POINTS,
  maxMiniValoresJuego,
  preguntasMiniValores,
} from '../data/miniValoresJuego'
import { shuffleQuizOptionsDeterministic } from '../lib/quizShuffle'

function MiniValoresJuego({ workplace = 'immoralia', onComplete }) {
  const valoresQuestions = useMemo(
    () => preguntasMiniValores.map((q) => shuffleQuizOptionsDeterministic(q)),
    [],
  )

  return (
    <MiniQuizPack
      resumeWorkplace={workplace}
      resumeModuleKey="valores"
      trackExamProgress
      timerMs={7500}
      speedFastMs={3000}
      title="Minijuego 2: Valores del manifiesto"
      subtitle={`${MINI_VALORES_POINTS} pts por acierto. Max ${maxMiniValoresJuego} pts. Relaciona cada idea con su valor del manifiesto (consulta la teoria de tu espacio si lo necesitas).`}
      questions={valoresQuestions}
      pointsPerCorrect={MINI_VALORES_POINTS}
      onComplete={onComplete}
    />
  )
}

export default MiniValoresJuego
