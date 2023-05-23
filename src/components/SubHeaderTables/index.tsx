import css from './index.module.scss'

import {useState, useContext} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {TablesFilter} from '@/features/tables/tablesSlice'
import {RootState} from '@/app/store'
import {setFilter} from '@/features/tables/tablesSlice'
import Info from '@components/SubHeader/Info'
import SubHeader, {SubHeaderButton, SubHeaderSection, Buttons} from '@components/SubHeader'
import FlexBox from '@components/FlexBox'
import Loader from '@components/UILoader'
import Button, {
  Size as ButtonSize,
  Variant as ButtonsVariant,
  Color as ButtonColor
} from '@components/UIButton'
import {useRouter} from "next/router";
import {query} from "@/pages/tables/[room]";
import {StatusTable, SuitsGetName} from "@lib/types/game";

interface SubHeaderTablesProps {

}

const SubHeaderTables = (props: SubHeaderTablesProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {room} = router.query as query
  const game = useSelector((state: RootState) => state.game)
  const roomData = useSelector((state: RootState) => {
    if (room) {
      return state.rooms?.roomInfo[room - 1]
    }
  })
  const tables = useSelector((state: RootState) => state.tables)

  const [infoActive, setInfoActive] = useState(false)
  const [filtersActive, setFiltersActive] = useState(false)

  return <SubHeader>
    <SubHeaderSection>
      <span className={css.pockerTable}>Poker room</span><span className={'textPrimary'}>{game.currentRoom} Level</span>
      <div
        className={[
          css.info,
          infoActive && css.infoActive
        ].join(' ')}
      >
        <Info>
          <div className={css.infoContent}>
            <div>
              Base time: <span className={'textPrimary'}>{roomData?.roomDuration}</span>
            </div>
            <div>
              Increase time: <span className={'textPrimary'}>{roomData?.roomIncreaseCounter}</span>
            </div>
            <div>
              Suit: <span className={'textPrimary'}>{roomData && SuitsGetName[roomData.trump]}</span>
            </div>
          </div>
        </Info>
      </div>
    </SubHeaderSection>
    <Buttons>
      <FlexBox gap={'8px'} className={[css.filterButtons, filtersActive ? css.filterButtonsActive : ''].join(' ')}>
        {game.loadingTables ? (
          <>
            <SubHeaderButton value={<Loader/>}/>
            <SubHeaderButton value={<Loader/>}/>
            <SubHeaderButton value={<Loader/>}/>
            <SubHeaderButton value={<Loader/>}/>
          </>
        ) : (
          <>
            <SubHeaderButton onClick={() => dispatch(setFilter(TablesFilter.all))}
                             active={tables?.filter === TablesFilter.all} keyName={'all'}
                             value={roomData?.allTables.length || 0}/>
            <SubHeaderButton onClick={() => dispatch(setFilter(TablesFilter.empty))}
                             active={tables?.filter === TablesFilter.empty} keyName={'empty'}
                             value={String(roomData?.allTables.filter(item => item.playersNow < 10).length || 0)}/>
            <SubHeaderButton onClick={() => dispatch(setFilter(TablesFilter.cooldown))}
                             active={tables?.filter === TablesFilter.cooldown} keyName={'сooldown'}
                             value={String(roomData?.allTables.filter(item => item.status === StatusTable.COOLDOWN).length || 0)}/>
            <SubHeaderButton onClick={() => dispatch(setFilter(TablesFilter.gaming))}
                             active={tables?.filter === TablesFilter.gaming} keyName={'gaming'}
                             value={String(roomData?.allTables.filter(item => item.status === StatusTable.PLAYING).length || 0)}/>
          </>
        )}
      </FlexBox>
      <Button
        onClick={() => {
          setInfoActive(!infoActive);
          setFiltersActive(false)
        }}
        className={[css.button, css.buttonInfo, infoActive && css.buttonActive].join(' ')}
        size={ButtonSize.SM}
        variant={ButtonsVariant.NORMAL}
        color={ButtonColor.DARK}
      >
        <i className="fa-sharp fa-solid fa-circle-info"></i>
      </Button>

      <Button
        onClick={() => {
          setFiltersActive(!filtersActive);
          setInfoActive(false)
        }}
        className={[css.button, filtersActive && css.buttonActive, 'd-mobile'].join(' ')}
        size={ButtonSize.SM}
        variant={ButtonsVariant.NORMAL}
        color={ButtonColor.DARK}
      >
        <i className="fa-solid fa-filter"></i>
      </Button>
    </Buttons>
  </SubHeader>
}

export default SubHeaderTables