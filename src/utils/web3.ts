import { ethers } from 'ethers'

import ABI from '@contract/abi'

export const getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const erc20 = new ethers.Contract('0x1FC910f2aD187ad595FaD87a392DBcd6A25acf29', ABI, provider);
    const contract = erc20.connect(provider.getSigner())

    return contract
}