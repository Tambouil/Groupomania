import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../components/Feed'
import Navbar from '../components/Navbar'
import UserHeader from '../components/UserHeader'
import { usePostsContext } from '../hooks/usePostsContext'
import { UserData } from '../types/interfaces'

const UserProfile = () => {
  const params = useParams<{ id: string }>()
  const user_id = Number(params.id)
  const { state } = usePostsContext()
  const [user, setUser] = useState<UserData>()
  const ownPosts = state.posts.filter((post) => post.user_id === user_id)
  const postCount = ownPosts.length

  useEffect(() => {
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
      <Feed posts={ownPosts} />
    </>
  )
}

export default UserProfile
