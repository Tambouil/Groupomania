import { useContext } from 'react'
import { CommentsContext } from '../contexts/CommentsContext'

export const useCommentsContext = () => {
  const context = useContext(CommentsContext)
  if (!context) {
    throw new Error('useCommentsContext must be used within CommentsContext')
  }
  return context
}
