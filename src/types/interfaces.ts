import { PostInput } from '../utils/validation'

export interface PostData extends PostInput {
  id: number
  thumbnail: {
    url: string
  }
  created_at: string
  userId: number
}
