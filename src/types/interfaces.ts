import { CommentInput, PostInput, UserValues } from '../utils/validation'

export interface UserData extends UserValues {
  id: number
  email: string
  avatar?: {
    url: string
  }
  role: number
  created_at: string
  updated_at: string
}

export interface PostData extends PostInput {
  id: number
  thumbnail?: {
    url: string
  }
  created_at: string
  updated_at: string
  user_id: number
}

export interface LikeData {
  user_id: number
  post_id: number
}

export interface CommentData extends CommentInput {
  id: number
  user_id: number
  post_id: number
  created_at: string
  updated_at: string
}

export interface FollowData {
  user_id: number
  following_id: number
}
