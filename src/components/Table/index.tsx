import css from './index.module.scss'

import { Table } from '@/types/game'

import Link from 'next/link'

export interface props extends Table, React.HTMLAttributes<HTMLDivElement>
{
    href: number
}

export default (props: props) => {
    return (
        <Link
            href={ props.freePlaces===0 ? {} : `/table/${props.href}` }
            className={
                [
                    css.table,
                    (props.freePlaces || 0) === 0 ? css.disabled : '', props.cooldown ? css.cooldown : ''
                ].join(' ')
            }
        >
            <div className={ css.bg }>
                <div className={ css.layer1 }>
                    <div className={ css.layer2 }>
                    </div>
                </div>
            </div>
            <div className={ css.info }>
                <div className={ css.header }>
                    <span className={ 'textMuted' }>table</span>
                    <div className={ [css.number, 'fontSpecial'].join(' ') }>
                        <div className="d-desktop">№ { props.tableNumber }</div>
                        <div className="d-mobile">Level { props.tableNumber }</div>
                    </div>
                </div>
                <div className={ css.badge }>
                    { props.cooldown ? (
                        <span className={ [css.badgeCooldown].join(' ') }>cooldown</span>
                    ) : props.gameEnd ? (
                        <>
                            game end
                            <div className={ css.number }>
                                { props.gameEnd }
                            </div>
                        </>
                    ) : Number.isInteger(props.freePlaces) ? (
                        <>
                            free places
                            <div className={ css.free }>
                                { props.freePlaces }/10
                            </div>
                        </>
                    ) : '' }
                </div>
            </div>
        </Link>
    )
}