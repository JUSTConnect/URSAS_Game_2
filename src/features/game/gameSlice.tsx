import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, Draft } from '@reduxjs/toolkit'
import { Card, CardRank, CardSuit } from '@/components/Card'


export interface gameState {
  walletConnected: boolean
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
  walletConnected: true,
  currentGame: 0,
  currentRoom: 0,
  loadingRooms: true,
  loadingTables: true,
  loadingTable: true,
  claim: true,
  gameOver: 0,
  walletCards: [
    {
      rank: CardRank.N10,
      suit: CardSuit.DIAMOND
    },
    {
      rank: CardRank.ACE,
      suit: CardSuit.DIAMOND
    },
    {
      rank: CardRank.ACE,
      suit: CardSuit.DIAMOND
    },
    {
      rank: CardRank.ACE,
      suit: CardSuit.DIAMOND
    },
    {
      rank: CardRank.ACE,
      suit: CardSuit.DIAMOND
    },
  ],
  gameCards: [
    {
      rank: CardRank.ACE,
      suit: CardSuit.DIAMOND
    },
    {
      rank: CardRank.ACE,
      suit: CardSuit.DIAMOND
    },
    {
      rank: CardRank.ACE,
      suit: CardSuit.DIAMOND
    },
    {
      rank: CardRank.ACE,
      suit: CardSuit.DIAMOND
    },
    {
      rank: CardRank.N2,
      suit: CardSuit.DIAMOND
    },
  ]
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setWalletConnected: (state, action: PayloadAction<boolean>) => {
      state.walletConnected = action.payload
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

    cardsRefound: (state, action: PayloadAction<Draft<number[]>>) => {
      state.walletCards = [
        ...state.walletCards,
        ...state.gameCards.filter(
          (item, index) => action.payload.includes(index)
        )]
      state.gameCards = state.gameCards.filter((item, index) => !action.payload.includes(index))
    },

    cardsWalletBurn: (state, action: PayloadAction<Draft<number[]>>) => {
      state.walletCards = state.walletCards.filter((item, index)=> !action.payload.includes(index))
    },

    cardsGameBurn: (state, action: PayloadAction<Draft<number[]>>) => {
      state.gameCards = state.gameCards.filter((item, index)=> !action.payload.includes(index))
    }
  }
})

export const {
  setWalletConnected,
  setLoadingRooms,
  setLoadingTables,
  setLoadingTable,
  setCurrentRoom,
  setCurrentGame,
  setClaim,

  cardsRefound,
  cardsWalletBurn,
  cardsGameBurn
} = gameSlice.actions
export default gameSlice.reducer