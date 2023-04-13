import css from './index.module.scss'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'

import { RootState } from '@/app/store'
import { setActiveHeaderDropdown } from '@/features/mainframe/mainframeSlice'
import { setLoadingRooms } from '@/features/game/gameSlice'
import Blur from '@components/Blur'
import Sidebar from './Sidebar'
import Header from '@/components/Header'
import HeaderMobile from '@components/HeaderMobile'
import Footer from '@components/Footer'
import FooterModal from '@components/FooterModal'
import ModalConnectWallet from '@components/ModalConnectWallet'
import ModalDisableWallet from '@components/ModalDisableWallet'
import DialogGameAccount from '@components/DialogGameAccount'
import DialogGameInfo, { typePrize } from '@components/DialogGameInfo'
import DialogMint from '@components/DialogMint'


interface MainframeProps extends React.HTMLAttributes<HTMLDivElement> {
    subHeader?: JSX.Element
    dialogLayer1?: JSX.Element
    dialogLayer2?: JSX.Element    
    connected?: boolean
}

const Mainframe = (props: MainframeProps) => {
    const mainframe = useSelector((state: RootState) => state.mainframe)
    const game = useSelector((state: RootState) => state.game)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(setLoadingRooms(false))
        }, 500)
    }, [])

    return (
        <>
            <Head>
                <title>Poker Rooms</title>
            </Head>
            <div className={css.layout}>
                <div className={ css.inner }>

                    <HeaderMobile />
                    <Sidebar />

                    {/* LAYER 1 */}
                    <div className={css.layer1}>
                        <Header />

                        <div className={ css.inner }>

                            {/* LAYER 2 */}
                            <div className={ css.layer2 }>
                                {props.subHeader}
                                <div className={ css.inner }>
                                    <div className={css.main}>
                                        { props.children }
                                    </div>
                                </div>
                                <Blur
                                    isActive={
                                        mainframe.layer2Blured
                                    }
                                    onClick={() => dispatch(setActiveHeaderDropdown(0))}
                                />
                                { props.dialogLayer2 }
                                <DialogGameAccount
                                    active={ game.walletConnected && mainframe.gameAccountDialog }
                                />
                                <DialogGameInfo
                                    data={
                                        {
                                            typePrize: typePrize.WL,
                                            result: 1
                                        }
                                    }
                                    active={ mainframe.gameInfoDialog }
                                />
                                <DialogMint active={ mainframe.mintDialog }/>
                            </div>

                        </div>

                        <Blur
                            isActive={ mainframe.layer1Blured }
                        />
                        { props.dialogLayer1 }

                    </div>

                </div>
            </div>
            <Footer />
            <FooterModal />
            <ModalConnectWallet />
            <ModalDisableWallet />
        </>
    )
}


export default Mainframe