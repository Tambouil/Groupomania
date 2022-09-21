import { UserData } from '../types/interfaces'

interface Props {
  user?: UserData
  postCount: number
}

const UserHeader = ({ user, postCount }: Props) => {
  return (
    <main className="bg-gray-100 bg-opacity-25">
      <div className="lg:w-8/12 lg:mx-auto mb-8">
        <header className="flex flex-wrap items-center p-4 md:py-8">
          {user?.avatar ? (
            <div className="md:w-3/12 md:ml-16">
              <img
                className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
              border-2 border-pink-600 p-1"
                src={`${import.meta.env.VITE_API_URL}${user?.avatar?.url}`}
                alt="profile"
              />
            </div>
          ) : (
            <div className="avatar placeholder w-20">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-20">
                {user?.username.charAt(0).toUpperCase()}
              </div>
            </div>
          )}

          <div className="w-8/12 md:w-7/12 ml-4">
            <div className="md:flex md:items-center mb-4">
              <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                {user?.username}
              </h2>

              <div
                className="bg-blue-500 px-2 py-1 
                        text-white font-semibold text-sm rounded block text-center 
                        sm:inline-block"
              >
                S'abonner
              </div>
            </div>

            <ul className="hidden md:flex space-x-8 mb-4">
              <li>
                <span className="font-semibold">{postCount}</span>{' '}
                {postCount === 1 ? 'publication' : 'publications'}
              </li>

              <li>
                <span className="font-semibold">4k</span> abonnés
              </li>
              <li>
                <span className="font-semibold">302</span> abonnements
              </li>
            </ul>

            <div className="hidden md:block">
              <h1 className="font-semibold">Développeur nomade</h1>
              <span>Travel, Nature and Music</span>
              <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>
          </div>

          <div className="md:hidden text-sm my-2">
            <h1 className="font-semibold">Mr Travlerrr...</h1>
            <span>Travel, Nature and Music</span>
            <p>Lorem ipsum dolor sit amet consectetur</p>
          </div>
        </header>

        <div className="px-px md:px-3">
          <ul
            className="flex md:hidden justify-around space-x-8 border-t 
                text-center p-2 text-gray-600 leading-snug text-sm"
          >
            <li>
              <span className="font-semibold text-gray-800 block">{postCount}</span>{' '}
              {postCount === 1 ? 'post' : 'posts'}
            </li>

            <li>
              <span className="font-semibold text-gray-800 block">4k</span>
              abonnés
            </li>
            <li>
              <span className="font-semibold text-gray-800 block">302</span>
              abonnements
            </li>
          </ul>

          <ul
            className="flex items-center justify-around md:justify-center space-x-12  
                    uppercase tracking-widest font-semibold text-xs text-gray-600
                    border-t"
          >
            <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
              <div className="inline-block p-3">
                <span className="hidden md:inline dark:text-white">publications</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default UserHeader
