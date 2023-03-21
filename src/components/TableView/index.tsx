import css from './index.module.css'

import { useState } from 'react'

import TableModal from '@components/TableModal'
import Blur from '@components/Blur'


interface TableViewProps
{
    modalActive: boolean
    setModalActive: Function
}

const TableView = (props: TableViewProps) => {

    const [activePlace, setActivePlace] = useState(1)

    return <div className={ css.tableView }>
        <div className={ css.tableContainer }>
            <div className={ css.table }>
                <div className={ css.tableContent }>
                    <div className={ css.tableContentInner }>
                    </div>
                </div>
            </div>
            <img className={ css.cocaCola } src="assets/images/texture/table-coca-cola.png" alt="Coca Cola" />
            { [...Array(9)].map((item, index)=> {
                return (
                    <div key={index}>
                        <img className={ [css.sofa, css[`sofa${index+1}`], index === activePlace ? css.sofaActive : ''].join(' ') } src="assets/images/texture/table-sofa.png" alt="Sofa" />
                        <div className={ 
                            [
                                css.place,
                                css[`place${index+1}`],
                                index+1 === activePlace ? css.placeActive : ''
                            ].join(' ')  
                        }>
                            <img className={ css.placeCard } src="assets/images/texture/example-card.png" alt="Card example" />
                            <div className={ css.placeInfo }>
                                place
                                <br />
                                <span className={ [css.placeNumber, 'fontSpecial'].join(' ') }>№ { index+1 }</span>
                            </div>
                        </div>
                    </div>
                )
            })}
            <img className={ [css.sofa, css[`sofa${9+1}`], 9 === activePlace ? css.sofaActive : ''].join(' ') } src="assets/images/texture/table-sofa.png" alt="Sofa" />
                <div className={ 
                    [
                        css.place,
                        css[`place${9+1}`],
                        css.placeEmpty
                    ].join(' ')  
                }>
                    <img className={ css.placeCard } src="assets/images/texture/example-card.png" alt="Card example" />
                    <div className={ css.placeInfo }>
                        place
                        <br />
                        <span className={ [css.placeNumber, 'fontSpecial'].join(' ') }>№ { 10 }</span>
                    </div>
                </div>
        </div>
        <Blur isActive={props.modalActive}/>
        <TableModal active={ props.modalActive } setActive={ props.setModalActive } />
    </div>
}


export default TableView