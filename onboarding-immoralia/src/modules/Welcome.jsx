import { useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { WORKPLACE_OPTIONS } from '../data/workplace'

/**
 * @param {{ defaultName?: string, defaultWorkplace?: import('../data/workplace').WorkplaceId, onStart: (payload: { userName: string, workplace: import('../data/workplace').WorkplaceId }) => void }} props
 */
function Welcome({ defaultName = '', defaultWorkplace = 'general', onStart }) {
  const [workplace, setWorkplace] = useState(defaultWorkplace)
  const [name, setName] = useState(defaultName)

  const handleSubmit = (event) => {
    event.preventDefault()
    const cleanName = name.trim()
    if (!cleanName) return
    onStart({ userName: cleanName, workplace })
  }

  return (
    <ModuleWrapper
      title="Bienvenida al onboarding"
      subtitle="Primero elige tu espacio; luego tu nombre. Despues iras a la pagina solo de teoria y, cuando quieras, a los minijuegos. La teoria la tendras siempre a mano en otra pestana durante el recorrido."
    >
      <div className="mb-6 rounded-xl border border-cyan-300/30 bg-gradient-to-br from-cyan-500/12 to-fuchsia-500/10 px-4 py-4 md:px-5 md:py-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-cyan-300/90">Antes de empezar</p>
        <p className="mt-2 text-lg font-semibold leading-snug text-cyan-50 md:text-xl">
          <span className="mr-2 inline-block animate-wiggle-soft text-xl" aria-hidden>
            🎮
          </span>
          Contenido <strong className="text-cyan-200">general</strong> para todos
        </p>
        <p className="mt-2 text-sm leading-relaxed text-cyan-100/90 md:text-base">
          Mas adelante habra material especifico por marca donde corresponda. Imcontent e Immedia estan como opcion
          para el futuro proximo.
        </p>
      </div>

      <form className="grid gap-8" onSubmit={handleSubmit}>
        <fieldset className="grid gap-3 rounded-2xl border border-slate-700/50 bg-slate-950/40 p-4 md:p-5">
          <legend className="sr-only">Espacio de trabajo</legend>
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-300/90">Paso 1</p>
          <h2 className="text-lg font-bold text-white md:text-xl">Donde trabajas</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {WORKPLACE_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 transition ${
                  workplace === opt.id
                    ? 'border-amber-400/60 bg-amber-500/15 ring-1 ring-amber-400/35'
                    : 'border-slate-600/70 bg-slate-900/50 hover:border-slate-500'
                }`}
              >
                <input
                  type="radio"
                  name="workplace"
                  value={opt.id}
                  checked={workplace === opt.id}
                  onChange={() => setWorkplace(opt.id)}
                  className="mt-1 accent-amber-400"
                />
                <span className="min-w-0">
                  <span className="flex items-center gap-2 font-semibold text-slate-100">
                    <span aria-hidden>{opt.emoji}</span>
                    {opt.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-400">{opt.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-3 rounded-2xl border border-slate-700/50 bg-slate-950/40 p-4 md:p-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-cyan-300/90">Paso 2</p>
          <label htmlFor="name" className="text-lg font-bold text-white md:text-xl">
            Como te llamas?
          </label>
          <p className="text-xs text-slate-500 md:text-sm">Nombre o apodo; lo veras en teoria y minijuegos.</p>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Tu nombre o apodo del equipo"
            className="rounded-xl border border-cyan-300/40 bg-slate-950/70 px-4 py-3.5 text-base text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-200 focus:ring-2 focus:ring-cyan-500/25 md:text-lg"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 px-4 py-3.5 text-lg font-bold text-slate-900 shadow-lg shadow-emerald-900/25 transition hover:scale-[1.02] hover:brightness-105 active:scale-[0.99] md:text-xl"
        >
          Entrar al onboarding
        </button>
      </form>
    </ModuleWrapper>
  )
}

export default Welcome
