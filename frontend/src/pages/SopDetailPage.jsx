import { Link, Navigate, useParams } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import { getGroupLabel, getSopById, normalizeVideoEmbedUrl } from '../data/sops'
import { useSopsBasePath } from '../hooks/useSopsBasePath'

function SopDetailPage() {
  const { userName } = useOnboarding()
  const sopsBase = useSopsBasePath()
  const { sopId } = useParams()
  const sop = sopId ? getSopById(sopId) : undefined

  if (!userName) {
    return <Navigate to="/" replace />
  }

  if (!sop) {
    return <Navigate to={sopsBase} replace />
  }

  const embed = normalizeVideoEmbedUrl(sop.videoEmbedUrl)

  return (
    <div className="min-h-screen bg-slate-950/80 px-4 py-8 text-slate-200 md:px-6 md:py-12">
      <div className="playful-card-ring mx-auto max-w-3xl rounded-3xl border border-cyan-500/15 bg-slate-950/45 px-4 py-8 backdrop-blur-sm md:px-8 md:py-10">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 md:text-sm">
          <Link to={sopsBase} className="text-cyan-400/90 hover:text-cyan-300 hover:underline">
            SOPs
          </Link>
          <span className="text-slate-600" aria-hidden>
            /
          </span>
          <span className="text-slate-400">{getGroupLabel(sop.groupId)}</span>
        </nav>

        <header className="border-b border-slate-800/90 pb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300/85">Procedimiento</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">{sop.title}</h1>
        </header>

        {sop.paragraphs?.length ? (
          <section className="mt-8 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 md:mt-10 md:p-7">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-300/90">Contenido</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-300 md:text-lg md:leading-relaxed">
              {sop.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ) : null}

        {sop.externalUrl || sop.externalLabel ? (
          <section className="mt-8 rounded-2xl border border-violet-500/25 bg-violet-950/20 p-5 md:p-7">
            <h2 className="text-xs font-bold uppercase tracking-widest text-violet-300/90">Profundizar</h2>
            <p className="mt-2 text-sm text-violet-200/70 md:text-base">ClickUp u otra herramienta interna.</p>
            <div className="mt-4">
              {sop.externalUrl ? (
                <a
                  href={sop.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-violet-400/50 bg-violet-500/20 px-5 py-3 text-base font-semibold text-violet-50 hover:bg-violet-500/30"
                >
                  {sop.externalLabel || 'Abrir enlace'}
                </a>
              ) : (
                <p className="rounded-lg border border-dashed border-violet-500/35 bg-violet-950/30 px-4 py-3 text-sm text-violet-200/80 md:text-base">
                  {sop.externalLabel} <span className="text-violet-300/60">(enlace pendiente)</span>
                </p>
              )}
            </div>
          </section>
        ) : null}

        {embed ? (
          <section className="mt-8 md:mt-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Video</h2>
            <p className="mt-1 text-sm text-slate-500 md:text-base">Embebido en la app.</p>
            <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl border border-slate-700 bg-black shadow-xl">
              <iframe
                title="Video del procedimiento"
                src={embed}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        ) : null}

        <div className="mt-12 border-t border-slate-800/80 pt-6">
          <Link to={sopsBase} className="text-sm font-semibold text-cyan-400/90 hover:text-cyan-300 hover:underline md:text-base">
            Volver al listado
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SopDetailPage
