import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import TimeAgo from 'timeago-react'
import FileInput from './FileInput'
import { usePostsContext } from '../hooks/usePostsContext'
import { CommentData, LikeData, PostData, UserData } from '../types/interfaces'
import { PostInput, postSchema } from '../utils/validation'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'
import Like from './Like'
import Comments from './Comments'
import { Link } from 'react-router-dom'

interface Props {
  post?: PostData
  comments?: CommentData[]
}
interface FormInput extends PostInput {
  thumbnailFile: FileList
}

const Posts = ({ post, comments }: Props) => {
  const { state } = useAuthContext()
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

  const [updateMode, setUpdateMode] = useState(!post)
  const [user, setUser] = useState<UserData>()
  const [isLiked, setIsLiked] = useState(false)
  const [countLikes, setCountLikes] = useState(0)
  const thumbnailToUpload = watch('thumbnailFile')
  const authUser = state.user
  const isAuthor = authUser?.id === post?.user_id
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
  useEffect(() => {
    if (post) {
      getUserById(post.user_id)
      likes(post.id)
    }
  }, [post])

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const formData = new FormData()
    formData.append('content', data.content)
    data.thumbnailFile && formData.append('thumbnailFile', data.thumbnailFile[0])
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/posts/${post ? post.id : ''}`,
      {
        method: post ? 'PATCH' : 'POST',
        credentials: 'include',
        body: formData,
      }
    )
    const json = await response.json()
    if (response.ok) {
      dispatch({ type: post ? 'UPDATE_POST' : 'ADD_POST', payload: json })
      post ? reset({ content: json.content }) : reset({ content: '' })
      post && setUpdateMode(false)
    }
  }

  const handleDelete = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${post?.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({ type: 'DELETE_POST', payload: json })
    }
  }

  const handleDeleteThumbnail = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/posts/${post?.id}/thumbnail`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    )
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_POST', payload: json })
    }
  }

  const likes = async (id: number) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}/likes`, {
      credentials: 'include',
    })
    const json = await response.json()
    if (response.ok) {
      json.map((like: LikeData) => {
        if (like.user_id === authUser?.id) {
          setIsLiked(true)
        } else {
          setIsLiked(false)
        }
      })
      if (json.length === 0) {
        setIsLiked(false)
      }
      setCountLikes(json.length)
    }
  }

  const handleLike = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${post?.id}/likes`, {
      method: 'POST',
      credentials: 'include',
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({ type: 'UPDATE_POST', payload: json })
      post && likes(post.id)
    }
  }

  return (
    <article className="mb-4 p-6 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white flex flex-col bg-clip-border w-3/4 mx-auto shadow-2xl">
      <div className="flex pb-6 items-center justify-between">
        <Link to={user ? `/users/${user?.id}` : `/users/${state.user?.id}`}>
          {post ? <Avatar user={user} /> : <Avatar user={state.user} />}
        </Link>
        <div className="flex flex-col">
          <div className="flex items-center">
            {!updateMode && (isAuthor || isAdmin) && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-square">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <span onClick={() => setUpdateMode(true)}>Modifier</span>
                  </li>
                  <li>
                    <span onClick={handleDelete}>Supprimer</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
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
          {errors.thumbnailFile && (
            <div className="alert alert-error shadow-lg mt-2">
              <div>
                <span>{errors.thumbnailFile?.message}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {updateMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <textarea
              className="w-full h-20 p-2 border border-gray-300 rounded-lg dark:border-none dark:bg-slate-400 dark:text-white"
              placeholder={'Quoi de neuf ? ' + ' ' + authUser?.username}
              {...register('content', { required: true })}
            />
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

            <div className="divider"></div>

            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center">
                {post?.thumbnail ? (
                  <button className="btn gap-2" onClick={handleDeleteThumbnail}>
                    <span>Supprimer Image</span>
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
                  </button>
                ) : (
                  <FileInput name="thumbnailFile" control={control} />
                )}
              </div>
              {post ? (
                <div className="flex items-center mt-2 sm:mt-0">
                  <button
                    className="btn btn-outline btn-ghost btn-xs sm:btn-sm md:btn-md mr-2"
                    onClick={() => {
                      reset(), setUpdateMode(false)
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn btn-accent btn-xs sm:btn-sm md:btn-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sauvegarde...' : 'Enregistrer'}
                  </button>
                </div>
              ) : (
                <button type="submit" className="btn btn-accent" disabled={isSubmitting}>
                  {isSubmitting ? 'Publication...' : 'Publier'}
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
            <div className="flex justify-between">
              <TimeAgo datetime={post.created_at} locale="fr" />
              <Like onClick={handleLike} value={countLikes} isActivated={isLiked} />
            </div>
            <div className="divider"></div>
            <Comments post_id={post.id} />

            {comments
              ?.map(
                (comment) =>
                  post.id === comment.post_id && (
                    <Comments key={comment.id} comment={comment} post_id={post.id} />
                  )
              )
              .reverse()}
          </div>
        )
      )}
    </article>
  )
}

export default Posts
