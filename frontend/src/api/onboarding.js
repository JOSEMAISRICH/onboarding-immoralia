/**
 * Cliente HTTP del onboarding (Express). Supabase / tablas: fuera de alcance aquí.
 *
 * Variables Vite (prefijo VITE_* expuestas al cliente):
 * - VITE_API_URL: URL base del backend, sin barra final (ej. http://localhost:3000).
 *   Si está vacía o no definida, no se llama al API (solo localStorage).
 * - VITE_DEV_USER_ID: en desarrollo, se envía cabecera X-Dev-User-Id (backend con ALLOW_DEV_AUTH).
 * - VITE_AUTH_TOKEN (opcional): si existe, se envía Authorization: Bearer … (JWT / pruebas).
 */
import { ONBOARDING_SCHEMA_VERSION, normalizeProgress } from '../lib/onboardingDefaults'

function getBaseUrl() {
  const raw = import.meta.env.VITE_API_URL
  if (typeof raw !== 'string' || !raw.trim()) return ''
  return raw.trim().replace(/\/$/, '')
}

export function isApiConfigured() {
  return Boolean(getBaseUrl())
}

function authHeaders() {
  const headers = /** @type {Record<string, string>} */ ({
    'Content-Type': 'application/json',
  })
  const token = import.meta.env.VITE_AUTH_TOKEN
  if (token) {
    headers.Authorization = `Bearer ${token}`
  } else {
    const devId = import.meta.env.VITE_DEV_USER_ID
    if (devId !== undefined && devId !== '') {
      headers['X-Dev-User-Id'] = String(devId)
    }
  }
  return headers
}

/**
 * @returns {Promise<{ ok: true, notFound?: boolean, data?: ReturnType<typeof normalizeProgress> } | { ok: false, status?: number, networkError?: boolean, message?: string }>}
 */
export async function getOnboardingProgress() {
  const base = getBaseUrl()
  if (!base) return { ok: false, message: 'VITE_API_URL no configurada' }
  try {
    const res = await fetch(`${base}/api/onboarding/progress`, {
      method: 'GET',
      headers: authHeaders(),
    })
    if (res.status === 404) {
      return { ok: true, notFound: true }
    }
    if (!res.ok) {
      const text = await res.text()
      return { ok: false, status: res.status, message: text || res.statusText }
    }
    const json = await res.json()
    return { ok: true, data: normalizeProgress(json) }
  } catch (e) {
    const err = /** @type {Error} */ (e)
    return { ok: false, networkError: true, message: err.message }
  }
}

/**
 * @param {Partial<{ stepIndex: number, userName: string, workplace: string, startedAt: number | null, scoreByModule: Record<string, number>, schemaVersion: number }>} patch
 */
export async function patchOnboardingProgress(patch) {
  const base = getBaseUrl()
  if (!base) return { ok: false, message: 'VITE_API_URL no configurada' }
  try {
    const body = JSON.stringify({
      ...patch,
      schemaVersion: patch.schemaVersion ?? ONBOARDING_SCHEMA_VERSION,
    })
    const res = await fetch(`${base}/api/onboarding/progress`, {
      method: 'PATCH',
      headers: authHeaders(),
      body,
    })
    if (!res.ok) {
      const text = await res.text()
      return { ok: false, status: res.status, message: text || res.statusText }
    }
    return { ok: true }
  } catch (e) {
    const err = /** @type {Error} */ (e)
    return { ok: false, networkError: true, message: err.message }
  }
}

/** @param {string} userName */
export async function postOnboardingStart(userName) {
  const base = getBaseUrl()
  if (!base) return { ok: false, message: 'VITE_API_URL no configurada' }
  try {
    const res = await fetch(`${base}/api/onboarding/start`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ userName: userName.trim() }),
    })
    if (!res.ok) {
      const text = await res.text()
      return { ok: false, status: res.status, message: text || res.statusText }
    }
    return { ok: true }
  } catch (e) {
    const err = /** @type {Error} */ (e)
    return { ok: false, networkError: true, message: err.message }
  }
}

export async function deleteOnboardingProgress() {
  const base = getBaseUrl()
  if (!base) return { ok: false, message: 'VITE_API_URL no configurada' }
  try {
    const res = await fetch(`${base}/api/onboarding/progress`, {
      method: 'DELETE',
      headers: authHeaders(),
    })
    if (res.status === 404) {
      return { ok: true }
    }
    if (!res.ok) {
      const text = await res.text()
      return { ok: false, status: res.status, message: text || res.statusText }
    }
    return { ok: true }
  } catch (e) {
    const err = /** @type {Error} */ (e)
    return { ok: false, networkError: true, message: err.message }
  }
}
