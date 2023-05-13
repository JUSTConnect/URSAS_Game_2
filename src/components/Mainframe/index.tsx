import css from './index.module.scss'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEthers } from '@usedapp/core'
import Head from 'next/head'

import { AppDispatch, RootState } from '@/app/store'
import { setActiveHeaderDropdown } from '@/features/mainframe/mainframeSlice'
import { setContractGame, setContractMint } from '@/features/web3/web3Slice'
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

//
import { ethers } from 'ethers'

import ABI from '@contract/abi'
import ABIGame from '@contract/abi-game'
//

interface MainframeProps extends React.HTMLAttributes<HTMLDivElement> {
    subHeader?: JSX.Element
    dialogLayer1?: JSX.Element
    dialogLayer2?: JSX.Element    
    connected?: boolean
}

const Mainframe = (props: MainframeProps) => {
    const { account } = useEthers()
    const mainframe = useSelector((state: RootState) => state.mainframe)
    const web3 = useSelector((state: RootState) => state.web3)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(setLoadingRooms(false))
        }, 500)
        const MINT_CONTRACT_ADDRESS = '0x483841e1b0449ec48781f7f527aaaD1475057223'
        const GAME_CONTRACT_ADDRESS = '0xC48910a9cE0f432F066E70Aa33b0Ac1dEcD0e9A8'

        const getContractMint = () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const erc20 = new ethers.Contract(MINT_CONTRACT_ADDRESS, ABI, provider);
            return erc20.connect(provider.getSigner())
        }

        const getContractGame = () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const erc20 = new ethers.Contract(GAME_CONTRACT_ADDRESS, ABIGame, provider)
            return erc20.connect(provider.getSigner())
        }
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
                                { Boolean(account) &&
                                    <>
                                        <DialogGameAccount/>
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
                                    </>
                                }
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