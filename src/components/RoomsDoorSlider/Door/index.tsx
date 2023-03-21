import css from './index.module.css'

import Link from 'next/link'


interface RoomsDoorProps extends React.HTMLAttributes<HTMLDivElement>
{
    level: number
    active: boolean
    go: boolean
    over?: boolean
}

const RoomsDoor = (props: RoomsDoorProps) => {
    return <Link href={ !props.over ? "/tables" : {} } className={ [css.door, props.active ? css.doorActive : '', props.over ? css.doorOver : ''].join(' ') }>
        { props.active && !props.over ? (
            <img className={ css.doorTexture } src="assets/images/texture/door-active.png" alt="Door" />
        ) : (
            <img className={ css.doorTexture } src="assets/images/texture/door.png" alt="Door" />
        ) }
        <div className={ css.doorInfo }>
            { props.active && !props.over ? (
                <img className={ css.doorInfoTexture } src="assets/images/texture/door-info-active.png" alt="Door Info" />
            ) : (
                <img className={ css.doorInfoTexture } src="assets/images/texture/door-info.png" alt="Door Info" />
            ) }
            <div className={ css.doorInfoInner }>
                <div className={ css.doorInfoPokerRoom }>
                    { props.over ? (
                        'game over'
                    ) : (
                        'poker room'
                    ) }
                </div>
                <div className={ [css.doorInfoLevel, 'fontSpecial'].join(' ') }>
                    {props.level} level
                </div>
            </div>
        </div>
    </Link>
}


export default RoomsDoor