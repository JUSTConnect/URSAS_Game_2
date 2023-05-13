import Button from '@components/UIButton'

import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import { useEthers } from '@usedapp/core'

import { getMintContract, getGameContract } from '@/utils/web3'
import { fetchWalletCards } from '@/features/game/gameSlice'
import { AppDispatch } from '@/app/store'


export default () => {
    const dispatch = useDispatch<AppDispatch>()
    const { account } = useEthers()
    
    const handle = () => {
        // getGameContract().GetWholeRoom(2).then(c=>console.log(c))
    }
    return (
        <>
            Ethers test
            <br />
            <br />
            <Button
                onClick={
                    handle
                }
            >
                Transact
            </Button>
        </>
    )
}