'use client'

import Modal from '@/components/modal/modal'
import { ChromePicker } from 'react-color'
import { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import InputText from '@/components/form/input-text'
import Slider from 'react-input-slider'
import Preview from './preview'
import PrimaryButton from '@/components/button/primary-button'
import SimpleInputText from '@/components/form/simple-text'
import InputSelect from '@/components/form/input-select'

interface FormInput {
  title: string
  leftAxis: string
  rightAxis: string
  topAxis: string
  bottomAxis: string
}

export default function Maker() {
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

  const canSubmit: boolean = formState.isValid && !formState.isSubmitting

  const onSubmit: SubmitHandler<FormInput> = useCallback((data) => {
    console.log(data)
  }, [])
  const titleValue = watch('title')
  const leftAxisValue = watch('leftAxis')
  const rightAxisValue = watch('rightAxis')
  const topAxisValue = watch('topAxis')
  const bottomAxisValue = watch('bottomAxis')

  const [contents, setContents] = useState<Content[]>([])
  const [currentContentIndex, setCurrentContentIndex] = useState(0)
  const addContent = () => {
    const newContent: Content = {
      text: '項目',
      slider: { x: 50, y: 50 }
    }
    const newContents = contents.concat(newContent)
    setContents(newContents)
    setCurrentContentIndex(newContents.length - 1)
  }
  const setSliderValue = (sliderValue: { x: number; y: number }) => {
    const currentContent = {
      ...contents[currentContentIndex],
      slider: sliderValue
    }
    setContents(
      contents.map((content, i) => {
        if (i === currentContentIndex) {
          return currentContent
        } else {
          return content
        }
      })
    )
  }
  const setText = (text: string) => {
    const currentContent = {
      ...contents[currentContentIndex],
      text
    }
    setContents(
      contents.map((content, i) => {
        if (i === currentContentIndex) {
          return currentContent
        } else {
          return content
        }
      })
    )
  }

  return (
    <main className='text-center'>
      <div className='grid lg:grid-cols-2'>
        <Preview
          title={titleValue}
          leftAxis={leftAxisValue}
          rightAxis={rightAxisValue}
          topAxis={topAxisValue}
          bottomAxis={bottomAxisValue}
          outerBgColor={bgColor}
          outerColor={outerColor}
          innerBgColor={innerBgColor}
          innerColor={innerColor}
          contents={contents}
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
            </form>
          </div>
          <div>入力部分</div>

          <PrimaryButton click={addContent}>追加</PrimaryButton>
          {contents.length > 0 && (
            <div>
              <div>
                <InputSelect
                  candidates={contents.map((content, i) => ({
                    label: content.text,
                    value: i
                  }))}
                  selected={currentContentIndex}
                  setSelected={setCurrentContentIndex}
                />
              </div>
              <div
                className='flex justify-center p-2'
                style={{
                  backgroundColor: bgColor
                }}
              >
                <Slider
                  axis='xy'
                  x={contents[currentContentIndex].slider.x}
                  y={contents[currentContentIndex].slider.y}
                  onChange={setSliderValue}
                  styles={{
                    track: {
                      backgroundColor: innerBgColor
                    },
                    disabled: {
                      opacity: 0.5
                    }
                  }}
                />
              </div>
              <SimpleInputText
                text={contents[currentContentIndex].text}
                setText={setText}
                deletable={true}
              />
            </div>
          )}
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
