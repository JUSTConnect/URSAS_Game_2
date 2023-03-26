import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface gameState {
  walletConnected: boolean,
  currentGame: Array<number>,
  loadingTables: boolean,
}

const initialState: gameState = {
    walletConnected: true,
    currentGame: [0, 0],
    loadingTables: true,
}

export const gameSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setWalletConnected: (state, action: PayloadAction<boolean>) => {
        state.walletConnected = action.payload
    },
    setLoadingTables: (state, action: PayloadAction<boolean>) => {
        state.loadingTables = action.payload
    },
    setCurrentGame: (state, action: PayloadAction<Array<number>>) => {
        state.currentGame = action.payload
    }
  }
})

export const {
    setWalletConnected,
    setLoadingTables,
    setCurrentGame
} = gameSlice.actions
export default gameSlice.reducer