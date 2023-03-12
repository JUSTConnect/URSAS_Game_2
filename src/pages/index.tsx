import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import FlexBox, { FlexBreak } from '@components/FlexBox'


import Door from '@components/RoomsDoor'
import PageLayout from '@components/PageLayout'
import PageContent from '@components/PageContent'
import PageMain from '@components/PageMain'
import Sidebar from '@components/Sidebar'
import Header from '@/components/Header'
import HeaderMobile from '@components/HeaderMobile'
import Footer from '@components/Footer'
import SubHeaderRooms from '@components/SubHeaderRooms'

import TableList from '@components/TableList'
import RoomsDoor from '@components/RoomsDoor'
import RoomsDoorSlider from '@components/RoomsDoorSlider'

export default function Home() {
  return (
    <>
      <Head>
        <title>Poker Rooms</title>
      </Head>
      <PageLayout>
        <HeaderMobile/>
        <Sidebar/>
        <PageContent>
          <Header connected={ true }/>
          <PageMain>
            <SubHeaderRooms/>     
            <div style={ {height:'100%', overflowY: 'auto'} }>
              <RoomsDoorSlider/>
            </div>
          </PageMain>
        </PageContent>
      </PageLayout>
      <Footer/>
    </>
  )
}
