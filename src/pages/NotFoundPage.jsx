import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="container-shell py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">404</p>
      <h1 className="mt-4 text-4xl font-bold text-slate-950 dark:text-white">Page not found</h1>
      <p className="mt-4 text-slate-500 dark:text-slate-400">The page you are looking for does not exist on GharKhoj Nepal.</p>
      <Link to="/" className="accent-button mt-8">
        Go back home
      </Link>
    </section>
  )
}

export default NotFoundPage
