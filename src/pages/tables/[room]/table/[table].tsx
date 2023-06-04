import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'
import Head from 'next/head'

import {setLoadingTable, setCurrentGame} from '@/features/game/gameSlice'
import Mainframe from '@components/Mainframe'

import SubHeaderTable from '@components/SubHeaderTable'
import TableView from '@components/TableView'
import {clearStakedPlaces} from "@/features/table/tableSlice";


export interface query {
  table?: number
  room?: number
}


export default function Home() {
  const router = useRouter()
  const {table} = router.query as query
  const dispatch = useDispatch()

  const [modalActive, setModalActive] = useState(false)

  useEffect(() => {
    dispatch(clearStakedPlaces())
    return function () {
      dispatch(clearStakedPlaces())
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoadingTable(false))
    }, 1000)
  })
  useEffect(() => {
    dispatch(setCurrentGame(table || 0))
  })

  return (
    <>
      <Head>
        <title>Poker Rooms {table}</title>
      </Head>
      <Mainframe
        connected={true}
        subHeader={<SubHeaderTable modalActive={modalActive} setModalActive={setModalActive}/>}
      >
        <TableView modalActive={modalActive} setModalActive={setModalActive}/>
      </Mainframe>
    </>
  )
}
