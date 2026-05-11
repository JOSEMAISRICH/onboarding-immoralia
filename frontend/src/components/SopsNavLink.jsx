import { Link } from 'react-router-dom'

/**
 * @param {{ compact?: boolean, className?: string }} props
 */
function SopsNavLink({ compact = false, className = '' }) {
  const base = compact
    ? 'inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-950 shadow-sm transition hover:border-blue-400 hover:bg-blue-100'
    : 'inline-flex shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-950 shadow-sm transition hover:border-blue-400 hover:bg-blue-100 md:px-5 md:text-base'

  return (
    <Link
      to="/sops"
      className={[base, className].filter(Boolean).join(' ')}
      title="Procedimientos internos (SOPs)"
    >
      {compact ? (
        <>
          <span aria-hidden>📋</span>
          SOPs
        </>
      ) : (
        'Ver SOPs'
      )}
    </Link>
  )
}

export default SopsNavLink
