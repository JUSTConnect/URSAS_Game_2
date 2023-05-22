import { ethers } from 'ethers'

import ABIMint from '@/lib/contract/abi-mint'
import ABIGame from '@/lib/contract/abi-game'
import { MINT_CONTRACT_ADDRESS, GAME_CONTRACT_ADDRESS } from '@/config'


export const getMintContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const erc20 = new ethers.Contract(MINT_CONTRACT_ADDRESS, ABIMint, provider);
    return erc20.connect(provider.getSigner())
}

export const getGameContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const erc20 = new ethers.Contract(GAME_CONTRACT_ADDRESS, ABIGame, provider)
    return erc20.connect(provider.getSigner())
}