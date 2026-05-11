import { Heart, MapPin, Share2, Star, Wallet } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { useApp } from '../utils/AppContext'
import { buildWhatsAppLink, formatCurrency, setPageMeta } from '../utils/helpers'

function PropertyDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { listings, favorites, toggleFavorite, notify } = useApp()
  const listing = listings.find((item) => item.id === id)
  const isFavorite = favorites.includes(id)

  useEffect(() => {
    if (listing) {
      setPageMeta(listing.title, listing.description)
    }
  }, [listing])

  if (!listing) {
    return (
      <section className="container-shell py-16">
        <EmptyState title="Listing not found" description="The property you opened does not exist anymore or was removed locally." />
      </section>
    )
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/listing/${listing.id}`

    if (navigator.share) {
      await navigator.share({ title: listing.title, text: listing.description, url })
      return
    }

    await navigator.clipboard.writeText(url)
    notify('Listing link copied to clipboard.', 'info')
  }

  return (
    <section className="container-shell py-12 sm:py-16">
      <button type="button" onClick={() => navigate(-1)} className="secondary-button mb-8">
        Back
      </button>

      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-[2rem]">
            <img src={listing.images[0]} alt={listing.title} className="h-[460px] w-full object-cover" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {listing.images.slice(1).map((image) => (
              <img key={image} src={image} alt={listing.title} className="h-40 w-full rounded-[1.5rem] object-cover" />
            ))}
          </div>
          <div className="card-surface rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {listing.propertyType}
              </span>
              {listing.featured ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-accent dark:bg-orange-950/40">
                  <Star className="h-4 w-4" />
                  Featured listing
                </span>
              ) : null}
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 dark:text-white">{listing.title}</h1>
            <p className="mt-4 flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <MapPin className="h-4 w-4" />
              {listing.location}
            </p>
            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">{listing.fullDescription}</p>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Amenities</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {listing.amenities.map((amenity) => (
                  <span key={amenity} className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card-surface rounded-[2rem] p-6">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Monthly price</p>
            <p className="mt-3 text-4xl font-bold text-accent">{formatCurrency(listing.price)}</p>
            <div className="mt-6 space-y-3">
              <a
                href={buildWhatsAppLink(listing.whatsappNumber, listing.title)}
                target="_blank"
                rel="noreferrer"
                className="accent-button w-full"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Contact on WhatsApp
              </a>
              <button type="button" onClick={() => toggleFavorite(listing.id)} className="secondary-button w-full">
                <Heart className="mr-2 h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
                {isFavorite ? 'Saved to favorites' : 'Save listing'}
              </button>
              <button type="button" onClick={handleShare} className="secondary-button w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share listing
              </button>
            </div>
          </div>

          <div className="card-surface rounded-[2rem] p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Explore more</h3>
            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Discover more hostels, flats, and houses across Nepal with flexible budgets and instant owner contact.
            </p>
            <Link to="/listings" className="accent-button mt-5 w-full">
              Browse all listings
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default PropertyDetailsPage
