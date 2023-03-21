import Head from 'next/head'

import Mainframe from '@components/Mainframe'

import SubHeaderTables from '@components/SubHeaderTables'
import TableList from '@components/TableList'
import Blur from '@/components/Blur'

export default function Home() {

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
