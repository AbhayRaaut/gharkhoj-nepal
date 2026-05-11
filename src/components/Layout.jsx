import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import Toast from './Toast'

function Layout() {
  return (
    <div className="min-h-screen bg-hero">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  )
}

export default Layout
