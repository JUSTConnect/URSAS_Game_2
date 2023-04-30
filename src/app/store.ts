import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '@/features/game/gameSlice'
import mainframeReducer from '@/features/mainframe/mainframeSlice'
import roomsReducer from '@/features/rooms/roomsSlice'
import tablesReducer from '@/features/tables/tablesSlice'
import tableReducer from '@/features/table/tableSlice'


export const store = configureStore({
  reducer: {
    game: gameReducer,
    mainframe: mainframeReducer,
    rooms: roomsReducer,
    tables: tablesReducer,
    table: tableReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
