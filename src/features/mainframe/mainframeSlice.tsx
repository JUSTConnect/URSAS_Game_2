import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface mainframeState {
    layoutBlured: boolean
    layer1Blured: boolean
    layer2Blured: boolean
    footerModal: boolean
    connectWalletModal: boolean
    disableWalletModal: boolean
    activeHeaderDropdown: number
    gameAccountDialog: boolean
}

const initialState: mainframeState = {
    layoutBlured: false,
    layer1Blured: false,
    layer2Blured: false,
    footerModal: false,
    connectWalletModal: false,
    disableWalletModal: false,
    activeHeaderDropdown: 0,
    gameAccountDialog: false,
}

export const mainframeSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setLayoutBlured: (state, action: PayloadAction<boolean>) => {
            state.layoutBlured = action.payload
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
            state.layer2Blured = !(action.payload === 0)
            state.activeHeaderDropdown = action.payload
        },
        setGameAccountDialog: (state, action: PayloadAction<boolean>) => {
            state.gameAccountDialog = action.payload  
            state.layer2Blured = false
            state.activeHeaderDropdown = 0
        },
    }
})

export const {
    setFooterModal,
    setConnectWalletModal,
    setDisableWalletModal,
    setActiveHeaderDropdown,
    setGameAccountDialog
} = mainframeSlice.actions
export default mainframeSlice.reducer