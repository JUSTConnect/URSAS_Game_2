import css from './index.module.scss'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../app/store';

import { RootState } from '@/app/store'
import { setWalletConnected } from '@/features/game/gameSlice'
import { setConnectWalletModal } from '@/features/mainframe/mainframeSlice'
import Blur from '@components/Blur'
import { connectAccount } from '@/features/main/mainSlice'

interface props
{
    active?: boolean
}


type item = {
    logoSrc: string
    name: string
}


const items = {
    Solana: [
        {
            logoSrc: '/assets/images/icons/wallet-glow.svg',
            name: 'Glow'
        },
        {
            logoSrc: '/assets/images/icons/wallet-phantom.svg',
            name: 'Phantom'
        },
        {
            logoSrc: '/assets/images/icons/wallet-math-wallet.svg',
            name: 'MathWallet'
        }
    ],
    Polygon: [
        {
            logoSrc: '/assets/images/icons/wallet-metamask.png',
            name: 'MetaMask'
        },
        {
            logoSrc: '/assets/images/icons/wallet-trustwallet.png',
            name: 'Trust Wallet'
        },
        {
            logoSrc: '/assets/images/icons/wallet-walletconnect.png',
            name: 'WalletConnect'
        }
    ]
}


enum Tabs
{
    SOLANA = 'Solana',
    POLYGON = 'Polygon'
}

export default () => {
    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.SOLANA)
    const mainframe = useSelector((state: RootState) => state.mainframe)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <>
            <div className={ [css.container, mainframe.connectWalletModal ? css.containerActive: ''].join(' ') }>
                <div className={ css.modal }>
                    <div className={ css.top }>
                        <div className={ css.tabs }>
                            <button
                                onClick={ () => setActiveTab(Tabs.SOLANA) }
                                className={
                                    [
                                        css.tab,
                                        activeTab === Tabs.SOLANA && css.tabActive
                                    ].join(' ')
                                }
                            >
                                <img className={ css.tabIcon } src="/assets/images/icons/wallet-solana.png" alt="" />
                                Solana
                            </button>
                            <button
                                onClick={ () => setActiveTab(Tabs.POLYGON) }
                                className={
                                    [
                                        css.tab,
                                        activeTab === Tabs.POLYGON && css.tabActive                                    
                                    ].join(' ')
                                }
                            >
                                <img className={ css.tabIcon } src="/assets/images/icons/wallet-polygon.png" alt="" />
                                Polygon
                            </button>
                        </div>
                        <button onClick={ ()=>dispatch(setConnectWalletModal(false)) } className={ css.buttonClose}>
                            <svg className={ css.buttonCloseIcon } width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_669_5347)">
                                <path d="M15 1L1 15" stroke="#B5C4E3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1 1L15 15" stroke="#B5C4E3" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_669_5347">
                                <rect width="16" height="16" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                    <div className={ css.header }>
                        Connect a wallet on { activeTab } to continue
                    </div>
                    <div className={ css.content }>
                        { items[activeTab].map((item, index)=>(
                            <div key={ index } className={ css.item }>
                                <div className={ css.itemInfo }>
                                    <img className={ css.itemLogo } src={ item.logoSrc } alt="Item Logo" />
                                    { item.name }
                                </div>
                                <button onClick={ () => {dispatch(setConnectWalletModal(false)); dispatch(connectAccount(item.name))} } className={ css.itemButton }>
                                    detected
                                </button>
                            </div>
                        )) }
                    </div>
                </div>
            </div>
            <Blur
                isActive={ mainframe.connectWalletModal }
                onClick={ () => dispatch(setConnectWalletModal(false)) }
            />
        </>
    )
}