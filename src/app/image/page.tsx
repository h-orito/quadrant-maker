import { Metadata } from 'next'
import { Input } from './input'

export default function Template() {
  return <Input />
}

export function generateMetadata(): Metadata {
  return { title: '配置するやつメーカー' }
}
