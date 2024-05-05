import { configureStore } from '@reduxjs/toolkit'
import inkSlice from './slices/inkSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      inks: inkSlice,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
