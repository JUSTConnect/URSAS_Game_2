import css from './index.module.css'

interface TableProps extends React.HTMLAttributes<HTMLDivElement>
{
    tableNumber: number,
    freePlaces: number,
    isActive: boolean
}

const Table = (props: TableProps) => {
    return <div className={ [css.table, props.isActive ? css.tableActive : ''].join(' ') }>
        {/* <img className={ css.tableBg } src="/assets/images/components/table.svg" alt="Table Background" /> */}
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
    </div>
}


export default Table