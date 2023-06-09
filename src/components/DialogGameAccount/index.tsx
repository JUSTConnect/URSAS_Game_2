import css from './index.module.scss'

import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useEthers} from '@usedapp/core'

import {cardBurn, cardRefund, getCardListUser} from '@/agents/web3/mintContract/cards'

import {AppDispatch, RootState} from '@/app/store'
import {setGameAccountDialog, setRefetch} from '@/features/mainframe/mainframeSlice'
import {setWalletCards, cardsStake, cardsBurn, setMaxAvailableRoom} from '@/features/game/gameSlice'

import Blur from '@components/Blur'
import Dialog, {Content, Footer, FooterButtons} from '@components/Dialog'

import Header from './Header'
import TabStake from './TabStake'
import TabWallet from './TabWallet'
import Button from "@components/Button";

export enum tabs {
  STAKE = 'Stake',
  WALLET = 'Wallet'
}

export interface state {
  selectedWalletCardIds: Number[]
  selectedStakeCardIds: Number[]
  addressCopied: Boolean
}

export default (props: React.HTMLAttributes<HTMLDivElement>) => {

  const dispatch = useDispatch<AppDispatch>()

  const mainframe = useSelector((state: RootState) => state.mainframe)
  const game = useSelector((state: RootState) => state.game)
  const [loader, setLoader] = useState(false)

  const [state, setState] = useState<state>({
    selectedWalletCardIds: [],
    selectedStakeCardIds: [],
    addressCopied: false,
  })

  const {account} = useEthers()

  useEffect(() => {
    setTimeout(setValues, 1000)
  }, [mainframe.refetch])

  const setValues = async () => {
    if (account) {
      let b = await getCardListUser(account)
      if (b.length > 0) {
        const maxAvailableRoom = Math.min.apply(null, b.map((card) => card.rank))
        dispatch(setMaxAvailableRoom(maxAvailableRoom))
      }
      dispatch(setWalletCards(b))
    }
  }

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
          {/*{mainframe.gameAccountDialog[1] === tabs.STAKE &&*/}
          {1 + 1 == 2 &&
            <>
              <Footer>
                <FooterButtons>
                  {/*<Button*/}
                  {/*  color={ButtonColor.LIGHT}*/}
                  {/*  size={ButtonSize.SM}*/}
                  {/*  fullWidth*/}
                  {/*  disabled={!selectedStakeCards.length}*/}
                  {/*  onClick={() => {*/}
                  {/*    dispatch(cardsStake(selectedStakeCards))*/}
                  {/*    setSelectedStakeCards([])*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  stake*/}
                  {/*</Button>*/}
                  {mainframe.gameAccountDialog[1] == tabs.WALLET && !!game.gameOver &&
                    <>
                      <Button
                        style={loader ? {width: '50%', opacity: '0.5'} : {width: '50%'}}
                        onClick={() => {
                          setLoader(true)
                          cardRefund(state.selectedWalletCardIds).finally(() => {
                            setLoader(false)
                            dispatch(setRefetch(true))
                          })
                        }}
                        disabled={loader}
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
                        style={loader ? {width: '50%', opacity: '0.5'} : {width: '50%'}}
                        onClick={() => {
                          setLoader(true)
                          cardBurn(state.selectedWalletCardIds).finally(() => {
                            setLoader(false)
                            dispatch(setRefetch(true))
                          })
                        }}
                        disabled={loader}
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
