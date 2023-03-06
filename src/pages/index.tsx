import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import FlexBox, { FlexBreak } from '@components/FlexBox'

import PageLayout from '@components/PageLayout'
import PageContent from '@components/PageContent'
import PageMain from '@components/PageMain'
import Sidebar from '@components/Sidebar'
import HeaderTables from '@components/HeaderTables'
import HeaderMobile from '@components/HeaderMobile'
import Footer from '@components/Footer'
import SubHeaderTables from '@components/SubHeaderTables'

import TableList from '@components/TableList'

export default function Home() {
  return (
    <>
      <PageLayout>
        <HeaderMobile/>
        <Sidebar/>
        <PageContent>
          <HeaderTables/>
          <PageMain>
            <SubHeaderTables/>     
            <div style={ {height:'100%', overflowY: 'auto'} }>
              <TableList/>
            </div>
          </PageMain>
        </PageContent>
      </PageLayout>
      <Footer/>
    </>
  )
}
