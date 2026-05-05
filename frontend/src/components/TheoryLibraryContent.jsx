import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import { DOC_TOPIC_IDS } from '../data/docTopicOrder'
import { IMCONTENT_ROLES_ORDER } from '../data/theoryImcontent'
import { IMMEDIA_ROLES_ORDER } from '../data/theoryImmedia'
import { WORKPLACE_OPTIONS, normalizeWorkplaceId } from '../data/workplace'
import { plataformas } from '../data/plataformas'
import {
  getTheoryFichaReadMap,
  THEORY_FICHA_READS_UPDATED,
} from '../lib/theoryFichaReadStorage'
import { STEPS } from '../lib/onboardingSteps'

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

function WorkplaceRolesSections({ intro, roles }) {
  return (
    <div className="space-y-10 text-base leading-relaxed text-slate-700 md:text-lg md:leading-relaxed">
      {intro}
      {roles.map((role, idx) => (
        <section
          key={role.id}
          className={idx > 0 ? 'space-y-4 border-t border-slate-200 pt-10' : 'space-y-4'}
        >
          <h3 className="border-b border-blue-200 pb-2 text-xl font-bold text-slate-900 md:text-2xl">{role.title}</h3>
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
            <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-800">Resumen del rol</h4>
            <p className="mt-2 text-slate-700">{role.resumen}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-800">
              Responsabilidades clave
            </h4>
            <ol className="mt-3 space-y-5">
              {role.responsabilidades.map((bloque, i) => (
                <li key={bloque.titulo}>
                  <p className="font-semibold text-blue-900">
                    {i + 1}. {bloque.titulo}
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-slate-600">
                    {bloque.items.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
          {role.noResponsabilidades?.length ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-rose-800">
                Responsabilidades que no tiene
              </h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-slate-600">
                {role.noResponsabilidades.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-900">KPIs</h4>
            <ul className="mt-3 space-y-3">
              {role.kpis.map((k) => (
                <li key={k.nombre} className="text-xs">
                  <p className="font-medium text-slate-800">{k.nombre}</p>
                  {k.formula ? <p className="text-slate-600">{k.formula}</p> : null}
                  {k.nota ? <p className="text-slate-600">{k.nota}</p> : null}
                  <p className="mt-1 text-emerald-700">Meta: {k.meta}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  )
}

function ImcontentRolesBlock() {
  return (
    <WorkplaceRolesSections
      intro={
        <p className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-slate-700 md:text-base">
          Documentacion interna de imcontent. Si People publica cambios de rol o KPIs, conviene alinear este texto.
        </p>
      }
      roles={IMCONTENT_ROLES_ORDER}
    />
  )
}

function ImmediaRolesBlock() {
  return (
    <WorkplaceRolesSections
      intro={
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-slate-700">
          Documentacion interna del area. Si tu rol o KPIs cambian, manda la actualizacion para revisar este
          texto.
        </p>
      }
      roles={IMMEDIA_ROLES_ORDER}
    />
  )
}

/**
 * Solo teoria del espacio elegido (sin minijuegos ni otras marcas).
 * @param {{ workplace: string, onOpenDocTopic: (topicId: string) => void }} props
 */
function TheoryLibraryContent({ workplace, onOpenDocTopic }) {
  const scrollAreaRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const navigate = useNavigate()
  const { stepIndex, beginMinijuegos } = useOnboarding()
  const wp = normalizeWorkplaceId(workplace)
  const workplaceLabel = WORKPLACE_OPTIONS.find((o) => o.id === wp)?.label || 'Immoralia'
  const workplaceEmoji = WORKPLACE_OPTIONS.find((o) => o.id === wp)?.emoji || '✨'

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
      case 'immoralia':
        return 'Marca cada ficha como leída al terminar; cuando las tengas todas, podrás ir a minijuegos.'
      case 'imcontent':
        return 'Roles del area de contenido: Head, Diseno senior, Video/Motion y Community (consulta interna).'
      case 'immedia':
        return 'Roles y responsabilidades del area Paid Media (consulta interna).'
      default:
        return ''
    }
  }, [wp])

  const [readMap, setReadMap] = useState(() => getTheoryFichaReadMap())

  useEffect(() => {
    const sync = () => setReadMap(getTheoryFichaReadMap())
    sync()
    window.addEventListener(THEORY_FICHA_READS_UPDATED, sync)
    window.addEventListener('focus', sync)
    return () => {
      window.removeEventListener(THEORY_FICHA_READS_UPDATED, sync)
      window.removeEventListener('focus', sync)
    }
  }, [])

  const immoraliaReadCount = useMemo(() => DOC_TOPIC_IDS.filter((id) => readMap[id]).length, [readMap])
  const allImmoraliaRead = immoraliaReadCount === DOC_TOPIC_IDS.length

  const goToMinijuegos = () => {
    beginMinijuegos()
    navigate('/minijuegos')
  }

  const minijuegosCtaLabel =
    stepIndex >= 1
      ? `Seguir examen · paso ${Math.min(stepIndex + 1, STEPS.length)} de ${STEPS.length}`
      : 'Ir a minijuegos'

  return (
    <div className="playful-card-ring flex flex-col overflow-hidden rounded-3xl border border-blue-100/95 bg-gradient-to-b from-white via-blue-50/35 to-emerald-50/50 shadow-xl shadow-blue-100/35">
      <header className="shrink-0 border-b border-blue-100/85 px-5 py-5 md:px-6 md:py-6">
        <div className="max-w-3xl space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-800">Biblioteca</p>
          <h2 id="theory-lib-title" className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            <span className="mr-2" aria-hidden>
              {workplaceEmoji}
            </span>
            Teoria · {workplaceLabel}
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 md:text-base">{subtitle}</p>
        </div>
      </header>

      <div ref={scrollAreaRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
        {wp === 'immoralia' ? (
          <div className="space-y-6">
            <div className="rounded-xl border border-blue-100 bg-white/95 p-4 md:p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-800">Documentacion interna</p>
              <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">Fichas de teoría (contenido completo)</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                Abre cada ficha, lee el contenido y pulsa <strong className="text-slate-900">Marcar como leído</strong>.
                Cuando hayas marcado todas, podrás ir a los minijuegos. Combina con{' '}
                <strong className="text-slate-900">vídeos</strong> internos (Loom, grabaciones) si tu equipo los enlaza en
                Slack o ClickUp.
              </p>
              <p className="mt-3 text-xs font-semibold text-slate-500 md:text-sm">
                Progreso de lectura: {immoraliaReadCount} / {DOC_TOPIC_IDS.length} fichas
              </p>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {DOC_TOPIC_IDS.map((id) => {
                const leido = Boolean(readMap[id])
                return (
                  <li key={id}>
                    <button
                      type="button"
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-base font-medium transition md:py-3.5 ${
                        leido
                          ? 'border-emerald-300 bg-emerald-50 text-slate-900 hover:border-emerald-400 hover:bg-emerald-100'
                          : 'border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-blue-50/80 shadow-sm'
                      }`}
                      onClick={() => openDocTopic(id)}
                    >
                      <span className="min-w-0 flex-1 truncate">{topicLabel(id)}</span>
                      <span
                        className={`shrink-0 whitespace-nowrap text-xs font-semibold md:text-sm ${
                          leido ? 'text-emerald-700' : 'text-blue-700'
                        }`}
                      >
                        {leido ? '✓ Leído' : 'Leer'}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            {allImmoraliaRead ? (
              <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 md:p-5 shadow-sm">
                <p className="text-sm font-semibold text-emerald-900 md:text-base">
                  Todas las fichas están marcadas como leídas. Ya puedes pasar a los minijuegos.
                </p>
                {stepIndex === 0 ? (
                  <button
                    type="button"
                    className="mt-4 inline-flex w-full min-h-[3rem] items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 px-6 py-3.5 text-base font-bold text-slate-900 shadow-lg transition hover:brightness-105 sm:w-auto md:min-h-[3.25rem] md:text-lg"
                    onClick={goToMinijuegos}
                  >
                    {minijuegosCtaLabel}
                  </button>
                ) : (
                  <Link
                    to="/minijuegos"
                    className="mt-4 inline-flex w-full min-h-[3rem] items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 px-6 py-3.5 text-base font-bold text-slate-900 shadow-lg transition hover:brightness-105 sm:w-auto md:min-h-[3.25rem] md:text-lg"
                  >
                    {minijuegosCtaLabel}
                  </Link>
                )}
              </div>
            ) : (
              <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600 md:text-sm">
                Marca todas las fichas como leídas desde cada una para que aparezca el botón de acceso a minijuegos.
              </p>
            )}
          </div>
        ) : null}

        {wp === 'imcontent' ? <ImcontentRolesBlock /> : null}

        {wp === 'immedia' ? <ImmediaRolesBlock /> : null}
      </div>
    </div>
  )
}

export default TheoryLibraryContent
