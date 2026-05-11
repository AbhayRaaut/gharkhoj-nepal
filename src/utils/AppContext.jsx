import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import seedListings from '../data/listings.json'
import { normalizeListing } from './helpers'
import { readSession, readStorage, STORAGE_KEYS, writeSession, writeStorage } from './storage'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [listings, setListings] = useState(() => readStorage(STORAGE_KEYS.listings, seedListings))
  const [theme, setTheme] = useState(() => readStorage(STORAGE_KEYS.theme, 'light'))
  const [favorites, setFavorites] = useState(() => readStorage(STORAGE_KEYS.favorites, []))
  const [isAuthenticated, setIsAuthenticated] = useState(() => readSession(STORAGE_KEYS.auth, false))
  const [toast, setToast] = useState(null)

  useEffect(() => {
    writeStorage(STORAGE_KEYS.listings, listings)
  }, [listings])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.theme, theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.favorites, favorites)
  }, [favorites])

  useEffect(() => {
    writeSession(STORAGE_KEYS.auth, isAuthenticated)
  }, [isAuthenticated])

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timeout = window.setTimeout(() => setToast(null), 3000)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const notify = (message, type = 'success') => setToast({ message, type })

  const addListing = (listing) => {
    setListings((current) => [normalizeListing(listing), ...current])
    notify('Listing added successfully.')
  }

  const updateListing = (listingId, nextListing) => {
    setListings((current) =>
      current.map((item) => (item.id === listingId ? normalizeListing({ ...item, ...nextListing, id: listingId }) : item)),
    )
    notify('Listing updated successfully.')
  }

  const deleteListing = (listingId) => {
    setListings((current) => current.filter((item) => item.id !== listingId))
    notify('Listing deleted successfully.', 'info')
  }

  const toggleFeatured = (listingId) => {
    setListings((current) =>
      current.map((item) => (item.id === listingId ? { ...item, featured: !item.featured } : item)),
    )
    notify('Featured status updated.', 'info')
  }

  const resetListings = () => {
    setListings(seedListings)
    notify('Listings reset to local seed data.', 'info')
  }

  const login = (username, password) => {
    const success = username === 'admin' && password === 'admin123'
    setIsAuthenticated(success)

    if (success) {
      notify('Admin login successful.')
    }

    return success
  }

  const logout = () => {
    setIsAuthenticated(false)
    notify('Logged out successfully.', 'info')
  }

  const toggleFavorite = (listingId) => {
    setFavorites((current) => {
      const exists = current.includes(listingId)
      const next = exists ? current.filter((item) => item !== listingId) : [...current, listingId]
      notify(exists ? 'Removed from favorites.' : 'Saved to favorites.', 'info')
      return next
    })
  }

  const value = useMemo(
    () => ({
      listings,
      theme,
      setTheme,
      favorites,
      isAuthenticated,
      toast,
      notify,
      login,
      logout,
      addListing,
      updateListing,
      deleteListing,
      toggleFeatured,
      toggleFavorite,
      resetListings,
    }),
    [favorites, isAuthenticated, listings, theme, toast],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }

  return context
}
