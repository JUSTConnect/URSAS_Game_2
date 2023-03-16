import { useState, createContext } from 'react'
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
import SubHeaderTable from '@components/SubHeaderTable'

import TableView from '@components/TableView'

const Context = createContext({});

export default function Home() {
    const [contentBlured, setContentBlured] = useState(false)    
    const [modalActive, setModalActive] = useState(false)
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
                    <SubHeaderTable modalActive={modalActive} setModalActive={setModalActive}/>
                    <Blur active={contentBlured}/>
                    <PageMain>
                        <TableView modalActive={modalActive} setModalActive={setModalActive}/>
                    </PageMain>
                </PageContent>
            </PageLayout>
            <Footer />
            <FooterModal active={footerModal}/>
        </>
    )
}

export { Context }
