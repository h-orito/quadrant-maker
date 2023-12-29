'use client'
import Modal from '@/components/modal/modal'
import { ChromePicker } from 'react-color'
import { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import InputText from '@/components/form/input-text'
import Slider from 'react-input-slider'

interface FormInput {
  title: string
  leftAxis: string
  rightAxis: string
  topAxis: string
  bottomAxis: string
  sample: string
}

export default function Maker() {
  const { control, formState, handleSubmit, watch } = useForm<FormInput>({
    defaultValues: {
      title: 'タイトル',
      leftAxis: '',
      rightAxis: '',
      topAxis: '',
      bottomAxis: '',
      sample: ''
    }
  })

  const [bgColor, setBgColor] = useState('#99ddff')
  const [innerBgColor, setInnerBgColor] = useState('#ffffff')

  const canSubmit: boolean = formState.isValid && !formState.isSubmitting

  const onSubmit: SubmitHandler<FormInput> = useCallback((data) => {
    console.log(data)
  }, [])
  const titleValue = watch('title')
  const leftAxisValue = watch('leftAxis')
  const rightAxisValue = watch('rightAxis')
  const topAxisValue = watch('topAxis')
  const bottomAxisValue = watch('bottomAxis')

  const [sliderValue, setSliderValue] = useState({ x: 0, y: 0 })

  return (
    <main className='text-center'>
      <div className='grid lg:grid-cols-2'>
        <Preview
          title={titleValue}
          leftAxis={leftAxisValue}
          rightAxis={rightAxisValue}
          topAxis={topAxisValue}
          bottomAxis={bottomAxisValue}
          bgColor={bgColor}
          innerBgColor={innerBgColor}
          sliderValue={sliderValue}
          sample={watch('sample')}
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
              <div className='my-4'>
                <label className='block text-xs font-bold'>左</label>
                <InputText
                  name='leftAxis'
                  control={control}
                  rules={{
                    maxLength: {
                      value: 50,
                      message: `50文字以内で入力してください`
                    }
                  }}
                />
              </div>
              <div className='my-4'>
                <label className='block text-xs font-bold'>右</label>
                <InputText
                  name='rightAxis'
                  control={control}
                  rules={{
                    maxLength: {
                      value: 50,
                      message: `50文字以内で入力してください`
                    }
                  }}
                />
              </div>
              <div className='my-4'>
                <label className='block text-xs font-bold'>
                  背景色（全体）
                </label>
                <ColorPicker color={bgColor} setColor={setBgColor} />
              </div>
              <div className='my-4'>
                <label className='block text-xs font-bold'>
                  背景色（内部）
                </label>
                <ColorPicker color={innerBgColor} setColor={setInnerBgColor} />
              </div>
            </form>
          </div>
          <div>入力部分</div>
          <div>
            <div
              className='flex justify-center p-2'
              style={{
                backgroundColor: bgColor
              }}
            >
              <Slider
                axis='xy'
                x={sliderValue.x}
                y={sliderValue.y}
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
            <InputText
              name='sample'
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
      </div>
    </main>
  )
}

const Preview = ({
  title,
  leftAxis,
  rightAxis,
  topAxis,
  bottomAxis,
  bgColor,
  innerBgColor,
  sliderValue,
  sample
}: {
  title: string
  leftAxis: string
  rightAxis: string
  topAxis: string
  bottomAxis: string
  bgColor: string
  innerBgColor: string
  sliderValue: { x: number; y: number }
  sample: string
}) => {
  const sliderRatio = !!window && window.innerWidth > 768 ? 0.96 : 0.94
  const sliderX = sliderValue.x
  const sliderY = sliderValue.y * sliderRatio

  return (
    <div
      className='p-2'
      style={{
        backgroundColor: bgColor
      }}
    >
      <div>{title}</div>
      <div className='text-sm mb-2'>{topAxis}</div>
      <div className='flex justify-center'>
        <div
          className='text-sm h-64 md:h-[32rem] mr-2'
          style={{
            writingMode: 'vertical-lr'
          }}
        >
          {leftAxis}
        </div>
        <div>
          <div
            className='w-64 md:w-[32rem] h-64 md:h-[32rem] relative'
            style={{
              backgroundColor: innerBgColor
            }}
          >
            <div
              className='absolute'
              style={{
                backgroundColor: bgColor,
                top: '0',
                left: 'calc(50% - 2px)',
                width: '2px',
                height: '100%'
              }}
            ></div>
            <div
              className='absolute'
              style={{
                backgroundColor: bgColor,
                top: 'calc(50% - 2px)',
                left: '0',
                width: '100%',
                height: '2px'
              }}
            ></div>
            {sliderX > 50 ? (
              <div
                className='absolute'
                style={{
                  top: `${sliderY}%`,
                  right: `${100 - sliderX}%`
                }}
              >
                <p className={`text-xs md:text-sm text-right`}>
                  {`${sample}●`}
                </p>
              </div>
            ) : (
              <div
                className='absolute'
                style={{
                  top: `${sliderY}%`,
                  left: `${sliderX}%`
                }}
              >
                <p className='text-xs md:text-sm'>{`●${sample}`}</p>
              </div>
            )}
          </div>
        </div>
        <div
          className='text-sm h-64 md:h-[32rem] ml-2'
          style={{
            writingMode: 'vertical-lr'
          }}
        >
          {rightAxis}
        </div>
      </div>
      <div className='text-sm mt-2'>{bottomAxis}</div>
    </div>
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
        <p className='h-6 w-20' style={{ backgroundColor: color }}></p>
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
