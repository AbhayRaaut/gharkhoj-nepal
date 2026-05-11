# GharKhoj Nepal

A modern, responsive MVP website for discovering hostels, flats, and houses across Nepal.

## Stack

- React
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Lucide React
- Local JSON seed data + localStorage/sessionStorage persistence

## Features

- Browse hostel, flat, and house listings
- Responsive homepage with hero search and featured properties
- Listings page with search, price, location, and property type filters
- Property detail page with gallery, amenities, share, save, and WhatsApp contact
- Admin login with protected dashboard
- Add, edit, delete, and feature listings locally
- Dark mode toggle
- Toast notifications
- Loading skeletons and empty states

## Setup

```bash
npm install
npm run dev
```

The app starts locally with no backend and no database required.

## Admin Login

Use these temporary credentials:

- Username: `*******`
- Password: `########`

## Data Behavior

- Seed listings live in `src/data/listings.json`
- Runtime CRUD changes are stored in `localStorage`
- Admin session state is stored in `sessionStorage`
- Resetting seed data from the dashboard restores the original JSON-based listings locally

## Project Structure

```text
src/
  assets/
  components/
  data/
  pages/
  utils/
```

## Notes

- WhatsApp buttons open direct owner contact links using the Nepal country code format.
- This project is frontend-only and designed to be easy to extend into a real backend later.
