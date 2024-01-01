import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '配置するやつメーカー',
  description:
    '配置するやつを作ったり、共有したポジショニングマップに簡単に記入できるサービスです。'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0917187897820609'
          crossOrigin='anonymous'
        ></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
