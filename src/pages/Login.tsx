import { useState } from 'react'
import AuthHeader from '../components/AuthHeader'
import AuthSubmit from '../components/AuthSubmit'

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false)
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
  }
  return (
    <>
      <AuthHeader headerText={'No account ?'} linkText={'Register'} linkTo={'/register'} />
      <form
        action="#"
        method="POST"
        className="max-w-md mx-auto mt-8 mb-0 space-y-4 shadow-2xl p-8"
      >
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <input
            type="email"
            className="border-2 border-gray-200 w-full p-4 pr-12 text-sm  rounded-lg shadow-sm"
            placeholder="Enter email"
          />
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
          </div>
        </div>
        <AuthSubmit submitText={'Login'} />
      </form>
    </>
  )
}

export default Login
