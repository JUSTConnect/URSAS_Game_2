import css from './index.module.css'


import TableModal from '@components/TableModal'

interface TableViewProps
{
    modalActive: boolean
    setModalActive: Function
}

const TableView = (props: TableViewProps) => {

    return <div className={ css.tableView }>
        <div className={ css.tableContainer }>
            <div className={ css.table }>
                <div className={ css.tableContent }>
                    <div className={ css.tableContentInner }>
                    </div>
                </div>
            </div>
            <img className={ css.cocaCola } src="assets/images/texture/table-coca-cola.png" alt="Coca Cola" />
            { [...Array(10)].map((item, index)=> {
                return (
                    <div key={index}>
                        <img className={ [css.sofa, css[`sofa${index+1}`]].join(' ') } src="assets/images/texture/table-sofa.png" alt="Sofa" />
                        <div className={ [css.place, css[`place${index+1}`]].join(' ') }>
                            <img className={ css.placeCard } src="assets/images/texture/example-card.png" alt="Card example" />
                            <div className={ css.placeInfo }>
                                place
                                <br />
                                <span className={ [css.placeNumber, 'fontSpecial'].join(' ') }>№ { index }</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        <TableModal active={ props.modalActive } setActive={ props.setModalActive } />
    </div>
}


export default TableView