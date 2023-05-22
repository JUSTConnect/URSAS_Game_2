import { PolygonMumbaiTestnet, PolygonMainnet } from '@/lib/chains/polygon'

import { DAppProvider, Config, MetamaskConnector, CoinbaseWalletConnector  } from '@usedapp/core'
import { WalletConnectConnector } from '@usedapp/wallet-connect-connector'

const config: Config = {
    readOnlyChainId: PolygonMainnet.chainId,
    readOnlyUrls: {
        [PolygonMumbaiTestnet.chainId]: PolygonMumbaiTestnet.rpcUrl as string,
        [PolygonMainnet.chainId]: PolygonMainnet.rpcUrl as string,
    },
    networks: [PolygonMumbaiTestnet, PolygonMainnet],
    connectors: {
        metamask: new MetamaskConnector(),
        coinbase: new CoinbaseWalletConnector(),
        walletConnect: new WalletConnectConnector({ infuraId: 'd8df2cb7844e4a54ab0a782f608749dd' }),
    },
}


interface props extends React.HTMLAttributes<HTMLDivElement> {

}

export default (props: props) => {
    return (
        <DAppProvider config={ config }>
            { props.children }
        </DAppProvider>
    )
}