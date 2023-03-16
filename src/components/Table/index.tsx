import css from './index.module.css'

import Link from 'next/link'

interface TableProps extends React.HTMLAttributes<HTMLDivElement>
{
    tableNumber: number,
    freePlaces: number,
    isActive?: boolean,
    disabled?: boolean
}

const Table = (props: TableProps) => {
    return <Link href='/table' className={ [css.table, props.isActive ? css.tableActive : '', props.disabled ? css.tableDisabled : ''].join(' ') }>
        <div className={ css.tableContent }>
            <div className={ css.tableContentInner }>
                <div className={ css.tableHeader }>
                    table
                    <div className={ [css.tableNumber, 'fontSpecial'].join(' ') }>
                        <div className="d-desktop">№ { props.tableNumber }</div>
                        <div className="d-mobile">Level { props.tableNumber }</div>
                    </div>
                </div>
                <div className={ css.tableBadge }>
                    free places
                    <div className={ css.tableFree }>
                        { props.freePlaces }/10
                    </div>
                </div>
            </div>
        </div>
    </Link>
}


export default Table