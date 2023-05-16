import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction, Draft } from '@reduxjs/toolkit'
import { Card, CardRank, CardSuit } from '@/components/Card'
import { getMintContract } from '@/lib/utils/web3'
import { BigNumber } from 'ethers'

// example data

const gameCards = [
  {
    rank: CardRank.N2,
    suit: CardSuit.h
  },
  {
    rank: CardRank.N2,
    suit: CardSuit.h
  },
  {
    rank: CardRank.N2,
    suit: CardSuit.h
  },
  {
    rank: CardRank.N2,
    suit: CardSuit.h
  },
  {
    rank: CardRank.N2,
    suit: CardSuit.h
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
  gameCards: gameCards
}

export const fetchWalletCards = createAsyncThunk(
  'cards/fetch',
  async (address: string) => {
    let tokens = await getMintContract().tokensOfOwner(address) 
    let cards = await Promise.all(tokens.map(async (token: BigNumber) => {
      let level = await getMintContract().viewNFTRoomLevel(token)
      let suit = await getMintContract().suits(token)
      return [parseInt(level), suit]
    }))
    return cards
  }
)

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
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
      state.walletCards = state.walletCards.filter((item, index)=> !action.payload.includes(index))
    },
    cardsRefound: (state, action: PayloadAction<Draft<number[]>>) => {
      state.walletCards = state.walletCards.filter((item, index)=> !(action.payload.includes(index) && state.walletCards[index].rank === CardRank.N1) )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWalletCards.fulfilled, (state, action) => {
      state.walletCards = action.payload.map(item => Object({rank: CardRank[`N${item[0] as Level}`], suit: CardSuit[item[1]]}))
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