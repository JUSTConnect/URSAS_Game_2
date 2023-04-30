import Button from '@components/UIButton'


import { getContract } from '@/utils/web3'


export default () => {
    
    const handle = () => {
        getContract().mint(1, {gasLimit: getContract().estimateGas.mint(1)})
            .then(()=> {
                console.log('ok')
            })
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