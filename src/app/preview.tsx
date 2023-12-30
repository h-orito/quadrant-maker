'use client'

import { useEffect, useState } from 'react'

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
  const [sliderRatio, setSliderRatio] = useState(0.96)
  useEffect(() => {
    setSliderRatio(window.innerWidth > 768 ? 0.96 : 0.94)
  }, [])
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

export default Preview
