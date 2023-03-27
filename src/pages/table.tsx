import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'

import { setLoadingTable } from '@/features/game/gameSlice'
import Mainframe from '@components/Mainframe'

import SubHeaderTable from '@components/SubHeaderTable'
import TableView from '@components/TableView'

export default function Home() {
    const dispatch = useDispatch()
    const [modalActive, setModalActive] = useState(false)

    useEffect(()=>{
        setTimeout(()=>{
            dispatch(setLoadingTable(false))
        }, 3000)
    })

    return (
        <>
            <Head>
                <title>Poker Rooms</title>
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
