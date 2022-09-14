import { useAuthContext } from '../hooks/useAuthContext'

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
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Groupomania</a>
      </div>
      <div className="flex-none gap-2">
        <span className="badge">{state.user?.username}</span>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
