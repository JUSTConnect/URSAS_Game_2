import css from './index.module.css'

import Link from 'next/link'

interface TableProps extends React.HTMLAttributes<HTMLDivElement>
{
    tableNumber: number,
    freePlaces?: number,
    gameEnd?: string
    isActive?: boolean,
    cooldown?: boolean
}

const Table = (props: TableProps) => {
    return <Link href='/table' className={ [css.table ,props.isActive ? css.tableActive : '', (props.freePlaces || 0) >= 10 ? css.tableDisabled : '', props.cooldown ? css.tableCooldown : ''].join(' ') }>
        <div className={ css.bg }>
            <div className={ css.layer1 }>
                <div className={ css.layer2 }>
                </div>
            </div>
        </div>
        <div className={ css.info }>
            <div className={ css.header }>
                table
                <div className={ [css.number, 'fontSpecial'].join(' ') }>
                    <div className="d-desktop">№ { props.tableNumber }</div>
                    <div className="d-mobile">Level { props.tableNumber }</div>
                </div>
            </div>
            <div className={ css.badge }>
                { props.cooldown ? (
                    <span className={ 'textPrimary' } style={{ lineHeight: '2em' }}>cooldown</span>
                ) : '' }
                { props.freePlaces ? (
                    <>
                        free places
                        <div className={ css.free }>
                            { props.freePlaces }/10
                        </div>
                    </>
                ) : '' }
                { props.gameEnd ? (
                    <>
                        game end
                        <div className={ css.free }>
                            { props.gameEnd }
                        </div>
                    </>
                ) : ''}
            </div>
        </div>
    </Link>
}


export default Table