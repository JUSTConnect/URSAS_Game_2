import css from './index.module.scss'

import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {AppDispatch, RootState} from '@/app/store'
import {
  addBusyPlace,
  addStakedPlace, clearBasketPlaces, clearBusyPlaces, clearStakedPlaces, clearTable,
  getTable,
  setBusyPlaces,
  setChoosingCardPlace,
  setStakedPlaces
} from '@/features/table/tableSlice'
import Badge from '@components/Badge'
import SubHeader, {SubHeaderSection, Buttons} from '@components/SubHeader'
import {Info} from '@components/SubHeader'
import Button, {
  Variant as ButtonVariant,
  Size as ButtonSize,
  Color as ButtonColor
} from '@components/UIButton'
import {useRouter} from "next/router";
import {query} from "@/pages/tables/[room]/table/[table]";
import {ethers} from "ethers";
import {useEthers} from "@usedapp/core";
import Countdown, {zeroPad} from "react-countdown";
import {SuitsGetName} from "@lib/types/game";

interface SubHeaderTableProps {
  modalActive: boolean
  setModalActive: Function
}

const SubHeaderTable = (props: SubHeaderTableProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const {table: tableId, room: levelRoom} = router.query as query
  const game = useSelector((state: RootState) => state.game)
  const table = useSelector((state: RootState) => state.table)
  const [infoActive, setInfoActive] = useState<boolean>(false)

  useEffect(() => {
    tableId && levelRoom && dispatch(getTable({levelRoom, tableId}))
  }, [tableId, levelRoom])

  useEffect(() => {
  }, [])


  return <SubHeader>
    <SubHeaderSection>
      <div>
        <span className={css.theLoby}>Room <span className={'textPrimary'}>{levelRoom} Level</span></span>
        &nbsp;
        <span className={css.theLoby}>Table <span className={'textPrimary'}>n. {tableId || 0}</span></span>
      </div>
      <div
        className={[
          css.info,
          infoActive && css.infoActive
        ].join(' ')}
      >
        <Info>
          <div className={css.infoContent}>
            <div>
              Base time: <span className={'textPrimary'}>24H</span>
            </div>
            <div>
              Increase time: <span className={'textPrimary'}>2H</span>
            </div>
            <div>
              Suit: <span className={'textPrimary'}>HEARTS</span>
            </div>
            <div>
              Places: <span
              className={'textPrimary'}>0/10</span>
            </div>
          </div>
        </Info>
      </div>
    </SubHeaderSection>
    <SubHeaderSection>
      {table.basketPlaces.length && !props.modalActive ? (
        <div>Confirm places
          <span className={'textPrimary'}>
          <Countdown
            date={table.timer + 120000}
            onComplete={() => {
              dispatch(clearBasketPlaces())
            }}
            renderer={({minutes, seconds}) => (
              <>
                {zeroPad(minutes)}:{zeroPad(seconds)}
              </>
            )}/>
          </span>
        </div>
      ) : ''
      }
      <Buttons>
        <Button
          onClick={() => {
            setInfoActive(!infoActive)
          }}
          className={[css.button, css.buttonInfo, infoActive && css.buttonActive].join(' ')}
          size={ButtonSize.SM}
          variant={ButtonVariant.NORMAL}
          color={ButtonColor.DARK}
        >
          <i className="fa-sharp fa-solid fa-circle-info"></i>
        </Button>
        <Button
          onClick={!game.loadingTable ? () => {
            props.setModalActive(!props.modalActive);
            dispatch(setChoosingCardPlace(0))
          } : () => {
          }}
          className={[css.button, props.modalActive && css.buttonActive].join(' ')}
          size={ButtonSize.SM}
          variant={ButtonVariant.NORMAL}
          color={ButtonColor.DARK}
        >
          <i className="fa-sharp fa-solid fa-basket-shopping"></i>
        </Button>
      </Buttons>
    </SubHeaderSection>
  </SubHeader>
}

export default SubHeaderTable