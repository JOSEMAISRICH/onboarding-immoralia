import { Link, Navigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import { SOP_GROUPS, SOPS } from '../data/sops'

const SOPS_BASE_PATH = '/sops'

function SopsPage() {
  const { userName } = useOnboarding()

  if (!userName) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-slate-950/80 px-4 py-8 text-slate-200 md:px-6 md:py-12">
      <div className="playful-card-ring mx-auto max-w-3xl rounded-3xl border border-cyan-500/20 bg-slate-950/50 px-4 py-8 backdrop-blur-sm md:px-8 md:py-10">
        <div className="mb-10 flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-8">
          <div className="min-w-0 max-w-2xl space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300/90">Procedimientos</p>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">SOPs</h1>
            <p className="text-lg leading-relaxed text-slate-400 md:text-xl md:leading-relaxed">
              Listado por area. Cada ficha trae el texto en pantalla; abajo, enlace opcional a ClickUp y video embebido
              cuando exista (prototipo con dos de prueba).
            </p>
          </div>
          <Link
            to="/teoria"
            className="shrink-0 rounded-xl border border-slate-600 bg-slate-900/90 px-4 py-2.5 text-sm font-semibold text-slate-100 shadow-sm hover:border-cyan-500/50 hover:text-white"
          >
            Volver a teoria
          </Link>
        </div>

        <div className="space-y-12">
          {SOP_GROUPS.map((g) => {
            const items = SOPS.filter((s) => s.groupId === g.id)
            if (items.length === 0) return null
            return (
              <section
                key={g.id}
                className="rounded-2xl border border-slate-700/50 bg-slate-900/40 p-5 shadow-inner shadow-slate-950/30 md:p-6"
              >
                <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-300/90">Area</h2>
                <p className="mt-1 text-xl font-bold text-white md:text-2xl">{g.label}</p>
                <ul className="mt-5 space-y-3">
                  {items.map((sop) => (
                    <li key={sop.id}>
                      <Link
                        to={`${SOPS_BASE_PATH}/${sop.id}`}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-4 text-left transition hover:border-cyan-500/40 hover:bg-slate-950/90 md:px-5 md:py-4"
                      >
                        <span className="text-base font-semibold leading-snug text-slate-100 group-hover:text-white md:text-lg">
                          {sop.title}
                        </span>
                        <span className="shrink-0 text-sm font-bold uppercase tracking-wide text-cyan-400/90">
                          Abrir
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SopsPage
