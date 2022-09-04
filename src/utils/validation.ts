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

export type LoginInput = yup.InferType<typeof loginSchema>
export type RegisterInput = yup.InferType<typeof registerSchema>
