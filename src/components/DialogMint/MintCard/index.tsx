import css from './index.module.scss'

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
                <input type='number' placeholder='input amount' className={ css.input }/>
                <Button
                    color={ ButtonColor.LIGHT }
                    size={ ButtonSize.SM }
                >
                    mint
                </Button>
            </div>
        </div>
    )
}