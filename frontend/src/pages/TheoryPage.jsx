import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import TheoryLibraryContent from '../components/TheoryLibraryContent'

/** Solo teoria: lectura y fichas. Minijuegos viven en /minijuegos (ruta aparte). */
function TheoryPage() {
  const { userName, workplace, stepIndex, beginMinijuegos } = useOnboarding()
  const navigate = useNavigate()

  const goToMinijuegos = () => {
    if (stepIndex === 0) beginMinijuegos()
    navigate('/minijuegos')
  }

  if (!userName) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-cyan-500/20 bg-indigo-950/85 px-5 py-5 backdrop-blur-md md:py-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4">
          <div className="min-w-0 max-w-xl space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400/90">Teoria</p>
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Biblioteca de lectura</h1>
            <p className="text-base leading-relaxed text-slate-400 md:text-lg">
              Hola, <strong className="text-lg font-bold text-white md:text-xl">{userName}</strong>. Aqui la
              documentacion y las fichas; los repasos con puntos estan en la ruta de minijuegos.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/sops"
              className="text-xs font-medium text-amber-200/90 underline-offset-2 hover:text-amber-100 hover:underline"
            >
              Ver SOPs
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[92%] max-w-4xl flex-1 py-8">
        <TheoryLibraryContent workplace={workplace} onOpenDocTopic={(id) => navigate(`/teoria/ficha/${id}`)} />
        <section className="mt-10 rounded-2xl border border-slate-700/60 bg-slate-900/50 px-6 py-8 text-center md:mt-12 md:px-10 md:py-10">
          <h2 className="text-lg font-bold text-white md:text-xl">Siguiente paso</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-400 md:text-base">
            {stepIndex === 0
              ? 'Cuando quieras practicar y sumar puntos, entra a minijuegos.'
              : 'Tu recorrido sigue en minijuegos; puedes volver cuando quieras.'}
          </p>
          <button
            type="button"
            className="mt-6 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 px-10 py-3.5 text-base font-bold text-slate-900 shadow-lg hover:brightness-105 md:text-lg"
            onClick={goToMinijuegos}
          >
            {stepIndex === 0 ? 'Ir a minijuegos' : 'Volver a minijuegos'}
          </button>
        </section>
      </main>
    </div>
  )
}

export default TheoryPage
