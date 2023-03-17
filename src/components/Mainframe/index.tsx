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


interface MainframeProps extends HTMLAttributes<HTMLDivElement> {
    subHeader?: JSX.Element
}


type MainFrameContextData = {
  contentBlured: boolean,
  setContentBlured: Function,
  mainBlured: boolean,
  setMainBlured: Function,
  footerModal: boolean,
  setFooterModal: Function, 
}


const MainframeContext = createContext<MainFrameContextData>({
  contentBlured: false,
  setContentBlured: Function,
  mainBlured: false,
  setMainBlured: Function,
  footerModal: false,
  setFooterModal: Function, 
})

const Mainframe = (props: MainframeProps) => {
  const [contentBlured, setContentBlured] = useState(false)
  const [mainBlured, setMainBlured] = useState(false)
  const [footerModal, setFooterModal] = useState(false)


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
      }}>
        <PageLayout>
          <HeaderMobile/>
          <Sidebar/>
          <PageContent>
            <Header connected={ true }/>
            { props.subHeader }
            <Blur active={contentBlured}/>
            <PageMain>
              { props.children }
              <Blur active={mainBlured}/>
            </PageMain>
          </PageContent>
        </PageLayout>
        <Footer/>
        <FooterModal/>
      </MainframeContext.Provider>
    </>
  )
}


export default Mainframe

export { MainframeContext }