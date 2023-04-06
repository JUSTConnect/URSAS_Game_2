import css from './index.module.scss'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { setWalletConnected } from '@/features/game/gameSlice'
import { setConnectWalletModal } from '@/features/mainframe/mainframeSlice'

interface props
{
    active?: boolean
}


type item = {
    logoSrc: string
    name: string
}


const items = {
    SOLANA: [
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
    POLYGON: [
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
    SOLANA = 'SOLANA',
    POLYGON = 'POLYGON'
}

export default () => {
    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.SOLANA)
    const mainframe = useSelector((state: RootState) => state.mainframe)
    const dispatch = useDispatch()

    return <div className={ [css.container, mainframe.connectWalletModal ? css.containerActive: ''].join(' ') }>
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
                Connect a wallet on Solana to continue
            </div>
            <div className={ css.content }>
                { items[activeTab].map((item, index)=>(
                    <div key={ index } className={ css.item }>
                        <div className={ css.itemInfo }>
                            <img className={ css.itemLogo } src={ item.logoSrc } alt="Item Logo" />
                            { item.name }
                        </div>
                        <button onClick={ () => {dispatch(setWalletConnected(true)); dispatch(setConnectWalletModal(false))} } className={ css.itemButton }>
                            detected
                        </button>
                    </div>
                )) }
            </div>
        </div>
    </div>
}