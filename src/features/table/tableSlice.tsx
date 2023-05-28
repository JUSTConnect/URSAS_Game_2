import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction, Draft} from '@reduxjs/toolkit'

import type Card from '@/components/Card'
import {PlaceProps} from '@/components/UIPlace'
// import {Table, TableCard} from "@/types/game";
import {BigNumber, ethers} from "ethers";
import {string} from "prop-types";
import {getGameContract, getMintContract} from "@lib/utils/web3";
import {Table, CardNFT, TableData} from "@lib/types/game";

interface BusyPlaceProps extends PlaceProps {
  number: number,
  card: CardNFT
}

enum PlaceState {
  BUSY = 'busyPlaces',
  BASKET = 'basketPlaces',
  STAKED = 'stakedPlaces'
}

export interface tableState {
  busyPlaces: BusyPlaceProps[]
  stakedPlaces: BusyPlaceProps[]
  basketPlaces: BusyPlaceProps[]
  choosingCardPlace: number
  modalAlert: string
  tableData: TableData
  timer: number
  loadingButton: boolean
}

const initialState: tableState = {
  busyPlaces: [],
  stakedPlaces: [],
  basketPlaces: [],
  choosingCardPlace: 0,
  modalAlert: '',
  tableData: {
    currentGameFinishedAt: '',
    currentGameStartedAt: '',
    internalGameReduction: '',
    players: [],
    playersNow: 0,
    playingSuits: [],
    playingTokenIds: [],
    serialNumber: '',
    status: 0,
    cards: []
  },
  timer: 0,
  loadingButton: false
}

const addDecorator = (stateArray: PlaceState) => {
  return (state: Draft<tableState>, action: PayloadAction<Draft<BusyPlaceProps>>) => {
    if (
      ![
        ...state.busyPlaces,
        ...state.basketPlaces,
        ...state.stakedPlaces
      ].map(place => place.number).includes(action.payload.number)
    ) {
      state[stateArray] = [...state[stateArray], action.payload]
      state.choosingCardPlace = 0
    }
  }
}

const removeDecorator = (stateArray: PlaceState) => {
  return (state: Draft<tableState>, action: PayloadAction<number[]>) => {
    state[stateArray] = state[stateArray].filter(place => !action.payload.includes(place.number))
  }
}

const setDecorator = (stateArray: PlaceState) => {
  return (state: Draft<tableState>, action: PayloadAction<Draft<BusyPlaceProps[]>>) => {
    state[stateArray] = action.payload
  }
}

const clearDecorator = (stateArray: PlaceState) => {
  return (state: Draft<tableState>) => {
    state[stateArray] = []
  }
}

const getTableFunction = async (
  {
    levelRoom,
    tableId
  }: { levelRoom: number, tableId: number }) => {
  const tableData = await getGameContract().GetCurrentTableInRoom(levelRoom, tableId - 1)
  let cards = await Promise.all<CardNFT[]>(tableData.playingTokenIds.map(async (token: BigNumber) => {
    let level = await getMintContract().viewNFTRoomLevel(token)
    let suit: string = await getMintContract().suits(token)
    let tokenId: string = ethers.utils.formatEther(token)
    return {
      level: parseInt(level),
      suit,
      tokenId
    }
  }))
  return {
    currentGameFinishedAt: ethers.utils.formatEther(tableData.currentGameFinishedAt),
    currentGameStartedAt: ethers.utils.formatEther(tableData.currentGameStartedAt),
    internalGameReduction: ethers.utils.formatEther(tableData.internalGameReduction),
    players: tableData.players,
    playersNow: tableData.playersNow,
    playingSuits: tableData.playingSuits.map((suit: BigNumber) => ethers.utils.formatEther(suit)),
    playingTokenIds: tableData.playingTokenIds.map((token: BigNumber) => ethers.utils.formatEther(token)),
    serialNumber: ethers.utils.formatEther(tableData.serialNumber),
    status: tableData.status,
    cards
  }
}

export const getTable = createAsyncThunk('table/fetch', getTableFunction)

export const submitCarts = createAsyncThunk('submitSubmit/fetch', async (
  {
    levelRoom,
    tableId,
    cartsId
  }: { levelRoom: number, tableId: number, cartsId: number[] }
) => {
  const transaction = await getGameContract().BulkEnterInGame(levelRoom, tableId - 1, cartsId)
  return await transaction.wait().then(async (receipt: any) => {
    if (receipt && receipt.status == 1) {
      return await getTableFunction({tableId, levelRoom})
    }
  })
})

export const returnCarts = createAsyncThunk('return/fetch', async (
  {
    levelRoom,
    tableId,
    cartsId
  }: { levelRoom: number, tableId: number, cartsId: number[] }) => {
  const transaction = await getGameContract().leaveGame(levelRoom, tableId - 1, cartsId)
  return await transaction.wait().then(async (receipt: any) => {
    if (receipt && receipt.status == 1) {
      return await getTableFunction({tableId, levelRoom})
    }
  })
})

export const tableSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addBusyPlace: addDecorator(PlaceState.BUSY),
    addBasketPlace: addDecorator(PlaceState.BASKET),
    addStakedPlace: addDecorator(PlaceState.STAKED),

    removeBusyPlaces: removeDecorator(PlaceState.BUSY),
    removeBasketPlaces: removeDecorator(PlaceState.BASKET),
    removeStakedPlaces: removeDecorator(PlaceState.STAKED),

    setBusyPlaces: setDecorator(PlaceState.BUSY),
    setBasketPlaces: setDecorator(PlaceState.BASKET),
    setStakedPlaces: setDecorator(PlaceState.STAKED),

    clearBusyPlaces: clearDecorator(PlaceState.BUSY),
    clearBasketPlaces: clearDecorator(PlaceState.BASKET),
    clearStakedPlaces: clearDecorator(PlaceState.STAKED),
    clearTable: () => initialState,

    setBasketTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload
    },

    submitPlaces: (state) => {
      state.stakedPlaces = [...state.stakedPlaces, ...state.basketPlaces]
      state.basketPlaces = []
    },

    setChoosingCardPlace: (state, action: PayloadAction<number>) => {
      state.choosingCardPlace = action.payload
    },

    setModalAlert: (state, action: PayloadAction<string>) => {
      state.modalAlert = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getTable.fulfilled, (state, action) => {
      state.tableData = action.payload
      state.timer = 0
    })
      .addCase(returnCarts.fulfilled, (state, action) => {
        state.tableData = action.payload
        state.loadingButton = false
        state.timer = 0
      }).addCase(returnCarts.pending, (state) => {
      state.loadingButton = true
      state.timer = 0
    }).addCase(returnCarts.rejected, (state) => {
      state.loadingButton = false
      state.timer = 0
    })
      .addCase(submitCarts.fulfilled, (state, action) => {
        state.tableData = action.payload
        state.loadingButton = false
        state.timer = 0
      }).addCase(submitCarts.pending, (state) => {
      state.loadingButton = true
      state.timer = 0
    }).addCase(submitCarts.rejected, (state) => {
      state.loadingButton = false
      state.timer = 0
    })
  }
})

export const {
  addBusyPlace,
  addBasketPlace,
  addStakedPlace,

  removeBusyPlaces,
  removeBasketPlaces,
  removeStakedPlaces,

  setBusyPlaces,
  setBasketPlaces,
  setStakedPlaces,

  clearBusyPlaces,
  clearStakedPlaces,
  clearBasketPlaces,
  clearTable,

  setBasketTimer,
  setModalAlert,
  setChoosingCardPlace,
  submitPlaces,
} = tableSlice.actions
export default tableSlice.reducer