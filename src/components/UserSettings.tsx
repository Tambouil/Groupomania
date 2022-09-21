import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthContext } from '../hooks/useAuthContext'
import { userSchema, UserValues } from '../utils/validation'
import FileInput from './FileInput'

interface FormInput extends UserValues {
  avatarFile: FileList
}

const UserSettings = () => {
  const { state, dispatch } = useAuthContext()
  const authUser = state.user
  const {
    register,
    watch,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      username: authUser?.username,
    },
    resolver: yupResolver(userSchema),
  })

  const avatarToUpload = watch('avatarFile')

  const handleAvatarDelete = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/${authUser?.id}/avatar`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    )
    const json = await response.json()
    if (response.ok) {
      dispatch({ type: 'UPDATE', payload: json })
      reset()
    }
  }

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const formData = new FormData()
    formData.append('username', data.username)
    if (avatarToUpload) {
      formData.append('avatarFile', avatarToUpload[0])
    }
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${authUser?.id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: formData,
    })
    const json = await res.json()
    if (res.ok) {
      dispatch({ type: 'UPDATE', payload: json })
    }
  }

  return (
    <div className="flex flex-col justify-center space-y-4">
      <h1 className="text-xl font-bold">User Settings</h1>
      <div className="flex flex-col items-center justify-center w-2/3 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between mt-4">
            <div className="flex-col">
              <label className="sr-only">Current Avatar</label>
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-16 h-16">
                  {authUser?.avatar || avatarToUpload ? (
                    <img
                      className="w-20 h-20 rounded-full"
                      src={
                        authUser?.avatar
                          ? `${import.meta.env.VITE_API_URL}${authUser?.avatar?.url}`
                          : URL.createObjectURL(avatarToUpload[0])
                      }
                    />
                  ) : (
                    <span>{authUser?.username?.charAt(0).toUpperCase()}</span>
                  )}
                </div>
              </div>
            </div>
            {authUser?.avatar ? (
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-accent btn-sm"
                  onClick={handleAvatarDelete}
                >
                  Delete Avatar
                </button>
              </div>
            ) : (
              <FileInput name="avatarFile" control={control} />
            )}
          </div>
          <div className="divider"></div>
          <div className="flex flex-col justify-center mt-4">
            <label className="text-sm text-gray-500 mb-2">Username</label>
            <input
              className="w-64 px-2 py-1 border border-gray-300 rounded-md"
              type="text"
              {...register('username')}
            />
            {errors.username && (
              <span className="text-sm text-red-500">{errors.username.message}</span>
            )}
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary mt-4">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserSettings
