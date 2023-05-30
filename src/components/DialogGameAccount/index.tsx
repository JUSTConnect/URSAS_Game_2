import css from './index.module.scss'

import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useEthers} from '@usedapp/core'

import { getCardListUser } from '@/agents/web3/mintContract/cards'

import {AppDispatch, RootState} from '@/app/store'
import {setGameAccountDialog} from '@/features/mainframe/mainframeSlice'
import {setWalletCards, cardsStake} from '@/features/game/gameSlice'

import Blur from '@components/Blur'
import Card from '@components/Card'
import Button, { Color as ButtonColor, Size as ButtonSize, Variant as ButtonVariant} from '@components/UIButton'
import Dialog, {Content, Footer, FooterButtons} from '@components/Dialog'

import Header from './Header'

export enum tabs {
    STAKE = 'Stake',
    WALLET = 'Wallet'
}

export interface state {
    selectedWalletCards: number[]
    selectedStakeCards: number[]
    addressCopied: boolean
}

export default (props: React.HTMLAttributes<HTMLDivElement>) => {

    const dispatch = useDispatch<AppDispatch>()

    const game = useSelector((state: RootState) => state.game)
    const mainframe = useSelector((state: RootState) => state.mainframe)

    const [state, setState] = useState<state>({
        selectedWalletCards: [],
        selectedStakeCards: [],
        addressCopied: false,
    })

    const [selectedWalletCards, setSelectedWalletCards] = useState<number[]>([])
    const [selectedStakeCards, setSelectedStakeCards] = useState<number[]>([])

    const { account } = useEthers()

    useEffect(() => {
        // account && dispatch(fetchWalletCards(account))
        setValues()
    }, [])

    const setValues = async () => {
        if (account) {
            let b = await getCardListUser(account)
            dispatch(setWalletCards(b))
        }
    }

    const toggleCard = (get: number[], set: Function, number: number) => {
        if (get.includes(number)) {
            set(get.filter(item => item !== number))
        } else {
            set([...get, number])
        }
    }

    const resetWalletCards = () => setState({ ...state, selectedWalletCards: [] })
    const selectWalletCards = () => setState({ ...state, selectedWalletCards: game.walletCards.map((item, index) => index) })

    const resetStakeCards = () => setState({ ...state, selectedStakeCards: [] })
    const selectStakeCards = () => setState({
        ...state,
        selectedStakeCards: game.walletCards
            .filter(card => card.rank === 1)
            .map((item, index) => index)
    })

    console.log(game.walletCards)

    return (
        <>
            <Blur
                onClick={() => dispatch(setGameAccountDialog([false, tabs.WALLET]))}
                isActive={mainframe.gameAccountDialog[0]}
            />
            <div className={
                [
                    css.wrapper,
                    mainframe.gameAccountDialog[0] && css.active
                ].join(' ')
            }>
                <Dialog className={[css.dialog, props.className].join(' ')}>
                    {/* { string(getCards.state.transaction) } */}
                    <Header state={state} setState={setState}/>
                    <Content>
                        <div className={css.containers}>
                            {mainframe.gameAccountDialog[1] === tabs.STAKE &&
                                <>
                                    <div className={
                                        [
                                            css.container,
                                        ].join(' ')
                                    }>
                                        <div className={css.header}>
                                            Wallet account
                                        </div>
                                        <div className={css.content}>
                                            <div className={css.cards}>
                                                {game.walletCards.filter(card => card.rank === 1).length ? (
                                                    game.walletCards.filter(card => card.rank === 1).map((card, index) => (
                                                        <Card
                                                            tokenId={'1'}
                                                            key={index}
                                                            className={
                                                                [
                                                                    css.card,
                                                                    selectedStakeCards.includes(index) && css.cardActive
                                                                ].join(' ')
                                                            }
                                                            onClick={() => toggleCard(selectedStakeCards, setSelectedStakeCards, index)}
                                                            rank={card.rank}
                                                            suit={card.suit}
                                                        />
                                                    ))
                                                ) : (
                                                    <>
                                                        <br />
                                                        wallet account doesn{"'"}t have URSAS ace NFT{"'"}s
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className={css.footer}>
                                            <button onClick={selectStakeCards} className={css.footerButton}>
                                                <span className={css.footerButtonText}>
                                                    select all
                                                </span>
                                            </button>
                                            <button onClick={resetStakeCards} className={css.footerButton}>
                                                <span className={css.footerButtonText}>
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
                                        <div className={css.header}>
                                            Game account
                                        </div>
                                        <div className={css.content}>
                                            <div className={css.cards}>
                                                {game.gameCards.length ? (
                                                    game.gameCards.map((card, index) => (
                                                        <Card
                                                            tokenId={'1'}
                                                            className={css.card}
                                                            key={index}
                                                            rank={card.rank}
                                                            suit={card.suit}
                                                        />
                                                    ))
                                                ) : (
                                                    <>
                                                        <br />
                                                        Game account is empty!
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {Boolean(selectedStakeCards.length) && Boolean(game.gameCards.length) &&
                                        <Button
                                            size={ButtonSize.SM}
                                            color={ButtonColor.DARK}
                                            variant={ButtonVariant.NORMAL}
                                            className={css.arrowFirst}
                                        >
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </Button>
                                    }
                                </>
                            }
                            {mainframe.gameAccountDialog[1] == tabs.WALLET &&
                                <div className={
                                    [
                                        css.container
                                    ].join(' ')
                                }>
                                    <div className={css.header}>
                                        Wallet account
                                    </div>
                                    <div className={css.content}>
                                        <div className={css.cards}>
                                            {game.walletCards.length ? (
                                                game.walletCards.map((card, index) => (
                                                    <Card
                                                        tokenId={'1'}
                                                        key={index}
                                                        className={
                                                            [
                                                                css.card,
                                                                selectedWalletCards.includes(index) && css.cardActive
                                                            ].join(' ')
                                                        }
                                                        onClick={() => toggleCard(selectedWalletCards, setSelectedWalletCards, index)}
                                                        rank={card.rank}
                                                        suit={card.suit}
                                                    />
                                                ))
                                            ) : (
                                                <>
                                                    <br />
                                                    wallet account doesn{"'"}t have URSAS NFT{"'"}s {game.gameCards.length ? ':)' : ':('}
                                                </>
                                            )}
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
                    {mainframe.gameAccountDialog[1] === tabs.STAKE &&
                        <Footer>
                            <FooterButtons>
                                <Button
                                    color={ButtonColor.LIGHT}
                                    size={ButtonSize.SM}
                                    fullWidth
                                    disabled={!selectedStakeCards.length}
                                    onClick={() => {
                                        dispatch(cardsStake(selectedStakeCards))
                                        setSelectedStakeCards([])
                                    }}
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
                <div className={css.tabs}>
                    <div className={css.inner}>
                        <button
                            onClick={() => dispatch(setGameAccountDialog([mainframe.gameAccountDialog[0], tabs.WALLET]))}
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
                            onClick={() => dispatch(setGameAccountDialog([mainframe.gameAccountDialog[0], tabs.STAKE]))}
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
