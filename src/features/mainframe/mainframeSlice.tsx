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
    gameInfoDialog: boolean
    mintDialog: boolean
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
    gameInfoDialog: false,
    mintDialog: false
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

            state.gameInfoDialog = false
            state.mintDialog = false

            state.layer2Blured = false
            state.activeHeaderDropdown = 0
        },
        setGameInfoDialog: (state, action: PayloadAction<boolean>) => {
            state.gameInfoDialog = action.payload

            state.gameAccountDialog = false
            state.mintDialog = false

            state.layer2Blured = false
            state.activeHeaderDropdown = 0
        },
        setMintDialog: (state, action: PayloadAction<boolean>) => {
            state.mintDialog = action.payload

            state.gameAccountDialog = false
            state.gameInfoDialog = false

            state.layer2Blured = false
            state.activeHeaderDropdown = 0
        }
    }
})

export const {
    setFooterModal,
    setConnectWalletModal,
    setDisableWalletModal,
    setActiveHeaderDropdown,
    setGameAccountDialog,
    setGameInfoDialog,
    setMintDialog
} = mainframeSlice.actions
export default mainframeSlice.reducer