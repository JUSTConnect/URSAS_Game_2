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
                subHeader={<SubHeaderRooms mode={mode} setMode={setMode} />}
            >
                <RoomsDoorSlider mode={mode} />
            </Mainframe>
        </>
    )
}
