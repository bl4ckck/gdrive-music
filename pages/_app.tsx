import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from '../configureStore'
import rootReducer from '../reducers'

import MainLayout from './layouts/MainLayout'
import  "../styles/global.css"

const store = configureStore()
// const store = createStore(rootReducer)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MainLayout title='Home' description=''>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  )
}

export default MyApp
