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

The app starts locally with no separate backend and no database required.

## Admin Login

Use these temporary credentials:

- Username: `*******`
- Password: `########`

## Data Behavior

- Seed listings live in `src/data/listings.json`
- While running `npm run dev`, admin CRUD changes are written back to `src/data/listings.json` through the local Vite dev API
- `localStorage` is still used as a browser-side fallback cache if the dev API is unavailable
- Admin session state is stored in `sessionStorage`
- Resetting seed data from the dashboard rewrites `src/data/listings.json` to the original seed data while the dev server is running

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
- File writing works during local development through Vite's Node runtime.
- A static deployed build will not be able to rewrite source JSON files without a real backend.
