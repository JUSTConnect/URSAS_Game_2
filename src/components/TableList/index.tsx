import css from './index.module.scss'

import {useContext, useState} from 'react'
import {useSelector} from 'react-redux'

import {RootState} from '@/app/store'
import {TablesFilter} from '@/features/tables/tablesSlice'
import Table from '@components/Table'
import LoaderLogo from '@components/LoaderLogo'
import {StatusTable} from "@lib/types/game";


// interface TableListProps extends React.HTMLAttributes<HTMLDivElement>
// {
//
// }


const TableList = ({id}: any) => {
    const game = useSelector((state: RootState) => state.game)
    const tablesState = useSelector((state: RootState) => state.tables)
    const tables = useSelector((state: RootState) => {
        if (id) {
            return state.rooms?.roomInfo[id - 1]?.allTables
        }
    })

    const filteredPlaces = () => {
        switch (tablesState.filter) {
            case TablesFilter.all:
                return tables
            case TablesFilter.empty:
                return tables?.filter(place => place.playersNow === 0)
            case TablesFilter.cooldown:
                return tables?.filter(place => place.status === StatusTable.COOLDOWN)
            case TablesFilter.gaming:
                return tables?.filter(place => place.status === StatusTable.PLAYING)
            default:
                return []
        }
    }

    return <>
        {game.loadingTables ? (
          <div className={css.loader}>
              <LoaderLogo/>
          </div>
        ) : (
          <div className={css.tableList}>
              {filteredPlaces()?.map((place, index) => <Table key={index} id={id} {...place} index={index + 1}/>)}
          </div>
        )}
    </>
}


export default TableList