import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DevStepSkipBanner from './components/DevStepSkipBanner'
import PlayfulBackdrop from './components/PlayfulBackdrop'
import StepCompleteOverlay from './components/StepCompleteOverlay'
import { OnboardingProvider, useOnboarding } from './context/OnboardingContext'
import GamesPage from './pages/GamesPage'
import TheoryFichaPage from './pages/TheoryFichaPage'
import SopDetailPage from './pages/SopDetailPage'
import SopsPage from './pages/SopsPage'
import TheoryPage from './pages/TheoryPage'
import WelcomePage from './pages/WelcomePage'

/** Globales que deben verse tambien fuera de /minijuegos (p. ej. overlay de rango). */
function SyncAndCelebrationLayer({ children }) {
  const { apiOn, syncError, pendingCelebration, advanceAfterCelebration } = useOnboarding()

  return (
    <>
      {syncError && apiOn ? (
        <div
          className="border-b border-amber-400/40 bg-amber-500/15 px-4 py-2 text-center text-sm text-amber-100"
          role="status"
        >
          No se ha podido sincronizar con el servidor; tu avance sigue guardado en este navegador.
        </div>
      ) : null}
      {pendingCelebration !== null ? (
        <StepCompleteOverlay
          fromStep={pendingCelebration.fromStep}
          newTierId={pendingCelebration.newTierId}
          onContinue={advanceAfterCelebration}
        />
      ) : null}
      <DevStepSkipBanner />
      {children}
    </>
  )
}

function AppRoutes() {
  return (
    <SyncAndCelebrationLayer>
      <div className="min-h-screen">
        <PlayfulBackdrop />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/teoria" element={<TheoryPage />} />
          <Route path="/teoria/ficha/:topicId" element={<TheoryFichaPage />} />
          <Route path="/sops" element={<SopsPage />} />
          <Route path="/sops/:sopId" element={<SopDetailPage />} />
          <Route path="/procedimientos" element={<SopsPage />} />
          <Route path="/procedimientos/:sopId" element={<SopDetailPage />} />
          <Route path="/minijuegos" element={<GamesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </SyncAndCelebrationLayer>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <OnboardingProvider>
        <AppRoutes />
      </OnboardingProvider>
    </BrowserRouter>
  )
}
