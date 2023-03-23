import Head from 'next/head'

import Mainframe from '@components/Mainframe'

import SubHeaderTables from '@components/SubHeaderTables'
import TableList from '@components/TableList'
import Loader from '@components/Loader'

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
                <div>
                    <Loader/>
                </div>
            </Mainframe>
        </>
    )
}
