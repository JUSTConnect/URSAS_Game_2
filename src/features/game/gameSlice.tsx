import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction, Draft} from '@reduxjs/toolkit'
import {Card, CardRank, CardSuit} from '@/components/Card'
import {BigNumber, ethers} from 'ethers'
import {getMintContract} from "@lib/utils/web3";

// example data

const gameCards = [
  {
    rank: CardRank.N2,
    suit: CardSuit.h,
    tokenId: '1'
  },
  {
    rank: CardRank.N2,
    suit: CardSuit.h,
    tokenId: '2'
  },
  {
    rank: CardRank.N2,
    suit: CardSuit.h,
    tokenId: '3'
  },
  {
    rank: CardRank.N2,
    suit: CardSuit.h,
    tokenId: '4'
  },
  {
    rank: CardRank.N2,
    suit: CardSuit.h,
    tokenId: '5'
  },

]

//


export interface gameState {
  currentGame: number
  currentRoom: number
  loadingRooms: boolean
  loadingTables: boolean
  loadingTable: boolean
  claim: boolean
  gameOver: number
  walletCards: Card[]
  gameCards: Card[]
  maxAvailableRoom: number
}

const initialState: gameState = {
  currentGame: 0,
  currentRoom: 0,
  loadingRooms: true,
  loadingTables: true,
  loadingTable: true,
  claim: true,
  gameOver: 0,
  walletCards: [],
  gameCards: gameCards,
  maxAvailableRoom: 17
}

export const fetchWalletCards = createAsyncThunk(
  'cards/fetch',
  async (address: string) => {
    let tokens = await getMintContract().tokensOfOwner(address)
    let cards = await Promise.all(tokens.map(async (token: BigNumber) => {
      let level = await getMintContract().viewNFTRoomLevel(token)
      let suit = await getMintContract().suits(token) || 's'
      let tokenId = token
      return [parseInt(level), suit, Number(tokenId)]
    }))
    console.log(cards)
    return cards
  }
)

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setWalletCards: () => {

    },
    setLoadingRooms: (state, action: PayloadAction<boolean>) => {
      state.loadingRooms = action.payload
    },
    setLoadingTables: (state, action: PayloadAction<boolean>) => {
      state.loadingTables = action.payload
    },
    setLoadingTable: (state, action: PayloadAction<boolean>) => {
      state.loadingTable = action.payload
    },
    setCurrentRoom: (state, action: PayloadAction<number>) => {
      state.currentRoom = action.payload
    },
    setCurrentGame: (state, action: PayloadAction<number>) => {
      state.currentGame = action.payload
    },
    setClaim: (state, action: PayloadAction<boolean>) => {
      state.claim = action.payload
    },

    cardsStake: (state, action: PayloadAction<Draft<number[]>>) => {
      state.gameCards = [
        ...state.gameCards,
        ...state.walletCards.filter(card => card.rank === CardRank.N2).filter(
          (item, index) => action.payload.includes(index)
        )]
      state.walletCards = state.walletCards.filter(card => card.rank === CardRank.N2).filter((item, index) => !action.payload.includes(index))
    },

    cardsBurn: (state, action: PayloadAction<Draft<number[]>>) => {
      state.walletCards = state.walletCards.filter((item, index) => !action.payload.includes(index))
    },
    cardsRefound: (state, action: PayloadAction<Draft<number[]>>) => {
      state.walletCards = state.walletCards.filter((item, index) => !(action.payload.includes(index) && state.walletCards[index].rank === CardRank.N1))
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWalletCards.fulfilled, (state, action) => {
      state.walletCards = action.payload.map(item => {
        if (item[0] < state.maxAvailableRoom) {
          state.maxAvailableRoom = item[0]
        }
        return Object({
          rank: CardRank[`N${item[0] as Level}`],
          suit: CardSuit[item[1]],
          tokenId: item[2]
        })
      })
    })
  }
})

export const {
  setLoadingRooms,
  setLoadingTables,
  setLoadingTable,
  setCurrentRoom,
  setCurrentGame,
  setClaim,

  cardsBurn,
  cardsRefound,
  cardsStake,
} = gameSlice.actions
export default gameSlice.reducer