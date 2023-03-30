import css from './index.module.css'


import Card, {CardRank, CardSuit} from '@/components/Card'


interface PlaceProps extends React.HTMLAttributes<HTMLButtonElement>
{
    number: number
    rank: CardRank
    suit: CardSuit
    active?: boolean
}


const Place = (props: PlaceProps) => {
    return (
        <button onClick={ props.onClick } className={ [css.place, props.active ? css.active : ''].join(' ') }>
            <Card
                rank={ props.rank }
                suit={ props.suit }
                className={ css.placeCard }
            />
            <div className={ [css.placeInfo].join(' ') }>
                <div className={ css.placeTitle }>place</div>
                <div className={ [css.placeNumber, 'fontSpecial'].join(' ') }>№ {props.number}</div>
            </div>
        </button>
    )
}


export default Place
export type { PlaceProps }
