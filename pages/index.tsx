import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { PlayPauseButton } from '../components/player/controllerPlayer'
import { BiPlayCircle } from 'react-icons/bi'

const Home: NextPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,_3fr)_minmax(0,_1fr)] gap-6 grid-rows-1">
      <div className="">
        <p className="mb-4 text-lg">Song List</p>
        <div className="flex items-center justify-start h-16 space-x-3 rounded-md">
          <div className="flex items-center h-full px-2 cursor-pointer bg-slate-200">
            cover
          </div>
          <div>
            title
          </div>
          <div>
            duration
          </div>
        </div>
      </div>
      <div className="bg-red-400">
        <p className="mb-4 text-lg">Recently Played</p>
        asd
      </div>
    </div>
  )
}

export default Home
