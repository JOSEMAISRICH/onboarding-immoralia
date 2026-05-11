import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/** @typedef {{ offsetByStep: Record<number, number>, total: number }} ExamProgressPlan */

const ExamProgressContext = createContext(null)

export function ExamProgressProvider({ stepIndex, plan, children }) {
  const [line, setLine] = useState(null)

  useEffect(() => {
    setLine(null)
  }, [stepIndex])

  const reportQuestion = useCallback(
    (questionIndex, questionsLength) => {
      if (!plan?.total || questionsLength <= 0) return
      const base = plan.offsetByStep[stepIndex] ?? 0
      const globalN = base + Math.min(questionIndex + 1, questionsLength)
      setLine(`Reto ${globalN} de ${plan.total}`)
    },
    [plan, stepIndex],
  )

  const value = useMemo(() => ({ examProgressLine: line, reportQuestion }), [line, reportQuestion])

  return <ExamProgressContext.Provider value={value}>{children}</ExamProgressContext.Provider>
}

export function useExamProgressContext() {
  const ctx = useContext(ExamProgressContext)
  if (!ctx) {
    return { examProgressLine: null, reportQuestion: () => {} }
  }
  return ctx
}

/** Actualiza la línea "Reto N de M" en la barra mientras el módulo está montado. */
export function useReportExamQuestionProgress(questionIndex, questionsLength, enabled = true) {
  const { reportQuestion } = useExamProgressContext()
  useEffect(() => {
    if (!enabled || questionsLength <= 0) return
    reportQuestion(questionIndex, questionsLength)
  }, [enabled, reportQuestion, questionIndex, questionsLength])
}
