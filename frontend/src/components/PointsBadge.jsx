function PointsBadge({ points }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 shadow-sm shadow-amber-200/40"
      aria-live="polite"
    >
      <span className="animate-emoji-pop text-sm" aria-hidden>
        ⭐
      </span>
      <span className="text-xs font-medium text-amber-900/90">Puntos</span>
      <strong className="font-mono text-sm tabular-nums text-amber-950">{points}</strong>
    </div>
  )
}

export default PointsBadge
