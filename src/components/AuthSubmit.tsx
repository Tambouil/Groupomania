interface AuthSubmitProps {
  submitText: string
}

const AuthSubmit = (props: AuthSubmitProps) => {
  return (
    <button
      type="submit"
      className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
    >
      {props.submitText}
    </button>
  )
}

export default AuthSubmit
