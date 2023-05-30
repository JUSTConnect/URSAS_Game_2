import css from './index.module.css'

import {HTMLAttributes, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useEthers} from '@usedapp/core'

import type {RootState} from '@/app/store'
import {setConnectWalletModal, setDisableWalletModal} from '@/features/mainframe/mainframeSlice'
import {setGameAccountDialog} from '@/features/mainframe/mainframeSlice'
import {setClaim} from '@/features/game/gameSlice'
import Badge from '@components/UIBadge'
import Button from '@components/UIButton'
import Dropdown from '@/components/Header/Dropdown'
import HeaderBase, {HeaderSection} from '@/components/HeaderBase'
import {tabs} from '@components/DialogGameAccount'
import {AppDispatch} from "@/app/store";
import {getMyPlayingTables} from "@/features/rooms/roomsSlice";
import {useRouter} from "next/router";
import {getPlayingTokenIds} from "@/features/tables/tablesSlice";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
}

const Header = (props: HeaderProps) => {
  const [gameOverShow, setGameOverShow] = useState(true)
  const [currentRoom, setCurrentRoom] = useState<null | string>(null)
  const dispatch = useDispatch<AppDispatch>()
  const {account} = useEthers()
  const router = useRouter()
  const levelRoom = router?.query?.room || 0
  const table = useSelector((state: RootState) => state.table.tableData)

  useEffect(() => {
    if (currentRoom && account) {
      dispatch(getMyPlayingTables({levelRoom: Number(currentRoom), account: account}))
    }
  }, [currentRoom, account])

  useEffect(() => {
    if (levelRoom && account || currentRoom && account) {
      dispatch(getPlayingTokenIds({levelRoom: Number(levelRoom || currentRoom), account}))
    }
  }, [levelRoom, account, currentRoom, table])

  const game = useSelector((state: RootState) => state.game)
  const playingTablesId = useSelector((state: RootState) => state.rooms.playingTablesId)
  const mainframe = useSelector((state: RootState) => state.mainframe)
  const amountPlayingCards = useSelector((state: RootState) => state.tables.playingCards.filter(card => +card !== 0).length)
  const maxRoom = useSelector((state: RootState) => state.game.maxAvailableRoom)

  return <HeaderBase>
    {account ? (
      <>
        <HeaderSection>
          <div onClick={() => dispatch(setGameAccountDialog([!mainframe.gameAccountDialog[0], tabs.WALLET]))}
               className={[css.walletHash].join(' ')}>
            {account.substring(0, 21)}...
          </div>
          <Button onClick={() => dispatch(setGameAccountDialog([!mainframe.gameAccountDialog[0], tabs.WALLET]))}
                  className={[css.walletButton, 'd-mobile'].join(' ')}>
            <i className="fa-solid fa-wallet"></i>
          </Button>
          {game.gameOver === 0 && maxRoom !== 17 ? (
            <>
              <Dropdown
                loading={game.loadingRooms}
                values={
                  [...Array(17 - maxRoom)]
                }
                rooms={true}
                dropdownId={1}
                text={
                  <>
                    <span className={'d-desktop'}>{currentRoom ? <>Room</> : <>Room</>}</span>
                    <img className={'d-mobile'} src="/assets/images/icons/home.svg" alt=""/>
                  </>
                }
                badgeValue={currentRoom || '-'}
                setState={setCurrentRoom}
              />
              <Dropdown
                loading={game.loadingRooms}
                values={
                  playingTablesId?.length && currentRoom ? [...Array(playingTablesId)] : null
                }
                currentRoom={currentRoom}
                tables={true}
                dropdownId={2}
                text={
                  <>
                    <span className={'d-desktop'}>Tables</span>
                    <img className={'d-mobile'} src="/assets/images/icons/table.svg" alt=""/>
                  </>
                }
                badgeValue={currentRoom && playingTablesId?.length || '-'}
              />
            </>
          ) : ''}
        </HeaderSection>
        <HeaderSection>
          {game.claim ? (
            <Button className={'d-mobile'} onClick={() => dispatch(setClaim(false))}>&nbsp;CLAIM&nbsp;</Button>
          ) : ''}
          &nbsp;
          <img className={'d-mobile'} src="/assets/images/icons/chair.svg" alt="chair"/>
          <div className={css.places}>
            <span className={['d-desktop', 'textMuted'].join(' ')}>Places&nbsp;</span>
            <Badge loading={game.loadingRooms} mobileTransparrent={true}>
              {amountPlayingCards}/{game.walletCards.length}
            </Badge>
          </div>
          {game.claim ? (
            <Button className={'d-desktop'} minWidth={true} onClick={() => dispatch(setClaim(false))}>CLAIM</Button>
          ) : ''}
          {game.gameOver ? (
            <>
              <div className={'d-mobile'}>
                <div onClick={() => setGameOverShow(!gameOverShow)}
                     className={[css.gameOverSectionButton, gameOverShow ? css.gameOverSectionButtonActive : ''].join(' ')}>
                  <svg width="11" height="14" viewBox="0 0 11 14" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.499999 7.86602C-0.166668 7.48112 -0.166667 6.51888 0.5 6.13397L9.5 0.937821C10.1667 0.552921 11 1.03405 11 1.80385L11 12.1962C11 12.966 10.1667 13.4471 9.5 13.0622L0.499999 7.86602Z"/>
                  </svg>
                </div>
              </div>
              <div className={[css.gameOverSection, gameOverShow ? css.gameOverSectionShow : ''].join(' ')}>
                <div className={'d-mobile'}>
                  <div>
                    <div className={'textMuted'}>
                      announcement of results
                    </div>
                    04:51
                  </div>
                </div>
                <div className={css.gameOverButtons}>
                  <Button minWidth>REFOUND</Button>
                  <Button minWidth>BURN</Button>
                </div>
              </div>
            </>
          ) : ''}
        </HeaderSection>
      </>
    ) : (
      <>
        <HeaderSection>
          <Button onClick={() => dispatch(setConnectWalletModal(true))}>CONNECT WALLET</Button>
        </HeaderSection>
      </>
    )}
  </HeaderBase>
}

export default Header