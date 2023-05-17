import { PolygonMumbaiTestnet, PolygonMainnet } from '@/lib/chains/polygon'

import { DAppProvider, Config } from '@usedapp/core'


const config: Config = {
    readOnlyChainId: PolygonMainnet.chainId,
    readOnlyUrls: {
        [PolygonMumbaiTestnet.chainId]: PolygonMumbaiTestnet.rpcUrl as string,
        [PolygonMainnet.chainId]: PolygonMainnet.rpcUrl as string,
    },
    networks: [PolygonMumbaiTestnet, PolygonMainnet]
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