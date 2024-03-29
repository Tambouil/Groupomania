import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import AuthHeader from '../components/AuthHeader'
import AuthSubmit from '../components/AuthSubmit'
import { loginSchema, LoginInput } from '../utils/validation'
import { useAuthContext } from '../hooks/useAuthContext'

const Login = () => {
  const { dispatch } = useAuthContext()
  const [passwordShown, setPasswordShown] = useState(false)
  const [error, setError] = useState('')
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const json = await response.json()
    if (!response.ok) {
      setError("Nom d'utilisateur ou mot de passe incorrect")
    }
    if (response.ok) {
      dispatch({ type: 'LOGIN', payload: json })
    }
  }

  return (
    <>
      <AuthHeader headerText={'Pas de compte ?'} linkText={'Inscription'} linkTo={'/register'} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md p-8 mx-auto mt-8 mb-0 space-y-4 shadow-2xl"
      >
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <input
            type="email"
            className="w-full p-4 pr-12 text-sm border-2 border-gray-200 rounded-lg shadow-sm focus:border-gray-900"
            placeholder="Entrer votre email"
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
              placeholder="Entrer votre mot de passe"
              {...register('password', { required: true })}
            />

            <span
              onClick={togglePasswordVisiblity}
              className="absolute inset-y-0 inline-flex items-center cursor-pointer right-4"
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
          </div>
          {errors.password && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              {errors.password?.message}
            </div>
          )}
        </div>
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            {error}
          </div>
        )}
        <AuthSubmit submitText={'Connexion'} />
      </form>
    </>
  )
}

export default Login
