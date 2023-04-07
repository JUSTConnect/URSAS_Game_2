import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface roomsState {
    dialogMint: boolean
}

const initialState: roomsState = {
    dialogMint: false
}

export const roomsSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setDialogMint: (state, action: PayloadAction<boolean>) => {
            state.dialogMint = action.payload
        }
    }
})

export const {
    setDialogMint
} = roomsSlice.actions

export default roomsSlice.reducer