export async function fetchListingsFromFile() {
  const response = await fetch('/api/listings')

  if (!response.ok) {
    let message = 'Failed to load listings from file.'

    try {
      const errorBody = await response.json()
      message = errorBody.message || message
    } catch {
      message = 'Failed to load listings from file.'
    }

    throw new Error(message)
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
    let message = 'Failed to save listings to file.'

    try {
      const errorBody = await response.json()
      message = errorBody.message || message
    } catch {
      message = 'Failed to save listings to file.'
    }

    throw new Error(message)
  }

  return response.json()
}
