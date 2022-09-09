import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PostInput, postSchema } from '../utils/validation'
import { useEffect } from 'react'
import AuthSubmit from './AuthSubmit'
import FileInput from './FileInput'

export interface FormInput extends PostInput {
  thumbnailFile: FileList
}

const PostForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<FormInput>({
    defaultValues: {
      content: '',
    },
    resolver: yupResolver(postSchema),
  })
  const selectedFile = watch('thumbnailFile')

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const formData = new FormData()
    formData.append('content', data.content)
    formData.append('thumbnailFile', data.thumbnailFile[0])

    await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
  }
  useEffect(() => {
    reset({
      content: '',
      thumbnailFile: undefined,
    })
  }, [isSubmitSuccessful])

  return (
    <div className="p-4 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-lg shadow-2xl space-y-4">
          <label htmlFor="email" className="sr-only">
            Message
          </label>
          {errors.content && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              {errors.content?.message}
            </div>
          )}

          {selectedFile && (
            <div className="flex items-center justify-center w-full h-64 mt-4 overflow-hidden bg-gray-100 rounded-lg">
              <img src={URL.createObjectURL(selectedFile[0])} alt="" />
            </div>
          )}
          <div className="relative mt-1">
            <input
              type="text"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="What's on your mind?"
              {...register('content')}
            />
          </div>

          <FileInput name="thumbnailFile" control={control} />
          <AuthSubmit submitText={'Submit'} />
        </form>
      </div>
    </div>
  )
}

export default PostForm
