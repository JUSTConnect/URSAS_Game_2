import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import FlexBox, { FlexBreak } from '@components/FlexBox'

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
    return (
        <>
            <Head>
                <title>Poker Table</title>
            </Head>
            <PageLayout>
                <HeaderMobile />
                <Sidebar />
                <PageContent>
                    <Header connected={ true }/>
                    <PageMain>
                        <SubHeaderTable />
                        <div style={{ height: '100%', overflowY: 'auto' }}>
                            <TableList />
                        </div>
                    </PageMain>
                </PageContent>
            </PageLayout>
            <Footer />
        </>
    )
}
