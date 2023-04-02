import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '@/features/game/gameSlice'
import mainframeReducer from '@/features/mainframe/mainframeSlice'
import tableReducer from '@/features/table/tableSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    mainframe: mainframeReducer,
    table: tableReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch