'use client'

import { useEffect, useState } from 'react'
import Slider from 'react-input-slider'
import Preview from '@/app/_preview/preview'
import PrimaryButton from '@/components/button/primary-button'
import SimpleInputText from '@/components/form/simple-text'
import InputSelect from '@/components/form/input-select'
import Head from 'next/head'
import { fetchCacheTemplate } from './api'
import DangerButton from '@/components/button/danger-button'

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
          <title>推しを配置するやつ | {template.title}</title>
        </Head>
      )}

      <main className='text-center'>
        <div className='grid lg:grid-cols-2'>
          <Preview
            title={template.title}
            author={template.author}
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
            <div className='my-2'>
              <p className='text-xs'>
                配置したい項目を追加・調整し、プレビュー部分のスクショを撮って共有しましょう。
              </p>
            </div>
            <div className='mt-2'>
              <div className='flex'>
                <div className='flex-1'>
                  <InputSelect
                    candidates={contents.map((content, i) => ({
                      label: content.text,
                      value: i
                    }))}
                    selected={currentContentIndex}
                    setSelected={setCurrentContentIndex}
                    placeholder='+を押して追加してください'
                  />
                </div>
                <PrimaryButton click={addContent}>+</PrimaryButton>
                {contents.length > 0 && (
                  <DangerButton click={deleteCurrentContent}>-</DangerButton>
                )}
              </div>
            </div>
            {contents.length > 0 && (
              <div className='mt-2'>
                <div className='my-2'>
                  <SimpleInputText
                    label='項目名'
                    text={contents[currentContentIndex].text}
                    setText={setText}
                    deletable={true}
                  />
                </div>
                <div className='my-2'>
                  <label className='block text-xs font-bold'>表示位置</label>
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
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
