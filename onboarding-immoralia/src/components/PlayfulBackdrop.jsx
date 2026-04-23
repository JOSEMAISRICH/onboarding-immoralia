/** Orbes suaves de fondo (no interactivo). Tono “aula” lúdica sin distraer del contenido. */
function PlayfulBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="playful-blob absolute -left-24 top-16 h-80 w-80 rounded-full bg-fuchsia-500/18 blur-3xl" />
      <div className="playful-blob animation-delay-2000 absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-amber-400/16 blur-3xl" />
      <div className="playful-blob animation-delay-4000 absolute bottom-8 left-1/4 h-64 w-64 rounded-full bg-sky-400/14 blur-3xl" />
      <div className="playful-blob animation-delay-2000 absolute right-1/4 top-[55%] h-52 w-52 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#020617]/88 to-transparent" />
    </div>
  )
}

export default PlayfulBackdrop
