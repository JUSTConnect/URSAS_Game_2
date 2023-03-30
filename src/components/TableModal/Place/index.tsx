import css from './index.module.css'


import Card, {CardRank, CardSuit} from '@/components/Card'


interface PlaceProps
{
    number: number
    rank: CardRank
    suit: CardSuit
}


const Place = (props: PlaceProps) => {
    return (
        <div className={ css.place }>
            <Card
                rank={ props.rank }
                suit={ props.suit }
                className={ css.placeCard }
            />
            <div className={ [css.placeInfo].join(' ') }>
                <div className={ css.placeTitle }>place</div>
                <div className={ [css.placeNumber, 'fontSpecial'].join(' ') }>№ {props.number}</div>
            </div>
        </div>
    )
}


export default Place
export type { PlaceProps }
