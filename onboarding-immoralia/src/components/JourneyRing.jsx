/**
 * Anillo circular de % del recorrido — acento calido (ambar / coral).
 */
function JourneyRing({ percent, size = 56, stroke = 5 }) {
  const p = Math.max(0, Math.min(100, percent))
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (p / 100) * c

  return (
    <div
      className="relative shrink-0 drop-shadow-[0_0_10px_rgba(251,191,36,0.35)]"
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
          className="text-slate-700/70"
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
          className="text-amber-400 transition-[stroke-dashoffset] duration-700 ease-out"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))',
          }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums text-amber-100">
        {p}%
      </span>
    </div>
  )
}

export default JourneyRing
