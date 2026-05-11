export const STORAGE_KEYS = {
  listings: 'gharkhoj:listings',
  theme: 'gharkhoj:theme',
  favorites: 'gharkhoj:favorites',
  auth: 'gharkhoj:auth',
}

export function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function readSession(key, fallback) {
  try {
    const value = window.sessionStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function writeSession(key, value) {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}
