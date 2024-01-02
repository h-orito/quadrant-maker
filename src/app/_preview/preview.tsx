'use client'

import { CSSProperties, useEffect, useState } from 'react'

const Preview = ({
  title,
  author,
  leftAxis,
  rightAxis,
  topAxis,
  bottomAxis,
  outerBgColor,
  outerColor,
  innerBgColor,
  innerColor,
  contents
}: {
  title: string
  author: string | undefined
  leftAxis: string
  rightAxis: string
  topAxis: string
  bottomAxis: string
  outerBgColor: string
  outerColor: string
  innerBgColor: string
  innerColor: string
  contents: Content[]
}) => {
  const [sliderRatio, setSliderRatio] = useState(0.96)
  useEffect(() => {
    setSliderRatio(window.innerWidth > 768 ? 0.96 : 0.94)
  }, [])

  return (
    <div
      className='p-2'
      style={{
        backgroundColor: outerBgColor,
        color: outerColor
      }}
    >
      <div>{title}</div>
      <div className='text-sm mb-2'>{topAxis}</div>
      <div className='flex justify-center'>
        <div
          className='text-sm h-64 md:h-[32rem] mx-2'
          style={{
            writingMode: 'vertical-lr',
            color: outerColor
          }}
        >
          {leftAxis}
        </div>
        <div>
          <div
            className='w-64 md:w-[32rem] h-64 md:h-[32rem] relative'
            style={{
              backgroundColor: innerBgColor,
              color: innerColor
            }}
          >
            <div
              className='absolute'
              style={{
                backgroundColor: outerBgColor,
                top: '0',
                left: 'calc(50% - 2px)',
                width: '2px',
                height: '100%'
              }}
            ></div>
            <div
              className='absolute'
              style={{
                backgroundColor: outerBgColor,
                top: 'calc(50% - 2px)',
                left: '0',
                width: '100%',
                height: '2px'
              }}
            ></div>
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
        </div>
        <div
          className='text-sm h-64 md:h-[32rem] mx-2'
          style={{
            writingMode: 'vertical-lr',
            color: outerColor
          }}
        >
          {rightAxis}
        </div>
      </div>
      <div
        className='text-sm mt-2'
        style={{
          color: outerColor
        }}
      >
        {bottomAxis}
      </div>
      <div
        className='text-xs text-right mt-2'
        style={{
          color: outerColor
        }}
      >
        {author && (
          <>
            <span>作成者: {author}</span>
            <br />
          </>
        )}
        提供: 配置するやつメーカー @ort_dev
      </div>
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
        className={`text-xs md:text-sm text-right`}
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

export default Preview
