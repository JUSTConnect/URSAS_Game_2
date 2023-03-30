import css from './index.module.css'

import Card, { CardSuit, CardRank } from '@/components/Card'
import Loader from '@/components/Loader'


interface props extends React.HTMLAttributes<HTMLButtonElement>
{
    number: number
    busy?: boolean
    staked?: boolean
    empty?: boolean
    loading?: boolean
    suit: CardSuit
    rank: CardRank
}


export default (props: props) => {
    return <button onClick={ props.onClick } className={ 
        [
            css.place,
            css[`place${props.number}`],
            props.staked || props.busy ? css.active : '',
            props.empty ? css.empty : '',
            props.loading ? css.loading : ''
        ].join(' ')  
    }>
        { props.loading ? (
            <>
                <Loader/>
            </>
        ) : (
            <>
                <Card
                    rank={ props.rank }
                    suit={ props.suit }
                    className={ css.card }
                />
                <div className={ css.info }>
                    { props.staked ? (
                        'staked'
                    ) : (
                        'place'
                    ) }
                    <br />
                    <span className={ [css.number, 'fontSpecial'].join(' ') }>№ { props.number }</span>
                </div>
            </>
        ) }
    </button>
}