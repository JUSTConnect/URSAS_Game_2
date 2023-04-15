import css from './index.module.scss'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { setDisableWalletModal, setGameAccountDialog } from '@/features/mainframe/mainframeSlice'

import { cardsRefound, cardsWalletBurn, cardsGameBurn } from '@/features/game/gameSlice'
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
import Card from '@components/Card'
import Blur from '../Blur'


interface props extends React.HTMLAttributes<HTMLDivElement>
{
    active?: boolean
}

export default (props: props) => {
    const dispatch = useDispatch()
    const game = useSelector((state: RootState) => state.game)
    const [ selectedWalletCards, setSelectedWalletCards ] = useState<number[]>([])
    const [ selectedGameCards, setSelectedGameCards ] = useState<number[]>([])


    const toggleWalletCard = (number: number) => {
        if (selectedWalletCards.includes(number)) {
            setSelectedWalletCards(selectedWalletCards.filter(item=>item!==number))
        } else {
            setSelectedWalletCards([...selectedWalletCards, number])
        }
    }

    const toggleGameCard = (number: number) => {
        if (selectedGameCards.includes(number)) {
            setSelectedGameCards(selectedGameCards.filter(item=>item!==number))
        } else {
            setSelectedGameCards([...selectedGameCards, number])
        }
    }

    const resetWalletCards = () => {
        setSelectedWalletCards([])
    }

    const resetGameCards = () => {
        setSelectedGameCards([])
    }

    const selectWalletCards = () => {
        setSelectedWalletCards(game.walletCards.map((item, index) => index))
    }

    const selectGameCards = () => {
        setSelectedGameCards(game.gameCards.map((item, index) => index))
    }

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
                                color={ ButtonColor.DARK }
                                variant={ ButtonVariant.NORMAL }
                                size={ ButtonSize.SM }
                                icon={ <i className="fa-solid fa-link"></i> }
                                iconTablet
                            >
                                copy adress
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
                            { Boolean(selectedGameCards.length) &&
                                <Button
                                    size={ ButtonSize.SM }
                                    color={ ButtonColor.DARK }
                                    variant={ ButtonVariant.NORMAL }
                                    className={ css.arrowFirst }
                                >
                                    <i className="fa-solid fa-arrow-left"></i>
                                </Button>
                            }
                            <div className={
                                [
                                    css.container,
                                    selectedGameCards.length && css.disabled
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
                                                wallet account doesn{"'"}t have URSAS NFT{"'"}s {':('}
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
                            { Boolean(game.gameCards.length) &&
                                <div className={
                                    [
                                        css.container,
                                        selectedWalletCards.length && css.disabled
                                    ].join(' ')
                                }>
                                    <div className={ css.header }>
                                        Game account
                                    </div>
                                    <div className={ css.content }>
                                        <div className={ css.cards }>
                                            {
                                                game.gameCards.map((card, index) => (
                                                    <Card
                                                        key={ index }
                                                        className={
                                                            [
                                                                css.card,
                                                                selectedGameCards.includes(index) && css.cardActive
                                                            ].join(' ')
                                                        }
                                                        onClick={ ()=> toggleGameCard(index) }
                                                        rank={ card.rank }
                                                        suit={ card.suit }
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className={ css.footer }>
                                        <button onClick={ selectGameCards } className={ css.footerButton }>
                                            <span className={ css.footerButtonText }>
                                                select all
                                            </span>
                                        </button>
                                        <button onClick={ resetGameCards } className={ css.footerButton }>
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
                            <Button
                                color={ ButtonColor.LIGHT }
                                size={ ButtonSize.SM }
                                fullWidth
                                disabled={ !selectedGameCards.length }
                                onClick={ () => {
                                    dispatch(cardsRefound(selectedGameCards))
                                    setSelectedGameCards([])
                                } }
                            >
                                refound
                            </Button>
                            <Button
                                color={ ButtonColor.LIGHT }
                                size={ ButtonSize.SM }
                                fullWidth
                                disabled={ !selectedGameCards.length && !selectedWalletCards.length }
                                onClick={ () => {
                                    dispatch(cardsGameBurn(selectedGameCards))
                                    dispatch(cardsWalletBurn(selectedWalletCards))
                                    setSelectedGameCards([])
                                    setSelectedWalletCards([])
                                } }
                            >
                                burn
                            </Button>
                        </FooterButtons>
                    </Footer>
                </Dialog>
            </div>
        </>
    )
}