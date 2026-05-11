import { Home } from 'lucide-react'

function EmptyState({
  title = 'No listings found',
  description = 'Try adjusting your filters or add a new property from the admin dashboard.',
}) {
  return (
    <div className="card-surface flex flex-col items-center gap-4 px-6 py-14 text-center">
      <div className="rounded-full bg-orange-100 p-4 text-accent dark:bg-orange-950/40">
        <Home className="h-7 w-7" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </div>
  )
}

export default EmptyState
