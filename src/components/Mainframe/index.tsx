import { HTMLAttributes, useState, createContext } from 'react'
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
import ModalConnectWallet from '@components/ModalConnectWallet'


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
  gameOver: 0,
})

const Mainframe = (props: MainframeProps) => {
  const [contentBlured, setContentBlured] = useState(false)
  const [mainBlured, setMainBlured] = useState(false)
  const [footerModal, setFooterModal] = useState(false)
  const [connectWalletModal, setConnectWalletModal] = useState(false)


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
        gameOver: props.gameOver || 0,
      }}>
        <PageLayout>
          <HeaderMobile/>
          <Sidebar/>
          <PageContent>
            <Header connected={ props.connected }/>
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
        <Blur isActive={ connectWalletModal }/>
      </MainframeContext.Provider>
    </>
  )
}


export default Mainframe

export { MainframeContext }