import { HTMLAttributes, useState, useEffect, createContext } from 'react'
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
  gameOver: number
}

type GameContextData = {
  walletConnected: boolean,
  setWalletConnected: Function,
  currentGame: Array<number>,
  setCurrentGame: Function,
  loadingTables: boolean,
  setLoadingTables: Function
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

const GameContext = createContext<GameContextData>({
  walletConnected: false,
  setWalletConnected: Function,
  currentGame: [0, 0],
  setCurrentGame: Function,
  loadingTables: true,
  setLoadingTables: Function
})

const Mainframe = (props: MainframeProps) => {
  const [contentBlured, setContentBlured] = useState(false)
  const [mainBlured, setMainBlured] = useState(false)
  const [footerModal, setFooterModal] = useState(false)
  const [connectWalletModal, setConnectWalletModal] = useState(false)

  const [walletConnected, setWalletConnected] = useState(false)
  const [currentGame, setCurrentGame] = useState([0, 0])

  const [loadingTables, setLoadingTables] = useState(true)

  useEffect(()=>{
    setTimeout(()=>setLoadingTables(false),5000)
  }, [])

  return (
    <>
      <Head>
        <title>Poker Rooms</title>
      </Head>
      <GameContext.Provider value={{
        walletConnected: walletConnected,
        setWalletConnected: setWalletConnected,
        currentGame: currentGame,
        setCurrentGame: setCurrentGame,
        loadingTables: loadingTables,
        setLoadingTables: setLoadingTables
      }}>
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
              <Header connected={ walletConnected }/>
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
          <LoaderScreen/>
          <Blur isActive={ connectWalletModal }/>
        </MainframeContext.Provider>
      </GameContext.Provider>
    </>
  )
}


export default Mainframe

export { MainframeContext, GameContext }