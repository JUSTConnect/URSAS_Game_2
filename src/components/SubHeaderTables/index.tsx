import css from './index.module.css'

import { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { TablesFilter } from '@/features/tables/tablesSlice'
import { RootState } from '@/app/store'
import { setFilter } from '@/features/tables/tablesSlice'
import SubHeader, {SubHeaderButton, SubHeaderSection} from '@components/SubHeader'
import FlexBox from '@components/FlexBox'
import Loader from '@components/Loader'

interface SubHeaderTablesProps
{

}

const SubHeaderTables = (props: SubHeaderTablesProps) => {
  const dispatch = useDispatch()
  const game = useSelector((state: RootState) => state.game)
  const tables = useSelector((state: RootState) => state.tables)


  const [filtersActive, setFiltersActive] = useState(false)

  return <SubHeader>
    <SubHeaderSection>
      <span className={ css.pockerTable }>Poker room</span><span className={ 'textPrimary' }>{ game.currentRoom } Level</span>
    </SubHeaderSection>
    <FlexBox gap={ '8px' } className={ [css.filterButtons, filtersActive ? css.filterButtonsActive : ''].join(' ') }>
      { game.loadingTables ? (
        <>
          <SubHeaderButton value={ <Loader/> } />            
          <SubHeaderButton value={ <Loader/> } />            
          <SubHeaderButton value={ <Loader/> } />            
          <SubHeaderButton value={ <Loader/> } />            
        </>
      ) : (
        <>
          <SubHeaderButton onClick={ () => dispatch(setFilter(TablesFilter.all)) } active={ tables.filter === TablesFilter.all } keyName={ 'all' } value={ String(tables.places.length) }/>
          <SubHeaderButton onClick={ () => dispatch(setFilter(TablesFilter.empty)) } active={ tables.filter === TablesFilter.empty } keyName={ 'empty' } value={ String(tables.places.filter(item=>item.freePlaces===0).length) }/>
          <SubHeaderButton onClick={ () => dispatch(setFilter(TablesFilter.cooldown)) } active={ tables.filter === TablesFilter.cooldown } keyName={ 'сooldown' } value={ String(tables.places.filter(item=>item.cooldown).length) }/>
          <SubHeaderButton onClick={ () => dispatch(setFilter(TablesFilter.gaming)) } active={ tables.filter === TablesFilter.gaming } keyName={ 'gaming' } value={ String(tables.places.filter(item=>item.gameEnd).length) }/>
        </>
      ) }
    </FlexBox>
    <button onClick={ ()=>setFiltersActive(!filtersActive) } className={ [css.filterButton, 'd-mobile'].join(' ') }>
      <img src="/assets/images/icons/filter.svg" alt="Filter Icon" />
    </button>
  </SubHeader>
}

export default SubHeaderTables