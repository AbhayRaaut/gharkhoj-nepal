import { Menu, ShieldCheck, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logoMark from '../assets/logo-mark.svg'
import { useApp } from '../utils/AppContext'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Home' },
  { to: '/listings', label: 'Listings' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logout } = useApp()
  const navigate = useNavigate()

  const handleAdminClick = () => {
    if (isAuthenticated) {
      navigate('/admin/dashboard')
    } else {
      navigate('/admin')
    }
    setIsOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoMark} alt="GharKhoj Nepal" className="h-11 w-11" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">GharKhoj</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">Nepal</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-orange-100 text-accent dark:bg-orange-950/40'
                    : 'text-slate-600 hover:text-accent dark:text-slate-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button type="button" onClick={handleAdminClick} className="secondary-button">
            <ShieldCheck className="mr-2 h-4 w-4" />
            {isAuthenticated ? 'Dashboard' : 'Admin'}
          </button>
          {isAuthenticated ? (
            <button type="button" onClick={handleLogout} className="secondary-button">
              Logout
            </button>
          ) : null}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="container-shell pb-5 md:hidden">
          <div className="card-surface flex flex-col gap-2 p-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {link.label}
              </NavLink>
            ))}
            <button type="button" onClick={handleAdminClick} className="secondary-button">
              {isAuthenticated ? 'Dashboard' : 'Admin Login'}
            </button>
            {isAuthenticated ? (
              <button type="button" onClick={handleLogout} className="secondary-button">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
