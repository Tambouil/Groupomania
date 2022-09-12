import { createContext, PropsWithChildren, useEffect, useReducer } from 'react'

export interface User {
  id: number
  username: string
  email: string
  avatar: {
    url: string
  }
  role: number
  created_at: string
  updated_at: string
}

export interface AuthState {
  user: User | null
}

export type AuthAction = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' }

const initialState: AuthState = {
  user: null,
}

const reducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    default:
      return state
  }
}

export const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
}>({
  state: initialState,
  dispatch: () => null,
})

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const isAuthenticated = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        credentials: 'include',
      })

      const data = await res.json()
      if (data.login === true) {
        dispatch({ type: 'LOGIN', payload: data.user })
      }
    }
    isAuthenticated()
  }, [])

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}
