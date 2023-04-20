import css from './index.module.scss'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { setDisableWalletModal, setGameAccountDialog } from '@/features/mainframe/mainframeSlice'

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


interface props extends React.HTMLAttributes<HTMLDivElement>
{
    active?: boolean
}

enum tabs
{
    STAKE = 'Stake',
    WALLET = 'Wallet'
}

export default (props: props) => {
    const dispatch = useDispatch()
    const game = useSelector((state: RootState) => state.game)
    const [ selectedWalletCards, setSelectedWalletCards ] = useState<number[]>([])
    const [ selectedStakeCards, setSelectedStakeCards ] = useState<number[]>([])
    const [ activeTab, setActiveTab ] = useState<tabs>(tabs.WALLET)
    const [ addressCopied, setAddressCopied ] = useState<boolean>(false)

    const toggleWalletCard = (number: number) => {
        if (selectedWalletCards.includes(number)) {
            setSelectedWalletCards(selectedWalletCards.filter(item=>item!==number))
        } else {
            setSelectedWalletCards([...selectedWalletCards, number])
        }
    }

    const resetWalletCards = () => setSelectedWalletCards([])

    const selectWalletCards = () => setSelectedWalletCards(game.walletCards.map((item, index) => index))

    const toggleStakeCard = (number: number) => {
        if (selectedStakeCards.includes(number)) {
            setSelectedStakeCards(selectedStakeCards.filter(item=>item!==number))
        } else {
            setSelectedStakeCards([...selectedStakeCards, number])
        }
    }

    const resetStakeCards = () => setSelectedStakeCards([])

    const selectStakeCards = () => setSelectedStakeCards(
        game.walletCards
            .filter(card => card.rank === CardRank.POT)
            .map((item, index) => index)
    )

    return (
        <>
            <Blur
                onClick={ () => dispatch(setGameAccountDialog(false)) }
                isActive={ props.active }
            />
            <div className={
                [
                    css.wrapper,
                    props.active && css.active
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
                                <span className={ 'textPrimary' }>12</span>
                            </div>
                        </div>
                        <HeaderButtons>
                            <Button
                                onClick={ () => {
                                    navigator.clipboard.writeText('DFYrNUgxguiGKmZKdbGgaDFYrNUgxguiGKmZK')
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
                                onClick={ () => dispatch(setGameAccountDialog(false)) }
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
                            { activeTab === tabs.STAKE &&
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
                                                { game.walletCards.length ? (
                                                    game.walletCards.filter(card => card.rank === CardRank.POT).map((card, index) => (
                                                        <Card
                                                            key={ index }
                                                            className={
                                                                [
                                                                    css.card,
                                                                    selectedStakeCards.includes(index) && css.cardActive
                                                                ].join(' ')
                                                            }
                                                            onClick={ ()=> toggleStakeCard(index) }
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
                            { activeTab == tabs.WALLET &&
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
                                                        onClick={ ()=> toggleWalletCard(index) }
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
                                    <div className={ css.footer }>
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
                                    </div>
                                </div>                                                            
                            }
                        </div>
                    </Content>
                    <Footer>
                        <FooterButtons>
                            { activeTab === tabs.STAKE &&
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
                            }
                            { activeTab == tabs.WALLET &&
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
                            }
                        </FooterButtons>
                    </Footer>
                </Dialog>
                <div className={ css.tabs }>
                    <div className={ css.inner }>
                        <button
                            onClick={ () => setActiveTab(tabs.WALLET) }
                            className={
                                [
                                    css.tab,
                                    activeTab == tabs.WALLET && css.tabActive
                                ].join(' ')
                            }
                        >
                            Wallet
                        </button>
                        <button
                            onClick={ () => setActiveTab(tabs.STAKE) }
                            className={
                                [
                                    css.tab,
                                    activeTab == tabs.STAKE && css.tabActive
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