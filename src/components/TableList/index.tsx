import css from './index.module.css'

import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { TablesFilter } from '@/features/tables/tablesSlice'
import Table from '@components/Table'
import LoaderLogo from '@components/LoaderLogo'


interface TableListProps extends React.HTMLAttributes<HTMLDivElement>
{

}


const TableList = (props: TableListProps) => {
    const game = useSelector((state: RootState) => state.game)
    const tables = useSelector((state: RootState) => state.tables)
    const mode = useState()

    const filteredPlaces = () => {
        switch (tables.filter) {
            case TablesFilter.all: return tables.places
            case TablesFilter.empty: return tables.places.filter(place=>place.freePlaces===0) 
            case TablesFilter.cooldown: return tables.places.filter(place=>place.cooldown)
            case TablesFilter.gaming: return tables.places.filter(place=>place.gameEnd)
            default: return []
        }
    }

    return <>
        { game.loadingTables ? (
            <div className={ css.loader }>
                <LoaderLogo/>
            </div>
        ) : (
            <div className={ css.tableList }>
                { filteredPlaces().map(place => <Table key={place.tableNumber} {...place}/>) }
            </div>
        ) }
    </> 
}


export default TableList