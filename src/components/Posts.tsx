import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import TimeAgo from 'timeago-react'
import FileInput from './FileInput'
import { usePostsContext } from '../hooks/usePostsContext'
import { PostData, UserData } from '../types/interfaces'
import { PostInput, postSchema } from '../utils/validation'
import Avatar from './Avatar'

interface Props {
  post?: PostData
}
interface FormInput extends PostInput {
  thumbnailFile: FileList
}

const Posts = ({ post }: Props) => {
  const { dispatch } = usePostsContext()
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormInput>({
    defaultValues: {
      content: post ? post.content : '',
    },
    resolver: yupResolver(postSchema),
  })

  const thumbnailToUpload = watch('thumbnailFile')
  const [updateMode, setUpdateMode] = useState(!post)
  const [user, setUser] = useState<UserData>()
  const isAdmin = user?.role === 0

  const getUserById = async (id: number) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
      credentials: 'include',
    })
    const data = await res.json()
    if (res.ok) {
      setUser(data)
    }
  }
  useEffect(() => {
    if (post) {
      getUserById(post.user_id)
    }
  }, [])

  const createPost = async (data: FormInput) => {
    const formData = new FormData()
    formData.append('content', data.content)
    formData.append('thumbnailFile', data.thumbnailFile[0])

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
    const post = await response.json()
    if (response.ok) {
      dispatch({ type: 'ADD_POST', payload: post })
      reset()
    }
  }

  const updatePost = async (id: number, data: FormInput) => {
    const formData = new FormData()
    formData.append('content', data.content)
    data.thumbnailFile && formData.append('thumbnailFile', data.thumbnailFile[0])

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: formData,
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({ type: 'UPDATE_POST', payload: json })
      setUpdateMode(false)
    }
  }

  const handleDeleteThumbnail = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${post?.id}/thumbnail`, {
      method: 'DELETE',
      credentials: 'include',
    })
    const data = await res.json()
    if (res.ok) {
      dispatch({ type: 'UPDATE_POST', payload: data })
    }
  }

  const handleDelete = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${post?.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    const data = await res.json()
    if (res.ok) {
      dispatch({ type: 'DELETE_POST', payload: data })
    }
  }

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (post) {
      await updatePost(post.id, data)
      setUpdateMode(false)
    } else {
      await createPost(data)
    }
  }

  return (
    <article className="mb-4 p-6 rounded-xl bg-white dark:bg-slate-800 flex flex-col  border border-slate-400 bg-clip-border w-3/4 mx-auto">
      <div className="flex pb-6 items-center justify-between">
        <div className="flex">
          <div className="flex flex-col">
            <div className="flex items-center">
              <Avatar user={user} />
              <a className="inline-block text-lg font-bold ml-4 mr-2" href="#">
                {user?.username}
              </a>
              {isAdmin && (
                <span>
                  <svg
                    className="w-4 h-4 fill-blue-500 dark:fill-slate-50 "
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </div>
          </div>
        </div>

        {!updateMode && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-square">
              ...
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <span onClick={() => setUpdateMode(true)}>Edit</span>
              </li>
              <li>
                <span onClick={handleDelete}>Delete</span>
              </li>
            </ul>
          </div>
        )}
      </div>
      {(thumbnailToUpload || post?.thumbnail) && (
        <div className="py-4">
          <img
            className="w-full rounded-lg"
            src={
              thumbnailToUpload
                ? URL.createObjectURL(thumbnailToUpload[0])
                : `${import.meta.env.VITE_API_URL}${post?.thumbnail?.url}`
            }
          />
        </div>
      )}

      {updateMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <textarea
              className="w-full h-32 p-2 border border-gray-300 rounded-lg"
              placeholder="What's on your mind?"
              {...register('content', { required: true })}
            />
            {errors.content && (
              <div className="alert alert-warning shadow-lg mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {errors.content?.message}
              </div>
            )}

            <div className="divider"></div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {post?.thumbnail ? (
                  <span onClick={handleDeleteThumbnail} className="btn gap-2">
                    <span>Remove Photo</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 fill-blue-500 dark:fill-slate-50 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                ) : (
                  <FileInput name="thumbnailFile" control={control} />
                )}
              </div>
              {post ? (
                <div className="flex items-center">
                  <button
                    className="btn btn-outline btn-ghost mr-2"
                    onClick={() => {
                      reset(), setUpdateMode(false)
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-accent" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                </div>
              ) : (
                <button type="submit" className="btn btn-accent" disabled={isSubmitting}>
                  {isSubmitting ? 'Posting...' : 'Post'}
                </button>
              )}
            </div>
          </div>
        </form>
      ) : (
        post && (
          <div className="flex flex-col">
            <p className="text-lg font-bold">{post.content}</p>
            <div className="divider"></div>
            <div className="pb-4 flex justify-between">
              <TimeAgo datetime={post.created_at} />
              <a className="inline-flex items-center" href="#">
                <span className="mr-2">
                  <svg className="fill-rose-600 dark:fill-rose-400 w-6 h-6" viewBox="0 0 24 24">
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
                  </svg>
                </span>
                <span className="text-lg font-bold">3</span>
              </a>
            </div>
            <div className="relative">
              <input
                className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20"
                type="text"
                placeholder="Write a comment"
              />
              <span className="flex absolute right-3 top-2/4 -mt-3 items-center">
                <svg className="mr-2 w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"
                  ></path>
                </svg>
                <svg className="fill-blue-500 dark:fill-slate-50 h-5 w-5" viewBox="0 0 24 24">
                  <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
                </svg>
              </span>
            </div>
          </div>
        )
      )}
    </article>
  )
}

export default Posts
