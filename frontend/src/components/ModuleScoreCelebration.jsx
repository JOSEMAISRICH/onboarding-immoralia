import MiniConfetti from './MiniConfetti'

/**
 * Pausa breve tras un minijuego antes de avanzar de paso (puntos + feedback visual).
 */
function ModuleScoreCelebration({ points, title = 'Modulo completado', onDone }) {
  return (
    <div
      className="animate-step-complete-in fixed inset-0 z-[140] flex items-center justify-center bg-slate-950/85 p-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cele-title"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-amber-400/40 bg-gradient-to-b from-indigo-950/95 to-slate-950/95 p-8 text-center shadow-2xl shadow-amber-900/30">
        <div className="pointer-events-none absolute inset-0">
          <MiniConfetti density={22} />
        </div>
        <p id="cele-title" className="relative text-sm font-bold uppercase tracking-widest text-amber-200/90">
          {title}
        </p>
        <p className="relative mt-4 font-display text-4xl font-bold text-white md:text-5xl">+{points} pts</p>
        <p className="relative mt-3 text-sm leading-relaxed text-slate-300">
          Buen trabajo. En un momento pasas al siguiente capitulo.
        </p>
        <button
          type="button"
          className="relative mt-8 w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-3 text-base font-bold text-slate-900 shadow-lg transition hover:brightness-105"
          onClick={onDone}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

export default ModuleScoreCelebration
