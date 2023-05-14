import css from './index.module.scss'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import Button, {
    Color as ButtonColor,
    Size as ButtonSize
} from '@/components/UIButton'
import { getMintContract } from '@/utils/web3'


interface props extends React.HTMLAttributes<HTMLDivElement>
{
    level: number
    price: number
}


export default (props: props) => {
    const [amount, setAmount] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)
    const [available, setAvailable] = useState<number>(0)

    const setValues = async () => {
        // let counter = await getMintContract().currentDailyMintCounter(props.level) 
        // let limit = await getMintContract().dailyMintLimit(props.level)
        // setAvailable(limit - counter)

        // let price:ethers.BigNumber = await getMintContract().viewCostForRoom(props.level)
        // setPrice(Number.parseInt(price._hex))
    }

    useEffect(() => {
        setValues()
    }, [])

    const handle = () => {
        if (Number(amount) > 0)
        {
            getMintContract().smartMint(amount, props.level, {gasLimit: 3000000, value: price * amount})
                .then(() => {console.log('ok'); setAmount(0)})
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
                        <span className={ 'textMuted' }>Available</span> { available }
                    </div>
                    <div className={ css.infoSection }>
                        <span className={ 'textMuted' }>Price</span> { ethers.utils.formatEther(price) } MATIC
                    </div>
                </div>
                <input
                    onInput={ e => {
                        e.preventDefault()
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
                    disabled={ !Boolean(available) }
                    value={amount === 0 ? '' : amount}
                />
                <Button
                    onClick={ handle }
                    color={ ButtonColor.LIGHT }
                    size={ ButtonSize.SM }
                    className={ css.button }
                    disabled={ !Boolean(available) }
                >
                    { (Number(amount) > 0) ?
                        <div>
                            <div className={ css.buttonCaption }>total amount</div>
                            { Number(amount) * price } MATIC
                        </div>
                    : 'mint'}
                </Button>
            </div>
        </div>
    )
}