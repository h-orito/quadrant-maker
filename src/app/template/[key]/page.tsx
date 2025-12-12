import { Metadata } from 'next'
import { Input } from './input'
import { fetchCacheTemplate } from './api'

export default async function Template({
  params
}: {
  params: Promise<{ key: string }>
}) {
  const { key } = await params
  return <Input templateKey={key} />
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ key: string }>
}): Promise<Metadata> {
  const { key } = await params
  const template = await fetchCacheTemplate(key)
  let title = '配置するやつメーカー'
  if (template != null) {
    title = `配置するやつメーカー | ${template?.title}`
  }
  return {
    title
  }
}
