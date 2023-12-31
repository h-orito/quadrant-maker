import Maker from './maker'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '推しを配置するやつ',
  description:
    '推しを配置するやつを作ったり、共有した内容に推しを簡単に記入できるサービスです。'
}

export default function Page() {
  return <Maker />
}
