import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from '../redux/configureStore'
import rootReducer from '../redux/reducers'
import { SessionProvider } from "next-auth/react"

import MainLayout from './layouts/MainLayout'
import  "../styles/global.css"

const store = configureStore()
// const store = createStore(rootReducer)

function MyApp({ Component, 
  pageProps: { session, ...pageProps }}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <MainLayout title='Home' description=''>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
