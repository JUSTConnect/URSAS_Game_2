import css from './index.module.scss'

import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'

import Button, {Size as ButtonSize, Variant as ButtonVariant, Color as ButtonColor} from '@components/UIButton'
import Card from '@components/Card'

import { state } from '.'


interface props
{
    state: state
    setState: Function
}

export default (props: props) => {
    const game = useSelector((state: RootState) => state.game)

    const toggleStakeCard = (tokenId: Number) => {
        props.setState({
            ...props.state,
            selectedStakeCardIds: props.state.selectedStakeCardIds.includes(tokenId)
                ? props.state.selectedStakeCardIds.filter(i => i!==tokenId)
                : [...props.state.selectedStakeCardIds, tokenId]
        })
    }

    const selectStakeCards = () => props.setState({
        ...props.state,
        selectedStakeCardIds: game.walletCards
            .filter(card => card.rank === 1)
            .map(card => card.tokenId)
    })

    const resetStakeCards = () => props.setState({ ...props.state, selectedStakeCardIds: [] })

    return <>
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
                                key={index}
                                className={
                                    [
                                        css.card,
                                        card.playing && css.cardDisabled,
                                        props.state.selectedStakeCardIds.includes(Number(card.tokenId)) && css.cardActive
                                    ].join(' ')
                                }
                                onClick={() => toggleStakeCard(card.tokenId)}
                                {...card}
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
            {/* <div className={css.footer}>
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
            </div> */}
        </div>
        <div className={
            [
                css.container,
                props.state.selectedStakeCardIds.length && css.disabled
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
                                className={css.card}
                                key={index}
                                {...card}
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
        {Boolean(props.state.selectedStakeCardIds.length) &&
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