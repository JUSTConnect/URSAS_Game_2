import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Head from 'next/head'

import {RootState} from '@/app/store'
import {setCurrentRoom, setCurrentGame} from '@/features/game/gameSlice'
import Mainframe from '@components/Mainframe'
import SubHeaderRooms from '@components/SubHeaderRooms'
import RoomsDoorSlider from '@components/RoomsDoorSlider'
import {getGameContract} from "@lib/utils/web3";
import LoaderScreen from "@components/LoaderScreen";
import {claim} from "@/agents/web3/gameContract/tables";

export default function Home() {
  const dispatch = useDispatch()
  const [mode, setMode] = useState('slide')
  const game = useSelector((state: RootState) => state.game)
  const rooms = useSelector((state: RootState) => state.rooms)

  useEffect(() => {
    dispatch(setCurrentRoom(0))
    dispatch(setCurrentGame(0))
  })

  return (
    <>
      {/*<LoaderScreen/>*/}
      <Head>
        <title>Poker Rooms</title>
      </Head>
      <Mainframe
        connected={true}
        subHeader={<SubHeaderRooms mode={mode} setMode={setMode}/>}
      >
        <RoomsDoorSlider mode={mode}/>
      </Mainframe>
    </>
  )
}
