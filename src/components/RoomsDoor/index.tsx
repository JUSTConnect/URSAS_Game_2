import css from './index.module.css'

import Link from 'next/link'
import { ReactComponentElement } from 'react'

interface RoomsDoorProps extends React.HTMLAttributes<HTMLDivElement>
{
    level: number
    active: boolean
    go: boolean
}

const RoomsDoorItem = (props: RoomsDoorProps) => {
    return <div className={ css.doorItem }>
        {
            props.active ? 
            <img className={ css.doorItemBg } src="assets/images/texture/door-item-active-bg.png" alt="Door Item BG" />
            :
            <img className={ css.doorItemBg } src="assets/images/texture/door-item-bg.png" alt="Door Item BG" />
        }
        <div className={ css.doorItemInfo }>
            <div className={ css.doorInfoPokerRoom }>
                poker room
            </div>
            <div className={ [css.doorInfoLevel, 'fontSpecial'].join(' ') }>
                {props.level} level
            </div>
        </div>
    </div>
}

const RoomsDoor = (props: RoomsDoorProps) => {
    return <div className={ css.door }>
        { props.active ? (
            <img className={ css.doorTexture } src="assets/images/texture/door-active.png" alt="Door" />
        ) : (
            <img className={ css.doorTexture } src="assets/images/texture/door.png" alt="Door" />
        ) }
        <div className={ css.doorInfo }>
            { props.active ? (
                <img className={ css.doorInfoTexture } src="assets/images/texture/door-info-active.png" alt="Door Info" />
            ) : (
                <img className={ css.doorInfoTexture } src="assets/images/texture/door-info.png" alt="Door Info" />
            ) }
            <div className={ css.doorInfoInner }>
                <div className={ css.doorInfoPokerRoom }>
                    poker room
                </div>
                <div className={ [css.doorInfoLevel, 'fontSpecial'].join(' ') }>
                    {props.level} level
                </div>
            </div>
        </div>
    </div>
}


export default RoomsDoor
export {RoomsDoorItem}