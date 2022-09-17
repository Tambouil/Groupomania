import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <Outlet />
      </div>

      <div className="relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full">
        <img className="absolute inset-0 object-cover w-full h-full" src="images/auth.jpg" alt="" />
      </div>
    </section>
  )
}

export default AuthLayout
