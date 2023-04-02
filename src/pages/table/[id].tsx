import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Head from 'next/head'

import { setLoadingTable, setCurrentGame } from '@/features/game/gameSlice'
import Mainframe from '@components/Mainframe'

import SubHeaderTable from '@components/SubHeaderTable'
import TableView from '@components/TableView'


interface query
{
    id?: number
}


export default function Home() {
    const router = useRouter()
    const { id } = router.query as query
    const dispatch = useDispatch()

    const [modalActive, setModalActive] = useState(false)

    useEffect(()=>{
        setTimeout(()=>{
            dispatch(setLoadingTable(false))
        }, 1000)
    })
    useEffect(()=>{
        dispatch(setCurrentGame(id||0))
    })

    return (
        <>
            <Head>
                <title>Poker Rooms { id }</title>
            </Head>
            <Mainframe
                connected={ true }
                subHeader={<SubHeaderTable modalActive={modalActive} setModalActive={setModalActive}/>}
            >
                <TableView modalActive={modalActive} setModalActive={setModalActive}/>
            </Mainframe>
        </>
    )
}
