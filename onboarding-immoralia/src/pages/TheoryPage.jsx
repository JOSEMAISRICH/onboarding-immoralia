import { useMemo } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import TheoryLibraryContent from '../components/TheoryLibraryContent'

/** Solo teoria: lectura y fichas. Minijuegos viven en /minijuegos (ruta aparte). */
function TheoryPage() {
  const { userName, workplace, stepIndex, beginMinijuegos } = useOnboarding()
  const navigate = useNavigate()

  const theoryUrl = useMemo(() => {
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
    return `${typeof window !== 'undefined' ? window.location.origin : ''}${base}/teoria`
  }, [])

  const goToMinijuegos = () => {
    if (stepIndex === 0) beginMinijuegos()
    navigate('/minijuegos')
  }

  if (!userName) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen">
      <header className="animate-fade-up border-b border-cyan-500/25 bg-indigo-950/90 px-5 py-6 backdrop-blur-md md:py-7">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-5">
          <div className="min-w-0 max-w-xl space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200/95">
              <span className="animate-wiggle-soft inline-block" aria-hidden>
                📚
              </span>
              Teoría · paso principal
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Biblioteca de lectura
            </h1>
            <p className="text-base leading-relaxed text-slate-300 md:text-lg">
              Hola, <strong className="text-xl font-bold text-white md:text-2xl">{userName}</strong>. Estás en el
              espacio correcto: aquí está toda la <strong className="text-cyan-200">teoría</strong> de tu equipo antes
              de los minijuegos. Explora documentación y fichas con calma.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/sops"
              className="inline-flex items-center justify-center rounded-xl border-2 border-amber-400/55 bg-gradient-to-r from-amber-500/25 to-orange-600/20 px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-amber-50 shadow-md shadow-amber-900/20 transition hover:scale-[1.02] hover:border-amber-300/70 hover:brightness-110 md:min-w-[10rem] md:px-6 md:text-base"
            >
              Ver SOPs
            </Link>
            <a
              href={theoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs font-medium text-cyan-300/90 underline-offset-2 transition hover:text-cyan-200 hover:underline md:text-sm"
            >
              Abrir esta teoría en otra pestaña
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[92%] max-w-4xl flex-1 py-8">
        <div className="animate-fade-up" style={{ animationDelay: '120ms', animationFillMode: 'both' }}>
          <TheoryLibraryContent workplace={workplace} onOpenDocTopic={(id) => navigate(`/teoria/ficha/${id}`)} />
        </div>

        <section
          className="animate-fade-up mt-12 rounded-2xl border border-slate-600/50 bg-slate-900/60 p-6 shadow-lg md:mt-14 md:p-8"
          style={{ animationDelay: '200ms', animationFillMode: 'both' }}
        >
          <h2 className="text-center font-display text-lg font-bold text-white md:text-xl">Tu ruta</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-slate-400 md:text-base">
            La teoría siempre va primero; los minijuegos son la fase de práctica y puntos.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center">
            <div className="flex flex-1 flex-col rounded-xl border-2 border-cyan-400/50 bg-cyan-950/40 p-4 text-center shadow-[0_0_24px_rgba(34,211,238,0.12)]">
              <span className="text-2xl" aria-hidden>
                📚
              </span>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-cyan-200/90">Ahora</p>
              <p className="mt-1 text-base font-bold text-white">Teoría</p>
              <p className="mt-1 text-xs text-slate-400">Estás en la biblioteca</p>
            </div>

            <div
              className="hidden shrink-0 text-2xl text-cyan-400/60 sm:block"
              aria-hidden
              title="Después"
            >
              →
            </div>
            <div className="flex justify-center text-xl text-cyan-400/70 sm:hidden" aria-hidden>
              ↓
            </div>

            <div className="flex flex-1 flex-col rounded-xl border border-slate-600/70 bg-slate-950/50 p-4 text-center transition hover:border-amber-500/40">
              <span className="text-2xl" aria-hidden>
                🎮
              </span>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-500">Después</p>
              <p className="mt-1 text-base font-bold text-slate-200">Minijuegos</p>
              <p className="mt-1 text-xs text-slate-500">Repasos y puntos</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              className="rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 px-10 py-3.5 text-base font-bold text-slate-900 shadow-lg transition hover:scale-[1.02] hover:brightness-105 active:scale-[0.99] md:text-lg"
              onClick={goToMinijuegos}
            >
              {stepIndex === 0 ? 'Ir a minijuegos cuando esté listo' : 'Volver a minijuegos'}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default TheoryPage
