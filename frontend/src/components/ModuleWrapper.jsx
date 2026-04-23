function ModuleWrapper({ title, subtitle, children }) {
  return (
    <section className="module-playful-shell animate-fade-up relative overflow-hidden rounded-3xl border border-cyan-300/30 bg-slate-900/85 p-6 pb-8 backdrop-blur-[2px] md:p-8">
      <span
        className="pointer-events-none absolute -right-6 -top-6 text-6xl opacity-[0.12] select-none"
        aria-hidden
      >
        ✨
      </span>
      <header className="max-w-3xl space-y-2 border-b border-white/5 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">{title}</h1>
        {subtitle ? (
          <p className="text-base font-normal leading-relaxed text-slate-400 md:text-lg">{subtitle}</p>
        ) : null}
      </header>
      <div className="relative mt-6 space-y-5 md:mt-8">{children}</div>
    </section>
  )
}

export default ModuleWrapper
