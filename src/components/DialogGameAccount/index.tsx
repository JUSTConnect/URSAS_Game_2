import css from './index.module.scss'

import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEthers, useEtherBalance } from '@usedapp/core'

import { AppDispatch, RootState } from '@/app/store'
import { setDisableWalletModal, setGameAccountDialog } from '@/features/mainframe/mainframeSlice'
import { fetchWalletCards } from '@/features/game/gameSlice'

import { cardsRefound, cardsBurn, cardsStake } from '@/features/game/gameSlice'
import Dialog, {
    Header,
    HeaderButtons,
    Footer,
    FooterButtons,
    Content,
} from '@components/Dialog'
import Button, {
    Color as ButtonColor,
    Variant as ButtonVariant,
    Size as ButtonSize,
} from '@components/UIButton'
import Card, { CardRank } from '@components/Card'
import Blur from '../Blur'


enum tabs
{
    STAKE = 'Stake',
    WALLET = 'Wallet'
}


export default (props: React.HTMLAttributes<HTMLDivElement>) => {

    const dispatch = useDispatch<AppDispatch>()
    const game = useSelector((state: RootState) => state.game)
    const mainframe = useSelector((state: RootState) => state.mainframe)
    const [ selectedWalletCards, setSelectedWalletCards ] = useState<number[]>([])
    const [ selectedStakeCards, setSelectedStakeCards ] = useState<number[]>([])
    const [ addressCopied, setAddressCopied ] = useState<boolean>(false)
    const { account } = useEthers()
    const balance = useEtherBalance(account)

    useEffect(()=>{
        account && dispatch(fetchWalletCards(account))   
    }, [])

    const toggleCard =(get: number[], set: Function, number: number) =>
    {
        if (get.includes(number)) {
            set(get.filter(item => item !== number))
        } else {
            set([...get, number])
        }
    }

    const resetWalletCards = () => setSelectedWalletCards([])

    const selectWalletCards = () => setSelectedWalletCards(game.walletCards.map((item, index) => index))

    const resetStakeCards = () => setSelectedStakeCards([])

    const selectStakeCards = () => setSelectedStakeCards(
        game.walletCards
            .filter(card => card.rank === CardRank.N1)
            .map((item, index) => index)
    )

    return (
        <>
            <Blur
                onClick={ () => dispatch(setGameAccountDialog([false, tabs.WALLET])) }
                isActive={ mainframe.gameAccountDialog[0] }
            />
            <div className={
                [
                    css.wrapper,
                    mainframe.gameAccountDialog[0] && css.active
                ].join(' ')
            }>
                <Dialog className={ [css.dialog, props.className].join(' ') }>
                    <Header>
                        <div className={ css.balances }>
                            <div className={ css.balance }>
                                <img className={ css.balanceIcon } src="/assets/images/icons/dialog-gameaccount-ursu.png" alt="ursu" />
                                <div className={ 'd-desktop' }>
                                    URSU
                                </div>
                                <span className={ 'textPrimary' }>12</span>
                            </div>
                            <div className={ css.balance }>
                                <img className={ css.balanceIcon } src="/assets/images/icons/dialog-gameaccount-matic.png" alt="matic" />
                                <div className={ 'd-desktop' }>
                                    MATIC
                                </div>
                                <span className={ 'textPrimary' }>{ balance?._hex && Math.round(Number(ethers.utils.formatEther(balance?._hex))*10000)/10000 }</span>
                            </div>
                        </div>
                        <HeaderButtons>
                            <Button
                                onClick={ () => {
                                    navigator.clipboard.writeText(account || '')
                                    setAddressCopied(true)
                                    setTimeout(()=>{
                                        setAddressCopied(false)
                                    }, 3000)
                                } }
                                disabled={ addressCopied }
                                color={ ButtonColor.DARK }
                                variant={ ButtonVariant.NORMAL }
                                size={ ButtonSize.SM }
                                icon={ <i className="fa-solid fa-link"></i> }
                                iconTablet
                            >
                                { addressCopied ? (
                                    <>
                                        <i className="fa-solid fa-check"></i>
                                        &nbsp;
                                        copied
                                    </>
                                ) : (
                                    'copy adress'
                                ) }
                            </Button>
                            <Button
                                color={ ButtonColor.DARK }
                                variant={ ButtonVariant.NORMAL }
                                size={ ButtonSize.SM }
                                icon={ <i className="fa-solid fa-repeat"></i> }
                                iconTablet
                            >
                                change wallet
                            </Button>
                            <Button
                                color={ ButtonColor.DARK }
                                variant={ ButtonVariant.NORMAL }
                                size={ ButtonSize.SM }
                                icon={ <i className="fa-solid fa-power-off"></i> }
                                iconTablet
                                onClick={ () => dispatch(setDisableWalletModal(true)) }
                            >
                                disconnect
                            </Button>
                            <Button
                                onClick={ () => dispatch(setGameAccountDialog([false, tabs.WALLET])) }
                                color={ ButtonColor.DARK }
                                variant={ ButtonVariant.OUTLINE }
                                size={ ButtonSize.SM }
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </Button>
                        </HeaderButtons>
                    </Header>
                    <Content>
                        <div className={ css.containers }>
                            { mainframe.gameAccountDialog[1] === tabs.STAKE &&
                                <>
                                    <div className={
                                        [
                                            css.container,
                                        ].join(' ')
                                    }>
                                        <div className={ css.header }>
                                            Wallet account
                                        </div>
                                        <div className={ css.content }>
                                            <div className={ css.cards }>
                                                { game.walletCards.filter(card => card.rank === CardRank.N1).length ? (
                                                    game.walletCards.filter(card => card.rank === CardRank.N1).map((card, index) => (
                                                        <Card
                                                            key={ index }
                                                            className={
                                                                [
                                                                    css.card,
                                                                    selectedStakeCards.includes(index) && css.cardActive
                                                                ].join(' ')
                                                            }
                                                            onClick={ ()=> toggleCard(selectedStakeCards, setSelectedStakeCards, index) }
                                                            rank={ card.rank }
                                                            suit={ card.suit }
                                                        />
                                                    ))
                                                ) : (
                                                    <>
                                                        <br />
                                                        wallet account doesn{"'"}t have URSAS ace NFT{"'"}s
                                                    </>
                                                ) }
                                            </div>
                                        </div>
                                        <div className={ css.footer }>
                                            <button onClick={ selectStakeCards } className={ css.footerButton }>
                                                <span className={ css.footerButtonText }>
                                                    select all
                                                </span>
                                            </button>
                                            <button onClick={ resetStakeCards } className={ css.footerButton }>
                                                <span className={ css.footerButtonText }>
                                                    reset all
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={
                                        [
                                            css.container,
                                            selectedStakeCards.length && css.disabled
                                        ].join(' ')
                                    }>
                                        <div className={ css.header }>
                                            Game account
                                        </div>
                                        <div className={ css.content }>
                                            <div className={ css.cards }>
                                                { game.gameCards.length ? (
                                                    game.gameCards.map((card, index) => (
                                                        <Card
                                                            className={ css.card }
                                                            key={ index }
                                                            rank={ card.rank }
                                                            suit={ card.suit }
                                                        />
                                                    ))
                                                ) : (
                                                    <>
                                                        <br />
                                                        Game account is empty!
                                                    </>
                                                ) }
                                            </div>
                                        </div>
                                    </div>
                                    { Boolean(selectedStakeCards.length) && Boolean(game.gameCards.length) &&
                                        <Button
                                            size={ ButtonSize.SM }
                                            color={ ButtonColor.DARK }
                                            variant={ ButtonVariant.NORMAL }
                                            className={ css.arrowFirst }
                                        >
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </Button>
                                    }
                                </>
                            }
                            { mainframe.gameAccountDialog[1] == tabs.WALLET &&
                                <div className={
                                    [
                                        css.container
                                    ].join(' ')
                                }>
                                    <div className={ css.header }>
                                        Wallet account
                                    </div>
                                    <div className={ css.content }>
                                        <div className={ css.cards }>
                                            { game.walletCards.length ? (
                                                game.walletCards.map((card, index) => (
                                                    <Card
                                                        key={ index }
                                                        className={
                                                            [
                                                                css.card,
                                                                selectedWalletCards.includes(index) && css.cardActive
                                                            ].join(' ')
                                                        }
                                                        onClick={ ()=> toggleCard(selectedWalletCards, setSelectedWalletCards, index) }
                                                        rank={ card.rank }
                                                        suit={ card.suit }
                                                    />
                                                ))
                                            ) : (
                                                <>
                                                    <br />
                                                    wallet account doesn{"'"}t have URSAS NFT{"'"}s { game.gameCards.length ? ':)' : ':('}
                                                </>
                                            ) }
                                        </div>
                                    </div>
                                    {/* <div className={ css.footer }>
                                        <button onClick={ selectWalletCards } className={ css.footerButton }>
                                            <span className={ css.footerButtonText }>
                                                select all
                                            </span>
                                        </button>
                                        <button onClick={ resetWalletCards } className={ css.footerButton }>
                                            <span className={ css.footerButtonText }>
                                                reset all
                                            </span>
                                        </button>
                                    </div> */}
                                </div>                                                            
                            }
                        </div>
                    </Content>
                    { mainframe.gameAccountDialog[1] === tabs.STAKE &&
                    <Footer>
                            <FooterButtons>
                                    <Button
                                        color={ ButtonColor.LIGHT }
                                        size={ ButtonSize.SM }
                                        fullWidth
                                        disabled={ !selectedStakeCards.length }
                                        onClick={ () => {
                                            dispatch(cardsStake(selectedStakeCards))
                                            setSelectedStakeCards([])
                                        } }
                                    >
                                        stake
                                    </Button>
                                {/* { mainframe.gameAccountDialog[1] == tabs.WALLET &&
                                    <>
                                    <Button
                                    color={ ButtonColor.LIGHT }
                                    size={ ButtonSize.SM }
                                    fullWidth
                                    disabled={ !selectedWalletCards.length }
                                    onClick={ () => {
                                        dispatch(cardsRefound(selectedWalletCards))
                                                setSelectedWalletCards([])
                                            } }
                                            >
                                            refund
                                            </Button>
                                            <Button
                                            color={ ButtonColor.LIGHT }
                                            size={ ButtonSize.SM }
                                            fullWidth
                                            disabled={ !selectedWalletCards.length && !selectedWalletCards.length }
                                            onClick={ () => {
                                                dispatch(cardsBurn(selectedWalletCards))
                                                setSelectedWalletCards([])
                                            } }
                                            >
                                            burn
                                            </Button>
                                            </>
                                        } */}
                            </FooterButtons>
                    </Footer>
                    }
                </Dialog>
                <div className={ css.tabs }>
                    <div className={ css.inner }>
                        <button
                            onClick={ () => dispatch(setGameAccountDialog([mainframe.gameAccountDialog[0], tabs.WALLET])) }
                            className={
                                [
                                    css.tab,
                                    mainframe.gameAccountDialog[1] == tabs.WALLET && css.tabActive
                                ].join(' ')
                            }
                            >
                            Wallet
                        </button>
                        <button
                            onClick={ () => dispatch(setGameAccountDialog([mainframe.gameAccountDialog[0], tabs.STAKE])) }
                            className={
                                [
                                    css.tab,
                                    mainframe.gameAccountDialog[1] == tabs.STAKE && css.tabActive
                                ].join(' ')
                            }
                        >
                            Stake
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export { tabs }