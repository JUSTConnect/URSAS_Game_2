import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction, Draft} from '@reduxjs/toolkit'
import { CardNFT } from '@/lib/types/game';
import { Season } from '@/agents/web3';


export interface gameState {
  currentGame: number
  currentRoom: number
  loadingRooms: boolean
  loadingTables: boolean
  loadingTable: boolean
  claim: boolean
  gameOver: number
  walletCards: CardNFT[]
  gameCards: CardNFT[]
  maxAvailableRoom: number
  season?: Season
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
  gameCards: [],
  maxAvailableRoom: 17,
  season: undefined 
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setSeason: (state, action: PayloadAction<Season>) => {
      state.season = action.payload
    },
    setWalletCards: (state, action: PayloadAction<CardNFT[]>) => {
      state.walletCards = action.payload
      state.walletCards.sort((a, b) => a.rank - b.rank)
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
    setGameOver: (state, action: PayloadAction<number>) => {
      state.gameOver = action.payload
    },

    cardsStake: (state, action: PayloadAction<Draft<number[]>>) => {
      state.gameCards = [
        ...state.gameCards,
        ...state.walletCards.filter(card => card.rank === 2).filter(
          (item, index) => action.payload.includes(index)
        )]
      state.walletCards = state.walletCards.filter(card => card.rank === 2).filter((item, index) => !action.payload.includes(index))
    },

    cardsBurn: (state, action: PayloadAction<Draft<number[]>>) => {
      state.walletCards = state.walletCards.filter((item, index) => !action.payload.includes(index))
    },
    cardsRefund: (state, action: PayloadAction<Draft<number[]>>) => {
      state.walletCards = state.walletCards.filter((item, index) => !(action.payload.includes(index) && state.walletCards[index].rank === 1))
    },
  },
})

export const {
  setSeason,
  setWalletCards,
  setLoadingRooms,
  setLoadingTables,
  setLoadingTable,
  setCurrentRoom,
  setCurrentGame,
  setClaim,
  setGameOver,

  cardsBurn,
  cardsRefund,
  cardsStake,
} = gameSlice.actions
export default gameSlice.reducer