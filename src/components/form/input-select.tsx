import Select, { SingleValue } from 'react-select'

type Props = {
  className?: string
  label?: string
  candidates: Array<Option>
  selected: any
  setSelected: (value: any) => void
  placeholder?: string
  disabled?: boolean
}

type Option = {
  label: string
  value: any
}

export default function InputSelect({
  className,
  label,
  candidates,
  selected,
  setSelected,
  placeholder,
  disabled
}: Props) {
  const handleChange = (value: SingleValue<Option>) => {
    setSelected(value?.value)
  }

  const defaultOptions = candidates.filter((c) => selected === c.value)

  return (
    <div>
      {label && (
        <label className='base-text block text-xs font-bold'>{label}</label>
      )}
      <Select
        placeholder={placeholder}
        className={`${className ?? ''} text-gray-700`}
        defaultValue={defaultOptions}
        options={candidates}
        isSearchable
        onChange={handleChange}
        isDisabled={disabled}
      />
    </div>
  )
}
