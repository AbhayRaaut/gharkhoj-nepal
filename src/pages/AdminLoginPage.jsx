import { ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../utils/AppContext'
import { setPageMeta } from '../utils/helpers'

function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, notify, isAuthenticated } = useApp()
  const [formState, setFormState] = useState({ username: '', password: '' })

  useEffect(() => {
    setPageMeta('Admin Login', 'Secure admin access for managing listings on GharKhoj Nepal.')
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (event) => {
    event.preventDefault()
    const success = login(formState.username, formState.password)

    if (!success) {
      notify('Invalid admin credentials.', 'error')
      return
    }

    navigate(location.state?.from?.pathname || '/admin/dashboard', { replace: true })
  }

  return (
    <section className="container-shell py-16">
      <div className="mx-auto max-w-lg card-surface rounded-[2rem] p-8 sm:p-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-accent dark:bg-orange-950/40">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-accent">Admin access</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">Login to dashboard</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Use the temporary admin credentials to manage listings locally in your browser.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            className="field"
            placeholder="Username"
            value={formState.username}
            onChange={(event) => setFormState((current) => ({ ...current, username: event.target.value }))}
            required
          />
          <input
            type="password"
            className="field"
            placeholder="Password"
            value={formState.password}
            onChange={(event) => setFormState((current) => ({ ...current, password: event.target.value }))}
            required
          />
          <button type="submit" className="accent-button w-full">
            Login securely
          </button>
        </form>

        {/* 
        <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
          <p><span className="font-semibold">Username:</span> *****</p>
          <p className="mt-1"><span className="font-semibold">Password:</span> *******</p>
        </div> */}
      </div>
    </section>
  )
}

export default AdminLoginPage
