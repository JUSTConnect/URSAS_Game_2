import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {BigNumber, ethers} from "ethers";
import {string} from "prop-types";
import {TableData} from "@lib/types/game";
import {getGameContract} from "@lib/utils/web3";

export interface IRoomsInfo {
    allTables: TableData[]
    roomDuration: number
    roomIncreaseCounter: number
    availableTables: number
    emptyTables: number
    trump: number
}

export interface roomsState {
    roomInfo: IRoomsInfo[]
    playingTablesId: number[]
}

const initialState: roomsState = {
    roomInfo: [],
    playingTablesId: []
}

export const getRoomInfo = createAsyncThunk('roomInfo/fetch', async () => {
    const roomInfo = await Promise.all([...Array(16)].map(async (item: any, index) => {
        const trump = await getGameContract().trump()
        const allTables = await getGameContract().GetWholeRoom(index + 1)
        const roomDuration = await getGameContract().currentRoomGameDuration(index)
        const roomIncreaseCounter = await getGameContract().roomGameDurationIncreaseCounter(index)
        let availableTables = allTables.length
        let emptyTables = 0
        allTables?.forEach((table: any) => {
            if (!table.status) ++emptyTables
        })
        return {
            allTables,
            roomDuration: +ethers.utils.formatEther(roomDuration) * (10 ** 18) / 3600,
            roomIncreaseCounter,
            availableTables,
            emptyTables,
            trump: +ethers.utils.formatEther(trump)
        }
    }))
    return {
        roomInfo,
    }
})

export const getMyPlayingTables = createAsyncThunk('playTable/fetch', async (
  {
      levelRoom,
      account
  }: { levelRoom: number, account: string }) => {
    const tables: BigNumber[] = await getGameContract().getActiveTablesForRoom(levelRoom)
    const tablesId = tables.filter(table => {
        const tableId: number = Number(ethers.utils.formatEther(table))
        if (tableId !== 0) return true
    }).map(table => Number(ethers.utils.formatEther(table)) * 10 ** 18)
    if (Number(ethers.utils.formatEther(tables[0])) === 0 && tablesId.length) {
        tablesId.unshift(0)
        return tablesId
    }
    if (!tablesId.length) {
        const tableData = await getGameContract().GetCurrentTableInRoom(levelRoom, 0).then(({players}: Omit<TableData, 'cards'>) => players.find(player => player === account)).catch((e: any) => {
            console.log(e)
        })
        if (tableData) return [0]
        return []
    }
    return tablesId
})

export const roomsSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getRoomInfo.fulfilled, (state, action) => {
            state.roomInfo = action.payload.roomInfo
        }).addCase(getMyPlayingTables.fulfilled, (state, action) => {
            state.playingTablesId = action.payload
        })
    }
})

export const {} = roomsSlice.actions

export default roomsSlice.reducer