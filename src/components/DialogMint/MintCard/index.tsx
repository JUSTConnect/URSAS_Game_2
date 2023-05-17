import css from './index.module.scss'

import { useState, useEffect } from 'react'
import { BigNumber, ethers } from 'ethers'

import Button, {
    Color as ButtonColor,
    Size as ButtonSize
} from '@/components/UIButton'
import { getMintContract } from '@/lib/utils/web3'


interface props extends React.HTMLAttributes<HTMLDivElement>
{
    level: number
    price: BigNumber
    available: number
    resetValues: Function
}


export default (props: props) => {
    const [amount, setAmount] = useState<number>(0)

    const handle = async () => {
        if (Number(amount) > 0)
        {
            try {
                await getMintContract().smartMint(amount, props.level, {gasLimit: 3000000, value: Number(props.price._hex) * amount})
                setAmount(0)
            } catch(e) {
                console.log(`Error during mint: ${e}`)
            }
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