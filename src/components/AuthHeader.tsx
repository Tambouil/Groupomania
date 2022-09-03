import { Link } from 'react-router-dom'

interface AuthHeaderProps {
  headerText: string
  linkText: string
  linkTo: string
}

const AuthHeader = (props: AuthHeaderProps) => {
  return (
    <div className="max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">Welcome to Groupomania</h1>
      <p className="mt-4 text-gray-500 text-center ">
        {props.headerText}
        <Link to={props.linkTo} className="font-medium text-blue-500">
          {} {props.linkText}
        </Link>
      </p>
    </div>
  )
}

export default AuthHeader
