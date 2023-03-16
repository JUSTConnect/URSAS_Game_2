import { useState } from 'react'
import Head from 'next/head'

import Mainframe from '@components/Mainframe'

import SubHeaderTable from '@components/SubHeaderTable'
import TableView from '@components/TableView'

export default function Home() {

    const [modalActive, setModalActive] = useState(false)

    return (
        <>
            <Head>
                <title>Poker Rooms</title>
            </Head>
            <Mainframe
                subHeader={<SubHeaderTable modalActive={modalActive} setModalActive={setModalActive}/>}
            >
                <TableView modalActive={modalActive} setModalActive={setModalActive}/>
            </Mainframe>
        </>
    )
}
