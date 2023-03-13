import { useState } from 'react'
import Head from 'next/head'

import Blur from '@components/Blur'
import PageLayout from '@components/PageLayout'
import PageContent from '@components/PageContent'
import PageMain from '@components/PageMain'
import Sidebar from '@components/Sidebar'
import Header from '@/components/Header'
import HeaderMobile from '@components/HeaderMobile'
import Footer from '@components/Footer'
import SubHeaderTable from '@components/SubHeaderTable'

import TableList from '@components/TableList'

export default function Home() {
    const [contentBlured, setContentBlured] = useState(false)

    return (
        <>
            <Head>
                <title>Poker Table</title>
            </Head>
            <PageLayout>
                <HeaderMobile />
                <Sidebar />
                <PageContent>
                    <Header connected={ true } setBlured={ setContentBlured }/>
                    <SubHeaderTable />
                    <Blur active={contentBlured}/>
                    <PageMain>

                    </PageMain>
                </PageContent>
            </PageLayout>
            <Footer />
        </>
    )
}
