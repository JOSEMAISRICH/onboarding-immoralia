import { useLocation } from 'react-router-dom'

/** Ruta base para listado y detalle de SOPs (`/sops` o `/procedimientos`). */
export function useSopsBasePath() {
  const { pathname } = useLocation()
  return pathname.startsWith('/procedimientos') ? '/procedimientos' : '/sops'
}
