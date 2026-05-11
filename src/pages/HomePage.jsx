import { motion } from 'framer-motion'
import { ArrowRight, Building2, House, MapPin, ShieldCheck, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FeaturedCarousel from '../components/FeaturedCarousel'
import SearchBar from '../components/SearchBar'
import SectionHeading from '../components/SectionHeading'
import { useApp } from '../utils/AppContext'
import { filterListings, setPageMeta } from '../utils/helpers'

const quickStats = [
  { label: 'Active Listings', value: '50+' },
  { label: 'Student Friendly', value: '24/7' },
  { label: 'Cities Covered', value: '5' },
]

const highlights = [
  { icon: ShieldCheck, title: 'Trusted discovery', text: 'Browse curated hostels, flats, and family homes with useful details and direct owner contact.' },
  { icon: Building2, title: 'Built for Nepal', text: 'Localized listings across Kathmandu, Pokhara, Biratnagar, Lalitpur, and Bhaktapur.' },
  { icon: House, title: 'Move faster', text: 'Filter by budget, location, and property type to shortlist your next stay in minutes.' },
]

function HomePage() {
  const navigate = useNavigate()
  const { listings } = useApp()
  const [filters, setFilters] = useState({ search: '', location: 'All', propertyType: 'All', maxPrice: 60000 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setPageMeta('Home', 'Find affordable flats, hostels, and rooms across Nepal with GharKhoj Nepal.')
    const timeout = window.setTimeout(() => setIsLoading(false), 700)
    return () => window.clearTimeout(timeout)
  }, [])

  const featuredListings = useMemo(() => listings.filter((listing) => listing.featured).slice(0, 5), [listings])
  const previewListings = useMemo(() => filterListings(listings, filters).slice(0, 6), [filters, listings])

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const params = new URLSearchParams({
      search: filters.search,
      location: filters.location,
      propertyType: filters.propertyType,
      maxPrice: filters.maxPrice,
    })
    navigate(`/listings?${params.toString()}`)
  }

  return (
    <div>
      <section className="container-shell py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-accent dark:border-orange-900/50 dark:bg-orange-950/40">
                <Sparkles className="h-4 w-4" />
                Nepal housing discovery made simple
              </span>
              <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                Find Affordable Flats, Hostels & Rooms Across Nepal
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500 dark:text-slate-400">
                Browse realistic listings for students, families, and professionals. Filter by location, compare prices, and contact owners directly on WhatsApp.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8 rounded-[2rem] border border-white/70 bg-white/90 p-4 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
              <SearchBar filters={filters} onChange={handleFilterChange} onSubmit={handleSubmit} />
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/listings" className="accent-button">
                Explore Listings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/admin" className="secondary-button">
                Admin Access
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {quickStats.map((stat) => (
                <div key={stat.label} className="card-surface rounded-2xl px-5 py-4">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card-surface overflow-hidden rounded-[2rem] p-4">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80"
                alt="Featured Nepal property"
                className="h-[520px] w-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] bg-slate-950/75 p-5 text-white backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-orange-300">Featured in Pokhara</p>
                    <h3 className="mt-1 text-xl font-semibold">Terrace View House</h3>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-4 py-3 text-right text-sm">
                    <p className="text-slate-300">Move-in ready</p>
                    <p className="font-semibold text-orange-300">Direct WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-shell py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="card-surface rounded-[2rem] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-accent dark:bg-orange-950/40">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-14">
        <div className="mb-8 flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured properties"
            title="Trending places students and families love"
            description="Browse standout listings with strong amenities, convenient access, and realistic monthly pricing in major Nepal cities."
          />
          <Link to="/listings" className="hidden text-sm font-semibold text-accent md:inline-flex">
            View all listings
          </Link>
        </div>
        <FeaturedCarousel listings={featuredListings} />
      </section>

      <section className="container-shell py-14">
        <SectionHeading
          eyebrow="Popular places"
          title="Explore by city"
          description="GharKhoj Nepal currently highlights listings in Kathmandu, Pokhara, Biratnagar, Lalitpur, and Bhaktapur."
          align="center"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {['Kathmandu', 'Pokhara', 'Biratnagar', 'Lalitpur', 'Bhaktapur'].map((city) => (
            <Link
              key={city}
              to={`/listings?location=${city}&propertyType=All&search=&maxPrice=60000`}
              className="card-surface rounded-[1.75rem] p-5 hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{city}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Find hostels, flats, and houses in {city}.</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-shell py-14">
        <SectionHeading
          eyebrow="Fresh picks"
          title="Recently discovered listings"
          description="A fast preview of live local data powered by your local JSON seed and browser storage."
        />
        <div className="mt-8">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {previewListings.map((listing) => (
                <div key={listing.id} className="card-surface h-80 animate-pulse bg-slate-100 dark:bg-slate-900" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {previewListings.map((listing) => (
                <Link key={listing.id} to={`/listing/${listing.id}`} className="card-surface overflow-hidden rounded-[2rem] hover:-translate-y-1">
                  <img src={listing.images[0]} alt={listing.title} className="h-60 w-full object-cover" />
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{listing.title}</h3>
                      <span className="text-sm font-semibold text-accent">NPR {listing.price.toLocaleString()}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{listing.location} · {listing.propertyType}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage
