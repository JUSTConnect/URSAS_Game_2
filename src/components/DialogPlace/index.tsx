import css from './index.module.scss'

import sofaBg from '@assets/images/texture/table-sofa-modal.png'

import Image from 'next/image'

import {useState, useEffect} from 'react'
import {useRouter} from "next/router";
import {useDispatch, useSelector} from 'react-redux'

import {AppDispatch, RootState} from '@/app/store'
import {
  addBasketPlace,
  clearBasketPlaces,
  removeBasketPlaces,
  setBasketPlaces,
  setBasketTimer, setLoaderButton
} from '@/features/table/tableSlice'
import {enterInGameByTokenIds, removeInGameByTokenIds} from '@/agents/web3/gameContract/tables'
import Dialog, {Header, HeaderButtons, Footer, FooterButtons, Content} from '@components/Dialog'
import Button, {Color as ButtonColor, Variant as ButtonVariant, Size as ButtonSize} from '@components/UIButton'
import Blur from '@components/Blur'
import Card from '@components/Card'

import Place from './Place'
import PlaceButton from './PlaceButton'
import Countdown, {zeroPad} from "react-countdown";
import {setRefetch} from "@/features/mainframe/mainframeSlice";
import {StatusTable} from "@lib/types/game";


interface props extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean
  setActive: Function
}

export default (props: props) => {
  const router = useRouter()
  const {room, table: tableIndex} = router.query
  const dispatch = useDispatch<AppDispatch>()
  const table = useSelector((state: RootState) => state.table)
  const game = useSelector((state: RootState) => state.game)
  const [selectedBasketPlaces, setSelectedBasketPlaces] = useState<number[]>([])
  const [selectedStakedPlaces, setSelectedStakedPlaces] = useState<number[]>([])
  const [timer, setTimer] = useState(0)
  const [changeTime, setChangeTime] = useState(true)
  const rooms = useSelector((state: RootState) => state.rooms)
  const [clearBasketIds, setClearBasketIds] = useState<any>([])

  const returnTable = () => {
    if (room && rooms.rooms.length) {
      return rooms.rooms[Number(room) - 1].tables[Number(tableIndex) - 1]
    }
  }

  useEffect(() => {
    if (!table.timer) {
      setChangeTime(true)
    }
  }, [table])

  useEffect(() => {
    console.log(table.basketPlaces, 'basketplaces')
    // @ts-ignore
    dispatch(setBasketPlaces([...table.basketPlaces.filter((item) => !clearBasketIds.find((card) => card === item.card.tokenId))]))
  }, [clearBasketIds])


  return (
    <>
      <Blur
        onClick={() => props.setActive(false)}
        isActive={props.active}
      />
      <div className={
        [
          css.wrapper,
          props.active && css.active
        ].join(' ')
      }>
        <Dialog className={[css.dialog, props.className].join(' ')}>
          <Header>
            {
              table.choosingCardPlace ? (
                <div>
                  Choose cart <span className={'textPrimary'}>place n.{table.choosingCardPlace}</span>
                </div>
              ) : table.basketPlaces.length ? (
                <div>
                  Confirm places <span className={'textPrimary'}>
                    <Countdown
                      date={timer + 120000}
                      onComplete={() => {
                        dispatch(clearBasketPlaces())
                      }}
                      renderer={({minutes, seconds}) => (
                        <>
                          {zeroPad(minutes)}:{zeroPad(seconds)}
                        </>
                      )}/>
                  </span>
                </div>
              ) : 'Basket places'
            }
            <HeaderButtons>
              {Boolean(table.basketPlaces.length) && !table.choosingCardPlace &&
                <Button
                  disabled={table.loadingButton}
                  color={ButtonColor.LIGHT}
                  size={ButtonSize.SM}
                  onClick={() => {
                    setChangeTime(true)
                    dispatch(setLoaderButton(true))
                    const cartsId = table.basketPlaces.map(({card}) => +card.tokenId)
                    console.log(cartsId, 'cartsid')
                    enterInGameByTokenIds(
                      Number(router.query.room),
                      Number(router.query.table) - 1,
                      cartsId
                    ).then((data) => {
                      if (data) {
                        setClearBasketIds(cartsId)
                        // console.log(table.basketPlaces, 'bb')
                        //очистка карт в корзине которые играют после сабмита
                        // console.log([...table.basketPlaces.filter((item) => !cartsId.find((card) => card === item.card.tokenId))], 'basket')

                        // @ts-ignore
                        // dispatch(setBasketPlaces([...table.basketPlaces.filter((item) => !cartsId.find((card) => card === item.card.tokenId))]))
                        dispatch(setRefetch(true))
                        dispatch(setRefetch(true))
                      }
                    }).finally(() => {
                      dispatch(setLoaderButton(false))
                    })
                    // setBasketPlaces([])
                  }}
                >
                  submit
                </Button>
              }
              <Button
                onClick={() => props.setActive(false)}
                color={ButtonColor.DARK}
                variant={ButtonVariant.OUTLINE}
                size={ButtonSize.SM}
              >
                <i className="fa-solid fa-arrow-right"></i>
              </Button>
            </HeaderButtons>
          </Header>
          <Content
            overflowHidden={!(table.stakedPlaces.length || table.basketPlaces.length)}
          >
            {table.choosingCardPlace ? (
              <div className={css.cards}>
                {game.walletCards.filter(card => card.rank === Number(room) && !card.playing).map((item, index) => {
                    if (table.basketPlaces.find((place) => place.card.tokenId === item.tokenId)) {
                      return null
                    }
                    return (
                      <Card
                        playing={item.playing}
                        key={index}
                        className={css.card}
                        rank={item.rank}
                        suit={item.suit}
                        tokenId={item.tokenId}
                        onClick={() => {
                          if (changeTime) {
                            setTimer(Date.now())
                            dispatch(setBasketTimer(Date.now()))
                          }
                          setChangeTime(false)
                          dispatch(
                            addBasketPlace(
                              {
                                number: table.choosingCardPlace,
                                card: {
                                  rank: item.rank,
                                  suit: item.suit,
                                  tokenId: item.tokenId,
                                }
                              }
                            )
                          )
                        }}
                      />
                    )
                  }
                )}
              </div>
            ) : table.stakedPlaces.length || table.basketPlaces.length ? (
              <div className={css.places}>
                {table.basketPlaces.map((place, index) => {
                    return (
                      <Place
                        key={index}
                        number={place.number}
                        card={place.card ? {
                          rank: place.card.rank,
                          suit: place.card.suit,
                          tokenId: place?.card?.tokenId
                        } : undefined}
                        active={selectedBasketPlaces.includes(place.number || 0)}
                        onClick={
                          () =>
                            selectedBasketPlaces.includes(place.number || 0)
                              ?
                              setSelectedBasketPlaces(selectedBasketPlaces.filter(number => number !== place.number))
                              :
                              setSelectedBasketPlaces([...selectedBasketPlaces, place.number || 0])
                        }
                      />
                    )
                  }
                )}
                {Boolean(table.basketPlaces.length) && (
                  <PlaceButton active={selectedBasketPlaces.length} onClick={() => {
                    if (selectedBasketPlaces.length === table.basketPlaces.length) {
                      setChangeTime(true)
                    }
                    dispatch(removeBasketPlaces(selectedBasketPlaces))
                    setSelectedBasketPlaces([])
                  }}>
                    clear
                  </PlaceButton>
                )}
                {Boolean(table.stakedPlaces.length) && returnTable()?.status !== StatusTable.PLAYING && (
                  <PlaceButton active={table.loadingButton ? 0 : selectedStakedPlaces.length} onClick={() => {
                    dispatch(setLoaderButton(true))
                    const cartsId = table.stakedPlaces.filter(({card}, index) => {
                      if (selectedStakedPlaces.includes(index + 1))
                        return true
                    }).map(({card}) => +card.tokenId)
                    removeInGameByTokenIds(Number(router.query.room), Number(router.query.table) - 1, cartsId).then((data) => {
                      if (data) {
                        dispatch(setRefetch(true))
                      }
                    }).finally(() => {
                      dispatch(setLoaderButton(false))
                    })
                  }}>
                    return
                  </PlaceButton>
                )}
                {table.stakedPlaces.map((place, index) => (
                    <Place
                      key={index}
                      number={place.number}
                      card={place.card ? {
                        rank: place.card.rank,
                        suit: place.card.suit,
                        tokenId: place.card.tokenId
                      } : undefined}
                      active={selectedStakedPlaces.includes(place.number)}
                      onClick={
                        () =>
                          selectedStakedPlaces.includes(place.number)
                            ?
                            setSelectedStakedPlaces(selectedStakedPlaces.filter(number => number !== place.number))
                            :
                            setSelectedStakedPlaces([...selectedStakedPlaces, place.number || 0])
                      }
                    />
                  )
                )}
              </div>
            ) : (
              <div className={css.basketEmptyContainer}>
                <div className={css.basketEmptyContent}>
                  <div className={css.basketEmptyTitle}>
                    Your basket is empty
                  </div>
                  <div className={css.basketEmptyDescription}>
                    Please choose places
                  </div>
                  <div className={css.basketEmptyCircle}></div>
                  <Image
                    src={sofaBg}
                    alt={'sofa'}
                    width={327}
                    height={220}
                    placeholder={'blur'}
                    className={css.basketEmptySofa}
                  />
                </div>
              </div>
            )}
          </Content>
          {Boolean(table.stakedPlaces.length || table.basketPlaces.length) && !table.choosingCardPlace &&
            <Footer>
              <FooterButtons>
                {Boolean(table.stakedPlaces.length) && returnTable()?.status !== StatusTable.PLAYING &&
                  <Button
                    onClick={async () => {
                      dispatch(setLoaderButton(true))
                      const cartsId = table.stakedPlaces.map(({card}) => +card.tokenId)
                      removeInGameByTokenIds(Number(router.query.room), Number(router.query.table) - 1, cartsId).then((data) => {
                        if (data) {
                          dispatch(setRefetch(true))
                        }
                      }).finally(() => {
                        dispatch(setLoaderButton(false))
                      })
                    }}
                    color={ButtonColor.DARK}
                    size={ButtonSize.SM}
                    variant={ButtonVariant.NORMAL}
                    fullWidth
                  >
                    <img className={css.footerButtonIcon} src="/assets/images/icons/clear.png" alt="Icon"/>
                    &nbsp;
                    return all
                  </Button>
                }
                {Boolean(table.basketPlaces.length) &&
                  <Button
                    onClick={() => {
                      setChangeTime(true)
                      dispatch(clearBasketPlaces())
                    }}
                    color={ButtonColor.DARK}
                    size={ButtonSize.SM}
                    variant={ButtonVariant.NORMAL}
                    fullWidth
                  >
                    <img className={css.footerButtonIcon} src="/assets/images/icons/return.png" alt="Icon"/>
                    &nbsp;
                    clear all
                  </Button>
                }
              </FooterButtons>
            </Footer>
          }
        </Dialog>
      </div>
    </>
  )
}