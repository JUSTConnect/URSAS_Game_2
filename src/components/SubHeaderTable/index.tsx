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
      <span className={ css.theLoby }>Table №2</span>
      <span className={ css.totalRooms }>Places <Badge>5/6</Badge></span>
    </div>
    <button className={ [css.filterButton].join(' ') }>
      {
        <img src="/assets/images/icons/table-basket.svg" alt="Filter Icon" />
      }
    </button>
  </SubHeader>
}

export default SubHeaderRooms