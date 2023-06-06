import css from './index.module.scss'

import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useEthers} from '@usedapp/core'
import Head from 'next/head'

import {Room} from '@/agents/web3'
import {RoomLevel} from '@/lib/types/game'

import {RootState} from '@/app/store'
import {getRoomDetail} from '@/agents/web3/gameContract/rooms'
import {setActiveHeaderDropdown} from '@/features/mainframe/mainframeSlice'
import {setClaim, setGameOver, setSeason, setTablesClaimReady} from '@/features/game/gameSlice'
import {getSeasonDetail} from '@/agents/web3/gameContract/season'
import {setLoadingRooms} from '@/features/game/gameSlice'
import {setPlayingTablesId, setRooms} from '@/features/rooms/roomsSlice'

import Blur from '@components/Blur'
import Sidebar from './Sidebar'
import Header from '@/components/Header'
import HeaderMobile from '@components/HeaderMobile'
import Footer from '@components/Footer'
import FooterModal from '@components/FooterModal'
import ModalConnectWallet from '@components/ModalConnectWallet'
import ModalDisableWallet from '@components/ModalDisableWallet'
import DialogGameAccount from '@components/DialogGameAccount'
import DialogGameInfo, {typePrize} from '@components/DialogGameInfo'
import DialogMint from '@components/DialogMint'
import {getPlayingTablesInAllRooms} from "@/agents/web3/gameContract/tables";


interface MainframeProps extends React.HTMLAttributes<HTMLDivElement> {
  subHeader?: JSX.Element
  dialogLayer1?: JSX.Element
  dialogLayer2?: JSX.Element
  connected?: boolean
}

const Mainframe = (props: MainframeProps) => {
  const {account} = useEthers()
  const mainframe = useSelector((state: RootState) => state.mainframe)
  const rooms = useSelector((state: RootState) => state.rooms.rooms)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoadingRooms(false))
    }, 500)

    const fetchData = async () => {
      dispatch(setSeason(await getSeasonDetail()))
      let rooms = await Promise.all(Array.from(Array(16)).map(async (i, index) => {
        return await getRoomDetail(index + 1 as RoomLevel)
      }))

      return rooms as unknown as Room[]
    }

    fetchData().then(c => {
      if (c[0].availableTablesCount === 0) {
        dispatch(setGameOver(1))
      }

      dispatch(setRooms(c))
    })
  }, [])

  useEffect(() => {
    if (account && rooms?.length) {
      getPlayingTablesInAllRooms(account).then((tables) => {
        if (tables.length > 0) {
          dispatch(setClaim(true))
          dispatch(setPlayingTablesId(tables))
          dispatch(setTablesClaimReady({tables, rooms}))
        }
      })
    }
  }, [account, rooms])

  return (
    <>
      <Head>
        <title>Poker Rooms</title>
      </Head>
      <div className={css.layout}>
        <div className={css.inner}>

          <HeaderMobile/>
          <Sidebar/>

          {/* LAYER 1 */}
          <div className={css.layer1}>
            <Header/>

            <div className={css.inner}>

              {/* LAYER 2 */}
              <div className={css.layer2}>
                {props.subHeader}
                <div className={css.inner}>
                  <div className={css.main}>
                    {props.children}
                  </div>
                </div>
                <Blur
                  isActive={
                    mainframe.layer2Blured
                  }
                  onClick={() => dispatch(setActiveHeaderDropdown(0))}
                />
                {props.dialogLayer2}
                {Boolean(account) &&
                  <>
                    <DialogGameAccount/>
                    <DialogGameInfo
                      data={
                        {
                          typePrize: typePrize.WL,
                          result: 1
                        }
                      }
                      active={mainframe.gameInfoDialog}
                    />
                    <DialogMint active={mainframe.mintDialog}/>
                  </>
                }
              </div>

            </div>

            <Blur
              isActive={mainframe.layer1Blured}
            />
            {props.dialogLayer1}

          </div>

        </div>
      </div>
      <Footer/>
      <FooterModal/>
      <ModalConnectWallet/>
      <ModalDisableWallet/>
    </>
  )
}


export default Mainframe