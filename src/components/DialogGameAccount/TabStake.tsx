import css from './index.module.scss'

import {useDispatch, useSelector} from 'react-redux'

import {AppDispatch, RootState} from '@/app/store'

import Button, {Size as ButtonSize, Variant as ButtonVariant, Color as ButtonColor} from '@components/UIButton'
import Card from '@components/Card'

import {state} from '.'
import {enterInGameByTokenIds} from "@/agents/web3/gameContract/tables";
import {useState} from "react";
import {setLoaderButton} from "@/features/table/tableSlice";
import {setRefetch} from "@/features/mainframe/mainframeSlice";


interface props {
  state: state
  setState: Function
}

export default (props: props) => {
  const game = useSelector((state: RootState) => state.game)
  const loader = useSelector((state: RootState) => state.table.loadingButton)
  const dispatch = useDispatch<AppDispatch>()

  const toggleStakeCard = (tokenId: Number) => {
    props.setState({
      ...props.state,
      selectedStakeCardIds: props.state.selectedStakeCardIds.includes(tokenId)
        ? props.state.selectedStakeCardIds.filter(i => i !== tokenId)
        : [...props.state.selectedStakeCardIds, tokenId]
    })
  }

  const selectStakeCards = () => props.setState({
    ...props.state,
    selectedStakeCardIds: game.walletCards
      .filter(card => card.rank === 1)
      .map(card => {
        return card.tokenId
      })
  })

  const resetStakeCards = () => props.setState({...props.state, selectedStakeCardIds: []})

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
          {/*{game.walletCards.filter(card => card.rank === 1).length ? (*/}
          {game.walletCards.find(card => card.rank === 1) ? (
            game.walletCards.filter(card => card.rank === 1 && !card.playing).map((card, index) => (
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
              <br/>
              wallet account doesn{"'"}t have URSAS ace NFT{"'"}s
            </>
          )}
        </div>
      </div>
      {/*<div className={css.footer}>*/}
      {/*    <button onClick={selectStakeCards} className={css.footerButton}>*/}
      {/*        <span className={css.footerButtonText}>*/}
      {/*            select all*/}
      {/*        </span>*/}
      {/*    </button>*/}
      {/*    <button onClick={resetStakeCards} className={css.footerButton}>*/}
      {/*        <span className={css.footerButtonText}>*/}
      {/*            reset all*/}
      {/*        </span>*/}
      {/*    </button>*/}
      {/*</div>*/}
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
          {game.walletCards.find(card => card.rank === 1) ? (
            game.walletCards.filter(card => card.rank === 1 && card.playing).map((card, index) => (
              <Card
                className={css.card}
                key={index}
                {...card}
              />
            ))
          ) : (
            <>
              <br/>
              Game account is empty!
            </>
          )}
        </div>
      </div>
    </div>
    {Boolean(props.state.selectedStakeCardIds.length) &&
      <Button
        disabled={loader}
        size={ButtonSize.SM}
        color={ButtonColor.DARK}
        variant={ButtonVariant.NORMAL}
        className={css.arrowFirst}
        onClick={() => {
          dispatch(setLoaderButton(true))
          enterInGameByTokenIds(1, 0, props.state.selectedStakeCardIds as number[]).then(() => {
            resetStakeCards()
            dispatch(setLoaderButton(false))
            dispatch(setRefetch(true))
          }).catch(() => {
            resetStakeCards()
            dispatch(setLoaderButton(false))
          })
        }
        }
      >
        <i className="fa-solid fa-arrow-right"></i>
      </Button>
    }
  </>
}