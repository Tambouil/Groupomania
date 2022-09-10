import { PostInput, UserValues } from '../utils/validation'

export interface PostData extends PostInput {
  id: number
  thumbnail: {
    url: string
  }
  created_at: string
  user_id: number
}

export interface UserData extends UserValues {
  id: number
  avatar: {
    url: string
  }
  role: number
  created_at: string
}
