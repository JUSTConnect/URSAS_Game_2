import css from './index.module.scss'

import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useEthers} from '@usedapp/core'

import {cardBurn, cardRefund, getCardListUser, getCardListUserNew} from '@/agents/web3/mintContract/cards'

import {AppDispatch, RootState} from '@/app/store'
import {setGameAccountDialog, setRefetch} from '@/features/mainframe/mainframeSlice'
import {setWalletCards, cardsStake, cardsBurn, setMaxAvailableRoom} from '@/features/game/gameSlice'

import Blur from '@components/Blur'
import Dialog, {Content, Footer, FooterButtons} from '@components/Dialog'

import Header from './Header'
import TabStake from './TabStake'
import TabWallet from './TabWallet'
import Button from "@components/Button";
import {setLoaderButton} from "@/features/table/tableSlice";
import {enterInGameByTokenIds} from "@/agents/web3/gameContract/tables";
import {SuitSymbol} from "@lib/types/game";

export enum tabs {
  STAKE = 'Stake',
  WALLET = 'Wallet'
}

export interface selectedWalletCardState {
  id: Number
  suit: SuitSymbol
}

export interface state {
  selectedWalletCard: selectedWalletCardState[]
  selectedStakeCardIds: Number[]
  addressCopied: Boolean
}

export default (props: React.HTMLAttributes<HTMLDivElement>) => {

  const dispatch = useDispatch<AppDispatch>()

  const mainframe = useSelector((state: RootState) => state.mainframe)
  const game = useSelector((state: RootState) => state.game)
  const [loader, setLoader] = useState(false)

  const [state, setState] = useState<state>({
    selectedWalletCard: [],
    selectedStakeCardIds: [],
    addressCopied: false,
  })

  const {account} = useEthers()

  useEffect(() => {
    setTimeout(setValues, 1000)
  }, [mainframe.refetch])

  const setValues = async () => {
    if (account) {
      let b = await getCardListUserNew(account)
      if (b.length > 0) {
        const maxAvailableRoom = Math.min.apply(null, b.map((card) => card.rank))
        dispatch(setMaxAvailableRoom(maxAvailableRoom))
      }
      dispatch(setWalletCards(b))
    }
  }

  const selectStakeCards = () => setState({
    ...state,
    selectedStakeCardIds: game.walletCards
      .filter(card => card.rank === 1)
      .map(card => {
        return card.tokenId
      })
  })

  const resetStakeCards = () => setState({...state, selectedStakeCardIds: [], selectedWalletCard: []})

  useEffect(() => {
    if (!mainframe.gameAccountDialog[0]) {
      resetStakeCards()
    }
  }, [mainframe.gameAccountDialog[0]])

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
          <Header state={state} setState={setState}/>
          <Content>
            <div className={css.containers}>
              {mainframe.gameAccountDialog[1] === tabs.STAKE &&
                <TabStake state={state} setState={setState}/>
              }
              {mainframe.gameAccountDialog[1] == tabs.WALLET &&
                <TabWallet state={state} setState={setState}/>
              }
            </div>
          </Content>
          {1 + 1 == 2 &&
            <>
              <Footer>
                <FooterButtons>
                  {mainframe.gameAccountDialog[1] === tabs.STAKE &&
                    <Button
                      style={loader || !state.selectedStakeCardIds.length ? {
                        width: '100%',
                        opacity: '0.5'
                      } : {width: '100%'}}
                      disabled={loader || !state.selectedStakeCardIds.length}
                      onClick={() => {
                        setLoader(true)
                        enterInGameByTokenIds(1, 0, state.selectedStakeCardIds as number[]).then(() => {
                          resetStakeCards()
                          setLoader(false)
                          dispatch(setRefetch(true))
                        }).catch(() => {
                          resetStakeCards()
                          setLoader(false)
                        })
                      }
                      }
                    >
                      stake
                    </Button>
                  }
                  {mainframe.gameAccountDialog[1] == tabs.WALLET && !!game.gameOver &&
                    <>
                      <Button
                        style={loader || !state.selectedWalletCard.length || state.selectedWalletCard.find(card => card.suit !== 's') ? {
                          width: '50%',
                          opacity: '0.5'
                        } : {width: '50%'}}
                        onClick={() => {
                          setLoader(true)
                          cardRefund(state.selectedWalletCard.map(card => card.id)).finally(() => {
                            setLoader(false)
                            resetStakeCards()
                            dispatch(setRefetch(true))
                          })
                        }}
                        disabled={loader || !state.selectedWalletCard.length || !!state.selectedWalletCard.find(card => card.suit !== 's')}
                        // color={ButtonColor.LIGHT}
                        // size={ButtonSize.SM}
                        // fullWidth
                        // disabled={!selectedWalletCards.length}
                        // onClick={() => {
                        //   dispatch(cardsRefound(selectedWalletCards))
                        //   setSelectedWalletCards([])
                        //}}
                      >
                        refund
                      </Button>
                      <Button
                        style={loader || !state.selectedWalletCard.length ? {width: '50%', opacity: '0.5'} : {width: '50%'}}
                        onClick={() => {
                          setLoader(true)
                          cardBurn(state.selectedWalletCard.map(card => card.id)).finally(() => {
                            setLoader(false)
                            resetStakeCards()
                            dispatch(setRefetch(true))
                          })
                        }}
                        disabled={loader || !state.selectedWalletCard.length}
                        //color={ButtonColor.LIGHT}
                        //size={ButtonSize.SM}
                        //fullWidth
                        //disabled={!selectedWalletCards.length && !selectedWalletCards.length}
                        //onClick={() => {
                        //  dispatch(cardsBurn(selectedWalletCards))
                        //  setSelectedWalletCards([])
                        //}}
                      >
                        burn
                      </Button>
                    </>
                  }
                </FooterButtons>
              </Footer>
            </>
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
                  !Boolean(game.walletCards.filter(card => card.rank === 1).length) && css.tabDisabled,
                  mainframe.gameAccountDialog[1] == tabs.STAKE && css.tabActive
                ].join(' ')
              }
            >
              {!Boolean(game.walletCards.filter(card => card.rank === 1).length) && <><i
                className="fa-solid fa-lock"></i>&nbsp;</>}
              Stake
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
