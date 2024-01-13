'use client'

import { CSSProperties, useEffect, useState } from 'react'
import Image from 'next/image'

const ImagePreview = ({
  baseImage,
  innerColor,
  contents
}: {
  baseImage: File | null
  innerColor: string
  contents: Content[]
}) => {
  const [sliderRatio, setSliderRatio] = useState(0.96)
  useEffect(() => {
    setSliderRatio(window.innerWidth > 768 ? 0.96 : 0.94)
  }, [])

  return (
    <div
      className='relative p-2 min-h-full'
      style={{
        color: innerColor
      }}
    >
      {!!baseImage ? (
        <div className='h-full w-full'>
          <img
            src={URL.createObjectURL(baseImage)}
            alt='ベース画像'
            style={{
              objectFit: 'cover'
            }}
          />
        </div>
      ) : (
        <div className='mx-auto grid h-64 w-64 content-center justify-center bg-blue-200 md:h-[32rem] md:w-[32rem]'>
          <p className='text-center'>ベース画像を選択してください</p>
        </div>
      )}
      {contents.map((content, i) => {
        return content.type === 'text' ? (
          <TextItem
            key={i}
            content={content}
            sliderRatio={sliderRatio}
            color={innerColor}
          />
        ) : (
          <ImageItem key={i} content={content} color={innerColor} />
        )
      })}
    </div>
  )
}

const TextItem = ({
  content,
  sliderRatio,
  color
}: {
  content: Content
  sliderRatio: number
  color: string
}) => {
  const x = content.slider.x
  const y = content.slider.y * sliderRatio
  const cssProperties: CSSProperties =
    x > 50
      ? {
          top: `${y}%`,
          right: `${100 - x}%`
        }
      : {
          top: `${y}%`,
          left: `${x}%`
        }
  return (
    <div className='absolute' style={cssProperties}>
      <p
        className={`text-right text-xs md:text-sm`}
        style={{
          color: color
        }}
      >
        {content.text}
      </p>
    </div>
  )
}

const ImageItem = ({ content, color }: { content: Content; color: string }) => {
  const x = content.slider.x
  const y = content.slider.y
  const cssXProperties: CSSProperties =
    x > 50
      ? {
          right: `${100 - x}%`
        }
      : {
          left: `${x}%`
        }
  const cssYProperties: CSSProperties =
    y > 50
      ? {
          bottom: `${100 - y}%`
        }
      : {
          top: `${y}%`
        }
  if (content.file == null) return <></>
  return (
    <img
      className='absolute'
      src={URL.createObjectURL(content.file)}
      alt='画像'
      style={{
        ...cssXProperties,
        ...cssYProperties,
        width: `${content.imageSizeSlider!.x}%`
      }}
    />
  )
}

export default ImagePreview
