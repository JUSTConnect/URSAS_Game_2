import Head from 'next/head'

import Mainframe from '@components/Mainframe'
import Contract from '@components/UIContract'

export default function Home() {

    return (
        <>
            <Head>
                <title>Contract ABI test</title>
            </Head>
            <Mainframe connected={true}>
                <Contract/>
            </Mainframe>
        </>
    )
}
