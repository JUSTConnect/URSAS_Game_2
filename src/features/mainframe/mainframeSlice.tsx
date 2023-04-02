import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface mainframeState {
    contentBlured: boolean
    mainBlured: boolean
    footerModal: boolean
    connectWalletModal: boolean
    disableWalletModal: boolean
    activeHeaderDropdown: number
}

const initialState: mainframeState = {
    contentBlured: false,
    mainBlured: false,
    footerModal: false,
    connectWalletModal: false,
    disableWalletModal: false,
    activeHeaderDropdown: 0
}

export const mainframeSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setContentBlured: (state, action: PayloadAction<boolean>) => {
            state.contentBlured = action.payload
        },
        setMainBlured: (state, action: PayloadAction<boolean>) => {
            state.mainBlured = action.payload
        },
        setFooterModal: (state, action: PayloadAction<boolean>) => {
            state.footerModal = action.payload
        },
        setConnectWalletModal: (state, action: PayloadAction<boolean>) => {
            state.connectWalletModal = action.payload
        },
        setDisableWalletModal: (state, action: PayloadAction<boolean>) => {
            state.disableWalletModal = action.payload
        },
        setActiveHeaderDropdown: (state, action: PayloadAction<number>) => {
            state.contentBlured = !(action.payload === 0)  
            state.activeHeaderDropdown = action.payload
        }
    }
})

export const {
    setContentBlured,
    setMainBlured,
    setFooterModal,
    setConnectWalletModal,
    setDisableWalletModal,
    setActiveHeaderDropdown
} = mainframeSlice.actions
export default mainframeSlice.reducer