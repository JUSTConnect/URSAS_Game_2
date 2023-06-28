import css from './index.module.scss'

import {useSelector} from 'react-redux'

import {RootState} from '@/app/store'

import Card from '@components/Card'

import {selectedWalletCardState, state} from '.'
import Button from "@components/UIButton";
import {Footer, FooterButtons} from "@components/Dialog";
import {Dispatch, SetStateAction, useEffect} from "react";


interface props {
  state: state
  setState: Dispatch<SetStateAction<state>>
}

export default (props: props) => {
  const game = useSelector((state: RootState) => state.game)

  const toggleWalletCard = (card: selectedWalletCardState) => {
    props.setState({
      ...props.state,
      selectedWalletCard: props.state.selectedWalletCard.find(walletCard => walletCard.id === card.id)
        ? props.state.selectedWalletCard.filter(i => i.id !== card.id)
        : [...props.state.selectedWalletCard, card]
    })
  }

  const selectWalletCards = () => props.setState({
    ...props.state,
    selectedWalletCard: game.walletCards.map(card => {
      return {id: card.tokenId, suit: card.suit}
    })
  })

  const resetStakeCards = () => {
    props.setState({...props.state, selectedWalletCard: []})
  }

  useEffect(() => {
    return resetStakeCards
  }, [])

  return <div className={
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
          game.walletCards.map(card => (
            <Card
              key={card.tokenId as number}
              className={
                [
                  !game.gameOver && card.playing && css.cardDisabled,
                  css.card,
                  props.state.selectedWalletCard.find(walletCard => walletCard.id === card.tokenId) && css.cardActive
                ].join(' ')
              }
              onClick={() => {
                toggleWalletCard({id: card.tokenId, suit: card.suit});
              }}
              {...card}
            />
          ))
        ) : (
          <>
            <br/>
            wallet account doesn{"'"}t have URSAS NFT{"'"}s {game.gameCards.length ? ':)' : ':('}
          </>
        )}
      </div>
    </div>
    <div className={css.footer}>
      <button onClick={selectWalletCards} className={css.footerButton}>
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
    {/*<div className={css.gameOverButtons}>*/}
    {/*</div>*/}
  </div>
}