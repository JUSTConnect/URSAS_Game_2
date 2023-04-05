import { useDispatch } from 'react-redux'
import Head from 'next/head'

import { setCurrentRoom, setCurrentGame } from '@/features/game/gameSlice'
import Mainframe from '@components/Mainframe'
import Kit from '@components/UIKit'

export default function Home() {

    return (
        <>
            <Head>
                <title>Poker Rooms</title>
            </Head>
            <Mainframe connected={true}>
                <Kit/>
            </Mainframe>
        </>
    )
}
