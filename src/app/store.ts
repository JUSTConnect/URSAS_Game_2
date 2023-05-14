import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '@/features/game/gameSlice'
import mainframeReducer from '@/features/mainframe/mainframeSlice'
import roomsReducer from '@/features/rooms/roomsSlice'
import tablesReducer from '@/features/tables/tablesSlice'
import tableReducer from '@/features/table/tableSlice'
import web3Reducer from '@/features/web3/web3Slice'


export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),
  reducer: {
    game: gameReducer,
    mainframe: mainframeReducer,
    rooms: roomsReducer,
    tables: tablesReducer,
    table: tableReducer,
    web3: web3Reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
