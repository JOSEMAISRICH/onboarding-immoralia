/** Racha de dias con sesion (solo local; sin ranking). */

const KEY = 'immoralia-learning-streak-v1'

/**
 * @returns {{ streakDays: number, lastYmd: string | null }}
 */
export function getStreakState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { streakDays: 0, lastYmd: null }
    const o = JSON.parse(raw)
    return {
      streakDays: typeof o.streakDays === 'number' ? o.streakDays : 0,
      lastYmd: typeof o.lastYmd === 'string' ? o.lastYmd : null,
    }
  } catch {
    return { streakDays: 0, lastYmd: null }
  }
}

function ymd(d) {
  return d.toISOString().slice(0, 10)
}

/** @param {string} a @param {string} b ISO dates YYYY-MM-DD */
function dayDiff(a, b) {
  const da = new Date(`${a}T12:00:00`)
  const db = new Date(`${b}T12:00:00`)
  return Math.round((db.getTime() - da.getTime()) / 86400000)
}

/**
 * Llama al iniciar sesion de estudio (stepIndex >= 1). Idempotente el mismo dia.
 * @returns {{ streakDays: number, lastYmd: string }}
 */
export function recordVisitToday() {
  const today = ymd(new Date())
  const { streakDays, lastYmd } = getStreakState()
  if (lastYmd === today) {
    return { streakDays, lastYmd: today }
  }
  if (!lastYmd) {
    const next = { streakDays: 1, lastYmd: today }
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
    return next
  }
  const diff = dayDiff(lastYmd, today)
  let nextStreak = 1
  if (diff === 1) nextStreak = streakDays + 1
  else if (diff > 1) nextStreak = 1
  else nextStreak = streakDays

  const next = { streakDays: nextStreak, lastYmd: today }
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* ignore */
  }
  return next
}
