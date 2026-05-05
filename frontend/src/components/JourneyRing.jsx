/**
 * Anillo circular de % del recorrido.
 * `tone="light"` (barra superior): teal sobre fondo blanco.
 * `tone="dark"` (overlays): arco más claro y número legible sobre fondos oscuros.
 */
function JourneyRing({ percent, size = 56, stroke = 5, tone = 'light' }) {
  const p = Math.max(0, Math.min(100, percent))
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (p / 100) * c

  const isDark = tone === 'dark'
  const trackClass = isDark ? 'text-white/25' : 'text-slate-200'
  const arcClass = isDark
    ? 'text-teal-300 transition-[stroke-dashoffset] duration-700 ease-out'
    : 'text-teal-600 transition-[stroke-dashoffset] duration-700 ease-out'
  const labelClass = isDark
    ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]'
    : 'text-slate-800'
  const wrapShadow = isDark
    ? 'drop-shadow-[0_0_12px_rgba(45,212,191,0.35)]'
    : 'drop-shadow-[0_1px_8px_rgba(13,148,136,0.22)]'
  const arcFilter = isDark
    ? 'drop-shadow(0 0 10px rgba(94, 234, 212, 0.45))'
    : 'drop-shadow(0 0 6px rgba(13, 148, 136, 0.35))'

  return (
    <div
      className={`relative shrink-0 ${wrapShadow}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Recorrido del onboarding al ${p} por ciento`}
    >
      <svg width={size} height={size} className="-rotate-90 transform">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className={trackClass}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className={arcClass}
          style={{
            filter: arcFilter,
          }}
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center text-[11px] font-bold tabular-nums leading-none md:text-xs ${labelClass}`}
      >
        {p}%
      </span>
    </div>
  )
}

export default JourneyRing
