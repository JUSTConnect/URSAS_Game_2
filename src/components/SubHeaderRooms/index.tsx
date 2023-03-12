import css from './index.module.css'

import Badge from '@components/Badge'
import SubHeader, {SubHeaderButton} from '@components/SubHeader'
import FlexBox from '@components/FlexBox'

interface SubHeaderRoomsProps
{

}

const SubHeaderRooms = (props: SubHeaderRoomsProps) => {
  return <SubHeader>
    <div>
      <span className={ css.theLoby }>The loby</span>
      <span className={ css.totalRooms }>Table rooms <Badge>16</Badge></span>
    </div>
    <FlexBox gap={ '8px' } className={ css.filterButtons }>
      <SubHeaderButton active={ true } value={ 'slide' }/>
      <SubHeaderButton value={ 'list' }/>
    </FlexBox>
    <button className={ [css.filterButton, 'd-mobile'].join(' ') }>
      <img src="/assets/images/icons/rooms-list.svg" alt="Filter Icon" />
    </button>
  </SubHeader>
}

export default SubHeaderRooms