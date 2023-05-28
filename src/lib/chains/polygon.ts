import { Chain } from '@usedapp/core'

export const PolygonMumbaiTestnet: Chain = {
    chainId: 80001,
    chainName: 'Matic (Polygon) Mumbai Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
    getExplorerAddressLink: (address: string) => `https://mumbai.polygonscan.com/${address}`,
    getExplorerTransactionLink: (transactionHash: string) => `https://mumbai.polygonscan.com/tx/${transactionHash}`,
    rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/JNvXIlQ4SQru5Pi2t5zRG8X3O_YsdzyM',
    blockExplorerUrl: 'https://mumbai.polygonscan.com',
    nativeCurrency: {
        name: 'Matic (Mumbai)',
        symbol: 'MATIC',
        decimals: 18,
    }
}

export const PolygonMainnet: Chain = {
    chainId: 137,
    chainName: 'Matic (Polygon)',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
    getExplorerAddressLink: (address: string) => `https://polygonscan.com/${address}`,
    getExplorerTransactionLink: (transactionHash: string) => `https://polygonscan.com/tx/${transactionHash}`,
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorerUrl: 'https://polygonscan.com',
    nativeCurrency: {
        name: 'Matic',
        symbol: 'MATIC',
        decimals: 18,
    }
}
