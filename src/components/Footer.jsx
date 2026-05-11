function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80 py-8 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container-shell flex flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between dark:text-slate-400">
        <div>
          <p className="font-semibold text-slate-800 dark:text-white">GharKhoj Nepal</p>
          <p>Affordable flats, hostels, and houses across Nepal.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <span>Kathmandu</span>
          <span>Pokhara</span>
          <span>Biratnagar</span>
          <span>Lalitpur</span>
          <span>Bhaktapur</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
