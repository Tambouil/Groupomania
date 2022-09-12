import { useAuthContext } from '../hooks/useAuthContext'
import { UserData } from '../types/interfaces'

interface Props {
  user: UserData | undefined
}

const Avatar = ({ user }: Props) => {
  const { state } = useAuthContext()
  return (
    <div className="avatar placeholder">
      <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
        {user
          ? user?.username?.charAt(0).toUpperCase()
          : state.user?.username?.charAt(0).toUpperCase()}
      </div>
    </div>
  )
}

export default Avatar
