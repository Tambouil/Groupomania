import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import AuthHeader from '../components/AuthHeader'
import AuthSubmit from '../components/AuthSubmit'
import { RegisterInput, registerSchema } from '../utils/validation'

const Register = () => {
  const [passwordShown, setPasswordShown] = useState(false)
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: yupResolver(registerSchema),
  })

  const onSubmit: SubmitHandler<RegisterInput> = (data) => console.log(data)
  return (
    <>
      <AuthHeader headerText={'Already have an account ?'} linkText={'Login'} linkTo={'/login'} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-8 mb-0 space-y-4 shadow-2xl p-8"
      >
        <div>
          <label htmlFor="text" className="sr-only">
            Username
          </label>

          <input
            type="text"
            className="w-full p-4 pr-12 text-sm border-2 border-gray-200 rounded-lg shadow-sm"
            placeholder="Username"
            {...register('username', { required: true })}
          />
          {errors.username && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              {errors.username?.message}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <input
            type="email"
            className="w-full p-4 pr-12 text-sm border-2 border-gray-200 rounded-lg shadow-sm"
            placeholder="Enter email"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              {errors.email?.message}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordShown ? 'text' : 'password'}
              className="w-full p-4 pr-12 text-sm border-2 border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter password"
              {...register('password', { required: true })}
            />

            <span
              onClick={togglePasswordVisiblity}
              className="absolute inset-y-0 inline-flex items-center right-4 cursor-pointer"
            >
              {passwordShown === true ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </span>
            {errors.password && (
              <div
                className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                {errors.password?.message}
              </div>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="password_confirmation" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordShown ? 'text' : 'password'}
              className="w-full p-4 pr-12 text-sm border-2 border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter password"
              {...register('password_confirmation', { required: true })}
            />

            <span
              onClick={togglePasswordVisiblity}
              className="absolute inset-y-0 inline-flex items-center right-4 cursor-pointer"
            >
              {passwordShown === true ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </span>
            {errors.password_confirmation && (
              <div
                className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                {errors.password_confirmation?.message}
              </div>
            )}
          </div>
        </div>
        <AuthSubmit submitText={'Register'} />
      </form>
    </>
  )
}

export default Register
