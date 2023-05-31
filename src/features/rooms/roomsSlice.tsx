import {createSlice} from '@reduxjs/toolkit'
import { Table as TableData } from '@/agents/web3';
import { Room as RoomInfo } from '@/agents/web3';
import type {PayloadAction} from '@reduxjs/toolkit'

export interface IRoomsInfo {
    allTables: TableData[]
    roomDuration: number
    roomIncreaseCounter: number
    availableTables: number
    emptyTables: number
    trump: number
}

export interface roomsState {
    rooms: RoomInfo[]
    roomsLoading: boolean
    roomInfo: IRoomsInfo[]
    playingTablesId: number[]
}

const initialState: roomsState = {
    rooms: [],
    roomsLoading: false,
    roomInfo: [],
    playingTablesId: []
}

export const roomsSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setRooms: (state, action: PayloadAction<RoomInfo[]>) => {
            state.rooms = action.payload
        },
    }
})

export const {
    setRooms
} = roomsSlice.actions

export default roomsSlice.reducer