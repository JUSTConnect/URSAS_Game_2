import css from './index.module.scss'

import { RoomLevel } from '@/lib/types/game'

import { useState } from 'react'
import { ethers } from 'ethers'

import { cardMint } from '@/agents/web3/mintContract/cards'

import Button, {
    Color as ButtonColor,
    Size as ButtonSize
} from '@/components/UIButton'


interface props extends React.HTMLAttributes<HTMLDivElement>
{
    level: RoomLevel
    price: number
    available: number
    resetValues: Function
}


export default (props: props) => {
    const [amount, setAmount] = useState<number>(0)

    const handle = async () => {
        if (Number(amount) > 0)
        {
            cardMint(props.level, amount).then(c=>console.log(c))
            props.resetValues()
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
                        <span className={ 'textMuted' }>Available</span> { props.available }
                    </div>
                    <div className={ css.infoSection }>
                        <span className={ 'textMuted' }>Price</span> { props.price ? ethers.utils.formatEther(props.price) : 0 } MATIC
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
                    disabled={ !Boolean(props.available) }
                    value={amount === 0 ? '' : amount}
                />
                <Button
                    onClick={ handle }
                    color={ ButtonColor.LIGHT }
                    size={ ButtonSize.SM }
                    className={ css.button }
                    disabled={ !Boolean(props.available) }
                >
                    { (Number(amount) > 0) ?
                        <div>
                            <div className={ css.buttonCaption }>total amount</div>
                            { Number(amount) * Number(props.price) } Wei
                        </div>
                    : 'mint'}
                </Button>
            </div>
        </div>
    )
}