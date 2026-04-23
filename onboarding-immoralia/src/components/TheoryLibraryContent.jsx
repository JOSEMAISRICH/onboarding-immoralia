import { useLayoutEffect, useMemo, useRef } from 'react'
import { DOC_TOPIC_IDS } from '../data/docTopicOrder'
import { generalTheorySections } from '../data/theoryGeneral'
import { IMCONTENT_ROLES_ORDER } from '../data/theoryImcontent'
import { immediaEspecialista, immediaHead } from '../data/theoryImmedia'
import { WORKPLACE_OPTIONS, normalizeWorkplaceId } from '../data/workplace'
import { plataformas } from '../data/plataformas'

const THEORY_LIB_SCROLL_KEY = 'theory-library-scroll-restore'

function saveTheoryLibraryScroll(scrollEl) {
  try {
    sessionStorage.setItem(
      THEORY_LIB_SCROLL_KEY,
      JSON.stringify({
        w: window.scrollY,
        i: scrollEl?.scrollTop ?? 0,
      }),
    )
  } catch {
    /* ignore quota / private mode */
  }
}

function readTheoryScrollRestore() {
  try {
    const raw = sessionStorage.getItem(THEORY_LIB_SCROLL_KEY)
    if (!raw) return null
    sessionStorage.removeItem(THEORY_LIB_SCROLL_KEY)
    const parsed = JSON.parse(raw)
    return {
      w: Number(parsed.w),
      i: Number(parsed.i),
    }
  } catch {
    return null
  }
}

function topicLabel(id) {
  return plataformas.find((p) => p.id === id)?.name || id
}

function ImcontentRolesBlock() {
  return (
    <div className="space-y-10 text-base leading-relaxed text-slate-300 md:text-lg md:leading-relaxed">
      <p className="rounded-lg border border-fuchsia-500/20 bg-fuchsia-950/25 px-4 py-3 text-sm text-slate-400 md:text-base">
        Documentacion interna de imcontent. Si People publica cambios de rol o KPIs, conviene alinear este texto.
      </p>
      {IMCONTENT_ROLES_ORDER.map((role, idx) => (
        <section
          key={role.id}
          className={idx > 0 ? 'space-y-4 border-t border-slate-700/50 pt-10' : 'space-y-4'}
        >
          <h3 className="border-b border-cyan-500/20 pb-2 text-xl font-bold text-white md:text-2xl">{role.title}</h3>
          <dl className="grid gap-2 text-xs sm:grid-cols-[7rem_1fr] sm:gap-x-3">
            <dt className="font-semibold text-slate-500">Reporta a</dt>
            <dd>{role.reportaA}</dd>
            <dt className="font-semibold text-slate-500">Colabora con</dt>
            <dd>{role.colaboraCon}</dd>
            {role.lideraA ? (
              <>
                <dt className="font-semibold text-slate-500">Lidera a</dt>
                <dd>{role.lideraA}</dd>
              </>
            ) : null}
          </dl>
          {role.contextoExtra ? <p className="text-xs italic text-slate-500">{role.contextoExtra}</p> : null}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-200/90">Resumen del rol</h4>
            <p className="mt-2 text-slate-300">{role.resumen}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-200/90">
              Responsabilidades clave
            </h4>
            <ol className="mt-3 space-y-5">
              {role.responsabilidades.map((bloque, i) => (
                <li key={bloque.titulo}>
                  <p className="font-semibold text-cyan-100/95">
                    {i + 1}. {bloque.titulo}
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-slate-400">
                    {bloque.items.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
          {role.noResponsabilidades?.length ? (
            <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-rose-200">
                Responsabilidades que no tiene
              </h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-slate-400">
                {role.noResponsabilidades.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="rounded-xl border border-emerald-500/25 bg-slate-900/50 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-200">KPIs</h4>
            <ul className="mt-3 space-y-3">
              {role.kpis.map((k) => (
                <li key={k.nombre} className="text-xs">
                  <p className="font-medium text-slate-200">{k.nombre}</p>
                  {k.formula ? <p className="text-slate-500">{k.formula}</p> : null}
                  {k.nota ? <p className="text-slate-500">{k.nota}</p> : null}
                  <p className="mt-1 text-emerald-300/90">Meta: {k.meta}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  )
}

/**
 * Solo teoria del espacio elegido (sin minijuegos ni otras marcas).
 * @param {{ workplace: string, onOpenDocTopic: (topicId: string) => void }} props
 */
function TheoryLibraryContent({ workplace, onOpenDocTopic }) {
  const scrollAreaRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const wp = normalizeWorkplaceId(workplace)
  const workplaceLabel = WORKPLACE_OPTIONS.find((o) => o.id === wp)?.label || 'General'
  const workplaceEmoji = WORKPLACE_OPTIONS.find((o) => o.id === wp)?.emoji || '🌐'

  useLayoutEffect(() => {
    const saved = readTheoryScrollRestore()
    if (!saved) return
    const { w, i } = saved
    if (!Number.isNaN(w)) window.scrollTo(0, w)
    const applyInner = () => {
      const el = scrollAreaRef.current
      if (el && !Number.isNaN(i)) el.scrollTop = i
    }
    applyInner()
    requestAnimationFrame(() => requestAnimationFrame(applyInner))
  }, [])

  const openDocTopic = (topicId) => {
    saveTheoryLibraryScroll(scrollAreaRef.current)
    onOpenDocTopic(topicId)
  }

  const subtitle = useMemo(() => {
    switch (wp) {
      case 'general':
        return 'Contenido comun del grupo. No se mezcla con documentacion interna de otras marcas.'
      case 'immoralia':
        return 'Documentacion interna Immoralia: fichas de herramientas y procesos.'
      case 'imcontent':
        return 'Roles del area de contenido: Head, Diseno senior, Video/Motion y Community (consulta interna).'
      case 'immedia':
        return 'Roles y responsabilidades del area Paid Media (consulta interna).'
      default:
        return ''
    }
  }, [wp])

  return (
    <div className="playful-card-ring flex flex-col overflow-hidden rounded-3xl border border-cyan-400/35 bg-gradient-to-b from-indigo-950/95 to-slate-950/98 shadow-2xl shadow-cyan-900/25">
      <header className="shrink-0 border-b border-cyan-500/20 px-5 py-5 md:px-6 md:py-6">
        <div className="max-w-3xl space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400/85">Biblioteca</p>
          <h2 id="theory-lib-title" className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            <span className="mr-2" aria-hidden>
              {workplaceEmoji}
            </span>
            Teoria · {workplaceLabel}
          </h2>
          <p className="text-sm leading-relaxed text-slate-400 md:text-base">{subtitle}</p>
        </div>
      </header>

      <div ref={scrollAreaRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
        {wp === 'general' ? (
          <div className="space-y-6">
            {generalTheorySections.map((sec) => (
              <section key={sec.title} className="rounded-xl border border-slate-800/60 bg-slate-950/30 p-4 md:p-5">
                <h3 className="text-lg font-bold text-amber-100 md:text-xl">{sec.title}</h3>
                <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-300 md:text-lg md:leading-relaxed">
                  {sec.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : null}

        {wp === 'immoralia' ? (
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4 md:p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300/80">Documentacion interna</p>
              <p className="mt-2 text-base font-semibold text-slate-200 md:text-lg">Fichas Immoralia</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400 md:text-base">
                Aqui solo lectura de las fichas internas.
              </p>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {DOC_TOPIC_IDS.map((id) => (
                <li key={id}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-2 rounded-xl border border-slate-600/80 bg-slate-900/70 px-4 py-3 text-left text-base font-medium text-slate-100 transition hover:border-cyan-400/40 hover:bg-slate-900 md:py-3.5"
                    onClick={() => openDocTopic(id)}
                  >
                    <span className="min-w-0 truncate">{topicLabel(id)}</span>
                    <span className="shrink-0 text-cyan-400/90">Leer</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {wp === 'imcontent' ? <ImcontentRolesBlock /> : null}

        {wp === 'immedia' ? (
          <div className="space-y-10 text-sm leading-relaxed text-slate-300">
            <p className="rounded-lg border border-violet-500/20 bg-violet-950/30 px-3 py-2 text-xs text-slate-400">
              Documentacion interna del area. Si tu rol o KPIs cambian, manda la actualizacion para revisar este
              texto.
            </p>

            <section className="space-y-4">
              <h3 className="border-b border-cyan-500/20 pb-2 text-xl font-bold text-white md:text-2xl">{immediaHead.title}</h3>
              <dl className="grid gap-2 text-xs sm:grid-cols-[7rem_1fr] sm:gap-x-3">
                <dt className="font-semibold text-slate-500">Reporta a</dt>
                <dd>{immediaHead.reportaA}</dd>
                <dt className="font-semibold text-slate-500">Colabora con</dt>
                <dd>{immediaHead.colaboraCon}</dd>
                <dt className="font-semibold text-slate-500">Lidera a</dt>
                <dd>{immediaHead.lideraA}</dd>
              </dl>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-200/90">Resumen del rol</h4>
                <p className="mt-2 text-slate-300">{immediaHead.resumen}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-200/90">
                  Responsabilidades clave
                </h4>
                <ol className="mt-3 space-y-5">
                  {immediaHead.responsabilidades.map((bloque, i) => (
                    <li key={bloque.titulo}>
                      <p className="font-semibold text-cyan-100/95">
                        {i + 1}. {bloque.titulo}
                      </p>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-slate-400">
                        {bloque.items.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-xl border border-emerald-500/25 bg-slate-900/50 p-4">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-200">KPIs</h4>
                <ul className="mt-3 space-y-3">
                  {immediaHead.kpis.map((k) => (
                    <li key={k.nombre} className="text-xs">
                      <p className="font-medium text-slate-200">{k.nombre}</p>
                      <p className="text-slate-500">{k.formula}</p>
                      <p className="mt-1 text-emerald-300/90">Meta: {k.meta}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="space-y-4 border-t border-slate-700/50 pt-10">
              <h3 className="border-b border-cyan-500/20 pb-2 text-xl font-bold text-white md:text-2xl">
                {immediaEspecialista.title}
              </h3>
              <dl className="grid gap-2 text-xs sm:grid-cols-[7rem_1fr] sm:gap-x-3">
                <dt className="font-semibold text-slate-500">Reporta a</dt>
                <dd>{immediaEspecialista.reportaA}</dd>
                <dt className="font-semibold text-slate-500">Colabora con</dt>
                <dd>{immediaEspecialista.colaboraCon}</dd>
              </dl>
              <p className="text-xs text-slate-500">{immediaEspecialista.notaCliente}</p>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-200/90">Resumen del rol</h4>
                <p className="mt-2 text-slate-300">{immediaEspecialista.resumen}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-200/90">
                  Responsabilidades clave
                </h4>
                <ol className="mt-3 space-y-5">
                  {immediaEspecialista.responsabilidades.map((bloque, i) => (
                    <li key={bloque.titulo}>
                      <p className="font-semibold text-cyan-100/95">
                        {i + 1}. {bloque.titulo}
                      </p>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-slate-400">
                        {bloque.items.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-4">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-rose-200">
                  Responsabilidades que no tiene
                </h4>
                <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-slate-400">
                  {immediaEspecialista.noResponsabilidades.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-emerald-500/25 bg-slate-900/50 p-4">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-200">KPIs</h4>
                <ul className="mt-3 space-y-3">
                  {immediaEspecialista.kpis.map((k) => (
                    <li key={k.nombre} className="text-xs">
                      <p className="font-medium text-slate-200">{k.nombre}</p>
                      <p className="text-slate-500">{k.formula}</p>
                      {k.nota ? <p className="text-slate-500">{k.nota}</p> : null}
                      <p className="mt-1 text-emerald-300/90">Meta: {k.meta}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default TheoryLibraryContent
