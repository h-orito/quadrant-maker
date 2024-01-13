'use client'

import { SetStateAction, useEffect, useState } from 'react'
import Slider from 'react-input-slider'
import PrimaryButton from '@/components/button/primary-button'
import SimpleInputText from '@/components/form/simple-text'
import InputSelect from '@/components/form/input-select'
import DangerButton from '@/components/button/danger-button'
import InputImage from '@/components/form/input-image'
import ImagePreview from './image-preview'
import { ChromePicker } from 'react-color'
import Modal from '@/components/modal/modal'

export function Input() {
  const [baseImage, setBaseImage] = useState<File | null>(null)
  const [textColor, setTextColor] = useState('#000000')

  const [contents, setContents] = useState<Content[]>([])
  const [currentContentIndex, setCurrentContentIndex] = useState(0)
  const addTextContent = () => {
    const newContent: Content = {
      type: 'text',
      text: '項目',
      slider: { x: 50, y: 50 }
    }
    addContent(newContent)
  }
  const addImageContent = () => {
    const newContent: Content = {
      type: 'image',
      imageSizeSlider: { x: 50 },
      slider: { x: 50, y: 50 }
    }
    addContent(newContent)
  }
  const addContent = (newContent: Content) => {
    const newContents = contents.concat(newContent)
    setContents(newContents)
    setCurrentContentIndex(newContents.length - 1)
  }
  const deleteCurrentContent = () => {
    if (window.confirm('現在編集中の項目を削除しますか？') === false) return
    const newContents = contents.filter((_, i) => i !== currentContentIndex)
    setContents(newContents)
    setCurrentContentIndex(newContents.length - 1)
  }
  const setSliderValue = (sliderValue: { x: number; y: number }) => {
    const currentContent = {
      ...contents[currentContentIndex],
      slider: sliderValue
    }
    setNewContents(currentContent)
  }
  const setText = (text: string) => {
    const currentContent = {
      ...contents[currentContentIndex],
      text
    }
    setNewContents(currentContent)
  }
  const setImage = (file: File | null) => {
    const currentContent = {
      ...contents[currentContentIndex],
      file
    }
    setNewContents(currentContent)
  }
  const setImageSizeSliderValue = (sliderValue: { x: number }) => {
    const currentContent = {
      ...contents[currentContentIndex],
      imageSizeSlider: sliderValue
    }
    setNewContents(currentContent)
  }
  const setNewContents = (newContent: Content) => {
    setContents(
      contents.map((content, i) => {
        if (i === currentContentIndex) {
          return newContent
        } else {
          return content
        }
      })
    )
  }

  return (
    <main className='text-center'>
      <div className='grid lg:grid-cols-2'>
        <ImagePreview
          baseImage={baseImage}
          innerColor={textColor}
          contents={contents}
        />
        <div className='overflow-y-auto p-2'>
          <div className='my-2'>
            <label className='block text-xs font-bold'>マトリクス画像</label>
            {baseImage == null && (
              <p className='text-xs'>まずはマトリクス画像を開いてください。</p>
            )}
            <InputImage setImage={setBaseImage} />
          </div>

          {!!baseImage && (
            <div>
              <div className='my-4 justify-center gap-4'>
                <label className='block text-xs font-bold'>文字色</label>
                <ColorPicker color={textColor} setColor={setTextColor} />
              </div>

              <div className='my-2'>
                <p className='text-xs'>
                  配置したい項目を追加・調整し、プレビュー部分のスクショを撮って共有しましょう。
                </p>
              </div>
              <div className='mt-2'>
                <div className='flex'>
                  <PrimaryButton className='flex-1' click={addTextContent}>
                    テキスト追加
                  </PrimaryButton>
                  <PrimaryButton className='flex-1' click={addImageContent}>
                    画像追加
                  </PrimaryButton>
                </div>
                <div className='flex'>
                  <div className='flex-1'>
                    <InputSelect
                      candidates={contents.map((content, i) => ({
                        label: content.text ?? `画像${i + 1}`,
                        value: i
                      }))}
                      selected={currentContentIndex}
                      setSelected={setCurrentContentIndex}
                      placeholder='追加してください'
                    />
                  </div>
                  <DangerButton
                    click={deleteCurrentContent}
                    disabled={contents.length <= 0}
                  >
                    削除
                  </DangerButton>
                </div>
              </div>
              {contents.length > 0 && (
                <div className='mt-2'>
                  {contents[currentContentIndex].type === 'text' ? (
                    <div className='my-2'>
                      <SimpleInputText
                        label='項目名'
                        text={contents[currentContentIndex].text ?? ''}
                        setText={setText}
                        deletable={true}
                      />
                    </div>
                  ) : (
                    <div className='my-2'>
                      <InputImage setImage={setImage} />
                    </div>
                  )}
                  <div className='my-2'>
                    {contents[currentContentIndex].type === 'image' && (
                      <>
                        <label className='block text-xs font-bold'>
                          画像サイズ
                        </label>
                        <div className='flex justify-center p-2'>
                          <Slider
                            axis='x'
                            x={contents[currentContentIndex].imageSizeSlider!.x}
                            onChange={setImageSizeSliderValue}
                          />
                        </div>
                      </>
                    )}
                    <label className='block text-xs font-bold'>表示位置</label>
                    <div
                      className='flex justify-center p-2'
                      style={{
                        backgroundColor: '#f5f5f5'
                      }}
                    >
                      <Slider
                        axis='xy'
                        x={contents[currentContentIndex].slider.x}
                        y={contents[currentContentIndex].slider.y}
                        onChange={setSliderValue}
                        styles={{
                          track: {
                            backgroundColor: '#fff'
                          },
                          thumb: {
                            backgroundColor: '#000'
                          },
                          disabled: {
                            opacity: 0.5
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
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
      <button className='border bg-white p-0.5' onClick={handleOpen}>
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
