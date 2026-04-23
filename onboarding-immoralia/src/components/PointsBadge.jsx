function PointsBadge({ points }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-amber-400/45 bg-gradient-to-r from-amber-500/20 to-orange-500/15 px-3 py-1 shadow-sm shadow-amber-900/20"
      aria-live="polite"
    >
      <span className="animate-emoji-pop text-sm" aria-hidden>
        ⭐
      </span>
      <span className="text-xs font-medium text-amber-100/90">Puntos</span>
      <strong className="font-mono text-sm tabular-nums text-amber-50">{points}</strong>
    </div>
  )
}

export default PointsBadge
