import { createSlice } from '@reduxjs/toolkit'


export interface roomsState {
}

const initialState: roomsState = {
}

export const roomsSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {}
})

export const {
} = roomsSlice.actions

export default roomsSlice.reducer