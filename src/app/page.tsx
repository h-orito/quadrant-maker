import Maker from './maker'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '配置するやつメーカー',
  description:
    '配置するやつを作ったり、共有したポジショニングマップに簡単に記入できるサービスです。'
}

export default function Page() {
  return <Maker />
}
