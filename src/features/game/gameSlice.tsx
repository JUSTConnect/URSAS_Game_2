import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface gameState {
  walletConnected: boolean,
  currentGame: Array<number>,
  loadingRooms: boolean
  loadingTables: boolean,
  loadingTable: boolean,
  claim: boolean
}

const initialState: gameState = {
  walletConnected: true,
  currentGame: [0, 0],
  loadingRooms: true,
  loadingTables: true,
  loadingTable: true,
  claim: true
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
    setCurrentGame: (state, action: PayloadAction<Array<number>>) => {
      state.currentGame = action.payload
    },
    setClaim: (state, action: PayloadAction<boolean>) => {
      state.claim = action.payload
    }
  }
})

export const {
  setWalletConnected,
  setLoadingRooms,
  setLoadingTables,
  setLoadingTable,
  setCurrentGame,
  setClaim
} = gameSlice.actions
export default gameSlice.reducer