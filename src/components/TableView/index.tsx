import css from './index.module.css'

import { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import TableModal from '@components/TableModal'
import Blur from '@components/Blur'

import Place from './Place'
import Sofa from './Sofa'
import LoaderLogo from '@components/LoaderLogo'


interface TableViewProps
{
    modalActive: boolean
    setModalActive: Function
}

const TableView = (props: TableViewProps) => {
    const game = useSelector((state: RootState)=>state.game)

    const [activePlace, setActivePlace] = useState(1)

    return <div className={ css.tableView }>
        { !game.loadingTable ? (
            <>
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
                                <Sofa
                                    number={ index+1 }
                                    active={ index+1 === activePlace }
                                />
                                <Place
                                    number={ index+1 }
                                    active={ index+1 === activePlace }
                                    empty={ index+1 === 8 }
                                />
                            </div>
                        )
                    })}
                </div>
                <Blur isActive={props.modalActive}/>
                <TableModal active={ props.modalActive } setActive={ props.setModalActive } />
            </>
        ) : (
            <LoaderLogo/>
        ) }
    </div>
}


export default TableView