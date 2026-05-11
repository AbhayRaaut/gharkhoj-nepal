export const locations = ['All', 'Kathmandu', 'Pokhara', 'Biratnagar', 'Lalitpur', 'Bhaktapur']
export const propertyTypes = ['All', 'Hostel', 'Flat', 'House']

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function buildWhatsAppLink(number, title) {
  const text = encodeURIComponent(`I am interested in your listing: ${title}`)
  return `https://wa.me/${number}?text=${text}`
}

export function normalizeListing(input) {
  const imageList = Array.isArray(input.images)
    ? input.images
    : String(input.imageUrls || input.image || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)

  const amenityList = Array.isArray(input.amenities)
    ? input.amenities
    : String(input.amenities || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)

  return {
    ...input,
    id:
      input.id ||
      `${String(input.title).toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
    price: Number(input.price),
    featured: Boolean(input.featured),
    images: imageList.length ? imageList : ['https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'],
    amenities: amenityList,
  }
}

export function filterListings(listings, filters) {
  return listings.filter((listing) => {
    const matchesSearch =
      !filters.search ||
      [listing.title, listing.description, listing.location, listing.propertyType]
        .join(' ')
        .toLowerCase()
        .includes(filters.search.toLowerCase())

    const matchesLocation = filters.location === 'All' || listing.location === filters.location
    const matchesType = filters.propertyType === 'All' || listing.propertyType === filters.propertyType
    const matchesPrice = Number(listing.price) <= Number(filters.maxPrice || Number.MAX_SAFE_INTEGER)

    return matchesSearch && matchesLocation && matchesType && matchesPrice
  })
}

export function setPageMeta(title, description) {
  document.title = `${title} | GharKhoj Nepal`

  const meta = document.querySelector('meta[name="description"]')
  if (meta) {
    meta.setAttribute('content', description)
  }
}
