import css from './index.module.scss'

import { useDispatch } from 'react-redux'
import { ethers } from 'ethers'
import { useEthers, useEtherBalance } from '@usedapp/core'

import { setDisableWalletModal, setConnectWalletModal, setGameAccountDialog } from '@/features/mainframe/mainframeSlice'

import { Header, HeaderButtons } from '@components/Dialog'
import Button, { Size as ButtonSize, Color as ButtonColor, Variant as ButtonVariant } from '@components/UIButton'

import { state, tabs } from "."


interface props {
    state: state
    setState: Function
}


export default (props: props) => {

    const dispatch = useDispatch()

    const { account } = useEthers()
    const balance = useEtherBalance(account)

    return (
        <Header>
            <div className={css.balances}>
                <div className={css.balance}>
                    <img className={css.balanceIcon} src="/assets/images/icons/dialog-gameaccount-ursu.png" alt="ursu" />
                    <div className={'d-desktop'}>
                        URSU
                    </div>
                    <span className={'textPrimary'}>12</span>
                </div>
                <div className={css.balance}>
                    <img className={css.balanceIcon} src="/assets/images/icons/dialog-gameaccount-matic.png" alt="matic" />
                    <div className={'d-desktop'}>
                        MATIC
                    </div>
                    <span className={'textPrimary'}>{balance?._hex && Math.round(Number(ethers.utils.formatEther(balance?._hex)) * 10000) / 10000}</span>
                </div>
            </div>
            <HeaderButtons>
                <Button
                    onClick={() => {
                        navigator.clipboard.writeText(account || '')
                        props.setState({...props.state, addressCopied: true})
                        setTimeout(() => {
                            props.setState({...props.state, addressCopied: false})
                        }, 3000)
                    }}
                    disabled={Boolean(props.state.addressCopied)}
                    color={ButtonColor.DARK}
                    variant={ButtonVariant.NORMAL}
                    size={ButtonSize.SM}
                    icon={<i className="fa-solid fa-link"></i>}
                    iconTablet
                >
                    {props.state.addressCopied ? (
                        <>
                            <i className="fa-solid fa-check"></i>
                            &nbsp;
                            copied
                        </>
                    ) : (
                        'copy adress'
                    )}
                </Button>
                <Button
                    color={ButtonColor.DARK}
                    variant={ButtonVariant.NORMAL}
                    size={ButtonSize.SM}
                    icon={<i className="fa-solid fa-repeat"></i>}
                    iconTablet
                    onClick={ () => dispatch(setConnectWalletModal(true)) }
                >
                    change wallet
                </Button>
                <Button
                    color={ButtonColor.DARK}
                    variant={ButtonVariant.NORMAL}
                    size={ButtonSize.SM}
                    icon={<i className="fa-solid fa-power-off"></i>}
                    iconTablet
                    onClick={() => dispatch(setDisableWalletModal(true))}
                >
                    disconnect
                </Button>
                <Button
                    onClick={() => dispatch(setGameAccountDialog([false, tabs.WALLET]))}
                    color={ButtonColor.DARK}
                    variant={ButtonVariant.OUTLINE}
                    size={ButtonSize.SM}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </Button>
            </HeaderButtons>
        </Header>
    )
}