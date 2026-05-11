import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/helpers'

function FeaturedCarousel({ listings }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-2">
      <div className="flex min-w-full gap-5">
        {listings.map((listing, index) => (
          <motion.article
            key={listing.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="card-surface min-w-[285px] max-w-sm flex-1 overflow-hidden"
          >
            <img src={listing.images[0]} alt={listing.title} className="h-52 w-full object-cover" />
            <div className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-accent dark:bg-orange-950/40">
                    {listing.location}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{listing.title}</h3>
                </div>
                <p className="text-sm font-semibold text-accent">{formatCurrency(listing.price)}</p>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{listing.description}</p>
              <Link to={`/listing/${listing.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-accent dark:text-white">
                View details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

export default FeaturedCarousel
