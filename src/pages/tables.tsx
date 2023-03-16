import Head from 'next/head'

import Mainframe from '@components/Mainframe'

import SubHeaderTables from '@components/SubHeaderTables'
import TableList from '@components/TableList'

export default function Home() {

    return (
        <>
            <Head>
                <title>Poker Rooms</title>
            </Head>
            <Mainframe
                subHeader={<SubHeaderTables />}
            >
                <TableList />
            </Mainframe>
        </>
    )
}
