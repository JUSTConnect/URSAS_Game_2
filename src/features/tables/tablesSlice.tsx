import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction, Draft} from '@reduxjs/toolkit'

import type {props as Table} from '@/components/Table'
import {BigNumber, ethers} from "ethers";
import {getGameContract} from "@lib/utils/web3";

const examplePlaces: Table[] = [
  {
    tableNumber: 1,
    freePlaces: 10,
    href: 1
  },
  {
    tableNumber: 2,
    freePlaces: 0,
    href: 2
  },
  {
    tableNumber: 3,
    freePlaces: 0,
    href: 3,
    gameEnd: '12:55'
  },
  {
    tableNumber: 4,
    freePlaces: 1,
    href: 4,
    cooldown: true
  },
  ...Array.from(Array(30).keys()).map(item => Object({
    tableNumber: item + 5,
    freePlaces: 10,
    href: 4,
  }))
]

//

enum TablesFilter {
  all,
  empty,
  cooldown,
  gaming
}


export interface tablesState {
  places: Table[]
  filter: TablesFilter
  playingCards: string[]
}

const initialState: tablesState = {
  places: examplePlaces,
  filter: TablesFilter.all,
  playingCards: []
}

export const getAllRoomTables = createAsyncThunk('roomTables/fetch', async (levelRoom: number) => {
  const tables = await getGameContract().GetWholeRoom(levelRoom)
  return tables
})

export const getPlayingTokenIds = createAsyncThunk('allTokenIds/fetch', async (
  {levelRoom, account}: { levelRoom: number, account: string }
) => {
  const playingCards = await getGameContract().getPlayingTokenIdsInRoomForPlayer(levelRoom, account)
  return playingCards.map((card: BigNumber) => ethers.utils.formatEther(card))
})


export const tablesSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<TablesFilter>) => {
      state.filter = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllRoomTables.fulfilled, (state, action) => {
      state.places = action.payload
    }).addCase(getPlayingTokenIds.fulfilled, (state, action) => {
      state.playingCards = action.payload
    })
  }
})

export const {
  setFilter
} = tablesSlice.actions
export {TablesFilter}
export default tablesSlice.reducer