import MiniQuizPack from '../components/MiniQuizPack'
import {
  MINI_VALORES_POINTS,
  maxMiniValoresJuego,
  preguntasMiniValores,
} from '../data/miniValoresJuego'

function MiniValoresJuego({ onComplete }) {
  return (
    <MiniQuizPack
      title="Minijuego 2: Valores del manifiesto"
      subtitle={`${MINI_VALORES_POINTS} pts por acierto. Max ${maxMiniValoresJuego} pts. Relaciona cada idea con su valor del manifiesto (consulta la teoria de tu espacio si lo necesitas).`}
      questions={preguntasMiniValores}
      pointsPerCorrect={MINI_VALORES_POINTS}
      onComplete={onComplete}
    />
  )
}

export default MiniValoresJuego
