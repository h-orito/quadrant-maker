'use client'

import { useEffect, useState } from 'react'

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
          className='text-sm h-64 md:h-[32rem] mr-2'
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
            {contents.map((content, i) => (
              <Item
                key={i}
                content={content}
                sliderRatio={sliderRatio}
                color={innerColor}
              />
            ))}
          </div>
        </div>
        <div
          className='text-sm h-64 md:h-[32rem] ml-2'
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
        提供: 推しを配置するやつ @ort_dev
      </div>
    </div>
  )
}

const Item = ({
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
  return x > 50 ? (
    <div
      className='absolute'
      style={{
        top: `${y}%`,
        right: `${100 - x}%`
      }}
    >
      <p
        className={`text-xs md:text-sm text-right`}
        style={{
          color: color
        }}
      >
        {content.text}
      </p>
    </div>
  ) : (
    <div
      className='absolute'
      style={{
        top: `${y}%`,
        left: `${x}%`
      }}
    >
      <p
        className='text-xs md:text-sm'
        style={{
          color: color
        }}
      >
        {content.text}
      </p>
    </div>
  )
}

export default Preview
