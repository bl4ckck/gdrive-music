import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { useSession, signIn, signOut } from "next-auth/react"

import { PlayPauseButton } from '../components/player/controllerPlayer'
import { BiPlayCircle } from 'react-icons/bi'

const Home: NextPage = () => {
  const SongList = (): JSX.Element => {
    const { data: session } = useSession()
    if (!session) {
      return (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )
    }
    
    return (
      <div className="flex items-center justify-start h-16 space-x-3 rounded-md hover:shadow-lg">
        <div className="flex items-center h-full px-2 cursor-pointer bg-slate-200">
          cover
        </div>
        <div>
          title
        </div>
        <div>
          {session.user?.name}
          {session.expires}
        </div>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    )
  }
  return (
    <>
      <div className="md:mr-6 lg:mr-[17.875rem] 2xl:mr-[14.875rem]">
          <p className="mb-4 text-lg">Song List</p>
          <SongList />
      </div>
      <div className="hidden lg:block top-[1rem] fixed right-[max(0px,calc(50%-45rem))] w-[16.5rem]">
        <p className="mb-4 text-lg">Recently Played</p>
        asd
      </div>
    </>
  )
}

export default Home
