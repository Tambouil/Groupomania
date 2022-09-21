import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import TimeAgo from 'timeago-react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCommentsContext } from '../hooks/useCommentsContext'
import { CommentData, UserData } from '../types/interfaces'
import { CommentInput, commentSchema } from '../utils/validation'

interface Props {
  comment?: CommentData
  post_id: number
}

const Comments = ({ comment, post_id }: Props) => {
  const { dispatch } = useCommentsContext()
  const { state } = useAuthContext()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<CommentInput>({
    defaultValues: {
      content: comment ? comment.content : '',
    },
    resolver: yupResolver(commentSchema),
  })

  const [updateMode, setUpdateMode] = useState(!comment)
  const [user, setUser] = useState<UserData>()
  const authUser = state.user
  const isAuthor = authUser?.id === comment?.user_id
  const isAdmin = authUser?.role === 0

  const getUserById = async (id: number) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
      credentials: 'include',
    })
    const data = await res.json()
    if (res.ok) {
      setUser(data)
    }
  }

  const onSubmit: SubmitHandler<CommentInput> = async (data) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/posts/${post_id}/comments/${comment?.id || ''}`,
      {
        method: comment ? 'PATCH' : 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    const json = await res.json()
    if (res.ok) {
      json.post_id = Number(post_id)
      dispatch({ type: comment ? 'UPDATE_COMMENT' : 'ADD_COMMENT', payload: json })
      comment ? reset({ content: json.content }) : reset({ content: '' })
      comment && setUpdateMode(false)
    }
  }

  const handleDelete = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/posts/${post_id}/comments/${comment?.id}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    )
    const json = await res.json()
    if (res.ok) {
      dispatch({ type: 'DELETE_COMMENT', payload: json })
    }
  }

  useEffect(() => {
    if (comment) {
      getUserById(comment.user_id)
    }
  }, [comment, user])

  return (
    <>
      <div className="flex-col w-full py-4 mb-2 bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm">
        <div className="flex">
          {comment && user ? (
            <div className="flex items-center mr-4">
              {user.avatar ? (
                <img
                  className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
                  alt="avatar"
                  src={`${import.meta.env.VITE_API_URL}${user.avatar.url}`}
                />
              ) : (
                <div className="avatar placeholder">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center mr-4">
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                  {authUser?.avatar?.url ? (
                    <img
                      className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
                      alt="avatar"
                      src={`${import.meta.env.VITE_API_URL}${authUser.avatar.url}`}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-12 h-12">
                      {authUser?.username?.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              {updateMode ? (
                <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex items-center justify-between space-x-2 w-full">
                    <input
                      type="text"
                      className="text-sm w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                      placeholder="Ecrivez un commentaire..."
                      {...register('content')}
                    />
                    {comment && (
                      <button className="btn btn-sm" onClick={() => setUpdateMode(false)}>
                        Annuler
                      </button>
                    )}
                    {isSubmitting ? (
                      <button className=" bg-slate-300 rounded-full cursor-pointer hover:bg-slate-400 p-4">
                        Submitting...
                      </button>
                    ) : (
                      <button className=" bg-slate-300 rounded-full cursor-pointer hover:bg-slate-400 p-4">
                        <svg
                          className="w-2 h2 sm:w-4 sm:h-4 "
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  {errors.content && (
                    <div className="alert alert-error shadow-lg">
                      <div>
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
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{errors.content?.message}</span>
                      </div>
                    </div>
                  )}
                </form>
              ) : (
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {comment && (
                        <>
                          <div className="text-sm font-medium text-gray-900">
                            {comment ? user?.username : authUser?.username}
                          </div>
                          <TimeAgo
                            className="text-xs font-normal text-gray-500"
                            datetime={comment.created_at}
                            locale="fr"
                          />
                        </>
                      )}
                      {(isAuthor || isAdmin) && (
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            className="text-sm font-medium text-gray-500 hover:text-gray-900"
                            onClick={() => setUpdateMode(true)}
                          >
                            <svg
                              className="w-4 h-4 hover:stroke-orange-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="text-sm font-medium text-gray-500 hover:text-gray-900"
                            onClick={handleDelete}
                          >
                            <svg
                              className="w-4 h-4 hover:stroke-red-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-1 text-sm text-gray-700">
                    {updateMode ? (
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        placeholder="Ecrivez un commentaire..."
                        {...register('content')}
                      />
                    ) : (
                      <p>{comment ? comment.content : watch('content')}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
//

export default Comments
