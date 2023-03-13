import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import FlexBox, { FlexBreak } from '@components/FlexBox'

import Blur from '@components/Blur'
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

  const [mode, setMode] = useState('slide')
  const [contentBlured, setContentBlured] = useState(false)

  return (
    <>
      <Head>
        <title>Poker Rooms</title>
      </Head>
      <PageLayout>
        <HeaderMobile/>
        <Sidebar/>
        <PageContent>
          <Header connected={ true } setBlured={ setContentBlured }/>
          <SubHeaderRooms mode={mode} setMode={setMode}/>     
          <Blur active={contentBlured}/>
          <PageMain>
            <RoomsDoorSlider mode={mode}/>
          </PageMain>
        </PageContent>
      </PageLayout>
      <Footer/>
    </>
  )
}
