import './globals.css'
import { Roboto_Flex as Roboto, Bai_Jamjuree as BainJamJuree, } from 'next/font/google'
import { ReactNode } from 'react'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto'
})

const baiJamjuree = BainJamJuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree'
})

export const metadata = {
  title: 'NLW SpaceTime',
  description: 'Uma cápsula do tempo construida com React, Next.js,TailwindCSS E TypeScrit',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamjuree.variable} font-sans bg-gray-900 text-gray-100`}>{children}</body>
    </html>
  )
}
