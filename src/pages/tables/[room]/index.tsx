import Head from 'next/head'

import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'

import {setLoadingTables, setCurrentRoom, setCurrentGame} from '@/features/game/gameSlice'
import Mainframe from '@components/Mainframe'
import SubHeaderTables from '@components/SubHeaderTables'
import TableList from '@components/TableList'
import {getRoomInfo} from "@/features/rooms/roomsSlice";
import {AppDispatch} from "@/app/store";


export interface query {
  room?: number
}


export default function Home() {
  const router = useRouter()
  const {room} = router.query as query
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoadingTables(false))
    }, 500)
  }, [])
  useEffect(() => {
    dispatch(setCurrentRoom(room || 0))
    dispatch(setCurrentGame(0))
  })

  return (
    <>
      <Head>
        <title>Poker Rooms</title>
      </Head>
      <Mainframe
        connected={false}
        subHeader={<SubHeaderTables/>}
      >
        {room && <TableList id={Number(room)}/>}
      </Mainframe>
    </>
  )
}
