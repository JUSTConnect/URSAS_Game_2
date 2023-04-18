import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, Draft } from '@reduxjs/toolkit'
import { Card, CardRank, CardSuit, randomCard } from '@/components/Card'


// example data

const walletCards = [
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.N1,
    suit: CardSuit.DIAMOND
  },
  {
    rank: CardRank.N10,
    suit: CardSuit.CLUB
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
]

const gameCards = [
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.N2,
    suit: CardSuit.DIAMOND
  },
  {
    rank: CardRank.N10,
    suit: CardSuit.CLUB
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.SPADE
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.SPADE
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  },
  {
    rank: CardRank.ACE,
    suit: CardSuit.HEART
  }
]

// 


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
  walletCards: walletCards,
  gameCards: gameCards
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
      state.gameCards = [
        ...state.gameCards,
        ...state.walletCards.filter(
          (item, index) => (action.payload.includes(index) && state.walletCards[index].rank === CardRank.N1)
        )]
      state.walletCards = state.walletCards.filter((item, index) => !action.payload.includes(index) && !(state.walletCards[index].rank === CardRank.N1))
    },

    cardsWalletBurn: (state, action: PayloadAction<Draft<number[]>>) => {
      state.walletCards = state.walletCards.filter((item, index)=> !action.payload.includes(index))
    },
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
} = gameSlice.actions
export default gameSlice.reducer