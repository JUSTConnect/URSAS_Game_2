import {PolygonMumbaiTestnet, PolygonMainnet} from '@/lib/chains/polygon'

import {DAppProvider, Config, MetamaskConnector, CoinbaseWalletConnector} from '@usedapp/core'
import {WalletConnectConnector} from '@usedapp/wallet-connect-connector'

const config: Config = {
  readOnlyChainId: PolygonMainnet.chainId,
  readOnlyUrls: {
    [PolygonMumbaiTestnet.chainId]: PolygonMumbaiTestnet.rpcUrl as string,
    [PolygonMainnet.chainId]: PolygonMainnet.rpcUrl as string
  },
  networks: [PolygonMumbaiTestnet, PolygonMainnet
  ]
}


interface props extends React.HTMLAttributes<HTMLDivElement> {

}

export default (props: props) => {
  return (
    <DAppProvider config={config}>
      {props.children}
    </DAppProvider>
  )
}