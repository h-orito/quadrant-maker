'use client'

import Modal from '@/components/modal/modal'
import { ChromePicker } from 'react-color'
import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import InputText from '@/components/form/input-text'
import Preview from './_preview/preview'
import SubmitButton from '@/components/button/submit-button'
import { storeTemplate } from '@/components/firebase/firebase'
import { getFirebaseApp } from '@/lib/firebase/firebase'
import PrimaryButton from '@/components/button/primary-button'

interface FormInput {
  title: string
  leftAxis: string
  rightAxis: string
  topAxis: string
  bottomAxis: string
}

export default function Maker() {
  useEffect(() => {
    getFirebaseApp()
  }, [])

  const { control, formState, handleSubmit, watch } = useForm<FormInput>({
    defaultValues: {
      title: 'タイトル',
      leftAxis: '',
      rightAxis: '',
      topAxis: '',
      bottomAxis: ''
    }
  })

  const [bgColor, setBgColor] = useState('#99ddff')
  const [outerColor, setOuterColor] = useState('#000000')
  const [innerBgColor, setInnerBgColor] = useState('#ffffff')
  const [innerColor, setInnerColor] = useState('#000000')

  const [url, setUrl] = useState('')
  const [key, setKey] = useState('')

  const canSubmit: boolean = formState.isValid && !formState.isSubmitting
  const onSubmit: SubmitHandler<FormInput> = useCallback(
    async (data) => {
      const newKey = await storeTemplate(
        {
          title: data.title,
          axis: {
            left: data.leftAxis,
            right: data.rightAxis,
            top: data.topAxis,
            bottom: data.bottomAxis
          },
          color: {
            outerBg: bgColor,
            outer: outerColor,
            innerBg: innerBgColor,
            inner: innerColor
          }
        } as Template,
        key
      )
      const newUrl = `${location.origin}/quadrant-maker/template/${newKey}`
      setUrl(newUrl)
      setKey(newKey)
    },
    [bgColor, outerColor, innerBgColor, innerColor, key]
  )

  const copyTextToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  return (
    <main className='text-center'>
      <div className='grid lg:grid-cols-2'>
        <Preview
          title={watch('title')}
          leftAxis={watch('leftAxis')}
          rightAxis={watch('rightAxis')}
          topAxis={watch('topAxis')}
          bottomAxis={watch('bottomAxis')}
          outerBgColor={bgColor}
          outerColor={outerColor}
          innerBgColor={innerBgColor}
          innerColor={innerColor}
          contents={[]}
        />
        <div className='p-2'>
          <div>
            <p>作成</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='my-4'>
                <label className='block text-xs font-bold'>タイトル</label>
                <InputText
                  name='title'
                  control={control}
                  rules={{
                    required: '必須です',
                    maxLength: {
                      value: 50,
                      message: `50文字以内で入力してください`
                    }
                  }}
                />
              </div>
              <div className='my-4'>
                <label className='block text-xs font-bold'>上</label>
                <InputText
                  name='topAxis'
                  control={control}
                  rules={{
                    maxLength: {
                      value: 50,
                      message: `50文字以内で入力してください`
                    }
                  }}
                />
              </div>
              <div className='my-4 flex justify-center gap-4'>
                <div>
                  <label className='block text-xs font-bold'>左</label>
                  <InputText
                    name='leftAxis'
                    className='w-full'
                    control={control}
                    rules={{
                      maxLength: {
                        value: 50,
                        message: `50文字以内で入力してください`
                      }
                    }}
                  />
                </div>
                <div>
                  <label className='block text-xs font-bold'>右</label>
                  <InputText
                    name='rightAxis'
                    className='w-full'
                    control={control}
                    rules={{
                      maxLength: {
                        value: 50,
                        message: `50文字以内で入力してください`
                      }
                    }}
                  />
                </div>
              </div>
              <div className='my-4'>
                <label className='block text-xs font-bold'>下</label>
                <InputText
                  name='bottomAxis'
                  control={control}
                  rules={{
                    maxLength: {
                      value: 50,
                      message: `50文字以内で入力してください`
                    }
                  }}
                />
              </div>
              <div className='my-4 flex justify-center gap-4'>
                <div>
                  <label className='block text-xs font-bold'>
                    背景色（外部）
                  </label>
                  <ColorPicker color={bgColor} setColor={setBgColor} />
                </div>
                <div>
                  <label className='block text-xs font-bold'>
                    文字色（外部）
                  </label>
                  <ColorPicker color={outerColor} setColor={setOuterColor} />
                </div>
              </div>
              <div className='my-4 flex justify-center gap-4'>
                <div>
                  <label className='block text-xs font-bold'>
                    背景色（内部）
                  </label>
                  <ColorPicker
                    color={innerBgColor}
                    setColor={setInnerBgColor}
                  />
                </div>
                <div>
                  <label className='block text-xs font-bold'>
                    文字色（内部）
                  </label>
                  <ColorPicker color={innerColor} setColor={setInnerColor} />
                </div>
              </div>
              <SubmitButton
                label='保存して入力用URLを発行'
                disabled={!canSubmit}
              />
              {url.length > 0 && (
                <div className='flex w-full my-2'>
                  <input
                    className='flex-1 rounded border px-2 py-1 text-gray-700'
                    onChange={() => {}}
                    value={url}
                    disabled
                  />
                  <PrimaryButton
                    className='bg-blue-500 text-white px-2 py-1 rounded'
                    click={() => copyTextToClipboard(url)}
                  >
                    コピー
                  </PrimaryButton>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

const ColorPicker = ({
  color,
  setColor
}: {
  color: string
  setColor: (c: string) => void
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const handleOpen = (e: any) => {
    e.preventDefault()
    setIsPickerOpen(true)
  }
  const toggleModal = (e: any) => {
    if (e.target === e.currentTarget) {
      setIsPickerOpen(!isPickerOpen)
    }
  }
  return (
    <>
      <button
        className='base-border border bg-white p-0.5'
        onClick={handleOpen}
      >
        <p className='h-6 w-28' style={{ backgroundColor: color }}></p>
      </button>
      {isPickerOpen && (
        <Modal close={toggleModal} hideFooter>
          <PickerArea
            color={color}
            handleChange={(c: any) => setColor(c.hex)}
          />
        </Modal>
      )}
    </>
  )
}

const PickerArea = ({
  color,
  handleChange
}: {
  color: string
  handleChange: (c: any) => void
}) => {
  return (
    <div className='flex justify-center'>
      <ChromePicker color={color} onChange={handleChange} />
    </div>
  )
}
