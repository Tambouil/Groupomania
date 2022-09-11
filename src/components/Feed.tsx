import { PropsWithChildren } from 'react'
import { PostData } from '../types/interfaces'
import Posts from './Posts'

interface Props {
  posts: PostData[]
}

const Feed = ({ posts, children }: PropsWithChildren<Props>) => {
  return (
    <div className="container mx-auto">
      {children}
      {posts.length < 1 ? (
        <div className="mt-4 p-8 text-center border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-medium">There's nothing here...</h2>

          <p className="mt-4 text-sm text-gray-500">
            Created posts will appear here, try creating one!
          </p>
        </div>
      ) : (
        posts.map((post: PostData) => <Posts key={post.id} post={post} />)
      )}
    </div>
  )
}

export default Feed
