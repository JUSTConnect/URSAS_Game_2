import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'

import { setCurrentRoom, setCurrentGame } from '@/features/game/gameSlice'
import Mainframe from '@components/Mainframe'
import SubHeaderRooms from '@components/SubHeaderRooms'
import RoomsDoorSlider from '@components/RoomsDoorSlider'

export default function Home() {
    const dispatch = useDispatch()
    const [mode, setMode] = useState('slide')

    useEffect(()=>{
        dispatch(setCurrentRoom(0))
        dispatch(setCurrentGame(0))
    })

    return (
        <>
            <Head>
                <title>Poker Rooms</title>
            </Head>
            <Mainframe
                connected={true}
                subHeader={<SubHeaderRooms mode={mode} setMode={setMode} />}
                gameOver={2} 
            >
                <RoomsDoorSlider mode={mode} />
            </Mainframe>
        </>
    )
}
