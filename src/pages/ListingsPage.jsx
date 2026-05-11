import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import LoadingSkeleton from '../components/LoadingSkeleton'
import PropertyGrid from '../components/PropertyGrid'
import SearchBar from '../components/SearchBar'
import SectionHeading from '../components/SectionHeading'
import { useApp } from '../utils/AppContext'
import { filterListings, propertyTypes, setPageMeta } from '../utils/helpers'

function ListingsPage() {
  const { listings } = useApp()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || 'All',
    propertyType: searchParams.get('propertyType') || 'All',
    maxPrice: searchParams.get('maxPrice') || 60000,
  })

  useEffect(() => {
    setPageMeta('Listings', 'Browse hostel, flat, and house listings across Nepal.')
    const timeout = window.setTimeout(() => setIsLoading(false), 800)
    return () => window.clearTimeout(timeout)
  }, [])

  const filteredListings = useMemo(() => filterListings(listings, filters), [filters, listings])

  const handleChange = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSearchParams(filters)
  }

  return (
    <section className="container-shell py-12 sm:py-16">
      <SectionHeading
        eyebrow="All listings"
        title="Find your next stay in Nepal"
        description="Search by budget, city, and property type. Every card includes direct owner contact through WhatsApp."
      />

      <div className="mt-8 rounded-[2rem] border border-white/70 bg-white/90 p-4 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
        <SearchBar filters={filters} onChange={handleChange} onSubmit={handleSubmit} compact />
        <div className="mt-4 flex flex-wrap gap-3">
          {propertyTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilters((current) => ({ ...current, propertyType: type }))}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filters.propertyType === type
                  ? 'bg-accent text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-accent dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-semibold text-slate-900 dark:text-white">{filteredListings.length}</span> listings
        </p>
      </div>

      <div className="mt-6">{isLoading ? <LoadingSkeleton /> : <PropertyGrid listings={filteredListings} />}</div>
    </section>
  )
}

export default ListingsPage
