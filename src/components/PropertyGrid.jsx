import EmptyState from './EmptyState'
import PropertyCard from './PropertyCard'

function PropertyGrid({ listings }) {
  if (!listings.length) {
    return <EmptyState />
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => (
        <PropertyCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}

export default PropertyGrid
