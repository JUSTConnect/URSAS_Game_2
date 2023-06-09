import '@/styles/globals.css'

import type {AppProps} from 'next/app'
import DAppProvider from '@/lib/provider/DAppProvider'

import {store} from '@/app/store'
import {Provider} from 'react-redux'
import LoaderScreen from "@components/LoaderScreen";


export default function App({Component, pageProps}: AppProps) {

  return (
    <DAppProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </DAppProvider>
  )
}
