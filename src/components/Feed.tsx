import { PropsWithChildren, useEffect } from 'react'
import { useCommentsContext } from '../hooks/useCommentsContext'
import { PostData } from '../types/interfaces'
import Posts from './Posts'

interface Props {
  posts: PostData[]
}

const Feed = ({ posts, children }: PropsWithChildren<Props>) => {
  const { state, dispatch } = useCommentsContext()
  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/allcomments`, {
        credentials: 'include',
      })
      const data = await res.json()
      if (res.ok) {
        dispatch({ type: 'SET_COMMENTS', payload: data })
      }
    }
    fetchComments()
  }, [dispatch])

  return (
    <div className="container mx-auto pt-8">
      {children}
      {posts.length < 1 ? (
        <div className="mt-4 p-8 text-center border border-slate-400 rounded-lg">
          <h2 className="text-2xl font-medium">There's nothing here...</h2>

          <p className="mt-4 text-sm text-gray-500">
            Created posts will appear here, try creating one!
          </p>
        </div>
      ) : (
        posts.map((post: PostData) => <Posts key={post.id} post={post} comments={state.comments} />)
      )}
    </div>
  )
}

export default Feed
