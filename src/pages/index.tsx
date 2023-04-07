import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'

import { RootState } from '@/app/store'
import { setCurrentRoom, setCurrentGame } from '@/features/game/gameSlice'
import Mainframe from '@components/Mainframe'
import SubHeaderRooms from '@components/SubHeaderRooms'
import RoomsDoorSlider from '@components/RoomsDoorSlider'
import DialogMint from '@/components/DialogMint'

export default function Home() {
    const dispatch = useDispatch()
    const [mode, setMode] = useState('slide')
    const game = useSelector((state: RootState) => state.game)
    const rooms = useSelector((state: RootState) => state.rooms)

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
                dialogLayer2={ <DialogMint active={ rooms.dialogMint }/> }
            >
                <RoomsDoorSlider mode={mode}/>
            </Mainframe>
        </>
    )
}
