import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { UserData } from '../types/interfaces'

interface Props {
  user: UserData
}

const User = ({ user }: Props) => {
  const { state: AuthState } = useAuthContext()
  const authUser = AuthState.user
  const isLoggedAdmin = authUser?.role === 0
  const isAdmin = user?.role === 0
  const navigate = useNavigate()
  const [isFollowed, setIsFollowed] = useState(false)
  const [followersCount, setFollowersCount] = useState(0)

  const handleDeleteAccount = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${user.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (response.ok) {
      navigate('/')
    }
  }

  return (
    <div className="flex items-center justify-between px-8 py-4 w-2/3 mx-auto bg-slate-400 dark:bg-slate-700 shadow-2xl rounded-lg my-2">
      <div className="flex items-center">
        <Link to={`/users/${user.id}`}>
          <div className="avatar placeholder w-14 h-14">
            {user.avatar ? (
              <img
                className="object-cover w-4 h-4 border-2 border-gray-300 rounded-full"
                src={`${import.meta.env.VITE_API_URL}${user?.avatar?.url}`}
                alt=""
              />
            ) : (
              <div className="bg-neutral-focus text-neutral-content rounded-full">
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </Link>
        <div className="hidden sm:block ml-4">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">{user.username}</h1>
            {isAdmin && (
              <svg
                className="w-4 h-4 fill-blue-500 dark:fill-slate-500 ml-2"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <span className="text-sm text-gray-800 dark:text-slate-300">
            {followersCount} Abonnés
          </span>
        </div>
      </div>
      <div className="flex justify-end">
        {isLoggedAdmin && authUser.id !== user.id && (
          <div className="flex items-center">
            <button
              type="button"
              className="btn btn-error btn-xs sm:btn-sm"
              onClick={handleDeleteAccount}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
        {authUser && authUser.id !== user.id && (
          <button className="btn btn-circle btn-ghost">
            {isFollowed ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default User
