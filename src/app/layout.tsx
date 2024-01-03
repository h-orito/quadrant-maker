import { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import Head from 'next/head'

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
      <body>{children}</body>
      <Script
        async
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0917187897820609'
        crossOrigin='anonymous'
        strategy='afterInteractive'
      />
    </html>
  )
}
