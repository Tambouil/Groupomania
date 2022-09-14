interface Props {
  value: number
  isActivated: boolean
  onClick: () => void
}

const Like = ({ value, isActivated, onClick }: Props) => {
  return (
    <div className="flex items-center">
      <span
        className={`btn btn-ghost btn-sm gap-2 ${isActivated ? 'text-error' : 'text-gray-500'}`}
        onClick={onClick}
      >
        <svg
          className={`w-4 h-4 ${isActivated ? 'text-error' : 'text-gray-500'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span>{value}</span>
      </span>
    </div>
  )
}

export default Like
