import Head from 'next/head'
import Maker from './maker'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '象限メーカー',
  description:
    '象限を作ったり、共有した象限の内容を簡単に記入できるサービスです。'
}

export default function Page() {
  return <Maker />
}
