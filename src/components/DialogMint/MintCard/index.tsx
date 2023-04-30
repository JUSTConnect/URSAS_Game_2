import css from './index.module.scss'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import Button, {
    Color as ButtonColor,
    Size as ButtonSize
} from '@/components/UIButton'
import { getContract } from '@/utils/web3'


interface props extends React.HTMLAttributes<HTMLDivElement>
{
    level: number
    price: number
}


export default (props: props) => {
    const [amount, setAmount] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)
    const [supply, setSupply] = useState<number>(0)

    const setValues = () => {
        getContract().viewCurrentRoomSupply(props.level)
                .then((v: ethers.BigNumber) => setSupply(Number.parseInt(v._hex)))
        getContract().viewCostForRoom(props.level)
            .then((v: ethers.BigNumber) => setPrice(Number.parseInt(v._hex)))
    }

    useEffect(() => {
        setValues()
    }, [])

    const handle = () => {
        if (Number(amount) > 0)
        {
            getContract().smartMint(amount, props.level, {gasLimit: 3000000, value: price * amount})
                .then(() => console.log('ok'))
                .catch(() => console.log('cancelled'))
            setValues()
        }
    }

    return (
        <div className={ css.card }>
            <div className={ css.inner }>
                <div className={ css.info }>
                    <div className={ css.infoSection }>
                        <span className={ 'textMuted' }>Level</span> {props.level}
                    </div>
                    <div className={ css.infoSection }>
                        <span className={ 'textMuted' }>Supply</span> { supply }
                    </div>
                    <div className={ css.infoSection }>
                        <span className={ 'textMuted' }>Price</span> { price } MATIC
                    </div>
                </div>
                <input
                    onInput={ e => {
                        e.preventDefault()
                        console.log(e.currentTarget.value)
                        if (
                            e.currentTarget.value.length > 3 ||
                            !/^([0-9]*)$/.test(e.currentTarget.value)
                        ) {
                            e.currentTarget.value = e.currentTarget.value.slice(0, -1)
                            setAmount(Number(e.currentTarget.value))
                        } else {
                            setAmount(Number(e.currentTarget.value))
                        }
                    } }
                    className={ css.input }
                    type='text'
                    placeholder='input amount'
                    min='0'
                    required
                />
                <Button
                    onClick={ handle }
                    color={ ButtonColor.LIGHT }
                    size={ ButtonSize.SM }
                    className={ css.button }
                >
                    { (Number(amount) > 0) ?
                        <div>
                            <div className={ css.buttonCaption }>total amount</div>
                            { Number(amount) * props.price } MATIC
                        </div>
                    : 'mint'}
                </Button>
            </div>
        </div>
    )
}