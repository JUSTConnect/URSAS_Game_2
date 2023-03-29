import Head from 'next/head'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { setLoadingTables, setCurrentRoom, setCurrentGame } from '@/features/game/gameSlice'
import Mainframe from '@components/Mainframe'
import SubHeaderTables from '@components/SubHeaderTables'
import TableList from '@components/TableList'


interface query
{
    id?: number
}


export default function Home() {
    const router = useRouter()
    const { id } = router.query as query
    const dispatch = useDispatch()

    useEffect(()=>{
        setTimeout(()=>{
            dispatch(setLoadingTables(false))
        }, 5000)
    },[])
    useEffect(()=>{
        dispatch(setCurrentRoom(id||0))
        dispatch(setCurrentGame(0))
    })

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
