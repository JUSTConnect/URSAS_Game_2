import css from './index.module.css'

import { useContext } from 'react'

import Badge from '@components/Badge'
import SubHeader, { SubHeaderButton, SubHeaderSection } from '@components/SubHeader'
import FlexBox from '@components/FlexBox'
import Loader from '../Loader'
import { MainframeContext } from '@components/Mainframe'


interface SubHeaderRoomsProps
{
  setMode: Function
  mode: string
}

const SubHeaderRooms = (props: SubHeaderRoomsProps) => {
  const context = useContext(MainframeContext)

  return <SubHeader>
    <SubHeaderSection>
      <div className={ css.theLoby }>The loby</div>
      <div className={ css.totalRooms }>Table room <Badge>16</Badge></div>
      { context.gameOver ? (
        <div className={ 'd-desktop' }>
          <span className={ 'textMuted' }>announcement of results </span>
          <span className={ 'textPrimary' }>04:51</span>
        </div>
      ) : ''}
    </SubHeaderSection>
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