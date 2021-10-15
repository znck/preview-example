import { ref, computed } from 'vue'
import { AbsoluteURL } from './utilities'

const TIME_25_MINUTES = 60 * 60 * 25 * 1000

type Token = {
  token: string
  maxAge: number
}

const state = ref<Token | null>(null)

export async function getAccessToken(): Promise<string | null> {
  if (state.value != null) {
    if (Date.now() < state.value.maxAge) return state.value.token
  }

  try {
    return (await refreshAccessToken())?.token ?? null
  } catch {
    return null
  }
}

export async function isAuthenticated(): Promise<Boolean> {
  try {
    return (await getAccessToken()) != null
  } catch {
    return false
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch(AbsoluteURL`/passwordless/logout`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
    })

    state.value = null
  } catch {
    // ?? network issue maybe
  }
}

async function fetchAccessToken(): Promise<null | Token> {
  try {
    const response = await fetch(AbsoluteURL`/passwordless/jwt/refresh`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
    })

    if (response.ok) {
      const result = await response.json()
      return { token: result.token, maxAge: Date.now() + TIME_25_MINUTES }
    }
  } catch {}

  return null
}

let currentPromise: Promise<null | Token> | null = null
let retries = 0
async function refreshAccessToken(): Promise<null | Token> {
  if (retries > 0) return null
  if (currentPromise != null) return currentPromise

  currentPromise = fetchAccessToken()
  const token = await currentPromise
  state.value = token
  if (token != null) retries = 0
  else retries += 1
  currentPromise = null

  return token
}
