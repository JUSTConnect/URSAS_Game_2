import { ethers } from 'ethers'

import ABI from '@contract/abi'
import ABIGame from '@contract/abi-game'

const MINT_CONTRACT_ADDRESS = '0xfc9505e56088D6C4D67b36A981C3CEf2f350d6Ed'
const GAME_CONTRACT_ADDRESS = '0x7d62c3B6cbf92248B3272AA112BEE95f1A02a6d8'

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