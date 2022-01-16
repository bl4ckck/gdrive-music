import React from 'react'
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { useSession, signIn, signOut, getSession, getCsrfToken } from "next-auth/react"
// import { csrfToken } from 'next-auth/client/_utils';
import { PlayPauseButton } from '../components/player/controllerPlayer'
import { BiPlayCircle, BiHeart, BiCloudDownload } from 'react-icons/bi'
import { TSongList } from '../types/api'
import { axiosInst } from '../lib/AxiosInstance'

const Home: NextPage = () => {
  // React.useEffect(() => {
  //   // const reqdong = async () => {
  //   //   const awe = await getSession()
  //   //   // const csrfToken = await getCsrfToken()
  //   //   console.log({ awe})
  //   //   return awe
  //   // }
  //   // reqdong()
  //   // console.log(props.songs)
  // }, [props.songs])

  const [songs, setSongs] = React.useState<TSongList[]>([]);
  // const songsMemo = React.useMemo(() =>, [songs])

  React.useEffect(() => {
    const handleFetchPosts = async () => {
      // const postsResponse = await fetch("/api/posts");
      // const postsData = await postsResponse.json();
      const res = await fetch('http://localhost:3000/api/song')
      const songs = await res.json()
      console.log(songs)
      setSongs(songs.data);
    }
    handleFetchPosts()
    // const songs: SongList[] = await (await axiosInst.get("song")).data
    // console.log(songs)
  }, [])

  const SongList = (props: {
    title: string
  }): JSX.Element => {
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
      <div className="flex items-center h-16 mb-4 space-x-3 rounded-md hover:shadow-drib1">
        <div className="self-center px-2 py-5 cursor-pointer bg-slate-200">
          cover
        </div>
        <div className="grow">
          {props.title}
        </div>
        <BiHeart className="cursor-pointer" size={20} />
        <BiCloudDownload className="cursor-pointer" size={25} />
        <div className="pr-4">3:15</div>
      </div>
    )
  }

  return (
    <>
      <div className="md:mr-6 lg:mr-[17.875rem] 2xl:mr-[14.875rem]">
        <p className="mb-4 text-lg">Song List</p>
        {songs.map((value, index) => <SongList key={index} title={value.name} />)}
      </div>
      <div className="hidden lg:block top-[1rem] fixed right-[max(0px,calc(50%-45rem))] w-[16.5rem]">
        <p className="mb-4 text-lg">Recently Played</p>

        <button className="text-red-600" onClick={() => signOut()}>Sign Out</button>
        <Link href="/playlist">
          <p className="mb-4 text-lg text-blue-600 cursor-pointer">Go to Playlist Page</p>
        </Link>
      </div>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const res = await fetch('http://localhost:3000/api/song')
//   const songs = await res.json()
//   console.log(songs)
//   // const songs: SongList[] = await (await axiosInst.get("song")).data
//   // console.log(songs)

//   return {
//     props: {
//       songs,
//     },
//   }
// }


export default Home
