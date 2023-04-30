import css from './index.module.scss'

import { useState } from 'react'

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
    const [amount, setAmount] = useState<string>('')

    const handle = () => {
        if (Number(amount) > 0)
        {
            getContract().mint(amount, {gasLimit: getContract().estimateGas.mint(1)})
                .then(() => console.log('ok'))
                .catch(() => console.log('cancelled'))
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
                        <span className={ 'textMuted' }>Supply</span> 2048
                    </div>
                    <div className={ css.infoSection }>
                        <span className={ 'textMuted' }>Price</span> {props.price} MATIC
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
                            setAmount(e.currentTarget.value)
                        } else {
                            setAmount(e.currentTarget.value)
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