import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, Draft } from '@reduxjs/toolkit'

import type { TableProps } from '@/components/Table'

// example data

const examplePlaces: TableProps[] = [
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
        freePlaces:0,
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
        tableNumber: item+5,
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
    places: TableProps[]
    filter: TablesFilter
}

const initialState: tablesState = {
    places: examplePlaces,
    filter: TablesFilter.all
}


export const tablesSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<TablesFilter>) => {
            state.filter = action.payload
        },
    }
})

export const {
    setFilter
} = tablesSlice.actions
export { TablesFilter }
export default tablesSlice.reducer