import React, { HTMLAttributes, useState, useEffect, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'

import { RootState } from '@/app/store'
import { setActiveHeaderDropdown, setConnectWalletModal, setDisableWalletModal } from '@/features/mainframe/mainframeSlice'
import { setLoadingRooms } from '@/features/game/gameSlice'
import Blur from '@components/Blur'
import PageLayout from '@components/PageLayout'
import PageContent from '@components/PageContent'
import PageMain from '@components/PageMain'
import Sidebar from '@components/Sidebar'
import Header from '@/components/Header'
import HeaderMobile from '@components/HeaderMobile'
import Footer from '@components/Footer'
import FooterModal from '@components/FooterModal'
import ModalConnectWallet from '@components/ModalConnectWallet'
import ModalDisableWallet from '@components/ModalDisableWallet'
import LoaderScreen from '../LoaderScreen'


interface MainframeProps extends HTMLAttributes<HTMLDivElement> {
    subHeader?: JSX.Element
    connected?: boolean
}

const Mainframe = (props: MainframeProps) => {
  const mainframe = useSelector((state: RootState) => state.mainframe)
  const dispatch = useDispatch()

  useEffect(()=>{
    setTimeout(()=>{
      dispatch(setLoadingRooms(false))
    }, 500)
  }, [])

  return (
    <>
      <Head>
        <title>Poker Rooms</title>
      </Head>
      <PageLayout>
        <HeaderMobile/>
        <Sidebar/>
        <PageContent>
          <Header/>
          { props.subHeader }
          <Blur 
            isActive={mainframe.contentBlured}
            onClick={ ()=>dispatch(setActiveHeaderDropdown(0)) }
          />
          <PageMain>
            { props.children }
            <Blur isActive={mainframe.mainBlured}/>
          </PageMain>
        </PageContent>
      </PageLayout>
      <Footer/>
      <FooterModal/>
      <ModalConnectWallet/>
      <ModalDisableWallet/>
      <LoaderScreen/>
      <Blur isActive={ mainframe.connectWalletModal || mainframe.disableWalletModal } onClick={ () => { dispatch(setConnectWalletModal(false)); dispatch(setDisableWalletModal(false)) } }/>
    </>
  )
}


export default Mainframe