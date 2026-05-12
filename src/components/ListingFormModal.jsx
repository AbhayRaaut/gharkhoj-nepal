import { useEffect, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { locations, propertyTypes } from '../utils/helpers'

const initialState = {
  title: '',
  price: '',
  location: 'Kathmandu',
  propertyType: 'Hostel',
  description: '',
  fullDescription: '',
  whatsappNumber: '97798',
  imageUrls: '',
  amenities: '',
  featured: false,
}

function ListingFormModal({ isOpen, onClose, onSubmit, editingListing }) {
  const computedState = useMemo(() => {
    if (!editingListing) {
      return initialState
    }

    return {
      ...editingListing,
      imageUrls: editingListing.images.join(', '),
      amenities: editingListing.amenities.join(', '),
    }
  }, [editingListing])

  const [formState, setFormState] = useState(computedState)

  useEffect(() => {
    setFormState(computedState)
  }, [computedState])

  if (!isOpen) {
    return null
  }

  const handleChange = (key, value) => {
    setFormState((current) => ({ ...current, [key]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await onSubmit(formState)

    if (success) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="card-surface max-h-[90vh] w-full max-w-3xl overflow-y-auto p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              {editingListing ? 'Edit listing' : 'Add listing'}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Manage property details</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <input className="field md:col-span-2" placeholder="Title" value={formState.title} onChange={(event) => handleChange('title', event.target.value)} required />
          <input className="field" type="number" placeholder="Price" value={formState.price} onChange={(event) => handleChange('price', event.target.value)} required />
          <select className="field" value={formState.location} onChange={(event) => handleChange('location', event.target.value)}>
            {locations.filter((item) => item !== 'All').map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <select className="field" value={formState.propertyType} onChange={(event) => handleChange('propertyType', event.target.value)}>
            {propertyTypes.filter((item) => item !== 'All').map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input className="field" placeholder="WhatsApp number e.g. 9779812345678" value={formState.whatsappNumber} onChange={(event) => handleChange('whatsappNumber', event.target.value)} required />
          <textarea className="field md:col-span-2" rows="3" placeholder="Short description" value={formState.description} onChange={(event) => handleChange('description', event.target.value)} required />
          <textarea className="field md:col-span-2" rows="4" placeholder="Full description" value={formState.fullDescription} onChange={(event) => handleChange('fullDescription', event.target.value)} required />
          <textarea className="field md:col-span-2" rows="3" placeholder="Image URLs separated by commas" value={formState.imageUrls} onChange={(event) => handleChange('imageUrls', event.target.value)} required />
          <input className="field md:col-span-2" placeholder="Amenities separated by commas" value={formState.amenities} onChange={(event) => handleChange('amenities', event.target.value)} />
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200">
            <input type="checkbox" checked={formState.featured} onChange={(event) => handleChange('featured', event.target.checked)} />
            Mark as featured
          </label>
          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="secondary-button">
              Cancel
            </button>
            <button type="submit" className="accent-button">
              {editingListing ? 'Update listing' : 'Save listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ListingFormModal
