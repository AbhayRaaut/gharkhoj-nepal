import { motion } from 'framer-motion'
import { Heart, MapPin, Share2, Star, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../utils/AppContext'
import { buildWhatsAppLink, formatCurrency } from '../utils/helpers'

function PropertyCard({ listing }) {
  const { favorites, toggleFavorite, notify } = useApp()
  const isFavorite = favorites.includes(listing.id)

  const handleShare = async () => {
    const shareData = {
      title: listing.title,
      text: `Check out ${listing.title} on GharKhoj Nepal`,
      url: `${window.location.origin}/listing/${listing.id}`,
    }

    if (navigator.share) {
      await navigator.share(shareData)
      return
    }

    await navigator.clipboard.writeText(shareData.url)
    notify('Listing link copied to clipboard.', 'info')
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-surface group overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {listing.propertyType}
          </span>
          {listing.featured ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
              <Star className="h-3.5 w-3.5" />
              Featured
            </span>
          ) : null}
        </div>
        <div className="absolute right-4 top-4 flex gap-2">
          <button
            type="button"
            onClick={() => toggleFavorite(listing.id)}
            className={`rounded-full p-2 backdrop-blur ${
              isFavorite ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-700'
            }`}
            aria-label="Save listing"
          >
            <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="rounded-full bg-white/80 p-2 text-slate-700 backdrop-blur"
            aria-label="Share listing"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{listing.title}</h3>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="h-4 w-4" />
              {listing.location}
            </p>
          </div>
          <div className="rounded-2xl bg-orange-50 px-3 py-2 text-right dark:bg-orange-950/40">
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Per month</p>
            <p className="text-sm font-bold text-accent">{formatCurrency(listing.price)}</p>
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">{listing.description}</p>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <Link to={`/listing/${listing.id}`} className="secondary-button px-4 py-2">
            Details
          </Link>
          <a
            href={buildWhatsAppLink(listing.whatsappNumber, listing.title)}
            target="_blank"
            rel="noreferrer"
            className="accent-button px-4 py-2"
          >
            <Wallet className="mr-2 h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default PropertyCard
