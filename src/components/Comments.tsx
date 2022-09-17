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
      <div className="flex-col w-full py-4 bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm">
        <div className="flex">
          {comment && user ? (
            <div className="flex flex-col items-center mr-4">
              <img
                className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
                alt="Noob master's avatar"
                src="https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80"
              />
              <div className="text-xs text-center text-gray-500">{user.username}</div>
            </div>
          ) : (
            <div className="flex flex-col items-center mr-4">
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                  {authUser?.username?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              {updateMode ? (
                <form className="flex justify-between" onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                    placeholder="Write a comment..."
                    {...register('content')}
                  />

                  {comment ? (
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
                </form>
              ) : (
                <div className="flex-col mt-1">
                  <div className="flex items-center flex-1 px-4 font-bold leading-tight">
                    {comment && user ? user.username : ''}
                    <span className="ml-2 text-xs font-normal text-gray-500">
                      <TimeAgo
                        datetime={comment ? comment.created_at : new Date().toLocaleString()}
                        locale="en_US"
                      />
                    </span>
                  </div>
                  <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
                    {comment?.content}
                  </div>
                </div>
              )}
            </div>
          </div>

          {comment && (isAuthor || isAdmin) && (
            <div className="justify-end">
              <button
                className="text-xs text-gray-500"
                onClick={() => setUpdateMode((prev) => !prev)}
              >
                {updateMode ? 'Cancel' : 'Edit'}
              </button>
              <button
                className="text-xs text-red-500"
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Comments
