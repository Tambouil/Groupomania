import { ChangeEventHandler, useRef } from 'react'
import { Control, useController } from 'react-hook-form'

interface Props {
  name: string
  control: Control<any>
}

const FileInput = ({ name, control }: Props) => {
  const {
    field: { onChange, value },
  } = useController({ name, control, defaultValue: '' })

  const inputRef = useRef<HTMLInputElement>(null)

  const onClick = () => {
    inputRef.current?.click()
  }
  const onDelete = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    onChange('')
  }

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.files)
  }

  return (
    <>
      <div className="btn-group">
        <div className="btn btn-sm sm:btn-md gap-2" onClick={onClick}>
          Image
        </div>
        {value?.length > 0 && (
          <div className="btn btn-sm sm:btn-md" onClick={onDelete}>
            ✕
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
        aria-label="Add an image"
      />
    </>
  )
}

export default FileInput
