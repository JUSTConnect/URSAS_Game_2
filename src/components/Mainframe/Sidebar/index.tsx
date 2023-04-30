import css from './index.module.scss'

import Image from 'next/image'
import Link from 'next/link'

import { useSelector, useDispatch } from 'react-redux'
import { useEthers } from '@usedapp/core'

import { RootState } from '@/app/store'
import { setGameInfoDialog, setMintDialog } from '@/features/mainframe/mainframeSlice'
import SidebarButton from './SidebarButton'
import Button, {
    Variant as ButtonVariant,
    Size as ButtonSize,
    Color as ButtonColor
} from '@/components/UIButton'


const Sidebar = () => {
    const dispatch = useDispatch()
    const game = useSelector((state: RootState)=>state.game)
    const mainframe = useSelector((state: RootState)=>state.mainframe)
    const { account } = useEthers()


    const buttons = [
        {
            href: '/',
            icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8 1.3335L2 6.00016V13.3335C2 13.6871 2.14048 14.0263 2.39052 14.2763C2.64057 14.5264 2.97971 14.6668 3.33333 14.6668H5V8H11V14.6668H12.6667C13.0203 14.6668 13.3594 14.5264 13.6095 14.2763C13.8595 14.0263 14 13.6871 14 13.3335V6.00016L8 1.3335Z" fill="#4E5E80"/><path d="M2 6.00016L1.69303 5.60549C1.57124 5.70021 1.5 5.84587 1.5 6.00016H2ZM8 1.3335L8.30697 0.93882C8.12642 0.798388 7.87358 0.798388 7.69303 0.93882L8 1.3335ZM2.39052 14.2763L2.74408 13.9228V13.9228L2.39052 14.2763ZM5 14.6668V15.1668C5.27614 15.1668 5.5 14.943 5.5 14.6668H5ZM5 8V7.5C4.72386 7.5 4.5 7.72386 4.5 8H5ZM11 8H11.5C11.5 7.72386 11.2761 7.5 11 7.5V8ZM11 14.6668H10.5C10.5 14.943 10.7239 15.1668 11 15.1668V14.6668ZM14 6.00016H14.5C14.5 5.84587 14.4288 5.70021 14.307 5.60549L14 6.00016ZM2.30697 6.39484L8.30697 1.72817L7.69303 0.93882L1.69303 5.60549L2.30697 6.39484ZM2.5 13.3335V6.00016H1.5V13.3335H2.5ZM2.74408 13.9228C2.5878 13.7665 2.5 13.5545 2.5 13.3335H1.5C1.5 13.8197 1.69315 14.286 2.03697 14.6299L2.74408 13.9228ZM3.33333 14.1668C3.11232 14.1668 2.90036 14.079 2.74408 13.9228L2.03697 14.6299C2.38079 14.9737 2.8471 15.1668 3.33333 15.1668V14.1668ZM5 14.1668H3.33333V15.1668H5V14.1668ZM5.5 14.6668V8H4.5V14.6668H5.5ZM5 8.5H11V7.5H5V8.5ZM10.5 8V14.6668H11.5V8H10.5ZM12.6667 14.1668H11V15.1668H12.6667V14.1668ZM13.2559 13.9228C13.0996 14.079 12.8877 14.1668 12.6667 14.1668V15.1668C13.1529 15.1668 13.6192 14.9737 13.963 14.6299L13.2559 13.9228ZM13.5 13.3335C13.5 13.5545 13.4122 13.7665 13.2559 13.9228L13.963 14.6299C14.3068 14.286 14.5 13.8197 14.5 13.3335H13.5ZM13.5 6.00016V13.3335H14.5V6.00016H13.5ZM7.69303 1.72817L13.693 6.39484L14.307 5.60549L8.30697 0.93882L7.69303 1.72817Z" fill="#4E5E80"/></svg>,
        },
        {
            href: account && game.currentRoom !== 0 ? `/tables/${game.currentRoom}` : {},
            icon: <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.0001 2.625C16.0001 1.1775 12.4161 0 8.00012 0C3.58412 0 0.00012207 1.1775 0.00012207 2.625C0.00012207 3.9825 3.16012 5.1075 7.20012 5.235V10.25H5.88012C5.22412 10.25 4.64012 10.625 4.39212 11.195L3.60012 13.0475C3.41612 13.505 3.76812 14 4.29612 14C4.60012 14 4.87212 13.8275 4.98412 13.565L5.76012 11.75H10.2401L11.0161 13.565C11.1281 13.8275 11.4001 14 11.7041 14C12.2321 14 12.5921 13.505 12.3921 13.0475L11.6001 11.195C11.3601 10.625 10.7681 10.25 10.1201 10.25H8.80012V5.235C12.8401 5.1075 16.0001 3.9825 16.0001 2.625Z" fill="#4E5E80"/></svg>
        },
        {
            href: account && game.currentGame !== 0 ? `/table/${game.currentGame}` : {},
            icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_669_5312)"><path d="M4.25012 7.4V9H11.7501V7.4C11.7501 5.912 12.7101 4.672 14.0001 4.312V3.4C14.0001 2.08 12.9876 1 11.7501 1H4.25012C3.01262 1 2.00012 2.08 2.00012 3.4V4.312C3.29012 4.672 4.25012 5.912 4.25012 7.4Z" fill="#4E5E80"/><path d="M14.5456 6C13.7456 6 13.091 6.675 13.091 7.5V10.5H2.90921V7.5C2.90921 6.675 2.25467 6 1.45467 6C0.654668 6 0.00012207 6.675 0.00012207 7.5V11.25C0.00012207 12.4875 0.98194 13.5 2.18194 13.5V14.25C2.18194 14.6625 2.50921 15 2.90921 15C3.30921 15 3.63649 14.6625 3.63649 14.25V13.5H12.3638V14.25C12.3638 14.6625 12.691 15 13.091 15C13.491 15 13.8183 14.6625 13.8183 14.25V13.5C15.0183 13.5 16.0001 12.4875 16.0001 11.25V7.5C16.0001 6.675 15.3456 6 14.5456 6Z" fill="#4E5E80"/></g><defs><clipPath id="clip0_669_5312"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>
        },
        // {
        //     href: '/kit',
        //     icon: <i className="fa-sharp fa-solid fa-puzzle-piece"></i>
        // }
    ]

    return <>
        <div className={ css.container }>
            <div className={ css.card }>
                <div className={ css.section }>
                    <img 
                        src="/assets/images/logo.svg"
                        alt="Logo"
                        className={ css.logo }
                    />
                    { buttons.map((button, index)=>
                        <SidebarButton
                            key={index}
                            href={button.href}
                            icon={button.icon}
                        />
                    ) }
                </div>
                <div>
                    <div className={ [css.section, css.links].join(' ') }>
                        <Link className={ css.link } onClick={ () => dispatch(setGameInfoDialog(!mainframe.gameInfoDialog)) } href={ '#' }>Info</Link>
                        <Link className={ css.link } href='#'>Help</Link>
                        <Link className={ css.link } target='_blank' href='https://ursas.gitbook.io/ursas-game/'>Rules</Link>
                    </div>
                    { Boolean(account) &&
                        <Button
                            onClick={ () => dispatch(setMintDialog(!mainframe.mintDialog)) }
                            className={ css.button }
                            size={ ButtonSize.SM }
                        >
                            buy
                        </Button>
                    }
                </div>
            </div>
        </div>
    </>
}

export default Sidebar