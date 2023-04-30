import Button from '@components/UIButton'


import { getContract } from '@/utils/web3'
import { ethers } from 'ethers'


export default () => {
    
    const handle = () => {
        // getContract().smartMint(1, 16, {gasLimit: 3000000, value: 1})
        //     .then(()=> {
        //         console.log('ok')
        //     })
        getContract().viewCurrentRoomSupply(16).then((v: ethers.BigNumber) => console.log(v._hex))
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