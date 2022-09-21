import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import User from '../components/User'
import { UserData } from '../types/interfaces'

const Users = () => {
  const [users, setUsers] = useState<UserData[]>([])
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        credentials: 'include',
      })
      const data = await response.json()
      setUsers(data)
    }
    fetchUsers()
  }, [])

  return (
    <div className="bg-slate-200 min-h-screen dark:bg-slate-400">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-gray-700 text-2xl font-medium">Tous les utilisateurs</h3>
        <span className="mt-3 text-sm text-gray-500">
          Cliquez sur leur profil pour en savoir plus
        </span>
      </div>

      {users.length > 0 ? (
        users.map((user) => <User key={user.id} user={user} />)
      ) : (
        <div className="w-full px-6">
          <p className="text-gray-700 text-center">Aucun utilisateur trouvé</p>
        </div>
      )}
    </div>
  )
}

export default Users
