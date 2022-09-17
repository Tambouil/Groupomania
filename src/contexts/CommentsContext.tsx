import { createContext, Dispatch, PropsWithChildren, useReducer } from 'react'

export interface Comment {
  id: number
  content: string
  post_id: number
  user_id: number
  created_at: string
}

export interface CommentsState {
  comments: Comment[]
}

export type CommentsAction =
  | { type: 'SET_COMMENTS'; payload: Comment[] }
  | { type: 'ADD_COMMENT'; payload: Comment }
  | { type: 'UPDATE_COMMENT'; payload: Comment }
  | { type: 'DELETE_COMMENT'; payload: Comment }

const initialState: CommentsState = {
  comments: [],
}

const reducer = (state: CommentsState, action: CommentsAction) => {
  switch (action.type) {
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload }
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      }
    case 'UPDATE_COMMENT':
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        ),
      }
    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== action.payload.id),
      }

    default:
      return state
  }
}

export const CommentsContext = createContext<{
  state: CommentsState
  dispatch: Dispatch<CommentsAction>
}>({
  state: initialState,
  dispatch: () => null,
})

export const CommentsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <CommentsContext.Provider value={{ state, dispatch }}>{children}</CommentsContext.Provider>
}
