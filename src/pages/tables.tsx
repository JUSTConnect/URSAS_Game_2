import Head from 'next/head'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setLoadingTables } from '@/features/game/gameSlice'
import Mainframe from '@components/Mainframe'
import SubHeaderTables from '@components/SubHeaderTables'
import TableList from '@components/TableList'

export default function Home() {
    const dispatch = useDispatch()

    useEffect(()=>{
        setTimeout(()=>{
            dispatch(setLoadingTables(false))
        }, 5000)
    },[])

    return (
        <>
            <Head>
                <title>Poker Rooms</title>
            </Head>
            <Mainframe
                connected={ false }
                subHeader={<SubHeaderTables />}
            >
                <TableList />
            </Mainframe>
        </>
    )
}
