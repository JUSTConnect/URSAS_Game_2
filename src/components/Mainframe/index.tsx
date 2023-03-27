import { HTMLAttributes, useState, useEffect, createContext } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'

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
    gameOver?: number
}


type MainFrameContextData = {
  contentBlured: boolean,
  setContentBlured: Function,
  mainBlured: boolean,
  setMainBlured: Function,
  footerModal: boolean,
  setFooterModal: Function,
  connectWalletModal: boolean,
  setConnectWalletModal: Function
  disableWalletModal: boolean,
  setDisableWalletModal: Function,
  gameOver: number
}

const MainframeContext = createContext<MainFrameContextData>({
  contentBlured: false,
  setContentBlured: Function,
  mainBlured: false,
  setMainBlured: Function,
  footerModal: false,
  setFooterModal: Function,
  connectWalletModal: false,
  setConnectWalletModal: Function,
  disableWalletModal: false,
  setDisableWalletModal: Function,
  gameOver: 0,
})


const Mainframe = (props: MainframeProps) => {
  const dispatch = useDispatch()
  const [contentBlured, setContentBlured] = useState(false)
  const [mainBlured, setMainBlured] = useState(false)
  const [footerModal, setFooterModal] = useState(false)
  const [connectWalletModal, setConnectWalletModal] = useState(false)
  const [disableWalletModal, setDisableWalletModal] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
      dispatch(setLoadingRooms(false))
    }, 3000)
  }, [])

  return (
    <>
      <Head>
        <title>Poker Rooms</title>
      </Head>
      <MainframeContext.Provider value={{
        contentBlured: contentBlured,
        setContentBlured: setContentBlured,
        mainBlured: mainBlured,
        setMainBlured: setMainBlured,
        footerModal: footerModal,
        setFooterModal: setFooterModal,
        connectWalletModal: connectWalletModal,
        setConnectWalletModal: setConnectWalletModal,
        disableWalletModal: disableWalletModal,
        setDisableWalletModal: setDisableWalletModal,
        gameOver: props.gameOver || 0,
      }}>
        <PageLayout>
          <HeaderMobile/>
          <Sidebar/>
          <PageContent>
            <Header/>
            { props.subHeader }
            <Blur isActive={contentBlured}/>
            <PageMain>
              { props.children }
              <Blur isActive={mainBlured}/>
            </PageMain>
          </PageContent>
        </PageLayout>
        <Footer/>
        <FooterModal/>
        <ModalConnectWallet/>
        <ModalDisableWallet/>
        <LoaderScreen/>
        <Blur isActive={ connectWalletModal || disableWalletModal } onClick={ () => { setConnectWalletModal(false); setDisableWalletModal(false) } }/>
      </MainframeContext.Provider>
    </>
  )
}


export default Mainframe

export { MainframeContext }