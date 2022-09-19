import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../components/Feed'
import Navbar from '../components/Navbar'
import UserHeader from '../components/UserHeader'
import { UserData } from '../types/interfaces'

const UserProfile = () => {
  const params = useParams<{ id: string }>()
  const user_id = Number(params.id)
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState<UserData>()
  const postCount = posts.length

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${user_id}/posts`, {
        credentials: 'include',
      })
      const data = await response.json()
      setPosts(data)
    }
    fetchPosts()

    const fetchUser = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${user_id}`, {
        credentials: 'include',
      })
      const data = await response.json()
      setUser(data)
    }
    fetchUser()
  }, [])
  return (
    <>
      <Navbar />
      <UserHeader user={user} postCount={postCount} />
      <Feed posts={posts} />
    </>
  )
}

export default UserProfile
