export async function fetchListingsFromFile() {
  const response = await fetch('/api/listings')

  if (!response.ok) {
    throw new Error('Failed to load listings from file.')
  }

  return response.json()
}

export async function saveListingsToFile(listings) {
  const response = await fetch('/api/listings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(listings),
  })

  if (!response.ok) {
    throw new Error('Failed to save listings to file.')
  }

  return response.json()
}
