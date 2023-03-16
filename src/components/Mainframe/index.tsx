import { HTMLAttributes, useState } from 'react'
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


const Mainframe = (props: MainframeProps) => {

  const [contentBlured, setContentBlured] = useState(false)
  const [footerModal, setFooterModal] = useState(false)

  return (
    <>
      <Head>
        <title>Poker Rooms</title>
      </Head>
      <PageLayout>
        <HeaderMobile setFooterModal={setFooterModal} footerModal={footerModal}/>
        <Sidebar/>
        <PageContent>
          <Header connected={ true } setBlured={ setContentBlured }/>
          { props.subHeader }
          <Blur active={contentBlured}/>
          <PageMain>
            { props.children }
          </PageMain>
        </PageContent>
      </PageLayout>
      <Footer/>
      <FooterModal active={footerModal}/>
    </>
  )
}


export default Mainframe