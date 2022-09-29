import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import UserSettings from './UserSettings'
import logo from '../assets/logo.svg'
import logo_white from '../assets/logo-white.svg'

const Navbar = () => {
  const { state, dispatch } = useAuthContext()
  const logout = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    if (response.ok) {
      dispatch({ type: 'LOGOUT' })
    }
  }

  return (
    <div className="navbar bg-base-100 px-6">
      <div className="flex-1">
        <div className="flex items-center">
          <picture>
            <source srcSet={logo_white} media="(prefers-color-scheme: dark)" />
            <img className="w-40 dark:fill-white" src={logo} alt="logo" />
          </picture>
        </div>
      </div>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost btn-sm rounded-btn" aria-label="Home">
          Accueil
        </Link>
        <Link to="/users" className="btn btn-ghost btn-sm rounded-btn" aria-label="users">
          Utilisateurs
        </Link>
      </div>
      <div className="flex-none gap-4">
        <span className="hidden sm:badge">{state.user?.username}</span>
        <div className="dropdown dropdown-end">
          <label tabIndex={0}>
            <div className="avatar placeholder w-12">
              {state.user?.avatar ? (
                <div className="avatar placeholder">
                  <img
                    className="object-cover w-4 h-4 border-2 border-gray-300 rounded-full"
                    src={`${import.meta.env.VITE_API_URL}${state.user.avatar.url}`}
                  />
                </div>
              ) : (
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                  {state.user?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={`/users/${state.user?.id}`}>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profil
              </Link>
            </li>
            <li>
              <label htmlFor="my-modal">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                Paramètres
              </label>
            </li>
            <li>
              <button onClick={logout}>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Deconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <UserSettings />
        </div>
      </div>
    </div>
  )
}

export default Navbar
