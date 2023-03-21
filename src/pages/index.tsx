import { useState } from 'react'
import Head from 'next/head'

import Mainframe from '@components/Mainframe'

import SubHeaderRooms from '@components/SubHeaderRooms'
import RoomsDoorSlider from '@components/RoomsDoorSlider'

export default function Home() {

    const [mode, setMode] = useState('slide')

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
