import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import { DOC_TOPIC_IDS } from '../data/docTopicOrder'
import { normalizeWorkplaceId } from '../data/workplace'
import { recordTheoryFichaQuizScore } from '../lib/theoryFichaStorage'
import DocTopicView from '../modules/DocTopicView'

/** Ficha dedicada bajo /teoria/ficha: lectura + repaso corto; puntuacion guardada en localStorage. */
function TheoryFichaPage() {
  const { userName, workplace } = useOnboarding()
  const { topicId } = useParams()
  const navigate = useNavigate()
  const wp = normalizeWorkplaceId(workplace)

  if (!userName) {
    return <Navigate to="/" replace />
  }

  if (!topicId) {
    return <Navigate to="/teoria" replace />
  }

  /** Las fichas internas son solo del espacio Immoralia. */
  const fichaPermitida =
    wp === 'immoralia' && DOC_TOPIC_IDS.includes(topicId)

  if (!fichaPermitida) {
    return <Navigate to="/teoria" replace />
  }

  return (
    <div className="min-h-screen bg-slate-950/95 p-4">
      <DocTopicView
        topicId={topicId}
        libraryMode={false}
        onBack={() => navigate('/teoria', { preventScrollReset: true })}
        onTopicComplete={(id, pts) => recordTheoryFichaQuizScore(id, pts)}
      />
    </div>
  )
}

export default TheoryFichaPage
