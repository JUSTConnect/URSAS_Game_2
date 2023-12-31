import css from './index.module.css'

import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import Badge from '@components/Badge'
import SubHeader, { SubHeaderButton, SubHeaderSection } from '@components/SubHeader'
import FlexBox from '@components/FlexBox'


interface SubHeaderRoomsProps
{
  setMode: Function
  mode: string
}

const SubHeaderRooms = (props: SubHeaderRoomsProps) => {
  const mainframe = useSelector((state: RootState) => state.mainframe)

  return <SubHeader>
    <SubHeaderSection>
      <div className={ css.theLoby }>The loby</div>
      <div className={ css.totalRooms }>Total rooms <Badge>16</Badge></div>
      {/* { mainframe.gameOver ? (
        <div className={ 'd-desktop' }>
          <span className={ 'textMuted' }>announcement of results </span>
          <span className={ 'textPrimary' }>04:51</span>
        </div>
      ) : ''} */}
    </SubHeaderSection>
    <FlexBox gap={ '8px' } className={ css.filterButtons }>
      { props.mode === 'slide' ? (
        <SubHeaderButton onClick={ ()=>props.setMode('list') } active={ false } value={ 'list' }/>
      ) : (
        <SubHeaderButton onClick={ ()=>props.setMode('slide') } active={ false } value={ 'slide' }/>
      ) }
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