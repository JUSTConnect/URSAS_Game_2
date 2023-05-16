import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { DAppProvider, Config } from '@usedapp/core'

import { PolygonMumbaiTestnet, PolygonMainnet } from '@/lib/chains/polygon'

import { store } from '@/app/store'
import { Provider } from 'react-redux'


const config: Config = {
  readOnlyChainId: PolygonMainnet.chainId,
  readOnlyUrls: {
    [PolygonMumbaiTestnet.chainId]: PolygonMumbaiTestnet.rpcUrl as string,
    [PolygonMainnet.chainId]: PolygonMainnet.rpcUrl as string,
  },
  networks: [ PolygonMumbaiTestnet, PolygonMainnet ]
}


export default function App({ Component, pageProps }: AppProps) {

  return (
    <DAppProvider config={config}>
      <Provider store={ store }>
        <Component {...pageProps} />
      </Provider>
    </DAppProvider>
  )
}
