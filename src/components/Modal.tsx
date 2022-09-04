import AuthSubmit from './AuthSubmit'

const Modal = () => {
  return (
    <>
      <label htmlFor="modal" className="btn btn-sm modal-button">
        New post
      </label>

      <input type="checkbox" id="modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="modal" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg text-center font-bold border-b-2 pb-4">Create a new post</h3>
          <div>
            <label className="sr-only" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full p-3 text-sm border border-dashed border-gray-300 rounded-lg py-4 mt-4"
              placeholder="Your Message..."
              rows={6}
              id="message"
            ></textarea>
            <div className="w-full space-y-0.5 mb-4">
              <label htmlFor="photo" className="sr-only">
                Your Photo
              </label>
              <input
                id="photo"
                type="file"
                className="block w-full cursor-pointer appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
              />
            </div>
            <AuthSubmit submitText={'SUBMIT'} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
