import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const ProtectedRoutes = () => {
  const { state } = useAuthContext()

  return <>{state.user ? <Outlet /> : <Navigate to="/login" />}</>
}

export default ProtectedRoutes
