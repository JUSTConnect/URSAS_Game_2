import { ethers } from 'ethers'

import ABI from '@contract/abi'
import ABIGame from '@contract/abi-game'

const MINT_CONTRACT_ADDRESS = '0x483841e1b0449ec48781f7f527aaaD1475057223'
const GAME_CONTRACT_ADDRESS = '0xC48910a9cE0f432F066E70Aa33b0Ac1dEcD0e9A8'

export const getMintContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const erc20 = new ethers.Contract(MINT_CONTRACT_ADDRESS, ABI, provider);
    return erc20.connect(provider.getSigner())
}

export const getGameContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const erc20 = new ethers.Contract(GAME_CONTRACT_ADDRESS, ABIGame, provider)
    return erc20.connect(provider.getSigner())
}