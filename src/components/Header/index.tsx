import css from './index.module.css'

import { useState, useContext } from 'react'

import Badge from '@components/Badge'
import Button from '@components/Button'
import Dropdown from '@/components/Header/Dropdown'
import HeaderBase, { HeaderSection } from '@/components/HeaderBase'
import { MainframeContext } from '@components/Mainframe'


interface HeaderProps extends React.HTMLAttributes<HTMLDivElement>
{
    connected?: boolean
}


const Header = (props: HeaderProps) => {
    const [activeDropdown, setActiveDropdown] = useState(0)
    const context = useContext(MainframeContext)

    return <HeaderBase
    >
        { props.connected ? (
            <>
                <HeaderSection>
                    <div className={ [css.walletHash].join(' ') }>
                        DFYrNUgxguiGKmZKdbGga...
                    </div>
                    <Button className={ [css.walletButton, 'd-mobile'].join(' ') }>
                        <img src="/assets/images/icons/wallet.svg" alt="wallet" />
                    </Button>
                    { !context.gameOver ? (
                        <>
                            <Dropdown
                                values={
                                    [
                                        [1],
                                        [1],
                                        [1]
                                    ]
                                }
                                rooms={true}
                                controller={{
                                    id: 1,
                                    currentId: activeDropdown,
                                    setId: setActiveDropdown
                                }}
                                callback={ context.setContentBlured }
                                text={ 
                                    <>
                                        <span className={ 'd-desktop' }>Rooms</span>
                                        <img className={ 'd-mobile' } src="/assets/images/icons/home.svg" alt="" />
                                    </>
                                }
                                badgeValue={ 16 }
                            />
                            <Dropdown
                                values={
                                    [...Array(10)].map(item=>[12, 10])
                                }
                                tables={true}
                                controller={{
                                    id: 2,
                                    currentId: activeDropdown,
                                    setId: setActiveDropdown
                                }}
                                callback={ context.setContentBlured }
                                text={
                                    <>
                                        <span className={ 'd-desktop' }>Tables</span>
                                        <img className={ 'd-mobile' } src="/assets/images/icons/table.svg" alt="" />
                                    </>
                                }
                                badgeValue={ 8 }
                            />
                        </>
                    ) : '' }
                </HeaderSection>
                <HeaderSection>
                    <img className={ 'd-mobile' } src="/assets/images/icons/chair.svg" alt="chair" />
                        <div>
                            <span className={ 'd-desktop' }>Places&nbsp;</span>
                            <Badge transparentMobile={ true }>&nbsp;5/5&nbsp;</Badge>
                        </div>
                        <Button>CLAIm</Button>
                        <div className={ css.gameOverSectionButton }>
                            Button
                        </div>
                        { context.gameOver ? (
                            <div className={ css.gameOverSection }>
                                <div className={ 'd-mobile' }>
                                    <div>
                                        <div className={ 'textMuted' }>
                                            announcement of results
                                        </div>
                                        04:51
                                    </div>
                                </div>
                                <div className={ css.gameOverButtons }>
                                    <Button primary={true}>REFOUND</Button>
                                    <Button primary={true}>BURN</Button>
                                </div>
                            </div>
                        ) : '' }
                </HeaderSection>
            </>
        ) : (
            <>
                <HeaderSection>
                    <Button onClick={ () => context.setConnectWalletModal(true) }>CONNECT WALLET</Button>
                </HeaderSection>
            </>
        ) }
    </HeaderBase>
}


export default Header