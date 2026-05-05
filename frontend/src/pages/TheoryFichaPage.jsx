import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import SopsNavLink from '../components/SopsNavLink'
import { DOC_TOPIC_IDS } from '../data/docTopicOrder'
import { normalizeWorkplaceId } from '../data/workplace'
import DocTopicView from '../modules/DocTopicView'

/** Ficha bajo /teoria/ficha: solo lectura (sin repaso con preguntas). */
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50/70 via-[#faf8f5] to-emerald-50/35 p-4">
      <div className="mx-auto mb-3 flex max-w-4xl justify-end">
        <SopsNavLink />
      </div>
      <DocTopicView
        topicId={topicId}
        libraryMode
        onBack={() => navigate('/teoria', { preventScrollReset: true })}
        onTopicComplete={() => {}}
      />
    </div>
  )
}

export default TheoryFichaPage
