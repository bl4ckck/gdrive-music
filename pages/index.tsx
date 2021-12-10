import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <Link href="/playlist">
          <a>Playlist</a>
    </Link>
  )
}

export default Home
