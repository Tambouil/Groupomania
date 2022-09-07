import React from 'react'
import FileInput from './FileInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PostInput, postSchema } from '../utils/validation'

interface FormInput extends PostInput {
  thumbnailFile: FileList
}

const PostForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      content: '',
    },
    resolver: yupResolver(postSchema),
  })
  const selectedFile = watch('thumbnailFile')

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const postData = data.thumbnailFile ? { ...data, thumbnail: data.thumbnailFile[0] } : data
    console.log(postData)
  }

  return (
    <div className="p-4 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 mt-6 mb-0 rounded-lg shadow-2xl space-y-4"
        >
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
          <div className="flex items-center justify-between">
            <FileInput name="thumbnailFile" control={control} />

            <button
              type="submit"
              className="block w-1/2 px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg active:scale-95 hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostForm
