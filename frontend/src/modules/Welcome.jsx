import { useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { WORKPLACE_OPTIONS } from '../data/workplace'

/**
 * @param {{ defaultName?: string, defaultWorkplace?: import('../data/workplace').WorkplaceId, onStart: (payload: { userName: string, workplace: import('../data/workplace').WorkplaceId }) => void }} props
 */
function Welcome({ defaultName = '', defaultWorkplace = 'immoralia', onStart }) {
  const [workplace, setWorkplace] = useState(() =>
    WORKPLACE_OPTIONS.some((o) => o.id === defaultWorkplace) ? defaultWorkplace : 'immoralia',
  )
  const [name, setName] = useState(defaultName)

  const handleSubmit = (event) => {
    event.preventDefault()
    const cleanName = name.trim()
    if (!cleanName) return
    onStart({ userName: cleanName, workplace })
  }

  return (
    <ModuleWrapper title="Bienvenida al onboarding">
      <form className="grid gap-8" onSubmit={handleSubmit}>
        <fieldset className="grid gap-3 rounded-2xl border border-blue-100/90 bg-blue-50/50 p-4 md:p-5">
          <legend className="sr-only">Espacio de trabajo</legend>
          <p className="text-[11px] font-bold uppercase tracking-widest text-blue-800/90">Elige tu espacio</p>
          <h2 className="text-lg font-bold text-slate-900 md:text-xl">¿Donde trabajas?</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {WORKPLACE_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 transition ${
                  workplace === opt.id
                    ? 'border-amber-400/70 bg-amber-50 ring-2 ring-amber-300/50 shadow-sm'
                    : 'border-slate-200 bg-white/90 hover:border-blue-200 hover:bg-blue-50/40'
                }`}
              >
                <input
                  type="radio"
                  name="workplace"
                  value={opt.id}
                  checked={workplace === opt.id}
                  onChange={() => setWorkplace(opt.id)}
                  className="mt-1 accent-amber-500"
                />
                <span className="min-w-0">
                  <span className="flex items-center gap-2 font-semibold text-slate-800">
                    <span aria-hidden>{opt.emoji}</span>
                    {opt.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-600">{opt.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-3 rounded-2xl border border-blue-100/90 bg-white/92 p-4 md:p-5 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-widest text-blue-800/90">Tu nombre</p>
          <label htmlFor="name" className="text-lg font-bold text-slate-900 md:text-xl">
            ¿Como te llamas?
          </label>
          <p className="text-xs text-slate-600 md:text-sm">Nombre o apodo; lo verás en teoría y en el recorrido.</p>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Tu nombre o apodo del equipo"
            className="rounded-xl border border-blue-200/80 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/25 md:text-lg"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 px-4 py-3.5 text-lg font-bold text-white shadow-lg shadow-blue-900/20 transition hover:scale-[1.02] hover:brightness-[1.05] active:scale-[0.99] md:text-xl"
        >
          Ir a la teoría
        </button>
      </form>
    </ModuleWrapper>
  )
}

export default Welcome
