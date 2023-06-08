import css from './index.module.scss'

import {useSelector} from 'react-redux'

import {RootState} from '@/app/store'

import Card from '@components/Card'

import {state} from '.'
import Button from "@components/UIButton";
import {Footer, FooterButtons} from "@components/Dialog";


interface props {
  state: state
  setState: Function
}

export default (props: props) => {
  const game = useSelector((state: RootState) => state.game)

  const toggleWalletCard = (tokenId: Number) => {
    props.setState({
      ...props.state,
      selectedWalletCardIds: props.state.selectedWalletCardIds.includes(tokenId)
        ? props.state.selectedWalletCardIds.filter(i => i !== tokenId)
        : [...props.state.selectedWalletCardIds, tokenId]
    })
  }

  const selectWalletCards = () => props.setState({
    ...props.state,
    selectedWalletCards: game.walletCards.map(card => card.tokenId)
  })

  const resetStakeCards = () => props.setState({...props.state, selectedWalletCards: []})

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
                  !game.gameOver && css.cardDisabled,
                  css.card,
                  props.state.selectedWalletCardIds.includes(card.tokenId) && css.cardActive
                ].join(' ')
              }
              onClick={() => {
                toggleWalletCard(card.tokenId);
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
      {/*<button onClick={selectWalletCards} className={css.footerButton}>*/}
      {/*          <span className={css.footerButtonText}>*/}
      {/*              select all*/}
      {/*          </span>*/}
      {/*</button>*/}
      {/*<button onClick={resetStakeCards} className={css.footerButton}>*/}
      {/*          <span className={css.footerButtonText}>*/}
      {/*              reset all*/}
      {/*          </span>*/}
      {/*</button>*/}
    </div>
    {/*<div className={css.gameOverButtons}>*/}
    {/*</div>*/}
  </div>
}