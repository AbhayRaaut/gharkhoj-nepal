import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../utils/AppContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useApp()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
