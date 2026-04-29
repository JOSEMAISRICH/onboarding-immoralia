import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import PlayfulBackdrop from './components/PlayfulBackdrop'
import StepCompleteOverlay from './components/StepCompleteOverlay'
import { OnboardingProvider, useOnboarding } from './context/OnboardingContext'
import WelcomePage from './pages/WelcomePage'

const GamesPage = lazy(() => import('./pages/GamesPage'))
const TheoryPage = lazy(() => import('./pages/TheoryPage'))
const TheoryFichaPage = lazy(() => import('./pages/TheoryFichaPage'))
const SopsPage = lazy(() => import('./pages/SopsPage'))
const SopDetailPage = lazy(() => import('./pages/SopDetailPage'))

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-slate-400">
      Cargando…
    </div>
  )
}

/** Compatibilidad con enlaces antiguos a /procedimientos → /sops */
function ProcedimientosToSopRedirect() {
  const { sopId } = useParams()
  return <Navigate to={`/sops/${encodeURIComponent(sopId || '')}`} replace />
}

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
      {children}
    </>
  )
}

function AppRoutes() {
  return (
    <SyncAndCelebrationLayer>
      <div className="min-h-screen">
        <PlayfulBackdrop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/teoria" element={<TheoryPage />} />
            <Route path="/teoria/ficha/:topicId" element={<TheoryFichaPage />} />
            <Route path="/sops" element={<SopsPage />} />
            <Route path="/sops/:sopId" element={<SopDetailPage />} />
            <Route path="/procedimientos" element={<Navigate to="/sops" replace />} />
            <Route path="/procedimientos/:sopId" element={<ProcedimientosToSopRedirect />} />
            <Route path="/minijuegos" element={<GamesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
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
