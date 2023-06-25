import css from './index.module.scss'

import {useContext, useState} from 'react'
import {useSelector} from 'react-redux'

import {RootState} from '@/app/store'
import {TablesFilter} from '@/features/tables/tablesSlice'
import Table from '@components/Table'
import LoaderLogo from '@components/LoaderLogo'
import {StatusTable} from "@lib/types/game";


const TableList = ({id}: any) => {
  const game = useSelector((state: RootState) => state.game)
  const tablesState = useSelector((state: RootState) => state.tables)
  const tables = useSelector((state: RootState) => {
    if (id) {
      return state.rooms?.rooms[id - 1]?.tables
    }
    return []
  })

  const filteredTables = () => {
    switch (tablesState.filter) {
      case TablesFilter.all:
        return tables
      case TablesFilter.empty:
        return tables?.filter(
          table => table.status === StatusTable.WAITING
        )
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
        {filteredTables()?.map((table, index) => <Table key={index} id={id} index={index + 1} {...table}/>)}
      </div>
    )}
  </>
}


export default TableList