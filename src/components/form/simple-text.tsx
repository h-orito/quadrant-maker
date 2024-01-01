type Props = {
  label?: string
  text: string
  setText: (t: string) => void
  deletable?: boolean
}
const SimpleInputText = ({
  label,
  text,
  setText,
  deletable = false
}: Props) => {
  return (
    <div>
      {label && <label className='block text-xs font-bold'>{label}</label>}
      <div>
        <input
          type='text'
          className='rounded border px-2 py-1 text-gray-700'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {deletable && (
          <button
            className='text-xs text-gray-500 -ml-7 py-1 px-2 bg-gray-300 rounded'
            onClick={() => setText('')}
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default SimpleInputText
