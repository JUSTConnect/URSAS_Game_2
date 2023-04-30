import { ethers } from 'ethers'

import ABI from '@contract/abi'

export const getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const erc20 = new ethers.Contract('0x65E4FB2C1f9A303A6834e5A5A4674acc6d4828a5', ABI, provider);
    const contract = erc20.connect(provider.getSigner())

    return contract
}