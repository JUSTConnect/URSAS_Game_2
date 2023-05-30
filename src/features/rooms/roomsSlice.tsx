import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {BigNumber, ethers} from "ethers";
import {getGameContract} from "@lib/utils/web3";
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

export const getMyPlayingTables = createAsyncThunk('playTable/fetch', async (
  {
      levelRoom,
      account
  }: { levelRoom: number, account: string }) => {
//     const tables: BigNumber[] = await getGameContract().getActiveTablesForRoom(levelRoom)
//     const tablesId = tables.filter(table => {
//         const tableId: number = Number(ethers.utils.formatEther(table))
//         if (tableId !== 0) return true
//     }).map(table => Number(ethers.utils.formatEther(table)) * 10 ** 18)
//     if (Number(ethers.utils.formatEther(tables[0])) === 0 && tablesId.length) {
//         tablesId.unshift(0)
//         return tablesId
//     }
//     if (!tablesId.length) {
//         const tableData = await getGameContract().GetCurrentTableInRoom(levelRoom, 0).then(({players}: Omit<TableData, 'cards'>) => players.find(player => player === account)).catch((e: any) => {
//             console.log(e)
//         })
//         if (tableData) return [0]
//         return []
//     }
//     return tablesId
    return []
})

export const roomsSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setRooms: (state, action: PayloadAction<RoomInfo[]>) => {
            state.rooms = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getMyPlayingTables.fulfilled, (state, action) => {
            state.playingTablesId = action.payload
        })
    }
})

export const {
    setRooms
} = roomsSlice.actions

export default roomsSlice.reducer