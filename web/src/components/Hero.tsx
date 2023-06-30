import Image from "next/image"
import nlwLogo from '../assets/nlw.spacetime-logo.svg'
import Link from "next/link"

export function Hero() {
  return (
    <div className="space-y-5 ">
      <Image src={nlwLogo} alt="NLW Spacetime" />
      <div className='max-w-[420] space-y-1'>
        <h1 className='text-5xl font-bold leading-tight text-gray-50'>
          Sua cápsula do tempo
        </h1>
        <p className=" text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartile (se quiser) com o mundo
        </p>
      </div>
    </div>
  )
}