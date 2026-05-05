import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
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
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 text-sm text-slate-600">
      <span className="inline-block h-8 w-8 animate-pulse rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 opacity-85" aria-hidden />
      <span>Cargando…</span>
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
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <SyncAndCelebrationLayer>
      <div key={location.pathname} className="route-page-enter min-h-screen">
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
