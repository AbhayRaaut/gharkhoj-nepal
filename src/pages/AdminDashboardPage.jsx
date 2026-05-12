import { Edit3, Plus, Star, Trash2, Undo2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import ListingFormModal from '../components/ListingFormModal'
import SectionHeading from '../components/SectionHeading'
import { useApp } from '../utils/AppContext'
import { formatCurrency, setPageMeta } from '../utils/helpers'

function AdminDashboardPage() {
  const { listings, addListing, updateListing, deleteListing, toggleFeatured, resetListings } = useApp()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingListing, setEditingListing] = useState(null)

  useEffect(() => {
    setPageMeta('Admin Dashboard', 'Add, edit, delete, and feature GharKhoj Nepal listings locally.')
  }, [])

  const stats = useMemo(
    () => ({
      total: listings.length,
      featured: listings.filter((listing) => listing.featured).length,
      averagePrice: listings.length
        ? Math.round(listings.reduce((total, listing) => total + Number(listing.price), 0) / listings.length)
        : 0,
    }),
    [listings],
  )

  const handleCreate = async (payload) => {
    return addListing(payload)
  }

  const handleUpdate = async (payload) => {
    const success = await updateListing(editingListing.id, payload)

    if (success) {
      setEditingListing(null)
    }

    return success
  }

  return (
    <section className="container-shell py-12 sm:py-16">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Admin dashboard"
          title="Manage listings locally"
          description="Simulate backend CRUD with browser storage and local seed data. Add, edit, delete, and feature properties instantly."
        />
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setEditingListing(null)
              setIsModalOpen(true)
            }}
            className="accent-button"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add listing
          </button>
          <button type="button" onClick={resetListings} className="secondary-button">
            <Undo2 className="mr-2 h-4 w-4" />
            Reset seed data
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="card-surface rounded-[2rem] p-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total listings</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
        </div>
        <div className="card-surface rounded-[2rem] p-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">Featured listings</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{stats.featured}</p>
        </div>
        <div className="card-surface rounded-[2rem] p-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">Average price</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(stats.averagePrice)}</p>
        </div>
      </div>

      <div className="mt-8">
        {listings.length ? (
          <div className="space-y-4">
            {listings.map((listing) => (
              <div key={listing.id} className="card-surface grid gap-5 rounded-[2rem] p-5 lg:grid-cols-[180px_1fr_auto] lg:items-center">
                <img src={listing.images[0]} alt={listing.title} className="h-40 w-full rounded-[1.5rem] object-cover lg:h-28" />
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{listing.title}</h3>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {listing.propertyType}
                    </span>
                    {listing.featured ? (
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-accent dark:bg-orange-950/40">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{listing.location} · {formatCurrency(listing.price)}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{listing.description}</p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <button
                    type="button"
                    onClick={() => toggleFeatured(listing.id)}
                    className="secondary-button px-4 py-2"
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Feature
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingListing(listing)
                      setIsModalOpen(true)
                    }}
                    className="secondary-button px-4 py-2"
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteListing(listing.id)}
                    className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950/30"
                  >
                    <Trash2 className="mr-2 inline h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No listings available" description="Add your first listing from the dashboard to get started." />
        )}
      </div>

      <ListingFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingListing(null)
        }}
        onSubmit={editingListing ? handleUpdate : handleCreate}
        editingListing={editingListing}
      />
    </section>
  )
}

export default AdminDashboardPage
