function ModuleWrapper({ title, subtitle, children }) {
  return (
    <section className="module-playful-shell animate-fade-up relative rounded-3xl border border-blue-100/95 bg-white/94 p-6 pb-8 shadow-lg shadow-blue-100/50 backdrop-blur-sm md:p-8">
      <span
        className="pointer-events-none absolute -right-6 -top-6 text-6xl opacity-[0.12] select-none"
        aria-hidden
      >
        ✨
      </span>
      <header className="max-w-3xl space-y-2 border-b border-blue-50 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-4xl">{title}</h1>
        {subtitle ? (
          <p className="text-base font-normal leading-relaxed text-slate-600 md:text-lg">{subtitle}</p>
        ) : null}
      </header>
      <div className="relative mt-6 space-y-5 md:mt-8">{children}</div>
    </section>
  )
}

export default ModuleWrapper
