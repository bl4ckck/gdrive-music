import type { AppProps } from 'next/app'
import MainLayout from '../layouts/MainLayout'

import  "../styles/global.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout title='Home' description=''>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp
