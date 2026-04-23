import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  deleteOnboardingProgress,
  getOnboardingProgress,
  isApiConfigured,
  patchOnboardingProgress,
  postOnboardingStart,
} from '../api/onboarding'
import { EXTRA_GAME_KEYS, EXTRA_POINTS_EACH } from '../data/extraMinijuegos10'
import { getLearningUnits } from '../data/learningUnits'
import { getJourneyCompletionPercent, getTierIdForStep } from '../lib/journeyTier'
import { getStreakState, recordVisitToday } from '../lib/learningStreak'
import { emptyScores, normalizeProgress } from '../lib/onboardingDefaults'
import { FINISH_STEP } from '../lib/onboardingSteps'
import { clearProgress, loadProgress, saveProgress } from '../lib/progressStorage'
import { getMaxByModuleForWorkplace } from '../lib/workplacePack'

function readLocalProgressState() {
  const raw = loadProgress()
  if (!raw) {
    return {
      stepIndex: 0,
      userName: '',
      workplace: 'general',
      startedAt: null,
      scoreByModule: emptyScores(),
    }
  }
  return normalizeProgress(raw)
}

function getInitialLocalState() {
  if (isApiConfigured()) return null
  return readLocalProgressState()
}

const OnboardingContext = createContext(/** @type {null} */ (null))

export function OnboardingProvider({ children }) {
  const apiOn = isApiConfigured()
  const initialLocal = getInitialLocalState()
  const [hydrated, setHydrated] = useState(!apiOn)
  const [canRemoteSync, setCanRemoteSync] = useState(!apiOn)
  const [syncError, setSyncError] = useState(false)

  const [stepIndex, setStepIndex] = useState(() => initialLocal?.stepIndex ?? 0)
  const [userName, setUserName] = useState(() => initialLocal?.userName ?? '')
  const [workplace, setWorkplace] = useState(
    () => /** @type {'general' | 'immoralia' | 'imcontent' | 'immedia'} */ (initialLocal?.workplace ?? 'general'),
  )
  const [startedAt, setStartedAt] = useState(() => initialLocal?.startedAt ?? null)
  const [scoreByModule, setScoreByModule] = useState(() => initialLocal?.scoreByModule ?? emptyScores())
  const [pendingCelebration, setPendingCelebration] = useState(
    /** @type {{ fromStep: number, newTierId: string } | null} */ (null),
  )

  const syncDebounceRef = useRef(null)

  useEffect(() => {
    if (!apiOn) return

    let cancelled = false
    ;(async () => {
      const r = await getOnboardingProgress()
      if (cancelled) return

      if (r.ok && r.data && !r.notFound) {
        const p = r.data
        setStepIndex(p.stepIndex)
        setUserName(p.userName)
        setWorkplace(p.workplace)
        setStartedAt(p.startedAt)
        setScoreByModule(p.scoreByModule)
        saveProgress({
          stepIndex: p.stepIndex,
          userName: p.userName,
          workplace: p.workplace,
          startedAt: p.startedAt,
          scoreByModule: p.scoreByModule,
        })
      } else {
        const local = readLocalProgressState()
        setStepIndex(local.stepIndex)
        setUserName(local.userName)
        setWorkplace(local.workplace)
        setStartedAt(local.startedAt)
        setScoreByModule(local.scoreByModule)
        if (!r.ok && 'networkError' in r && r.networkError) {
          setSyncError(true)
        }
      }

      setHydrated(true)
    })()

    return () => {
      cancelled = true
    }
  }, [apiOn])

  useEffect(() => {
    if (!apiOn || !hydrated) return undefined
    const t = setTimeout(() => setCanRemoteSync(true), 250)
    return () => clearTimeout(t)
  }, [apiOn, hydrated])

  useEffect(() => {
    saveProgress({
      stepIndex,
      userName,
      workplace,
      startedAt,
      scoreByModule,
    })
  }, [stepIndex, userName, workplace, startedAt, scoreByModule])

  useEffect(() => {
    if (!apiOn || !hydrated || !canRemoteSync) return

    if (syncDebounceRef.current) clearTimeout(syncDebounceRef.current)
    syncDebounceRef.current = setTimeout(async () => {
      const r = await patchOnboardingProgress({
        stepIndex,
        userName,
        workplace,
        startedAt,
        scoreByModule,
      })
      if (r.ok) {
        setSyncError(false)
      } else {
        setSyncError(true)
      }
    }, 500)

    return () => {
      if (syncDebounceRef.current) clearTimeout(syncDebounceRef.current)
    }
  }, [apiOn, hydrated, canRemoteSync, stepIndex, userName, workplace, startedAt, scoreByModule])

  const extrasMax = useMemo(
    () => Object.fromEntries(EXTRA_GAME_KEYS.map((k) => [k, EXTRA_POINTS_EACH])),
    [],
  )

  const maxByModule = useMemo(
    () => ({
      ...getMaxByModuleForWorkplace(workplace),
      ...extrasMax,
    }),
    [workplace, extrasMax],
  )

  const maxPoints = useMemo(
    () => Object.values(maxByModule).reduce((a, b) => a + b, 0),
    [maxByModule],
  )

  const totalPoints = useMemo(() => {
    return Object.keys(maxByModule).reduce(
      (sum, key) => sum + (Number(scoreByModule[key]) || 0),
      0,
    )
  }, [scoreByModule, maxByModule])

  const journeyCompletionPercent = useMemo(
    () => getJourneyCompletionPercent(stepIndex),
    [stepIndex],
  )

  const learningUnits = useMemo(() => getLearningUnits(FINISH_STEP), [])

  const [streakDays, setStreakDays] = useState(() => getStreakState().streakDays)

  useEffect(() => {
    if (!hydrated || stepIndex < 1) return
    const s = recordVisitToday()
    queueMicrotask(() => setStreakDays(s.streakDays))
  }, [hydrated, stepIndex])

  const advanceAfterCelebration = useCallback(() => {
    setPendingCelebration(null)
    setStepIndex((i) => i + 1)
  }, [])

  const completeModuleWithScore = useCallback((updateScore) => {
    updateScore()
    setStepIndex((prev) => {
      const tierBefore = getTierIdForStep(prev)
      const tierAfter = getTierIdForStep(prev + 1)
      if (tierBefore !== tierAfter) {
        requestAnimationFrame(() => {
          setPendingCelebration({ fromStep: prev, newTierId: tierAfter })
        })
        return prev
      }
      return prev + 1
    })
  }, [])

  const handleReset = useCallback(async () => {
    if (apiOn) {
      await deleteOnboardingProgress()
    }
    clearProgress()
    setStepIndex(0)
    setUserName('')
    setWorkplace('general')
    setStartedAt(null)
    setScoreByModule(emptyScores())
    setPendingCelebration(null)
    setSyncError(false)
  }, [apiOn])

  /** Tras bienvenida: stepIndex 0; la ruta /teoria es obligatoria antes de /minijuegos */
  const handleWelcomeSubmit = useCallback(
    async ({ userName: name, workplace: wp }) => {
      clearProgress()
      if (apiOn) {
        const r = await postOnboardingStart(name)
        if (!r.ok) {
          setSyncError(true)
        } else {
          setSyncError(false)
        }
      }
      setUserName(name)
      setWorkplace(wp)
      setStartedAt(Date.now())
      setScoreByModule(emptyScores())
      setStepIndex(0)
    },
    [apiOn],
  )

  const beginMinijuegos = useCallback(() => {
    setStepIndex(1)
  }, [])

  /** Temporal (dev): avanza un paso sin jugar; quitar antes de produccion. */
  const skipStepDev = useCallback(() => {
    setPendingCelebration(null)
    setStepIndex((i) => Math.min(i + 1, FINISH_STEP))
  }, [])

  const value = useMemo(
    () => ({
      apiOn,
      hydrated,
      syncError,
      stepIndex,
      setStepIndex,
      userName,
      workplace,
      startedAt,
      scoreByModule,
      setScoreByModule,
      pendingCelebration,
      advanceAfterCelebration,
      completeModuleWithScore,
      handleReset,
      handleWelcomeSubmit,
      beginMinijuegos,
      skipStepDev,
      maxByModule,
      maxPoints,
      totalPoints,
      journeyCompletionPercent,
      learningUnits,
      streakDays,
      extrasMax,
    }),
    [
      apiOn,
      hydrated,
      syncError,
      stepIndex,
      userName,
      workplace,
      startedAt,
      scoreByModule,
      pendingCelebration,
      advanceAfterCelebration,
      completeModuleWithScore,
      handleReset,
      handleWelcomeSubmit,
      beginMinijuegos,
      skipStepDev,
      maxByModule,
      maxPoints,
      totalPoints,
      journeyCompletionPercent,
      learningUnits,
      streakDays,
      extrasMax,
    ],
  )

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) throw new Error('useOnboarding debe usarse dentro de OnboardingProvider')
  return ctx
}
