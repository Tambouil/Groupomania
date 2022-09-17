import { createContext, PropsWithChildren, useReducer } from 'react'
import { PostData } from '../types/interfaces'

export interface PostsState {
  posts: PostData[]
}

export type PostsAction =
  | { type: 'SET_POSTS'; payload: PostData[] }
  | { type: 'ADD_POST'; payload: PostData }
  | { type: 'UPDATE_POST'; payload: PostData }
  | { type: 'DELETE_POST'; payload: PostData }

const initialState: PostsState = {
  posts: [],
}

const reducer = (state: PostsState, action: PostsAction) => {
  switch (action.type) {
    case 'SET_POSTS':
      return { posts: action.payload }
    case 'ADD_POST':
      return { posts: [action.payload, ...state.posts] }
    case 'UPDATE_POST':
      return {
        posts: state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return action.payload
          }
          return post
        }),
      }
    case 'DELETE_POST':
      return {
        posts: state.posts.filter((post) => post.id !== action.payload.id),
      }
    default:
      return state
  }
}

export const PostsContext = createContext<{
  state: PostsState
  dispatch: React.Dispatch<PostsAction>
}>({
  state: initialState,
  dispatch: () => null,
})

export const PostsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <PostsContext.Provider value={{ state, dispatch }}>{children}</PostsContext.Provider>
}
