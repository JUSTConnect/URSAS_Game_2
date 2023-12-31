import css from './index.module.css'

import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useRouter} from 'next/router'
import {useEthers} from '@usedapp/core'

import {RootState} from '@/app/store'
import {SuitSymbol} from '@/lib/types/game'
import {getCardDetailSuit} from '@/agents/web3/mintContract/cards'
import DialogPlace from '@components/DialogPlace'
import Blur from '@components/Blur'

import {RoomLevel} from '@/lib/types/game'
import {addStakedPlace, clearBasketPlaces, clearStakedPlaces, setChoosingCardPlace} from '@/features/table/tableSlice'
import Place from './Place'
import Sofa from './Sofa'
import {useState} from 'react'
import {ethers} from "ethers";


interface TableViewProps {
  modalActive: boolean
  setModalActive: Function
}

interface TableCards {
  address: string
  tokenId: number
  suit: SuitSymbol
}


const TableView = (props: TableViewProps) => {
  const router = useRouter()
  const {room, table} = router.query
  const dispatch = useDispatch()
  const game = useSelector((state: RootState) => state.game)
  const rooms = useSelector((state: RootState) => state.rooms)
  const tableStore = useSelector((state: RootState) => state.table)
  const {account} = useEthers()
  const [suits, setSuits] = useState<[number, SuitSymbol][] | undefined>()
  const [isGoingStake, setIsGoingStake] = useState<number[] | Number[]>([])

  const [cardsSuit, setCardsSuit] = useState<SuitSymbol[]>([])

  const returnTable = () => {
    if (room && rooms.rooms.length) {
      return rooms.rooms[Number(room) - 1].tables[Number(table) - 1]
    }
  }

  const getCardsSuit = async () => {
    if (returnTable()) {
      // @ts-ignore
      const cards = await Promise.all(returnTable().players.map(async (card) => {
        if (ethers.constants.AddressZero === card.address) {
          return 's'
        }
        const suit = await getCardDetailSuit(card.tokenId)
        return suit
      }))
      setCardsSuit(cards as SuitSymbol[])
    }
  }

  useEffect(() => {

  }, [returnTable()?.players])

  useEffect(() => {
    if (returnTable()?.placesAvailable === 0) {
      router.push(`/tables/${room}`)
    }
  }, [rooms])

  const setValues = () => {
    const fetchData = async () => {
      let tokenIds = returnTable()?.players.map(player => player.tokenId)
      if (tokenIds) {
        let suits = await Promise.all(tokenIds.map(async tokenId => [tokenId, (await getCardDetailSuit(tokenId)) || 's']))
        setSuits(suits as [number, SuitSymbol][])
      }
    }
    fetchData()
  }

  useEffect(() => {
    setCardsSuit([])
    getCardsSuit().finally(() => dispatch(clearStakedPlaces()))
    // dispatch(clearBasketPlaces())
    setValues()
  }, [returnTable()?.players])

  const handleClickPlace = (place: number) => {
    props.setModalActive(true)
    dispatch(setChoosingCardPlace(place))
  }

  return <div className={css.tableView}>
    <div className={css.tableContainer}>
      <div className={css.table}>
        <div className={css.tableContent}>
          <div className={css.tableContentInner}>
          </div>
        </div>
      </div>
      <img className={css.cocaCola} src="/assets/images/texture/table-coca-cola.png" alt="Coca Cola"/>
      {(suits && returnTable()?.players && suits?.length && cardsSuit.length) ? returnTable()?.players.map((player, index) => {
        if (player.address === account) {
          dispatch(addStakedPlace({
            number: index + 1,
            card: {
              rank: Number(room) as RoomLevel,
              suit: cardsSuit[index],
              tokenId: player.tokenId,
            }
          }))
        }

        return (
          <div key={index}>
            <Sofa
              number={index + 1}
              active={Boolean(player.tokenId)}
              // active={!!game.walletCards.find(card=>card.tokenId === player.tokenId)}
            />
            <Place
              number={index + 1}
              className={css[`place${index + 1}`]}
              basket={tableStore.basketPlaces.map(item => item.number).includes(index + 1)}
              staked={game.walletCards.map(card => card.tokenId).includes(player.tokenId)}
              // loading={true}
              // choosing={table.choosingCardPlace === index + 1}
              onClick={() => handleClickPlace(index + 1)}
              card={suits && Number(player.tokenId) ? {
                rank: Number(room) as RoomLevel,
                suit: cardsSuit[index],
                tokenId: player.tokenId,
                playing: true
              } : tableStore.basketPlaces.map(item => item.number).includes(index + 1) ? {
                rank: Number(room) as RoomLevel,
                suit: tableStore.basketPlaces.find(item => item.number === index + 1)?.card.suit || 's',
                tokenId: tableStore.basketPlaces.map(item => {
                  if (item.number) return item.card.tokenId
                })[0] || 0,
                playing: true
              } : undefined}
            />
          </div>
        )
      }) : Array.from(Array(10)).map((i, index) => (
        <div key={index}>
          <Sofa
            number={index + 1}
          />
          <Place
            number={index + 1}
            className={css[`place${index + 1}`]}
            loading={true}
          />
        </div>
      ))}
    </div>
    <Blur
      isActive={props.modalActive}
      onClick={() => {
        props.setModalActive(false);
        dispatch(setChoosingCardPlace(0))
      }}
    />
    {account &&
      <DialogPlace
        setIsGoingStake={setIsGoingStake}
        isGoingStake={isGoingStake}
        active={props.modalActive}
        setActive={props.setModalActive}
      />
    }
  </div>
}


export default TableView