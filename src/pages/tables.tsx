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
import FooterModal from '@components/FooterModal'
import SubHeaderTables from '@components/SubHeaderTables'

import TableList from '@components/TableList'

export default function Home() {
    const [contentBlured, setContentBlured] = useState(false)
    const [footerModal, setFooterModal] = useState(false)

    return (
        <>
            <Head>
                <title>Poker Table</title>
            </Head>
            <PageLayout>
                <HeaderMobile setFooterModal={setFooterModal} footerModal={footerModal}/>
                <Sidebar />
                <PageContent>
                    <Header connected={ true } setBlured={ setContentBlured }/>
                    <SubHeaderTables />
                    <Blur active={contentBlured}/>
                    <PageMain>
                        <TableList />
                    </PageMain>
                </PageContent>
            </PageLayout>
            <Footer />
            <FooterModal active={footerModal}/>
        </>
    )
}
