function LoadingSkeleton({ cards = 6 }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: cards }).map((_, index) => (
        <div key={index} className="card-surface overflow-hidden">
          <div className="h-56 animate-pulse bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-4 p-5">
            <div className="h-4 w-1/3 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-6 w-2/3 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
