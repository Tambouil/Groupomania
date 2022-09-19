import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import AuthLayout from './components/AuthLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import Users from './components/Users'

function App() {
  const { state } = useAuthContext()
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={!state.user ? <Register /> : <Navigate to="/" />} />
          <Route path="/login" element={!state.user ? <Login /> : <Navigate to="/" />} />
        </Route>
        <Route path="/" element={state.user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/users/" element={state.user ? <Users /> : <Navigate to="/login" />} />
        <Route
          path="/users/:id"
          element={state.user ? <UserProfile /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  )
}

export default App
