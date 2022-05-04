import React from 'react'
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from "react-redux";

import type { NextPage, GetStaticProps, InferGetStaticPropsType, InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { useSession, signIn, signOut, getSession, getCsrfToken } from "next-auth/react"
// import { csrfToken } from 'next-auth/client/_utils';
import { PlayPauseButton } from '../components/player/controllerPlayer'
import { BiPlayCircle, BiHeart, BiCloudDownload } from 'react-icons/bi'
import { TSongList } from '../types/api'
import { axiosInst } from '../lib/AxiosInstance'
import { ActionPlayerType } from '../types/player'
import { playAudio, playAudioFromList } from '../redux/actions';
import OAuth2Instance from '../lib/OAuth2Instance';
import { google } from 'googleapis'

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const res = await fetch('https://.../data')
  // const data: TSongList = await res.json()
// context.req
      // const postsResponse = await fetch("http://localhost:3000/api/song", {cache: "no-cache"});
      // const songs = await postsResponse.json();const oauth2Client = await OAuth2Instance(req)
      
  const oauth2Client = await OAuth2Instance(context.req)
  const driveApi = google.drive({ version: "v2", auth: oauth2Client })

        const getAudioList = await driveApi.files.list({
            q: "mimeType contains 'audio/'",
            // pageSize: 100,
            maxResults: 100,
            fields: 'etag, items(id)'
        })

  return {
    props: {
      data: getAudioList.data.items,
    },
  }
}

const Home = (props: {data: TSongList[]}) => {
  const dispatch = useDispatch<Dispatch<ActionPlayerType>>()
  // const { data }: TSongList
  // const [songs, setSongs] = React.useState<TSongList[]>([]);
  // const [audioObj, setAudioObj] = React.useState<HTMLAudioElement | null>(null);
  // const { mediaControl: {action}  } = usePlayer()

  // const _playAudio = (): ActionPlayerType => {
  //   if (!audioAPIObj?.playing()) { // While not playing any audio
  //     audioAPIObj?.play()
  //     return dispatch(playAudio())
  //   }
  //   audioAPIObj?.pause()
  //   return dispatch(pauseAudio())
  // }

  const SongList = (props: {
    title: string,
    audioID: string,
    audioURL: string,
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
      <div onClick={(e) => {
        e.preventDefault()
        // audioObj?.play()
        dispatch(playAudioFromList({
          audioID: props.audioID,
          audioURL: props.audioURL + "&authuser=0", isPlay: true, text: "bla"
        }))
      }} className="flex items-center h-16 mb-4 space-x-3 rounded-md group hover:cursor-default hover:shadow-drib1">
        <div className="relative self-center px-3 py-5 cursor-pointer group-hover:drop-shadow-xl bg-slate-200">
          <span className="visible group-hover:invisible">MP3</span>
          <div className="absolute top-0 left-0 invisible w-full h-full group-hover:visible bg-black/80"></div>
          <BiPlayCircle className="absolute invisible top-4 left-4 group-hover:visible" color='white' size={27} />
        </div>
        <div className="grow min-w-[1em]">
          {props.title}
        </div>
        <BiHeart className="flex-none cursor-pointer" size={20} />
        <BiCloudDownload className="flex-none pr-4 cursor-pointer" size={25} onClick={(e) => {
          e.preventDefault()
          window.location.assign(props.audioURL)
        }} />
        {/* <div className="pr-4">3:15</div> */}
      </div>
    )
  }

  return (
    <>
      <div className="md:mr-6 lg:mr-[17.875rem] 2xl:mr-[14.875rem]">
        <p className="mb-4 text-lg">Song List</p>
        {props.data.map((value, index) =>
          <SongList
            key={index}
            title={value.name}
            audioID={value.id + ""}
            audioURL={value.webContentLink}
          />
        )}
      </div>
      <div className="hidden lg:block top-[1rem] fixed right-[max(0px,calc(50%-45rem))] w-[16.5rem]">
        <p className="mb-4 text-lg">Recently Played</p>

        <button className="text-red-600" onClick={() => signOut()}>Sign Out</button>
        <Link href="/playlist">
          <p className="mb-4 text-lg text-blue-600 cursor-pointer">Go to Playlist Page</p>
        </Link>
        <button onClick={() => signIn()}>Sign in</button>
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
