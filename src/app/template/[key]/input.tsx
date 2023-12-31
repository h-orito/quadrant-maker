'use client'

import { cache, useEffect, useState } from 'react'
import Slider from 'react-input-slider'
import Preview from '@/app/_preview/preview'
import PrimaryButton from '@/components/button/primary-button'
import SimpleInputText from '@/components/form/simple-text'
import InputSelect from '@/components/form/input-select'
import Head from 'next/head'
import { fetchCacheTemplate } from './api'

export function Input({ templateKey }: { templateKey: string }) {
  const [template, setTemplate] = useState<Template | null>(null)

  useEffect(() => {
    const fetch = async () => {
      setTemplate(await fetchCacheTemplate(templateKey))
    }
    fetch()
  }, [])

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

  if (template == null) return <></>

  return (
    <>
      {!!template && (
        <Head>
          <title>象限メーカー | {template.title}</title>
        </Head>
      )}

      <main className='text-center'>
        <div className='grid lg:grid-cols-2'>
          <Preview
            title={template.title}
            leftAxis={template.axis.left}
            rightAxis={template.axis.right}
            topAxis={template.axis.top}
            bottomAxis={template.axis.bottom}
            outerBgColor={template.color.outerBg}
            outerColor={template.color.outer}
            innerBgColor={template.color.innerBg}
            innerColor={template.color.inner}
            contents={contents}
          />
          <div className='p-2'>
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
                    backgroundColor: template.color.outerBg
                  }}
                >
                  <Slider
                    axis='xy'
                    x={contents[currentContentIndex].slider.x}
                    y={contents[currentContentIndex].slider.y}
                    onChange={setSliderValue}
                    styles={{
                      track: {
                        backgroundColor: template.color.innerBg
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
    </>
  )
}
