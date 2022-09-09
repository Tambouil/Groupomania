import { useEffect } from 'react'
import { usePostsContext } from '../hooks/usePostsContext'
import PostForm from './PostForm'
import Posts from './Posts'

const Feed = () => {
  const { state, dispatch } = usePostsContext()

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
        credentials: 'include',
      })
      const data = await res.json()
      if (res.ok) {
        dispatch({ type: 'SET_POSTS', payload: data })
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className="container mx-auto">
      <PostForm />
      {state.posts.length < 1 ? (
        <div className="mt-4 p-8 text-center border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-medium">There's nothing here...</h2>

          <p className="mt-4 text-sm text-gray-500">
            Created posts will appear here, try creating one!
          </p>
        </div>
      ) : (
        state.posts.map((post) => <Posts key={post.id} post={post} />)
      )}
    </div>
  )
}

export default Feed
