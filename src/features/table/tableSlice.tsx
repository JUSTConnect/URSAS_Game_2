import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction, Draft} from '@reduxjs/toolkit'

import {PlaceProps} from '@/components/UIPlace'
import {CardNFT, TableData} from "@lib/types/game";

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

    setLoaderButton: (state, action: PayloadAction<boolean>) => {
      state.loadingButton = action.payload
}
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

  setLoaderButton,
  setBasketTimer,
  setModalAlert,
  setChoosingCardPlace,
  submitPlaces,
} = tableSlice.actions
export default tableSlice.reducer