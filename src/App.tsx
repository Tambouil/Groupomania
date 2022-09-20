import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import AuthLayout from './components/AuthLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import Users from './pages/UsersList'
import ProtectedRoutes from './components/ProtectedRoutes'
import { useEffect, useState } from 'react'

function App() {
  const { state } = useAuthContext()

  return (
    <>
      <Routes>
        <>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserProfile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </>

        <Route element={<AuthLayout />}>
          <Route path="/register" element={!state.user ? <Register /> : <Navigate to="/" />} />
          <Route path="/login" element={!state.user ? <Login /> : <Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
