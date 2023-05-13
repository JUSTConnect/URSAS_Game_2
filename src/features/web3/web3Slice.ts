import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, Draft } from '@reduxjs/toolkit'

import { Contract } from 'ethers'


export interface web3State {
    contractGame: Contract|null
    contractMint: Contract|null
}

const initialState: web3State = {
    contractGame: null,
    contractMint: null
}


export const tablesSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setContractGame: (state, action: PayloadAction<Contract>) => {
            Object.assign(state, action.payload)
            // state.contractGame = action.payload as Contract
        },
        setContractMint: (state, action: PayloadAction<Contract>) => {
            Object.assign(state, action.payload)
            // state.contractMint = action.payload as Contract
        },
    }
})

export const {
    setContractGame,
    setContractMint
} = tablesSlice.actions
export default tablesSlice.reducer