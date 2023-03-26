import css from './index.module.css'

import { useState, useContext } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import SubHeader, {SubHeaderButton, SubHeaderSection} from '@components/SubHeader'
import FlexBox from '@components/FlexBox'
import Loader from '@components/Loader'

interface SubHeaderTablesProps
{

}

const SubHeaderTables = (props: SubHeaderTablesProps) => {
  const game = useSelector((state: RootState) => state.game)

  const [filtersActive, setFiltersActive] = useState(false)

  return <SubHeader>
    <SubHeaderSection>
      <span className={ css.pockerTable }>Poker room</span><span className={ 'textPrimary' }>14 Level</span>
    </SubHeaderSection>
    <FlexBox gap={ '8px' } className={ [css.filterButtons, filtersActive ? css.filterButtonsActive : ''].join(' ') }>
      { game.loadingTables ? (
        <>
          { [...Array(4)].map((item, index)=><>
            <div key={ index }>
              <SubHeaderButton value={ <Loader/> } />            
            </div>
          </>) }
        </>
      ) : (
        <>
          <SubHeaderButton active={ true } keyName={ 'all' } value={ '12' }/>
          <SubHeaderButton keyName={ 'empty' } value={ '102' }/>
          <SubHeaderButton keyName={ 'сooldown' } value={ '12' }/>
          <SubHeaderButton keyName={ 'gaming' } value={ '20' }/>
        </>
      ) }
    </FlexBox>
    <button onClick={ ()=>setFiltersActive(!filtersActive) } className={ [css.filterButton, 'd-mobile'].join(' ') }>
      <img src="/assets/images/icons/filter.svg" alt="Filter Icon" />
    </button>
  </SubHeader>
}

export default SubHeaderTables