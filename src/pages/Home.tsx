import { useEffect } from 'react'
import Feed from '../components/Feed'
import Navbar from '../components/Navbar'
import Posts from '../components/Posts'
import { usePostsContext } from '../hooks/usePostsContext'

const Home = () => {
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
  }, [dispatch])

  return (
    <div className="bg-slate-200 min-h-screen dark:bg-slate-400">
      <Navbar />

      <Feed posts={state.posts}>
        <Posts />
      </Feed>
    </div>
  )
}

export default Home
