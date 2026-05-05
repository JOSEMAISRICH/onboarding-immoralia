/** Orbes suaves: tonos de aula (tiza, cuaderno, salvia) sin competir con el contenido. */
function PlayfulBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="playful-blob absolute -left-24 top-16 h-80 w-80 rounded-full bg-sky-300/28 blur-3xl" />
      <div className="playful-blob animation-delay-2000 absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-emerald-200/32 blur-3xl" />
      <div className="playful-blob animation-delay-4000 absolute bottom-8 left-1/4 h-64 w-64 rounded-full bg-blue-200/26 blur-3xl" />
      <div className="playful-blob animation-delay-2000 absolute right-1/4 top-[55%] h-52 w-52 rounded-full bg-teal-200/24 blur-3xl" />
      <div className="playful-blob animation-delay-4000 absolute left-1/2 top-[38%] h-44 w-44 -translate-x-1/2 rounded-full bg-indigo-100/35 blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#faf8f5]/88 via-transparent to-transparent" />
    </div>
  )
}

export default PlayfulBackdrop
