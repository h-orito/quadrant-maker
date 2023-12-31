import { Metadata } from 'next'
import { Input } from './input'
import { fetchCacheTemplate } from './api'

export default function Template({ params }: { params: { key: string } }) {
  return <Input templateKey={params.key} />
}

export async function generateMetadata({
  params
}: {
  params: { key: string }
}): Promise<Metadata> {
  const template = await fetchCacheTemplate(params.key)
  let title = '推しを配置するやつ'
  if (template != null) {
    title = `推しを配置するやつ | ${template?.title}`
  }
  return {
    title
  }
}
