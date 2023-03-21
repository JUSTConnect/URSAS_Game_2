import css from './index.module.css'

import Link from 'next/link'

interface ItemProps extends React.HTMLAttributes<HTMLButtonElement>
{
    level: number
    go: boolean
    onClick?: any
    over?: boolean
}


const Item = (props: ItemProps) => {
    return <Link href={ props.go ? '/table' : {} } onClick={ !props.over ? props.onClick : null } className={ css.doorItem }>
        {
            props.go ? <img className={ css.bg } src="assets/images/texture/door-item-active-bg.png" alt="Door Item BG" /> :
            props.over ? <img className={ css.bg } src="assets/images/texture/door-item-over-bg.png" alt="Door Item BG" /> :
            <img className={ css.bg } src="assets/images/texture/door-item-bg.png" alt="Door Item BG" />
        }
        <div className={ [css.doorItemInfo, props.over ? css.doorItemInfoOver : ''].join(' ') }>
            { !props.go ? (
                <div className={ [css.doorInfoPokerRoom, 'textMuted'].join(' ') }>
                    { props.over ? (
                        'game over'
                    ) : (
                        'poker room'
                    ) }
                </div>
            ) : ('') }
            <div className={ [css.level, 'fontSpecial'].join(' ') }>
                {props.level} level
            </div>
            { props.go ? (
                <div className={ [css.go, 'textMuted'].join(' ') }>
                    go
                </div>
            ) : ('') }
        </div>
    </Link>
}

export default Item