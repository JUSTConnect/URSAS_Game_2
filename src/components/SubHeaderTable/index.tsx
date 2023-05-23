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
import {getRoomInfo} from "@/features/rooms/roomsSlice";
import {useEthers} from "@usedapp/core";
import {CardRank, CardSuit} from "@components/Card";
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
  const roomData = useSelector((state: RootState) => state.rooms?.roomInfo[15])
  const {account} = useEthers()

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     tableId && levelRoom && dispatch(getTable({levelRoom, tableId}))
  //   }, 5000)
  //
  //   return function () {
  //     clearInterval(intervalId);
  //   };
  // }, [])

  useEffect(() => {
    tableId && levelRoom && dispatch(getTable({levelRoom, tableId}))
  }, [tableId, levelRoom])

  useEffect(() => {
    let currentPlace = 0
    dispatch(clearBusyPlaces())
    dispatch(clearStakedPlaces())
    dispatch(clearBasketPlaces())
    table?.tableData?.cards?.forEach((card, index) => {
      if (card.level && ethers.constants.AddressZero !== table.tableData.players[index].toLowerCase()) {
        if (table.tableData.players[index] === account) {
          currentPlace++
          dispatch(addStakedPlace({
            number: currentPlace,
            card: {
              // @ts-ignore
              rank: CardRank[`N${card.level}`],
              // @ts-ignore
              suit: CardSuit[card.suit],
              tokenId: card.tokenId
            }
          }))
        } else {
          currentPlace++
          dispatch(addBusyPlace({
            number: currentPlace,
            card: {
              // @ts-ignore
              rank: CardRank[`N${card.level}`],
              // @ts-ignore
              suit: CardSuit[card.suit],
              tokenId: card.tokenId
            }
          }))
        }
      }
    })
  }, [table.tableData])

  useEffect(() => {
    return function () {
      dispatch(clearBusyPlaces())
      dispatch(clearStakedPlaces())
      dispatch(clearBasketPlaces())
      dispatch(clearTable())
    }
  }, [])

  const countTakenPlaces = () => {
    return 10 - (table.basketPlaces.length + table.busyPlaces.length + table.stakedPlaces.length)
  }

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
              Base time: <span className={'textPrimary'}>{roomData?.roomDuration || 0}</span>
            </div>
            <div>
              Increase time: <span className={'textPrimary'}>{roomData?.roomIncreaseCounter || 0}</span>
            </div>
            <div>
              Suit: <span className={'textPrimary'}>{roomData && SuitsGetName[roomData.trump] || '-'}</span>
            </div>
            <div>
              Places: <span
              className={'textPrimary'}>{table?.tableData?.players?.filter((player: string) => player !== ethers.constants.AddressZero).length}/10</span>
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