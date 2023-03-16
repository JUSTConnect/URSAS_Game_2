import css from './index.module.css'

import { useState } from 'react'
import Badge from '@components/Badge'
import Button from '@components/Button'
import Dropdown from '@components/Dropdown'
import HeaderBase, { HeaderSection } from '@/components/HeaderBase'


interface HeaderProps extends React.HTMLAttributes<HTMLDivElement>
{
    connected?: boolean
    setBlured?: Function
}


const Header = (props: HeaderProps) => {
    const [activeDropdown, setActiveDropdown] = useState(0)

    return <HeaderBase>
        { props.connected ? (
            <>
                <HeaderSection>
                    <div className={ ['textActive', css.walletHash].join(' ') }>
                        DFYrNUgxguiGKmZKdbGga...
                    </div>
                    <Button className={ [css.headerWalletButton, 'd-mobile'].join(' ') }>
                        <img src="/assets/images/icons/wallet.svg" alt="wallet" />
                    </Button>
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
                        callback={ props.setBlured }
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
                            [
                                [12, 10],
                                [12, 10],
                                [12, 10]
                            ]
                        }
                        tables={true}
                        controller={{
                            id: 2,
                            currentId: activeDropdown,
                            setId: setActiveDropdown
                        }}
                        callback={ props.setBlured }
                        text={
                            <>
                                <span className={ 'd-desktop' }>Tables</span>
                                <img className={ 'd-mobile' } src="/assets/images/icons/table.svg" alt="" />
                            </>
                        }
                        badgeValue={ 8 }
                    />
                </HeaderSection>
                <HeaderSection>
                        <img className={ 'd-mobile' } src="/assets/images/icons/chair.svg" alt="chair" />
                    <div>
                        <span className={ 'd-desktop' }>Places</span>
                        &nbsp;
                        <Badge>5/5</Badge>
                    </div>
                    <Button className={ 'd-desktop' }>CLAIm</Button>
                </HeaderSection>
            </>
        ) : (
            <>
                <HeaderSection>
                    <Button>CONNECT WALLET</Button>
                </HeaderSection>
            </>
        ) }
    </HeaderBase>
}


export default Header