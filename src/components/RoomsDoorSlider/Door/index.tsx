import css from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'

import { RootState } from '@/app/store'
import { setDialogMint } from '@/features/rooms/roomsSlice'
import Button, {
    Variant as ButtonVariant,
    Color as ButtonColor
} from '@/components/UIButton'


interface RoomsDoorProps extends React.HTMLAttributes<HTMLDivElement>
{
    level: number
    active: boolean
    go: boolean
    href?: string|null
    over?: boolean
}

const RoomsDoor = (props: RoomsDoorProps) => {
    const dispatch = useDispatch()
    return (
        <div className={ css.container }>
            <Link href={ !props.over ? props.href || {} : {} } className={ [css.door, props.active ? css.active : '', props.over ? css.doorOver : ''].join(' ') }>
                <img className={ [css.texture, css.textureActive].join(' ') } src="/assets/images/texture/door-active.png" alt="Door" />
                <img className={ css.texture } src="/assets/images/texture/door.png" alt="Door" />
                <div className={ css.info }>
                    <img className={ [css.infoTexture, css.infoTextureActive].join(' ') } src="/assets/images/texture/door-info-active.png" alt="Door Info" />
                    <img className={ css.infoTexture } src="/assets/images/texture/door-info.png" alt="Door Info" />
                    <div className={ css.infoInner }>
                        <div className={ css.infoRoom }>
                            { props.over ? (
                                'game over'
                            ) : (
                                'poker room'
                            ) }
                        </div>
                        <div className={ [css.infoLevel, 'fontSpecial'].join(' ') }>
                            {props.level} level
                        </div>
                    </div>
                </div>
            </Link>
            { props.active &&
                <Button
                    onClick={ () => dispatch(setDialogMint(true)) }
                    color={ ButtonColor.DARK }
                    variant={ ButtonVariant.NORMAL }
                    className={ css.button }
                    minWidth
                >
                    <div className={ css.buttonText }>
                        BUY
                    </div>
                </Button>
            }
        </div>
    ) 
}


export default RoomsDoor