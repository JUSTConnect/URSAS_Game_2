import css from './index.module.css'

import Badge from '@components/Badge'
import SubHeader, {SubHeaderButton} from '@components/SubHeader'
import FlexBox from '@components/FlexBox'

interface SubHeaderRoomsProps
{
  setMode: Function
  mode: string
}

const SubHeaderRooms = (props: SubHeaderRoomsProps) => {
  return <SubHeader>
    <div>
      <span className={ css.theLoby }>The loby</span>
      <span className={ css.totalRooms }>Table room <Badge>16</Badge></span>
    </div>
    <FlexBox gap={ '8px' } className={ css.filterButtons }>
      <SubHeaderButton onClick={ ()=>props.setMode('slide') } active={ props.mode === 'slide' } value={ 'slide' }/>
      <SubHeaderButton onClick={ ()=>props.setMode('list') } active={ props.mode === 'list' } value={ 'list' }/>
    </FlexBox>
    <button onClick={ ()=>props.setMode(props.mode === 'slide'?'list':'slide') } className={ [css.filterButton, 'd-mobile'].join(' ') }>
      {
        props.mode === 'slide'? (
          <img src="/assets/images/icons/rooms-list.svg" alt="Filter Icon" />
        ) : (
          <img src="/assets/images/icons/rooms-slaid.svg" alt="Filter Icon" />
        )
      }
    </button>
  </SubHeader>
}

export default SubHeaderRooms