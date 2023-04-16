import css from './index.module.scss'

import { useState } from 'react'

import Button, {
    Color as ButtonColor,
    Size as ButtonSize
} from '@/components/UIButton'


interface props extends React.HTMLAttributes<HTMLDivElement>
{
    level: number
    price: number
}


export default (props: props) => {
    const [amount, setAmount] = useState<string>('')

    return (
        <div className={ css.card }>
            <div className={ css.inner }>
                <div className={ css.info }>
                    <div className={ css.infoSection }>
                        <span className={ 'textMuted' }>Level</span> {props.level}
                    </div>
                    <div className={ css.infoSection }>
                        <span className={ 'textMuted' }>Price</span> {props.price} MATIC
                    </div>
                </div>
                <input
                    onChange={ e => {
                        if (e.currentTarget.value.length > 3) {
                            e.currentTarget.value = e.currentTarget.value.slice(0, -1)
                            setAmount(e.currentTarget.value)
                        } else {
                            setAmount(e.currentTarget.value)
                        }
                    } }
                    max={999}
                    className={ css.input }
                    type='number'
                    placeholder='input amount'
                />
                <Button
                    color={ ButtonColor.LIGHT }
                    size={ ButtonSize.SM }
                    className={ css.button }
                >
                    { Number(amount) > 0 ?
                        <>
                            <div className={ css.buttonCaption }>total amount</div>
                            { Number(amount) * props.price } MATIC
                        </>
                    : 'mint'}
                </Button>
            </div>
        </div>
    )
}