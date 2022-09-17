import { createContext, Dispatch, PropsWithChildren, useReducer } from 'react'
import { CommentData } from '../types/interfaces'

export interface CommentsState {
  comments: CommentData[]
}

export type CommentsAction =
  | { type: 'SET_COMMENTS'; payload: CommentData[] }
  | { type: 'ADD_COMMENT'; payload: CommentData }
  | { type: 'UPDATE_COMMENT'; payload: CommentData }
  | { type: 'DELETE_COMMENT'; payload: CommentData }

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
