import css from './index.module.scss'
import loader from './loader.module.scss'

import type { Card as CardProps } from '@components/Card'
import Card from '@components/Card'


interface props extends React.HTMLAttributes<HTMLButtonElement>
{
    loading?: boolean
    number?: number 
    staked?: boolean
    choosing?: boolean
    basket?: boolean
    card?: CardProps
}


export default (props: props) => {
    return (
        <button 
            onClick={ props.onClick }
            className={
                [
                    css.place,
                    props.loading && css.loading,
                    props.basket && css.basket,
                    props.staked && css.staked,
                    props.choosing && css.choosing,            
                    !props.card ? css.empty : css.busy,
                    props.className
                ].join(' ')
            }
        >
            { props.loading || props.choosing ? (
                <div className={ css.loader }>
                    <div className={ loader.loader }>
                        <span></span>
                    </div>
                </div>
            ) : (
                <div className={ css.inner }>
                    { props.card &&
                        <Card
                            className={ css.card }
                            { ...props.card }
                        />
                    }
                    { props.number &&
                        <div className={ css.info }>
                            <div className={ [css.status, 'textMuted'].join(' ') }>
                                { props.staked ? 'staked' : props.basket ? 'basket' : <>place&nbsp;</> }
                            </div>
                            <div className={ [css.number, 'fontSpecial'].join(' ') }>
                                № { props.number }
                            </div>
                        </div>
                    }
                </div>
            ) }
        </button>
    )
}

export type { props as PlaceProps }