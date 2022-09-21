import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { UserData } from '../types/interfaces'

interface Props {
  user: UserData
}

const User = ({ user }: Props) => {
  const { state: AuthState } = useAuthContext()

  const authUser = AuthState.user
  const [isFollowed, setIsFollowed] = useState(false)
  const [followersCount, setFollowersCount] = useState(0)

  return (
    <div className="flex items-center justify-between px-8 py-4 w-2/3 mx-auto bg-slate-200">
      <div className="flex items-center">
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
        <div className="hidden sm:block ml-4">
          <h1 className="text-xl font-semibold">{user.username}</h1>
          <span className="text-sm text-gray-500">{followersCount} Followers</span>
        </div>
      </div>
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
  )
}

export default User
