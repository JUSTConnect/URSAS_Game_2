import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { tabs as dialogGameAccountTabs } from '@/components/DialogGameAccount'


export interface mainframeState {
    layoutBlured: boolean
    layer1Blured: boolean
    layer2Blured: boolean
    footerModal: boolean
    connectWalletModal: boolean
    disableWalletModal: boolean
    activeHeaderDropdown: number
    gameAccountDialog: [boolean, dialogGameAccountTabs]
    gameInfoDialog: boolean
    mintDialog: boolean
    refetch: boolean
}

const initialState: mainframeState = {
    layoutBlured: false,
    layer1Blured: false,
    layer2Blured: false,
    footerModal: false,
    connectWalletModal: false,
    disableWalletModal: false,
    activeHeaderDropdown: 0,
    gameAccountDialog: [false, dialogGameAccountTabs.WALLET],
    gameInfoDialog: false,
    mintDialog: false,
    refetch: true
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
        setGameAccountDialog: (state, action: PayloadAction<[boolean, dialogGameAccountTabs]>) => {
            state.gameAccountDialog = action.payload

            state.gameInfoDialog = false
            state.mintDialog = false

            state.layer2Blured = false
            state.activeHeaderDropdown = 0
        },
        setGameInfoDialog: (state, action: PayloadAction<boolean>) => {
            state.gameInfoDialog = action.payload

            state.gameAccountDialog[0] = false
            state.mintDialog = false

            state.layer2Blured = false
            state.activeHeaderDropdown = 0
        },
        setMintDialog: (state, action: PayloadAction<boolean>) => {
            state.mintDialog = action.payload

            state.gameAccountDialog[0] = false
            state.gameInfoDialog = false

            state.layer2Blured = false
            state.activeHeaderDropdown = 0
        },
        setRefetch: (state, action: PayloadAction<boolean>) => {
            state.refetch = action.payload
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
    setMintDialog,
    setRefetch
} = mainframeSlice.actions
export default mainframeSlice.reducer