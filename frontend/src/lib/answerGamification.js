/**
 * Combo: 3 aciertos seguidos → la siguiente pregunta correcta vale x2 (una vez). Se rompe con un fallo.
 * @param {{ streak?: number, applyDoubleOnNextCorrect?: boolean } | null} initial — para reanudar partida guardada.
 */
export function createComboDoubleTracker(initial = null) {
  let streak = initial?.streak ?? 0
  let applyDoubleOnNextCorrect = initial?.applyDoubleOnNextCorrect ?? false

  return {
    /** @returns {{ multiplier: number }} */
    record(isCorrect) {
      if (!isCorrect) {
        streak = 0
        applyDoubleOnNextCorrect = false
        return { multiplier: 1 }
      }
      const multiplier = applyDoubleOnNextCorrect ? 2 : 1
      applyDoubleOnNextCorrect = false
      streak += 1
      if (streak >= 3) {
        applyDoubleOnNextCorrect = true
        streak = 0
      }
      return { multiplier }
    },
    reset() {
      streak = 0
      applyDoubleOnNextCorrect = false
    },
    snapshot() {
      return { streak, applyDoubleOnNextCorrect }
    },
  }
}

/** Bonus por velocidad: +bonusPts si respondes en menos de fastMs (ms). */
export function speedBonusMs(elapsedMs, { fastMs = 4000, bonusPts = 5 } = {}) {
  if (elapsedMs >= 0 && elapsedMs < fastMs) return bonusPts
  return 0
}
