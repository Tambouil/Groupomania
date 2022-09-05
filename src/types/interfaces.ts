import { PostInput } from '../utils/validation'

export interface PostData extends PostInput {
  id: number
  thumbnail?: string
  created_at: string
  userId: number
}
