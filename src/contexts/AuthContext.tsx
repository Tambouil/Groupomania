import { createContext, PropsWithChildren, useEffect, useReducer } from 'react'
import { UserData } from '../types/interfaces'

export interface AuthState {
  user: UserData | null
}

export type AuthAction =
  | { type: 'LOGIN'; payload: UserData }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE'; payload: UserData }

const initialState: AuthState = {
  user: null,
}

const reducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'UPDATE':
      return { ...state, user: action.payload }
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
