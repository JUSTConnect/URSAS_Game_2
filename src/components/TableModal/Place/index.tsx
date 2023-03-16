import css from './index.module.css'


interface PlaceProps
{
    clear?: boolean
    return?: boolean
    cancel?: boolean
    card?: boolean
    number?: number
}


const Place = (props: PlaceProps) => {
    return (
        <div className={ [css.place, props.clear || props.return ? css.placeActive : ''].join(' ') }>
            { props.clear ? (
                'clear'
            ) : props.return ? (
                'return'
            ) : props.cancel? (
                'cancel'
            ) : (
                <>
                    { props.card ? (
                        <img src="./assets/images/texture/example-card.png" alt="card" className={ css.placeCard } />
                    ) : ''}
                    { !props.return && !props.clear ? (
                        <div className={ css.placeInfo }>
                            <div className={ css.placeTitle }>place</div>
                            <div className={ [css.placeNumber, 'fontSpecial'].join(' ') }>№ {props.number}</div>
                        </div>
                    ) : '' }
                </>
            )}
        </div>
    )
}


export default Place