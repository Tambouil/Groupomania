import { useAuthContext } from '../hooks/useAuthContext'
import { UserData } from '../types/interfaces'

interface Props {
  user?: UserData | null
}

const Avatar = ({ user }: Props) => {
  const { state } = useAuthContext()
  const isAdmin = user?.role === 0
  return (
    <div className="flex items-center">
      <div className="avatar placeholder w-12">
        {user?.avatar ? (
          <img
            className="w-12 h-12 rounded-full"
            src={`${import.meta.env.VITE_API_URL}${user?.avatar?.url}`}
          />
        ) : (
          <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
            {user
              ? user?.username?.charAt(0).toUpperCase()
              : state.user?.username?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <span className="inline-block text-lg font-bold ml-4 mr-2">
        {user ? user?.username : state.user?.username}
      </span>
      {isAdmin && (
        <span>
          <svg
            className="w-4 h-4 fill-blue-500 dark:fill-slate-50 "
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </div>
  )
}

export default Avatar
