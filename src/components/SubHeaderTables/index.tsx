import css from './index.module.css'

import { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { TablesFilter } from '@/features/tables/tablesSlice'
import { RootState } from '@/app/store'
import { setFilter } from '@/features/tables/tablesSlice'
import SubHeader, {SubHeaderButton, SubHeaderSection} from '@components/SubHeader'
import FlexBox from '@components/FlexBox'
import Loader from '@components/UILoader'

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
          <SubHeaderButton onClick={ () => dispatch(setFilter(TablesFilter.empty)) } active={ tables.filter === TablesFilter.empty } keyName={ 'empty' } value={ String(tables.places.filter(item=>item.freePlaces===10).length) }/>
          <SubHeaderButton onClick={ () => dispatch(setFilter(TablesFilter.cooldown)) } active={ tables.filter === TablesFilter.cooldown } keyName={ 'сooldown' } value={ String(tables.places.filter(item=>item.cooldown).length) }/>
          <SubHeaderButton onClick={ () => dispatch(setFilter(TablesFilter.gaming)) } active={ tables.filter === TablesFilter.gaming } keyName={ 'gaming' } value={ String(tables.places.filter(item=>item.gameEnd).length) }/>
        </>
      ) }
    </FlexBox>
    <button onClick={ ()=>setFiltersActive(!filtersActive) } className={ [css.filterButton, filtersActive && css.filterButtonActive, 'd-mobile'].join(' ') }>
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.0024 14C6.71979 14 6.48307 13.916 6.29222 13.748C6.10072 13.5806 6.00496 13.3729 6.00496 13.125V7.875L0.21985 1.4C-0.0295087 1.10833 -0.0667462 0.802083 0.108137 0.48125C0.282355 0.160417 0.585575 0 1.0178 0H14.9819C15.4141 0 15.7176 0.160417 15.8925 0.48125C16.0667 0.802083 16.0292 1.10833 15.7798 1.4L9.99469 7.875V13.125C9.99469 13.3729 9.89927 13.5806 9.70843 13.748C9.51692 13.916 9.27987 14 8.99726 14H7.0024Z" fill="#B5C4E3"/>
      </svg>
    </button>
  </SubHeader>
}

export default SubHeaderTables