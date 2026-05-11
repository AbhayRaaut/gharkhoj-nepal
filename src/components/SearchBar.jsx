import { Search } from 'lucide-react'
import { locations, propertyTypes } from '../utils/helpers'

function SearchBar({ filters, onChange, onSubmit, compact = false }) {
  return (
    <form onSubmit={onSubmit} className={`grid gap-3 ${compact ? 'md:grid-cols-[1.6fr_repeat(3,1fr)]' : 'lg:grid-cols-[1.8fr_repeat(3,1fr)]'}`}>
      <label>
        <span className="sr-only">Search</span>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="field pl-11"
            placeholder="Search by title, area, or keyword"
            value={filters.search}
            onChange={(event) => onChange('search', event.target.value)}
          />
        </div>
      </label>

      <select className="field" value={filters.location} onChange={(event) => onChange('location', event.target.value)}>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      <select className="field" value={filters.propertyType} onChange={(event) => onChange('propertyType', event.target.value)}>
        {propertyTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <div className="flex gap-3">
        <input
          type="number"
          min="5000"
          step="1000"
          className="field"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={(event) => onChange('maxPrice', event.target.value)}
        />
        <button type="submit" className="accent-button whitespace-nowrap">
          Explore
        </button>
      </div>
    </form>
  )
}

export default SearchBar
