import { Navigate, useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import Welcome from '../modules/Welcome'

function WelcomePage() {
  const { hydrated, apiOn, handleWelcomeSubmit, stepIndex, userName, workplace } = useOnboarding()
  const navigate = useNavigate()

  if (apiOn && !hydrated) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center px-4"
        aria-busy="true"
        aria-label="Cargando"
      >
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-teal-400 border-t-transparent" />
      </div>
    )
  }

  if (stepIndex >= 1) {
    return <Navigate to="/minijuegos" replace />
  }

  if (userName && stepIndex === 0) {
    return <Navigate to="/teoria" replace />
  }

  return (
    <main className="mx-auto my-8 w-[92%] max-w-2xl pb-6">
      <Welcome
        defaultName={userName}
        defaultWorkplace={workplace}
        onStart={async (payload) => {
          await handleWelcomeSubmit(payload)
          navigate('/teoria', { replace: true })
        }}
      />
    </main>
  )
}

export default WelcomePage
