import TimeAgo from 'timeago-react'
import { PostData } from '../types/interfaces'

interface Props {
  post: PostData
}

const Posts = ({ post }: Props) => {
  return (
    //   <!-- Card-->
    <article className="mb-4 p-6 rounded-xl bg-white dark:bg-slate-800 flex flex-col bg-clip-border w-1/2 mx-auto">
      <div className="flex pb-6 items-center justify-between">
        <div className="flex">
          <a className="inline-block mr-4" href="#">
            <img
              className="rounded-full max-w-none w-14 h-14"
              src="https://randomuser.me/api/portraits/women/9.jpg"
            />
          </a>
          <div className="flex flex-col">
            <div className="flex items-center">
              <a className="inline-block text-lg font-bold mr-2" href="#">
                Esther Howard
              </a>
              <span>
                <svg className="fill-blue-500 dark:fill-slate-50 w-5 h-5" viewBox="0 0 24 24">
                  <path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path>
                </svg>
              </span>
            </div>
            <TimeAgo datetime={post.created_at} />
          </div>
        </div>
      </div>
      <div className="py-4">
        <img className="w-full rounded-lg" src={post.thumbnail} />
      </div>
      <p>{post.content}</p>
      <div className="py-4">
        <a className="inline-flex items-center" href="#">
          <span className="mr-2">
            <svg className="fill-rose-600 dark:fill-rose-400 w-6 h-6" viewBox="0 0 24 24">
              <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
            </svg>
          </span>
          <span className="text-lg font-bold">68</span>
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
      {/* <!-- Comments content --> */}
      <div className="pt-6">
        {/* <!-- Comment row --> */}
        <div className="media flex pb-4">
          <a className="mr-4" href="#">
            <img
              className="rounded-full max-w-none w-12 h-12"
              src="https://randomuser.me/api/portraits/men/83.jpg"
            />
          </a>
          <div className="media-body">
            <div>
              <a className="inline-block text-base font-bold mr-2" href="#">
                Ronald Richards
              </a>
              <span className="text-slate-500 dark:text-slate-300">25 minutes ago</span>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod 😀😀😀</p>
            <div className="mt-2 flex items-center">
              <a className="inline-flex items-center py-2 mr-3" href="#">
                <span className="mr-2">
                  <svg className="fill-rose-600 dark:fill-rose-400 w-6 h-6" viewBox="0 0 24 24">
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
                  </svg>
                </span>
                <span className="text-base font-bold">2</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Posts