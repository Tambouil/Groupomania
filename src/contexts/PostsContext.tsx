import { createContext, PropsWithChildren, useReducer } from 'react'

export interface Post {
  id: number
  content: string
  thumbnail: {
    url: string
  }
  created_at: string
  updated_at: string
  user_id: number
}

export interface PostsState {
  posts: Post[]
}

export type PostsAction =
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'UPDATE_POST'; payload: Post }
  | { type: 'DELETE_POST'; payload: Post }

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
