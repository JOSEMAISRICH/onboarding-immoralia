/**
 * Confeti ligero solo visual (sin librerias). aria-hidden.
 * @param {{ density?: number }} props
 */
function MiniConfetti({ density = 28 }) {
  const pieces = Array.from({ length: density }, (_, i) => {
    const hue = (i * 47 + 20) % 360
    const left = `${(i * 37 + (i % 7) * 11) % 100}%`
    const delay = `${(i % 12) * 0.04}s`
    const duration = `${1.4 + (i % 6) * 0.12}s`
    return { id: i, hue, left, delay, duration }
  })

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece absolute top-[-12%] h-2.5 w-2 rounded-[2px] opacity-90"
          style={{
            left: p.left,
            background: `linear-gradient(135deg, hsla(${p.hue},85%,65%,1), hsla(${(p.hue + 40) % 360},90%,55%,0.85))`,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  )
}

export default MiniConfetti
