import { useEffect, useState } from 'react'
import { PostData } from '../types/interfaces'
import Posts from './Posts'

const Feed = () => {
  const [posts, setPosts] = useState<PostData[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}api/posts`)
      const data = await res.json()

      if (res.ok) {
        setPosts(data)
      }
    }
    fetchPosts()
  }, [])

  console.log(posts)

  return (
    <div className="container mx-auto">
      <h1 className="mt-8 text-center font-bold text-2xl uppercase">Feed</h1>
      {posts.length < 1 ? (
        <div className="mt-4 p-8 text-center border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-medium">There's nothing here...</h2>

          <p className="mt-4 text-sm text-gray-500">
            Created posts will appear here, try creating one!
          </p>
        </div>
      ) : (
        posts.map((post) => <Posts key={post.id} post={post} />)
      )}
    </div>
  )
}

export default Feed
