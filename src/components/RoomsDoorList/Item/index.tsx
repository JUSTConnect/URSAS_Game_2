import css from './index.module.css'

import Link from 'next/link'

interface ItemProps extends React.HTMLAttributes<HTMLDivElement>
{
    level: number
    active: boolean
    go: boolean
}


const Item = (props: ItemProps) => {
    return <Link href='/table' className={ css.doorItem }>
        {
            props.active ? 
            <img className={ css.doorItemBg } src="assets/images/texture/door-item-active-bg.png" alt="Door Item BG" />
            :
            <img className={ css.doorItemBg } src="assets/images/texture/door-item-bg.png" alt="Door Item BG" />
        }
        <div className={ css.doorItemInfo }>
            { !props.go ? (
                <div className={ [css.doorInfoPokerRoom, 'textMuted'].join(' ') }>
                    poker room
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