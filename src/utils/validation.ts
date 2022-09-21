import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6).max(30),
})

export const registerSchema = yup.object({
  username: yup.string().required().min(3).max(30),
  email: yup.string().email().required(),
  password: yup.string().required().min(6).max(30),
  password_confirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null]),
})

export const postSchema = yup.object({
  content: yup.string().required().max(255),
})

export const userSchema = yup.object({
  username: yup.string().required().min(3).max(30),
})

export const commentSchema = yup.object({
  content: yup.string().required().min(3).max(255),
})

export type LoginInput = yup.InferType<typeof loginSchema>
export type RegisterInput = yup.InferType<typeof registerSchema>
export type PostInput = yup.InferType<typeof postSchema>
export type UserValues = yup.InferType<typeof userSchema>
export type CommentInput = yup.InferType<typeof commentSchema>
