import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import SopsNavLink from '../components/SopsNavLink'
import TheoryLibraryContent from '../components/TheoryLibraryContent'
import { STEPS } from '../lib/onboardingSteps'

/** Solo teoria: lectura y fichas. Minijuegos viven en /minijuegos (ruta aparte). */
function TheoryPage() {
  const { userName, workplace, stepIndex } = useOnboarding()
  const navigate = useNavigate()
  const examResumeStepDisplay = stepIndex >= 1 ? Math.min(stepIndex + 1, STEPS.length) : null

  if (!userName) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen">
      <header className="animate-fade-up border-b border-blue-100/95 bg-white/92 px-5 py-6 shadow-sm shadow-blue-100/70 backdrop-blur-md md:py-7">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-5">
          <div className="min-w-0 max-w-xl space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-900">
              <span className="animate-wiggle-soft inline-block" aria-hidden>
                📚
              </span>
              Teoría
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Biblioteca de lectura
            </h1>
            <p className="text-base leading-relaxed text-slate-600 md:text-lg">
              Hola, <strong className="text-xl font-bold text-slate-900 md:text-2xl">{userName}</strong>. Toda la información
              está en las <strong className="text-blue-800">fichas</strong>: abre cada tema y lee el contenido completo.
              Si tu equipo comparte{' '}
              <strong className="text-blue-800">vídeos</strong> (Loom, grabaciones), úsalos como apoyo enlazados desde
              Slack o ClickUp.
            </p>
            {examResumeStepDisplay ? (
              <div className="flex flex-col gap-2 pt-4">
                <Link
                  to="/minijuegos"
                  className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-teal-600/25 transition hover:brightness-[1.06] active:scale-[0.99] sm:w-auto md:py-4 md:text-lg"
                >
                  <span aria-hidden>▶</span>
                  Seguir examen donde lo dejaste
                  <span className="font-semibold opacity-95">
                    · paso {examResumeStepDisplay} de {STEPS.length}
                  </span>
                </Link>
                <p className="max-w-md text-xs leading-snug text-slate-500 md:text-sm">
                  Tu paso en el recorrido se guarda en este navegador; volver aquí no te hace empezar de cero.
                </p>
              </div>
            ) : (
              <p className="max-w-xl pt-4 text-xs leading-snug text-slate-500 md:text-sm">
                Cuando entres al examen interactivo, tu paso y las preguntas en curso se guardan en este navegador; puedes
                volver a teoría sin perder el sitio.
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-start">
            <SopsNavLink />
          </div>
        </div>
      </header>

      <main className="mx-auto w-[92%] max-w-4xl flex-1 py-8">
        <div className="animate-fade-up" style={{ animationDelay: '120ms', animationFillMode: 'both' }}>
          <TheoryLibraryContent workplace={workplace} onOpenDocTopic={(id) => navigate(`/teoria/ficha/${id}`)} />
        </div>
      </main>
    </div>
  )
}

export default TheoryPage
