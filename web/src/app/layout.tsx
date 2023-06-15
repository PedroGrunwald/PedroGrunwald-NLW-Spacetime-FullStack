
import './globals.css'
import { Roboto_Flex as Roboto, Bai_Jamjuree as BainJamJuree, } from 'next/font/google'
import { ReactNode } from 'react'
import { EmptyMemories } from '@/components/EmptyMemories'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { Sigin } from '@/components/Sigin'
import { Copyright } from '@/components/Copyright'
import { cookies } from 'next/headers'

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

export default function RootLayout({ children, }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamjuree.variable} font-sans bg-gray-900 text-gray-100`}>
      
        <main className="grid grid-cols-2 min-h-screen">
          {/*left*/}
          <div className="relative bg-[url(../assets/bg-stars-svg)] bg-cover flex flex-col items-start justify-between px-28 py-16 border-r border-white/10 overflow-hidden">
            {/*Blur*/}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full " />
            {/*Stripes*/}
            <div className="absolute bottom-0 right-2 top-0 w-2  bg-stripes" />
            {isAuthenticated ? <Profile /> : <Sigin />}
            <Hero />
            <Copyright />
          </div>
          <div className="flex flex-col p-16 bg-[url(../assets/bg-stars-svg)] bg-cover">
          {children}
          </div>
        </main>
      </body>
    </html>
  )
}
