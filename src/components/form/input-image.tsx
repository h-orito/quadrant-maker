import { useRef } from 'react'
import DangerButton from '../button/danger-button'
import PrimaryButton from '../button/primary-button'

interface Props {
  setImage: (file: File | null) => void
  disabled?: boolean
}

const allowImageTypes = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/gif',
  'image/webp',
  'image/bmp'
]

export default function InputImage({ setImage, disabled = false }: Props) {
  const inputRef = useRef<HTMLInputElement>(null!)

  const onProfileButtonClick = (e: any) => {
    e.preventDefault()
    inputRef.current.click()
  }

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null || event.target.files.length === 0) {
      return
    }
    const file = event.target.files[0]
    // 初期化することで同じファイルを連続で選択してもonChagngeが発動するように設定し、画像をキャンセルしてすぐに同じ画像を選ぶ動作に対応
    event.target.value = ''

    if (!allowImageTypes.includes(file.type)) {
      return
    }

    setImage(file)
  }

  const handleCancel = (e: any) => {
    e.preventDefault()
    setImage(null)
  }

  return (
    <div>
      <input
        type='file'
        ref={inputRef}
        accept='image/*'
        onChange={handleFile}
        hidden
      />
      <PrimaryButton click={onProfileButtonClick} disabled={disabled}>
        画像を選択
      </PrimaryButton>
    </div>
  )
}
