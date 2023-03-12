import css from './index.module.css'

import SubHeader, {SubHeaderButton} from '@components/SubHeader'
import FlexBox from '@components/FlexBox'

interface SubHeaderTableProps
{

}

const SubHeaderTable = (props: SubHeaderTableProps) => {
  return <SubHeader>
    <div>
      <span className={ css.pockerTable }>Poker room </span>14 Level
    </div>
    <FlexBox gap={ '8px' } className={ css.filterButtons }>
      <SubHeaderButton active={ true } keyName={ 'all' } value={ '12' }/>
      <SubHeaderButton keyName={ 'empty' } value={ '102' }/>
      <SubHeaderButton keyName={ 'сooldown' } value={ '12' }/>
      <SubHeaderButton keyName={ 'gaming' } value={ '20' }/>
    </FlexBox>
    <button className={ [css.filterButton, 'd-mobile'].join(' ') }>
      <img src="/assets/images/icons/filter.svg" alt="Filter Icon" />
    </button>
  </SubHeader>
}

export default SubHeaderTable