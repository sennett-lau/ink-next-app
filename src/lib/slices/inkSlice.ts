import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IInkSliceAddInksAction,
  IInkSliceInitialState,
  IInkSliceSetInksAction,
  IInkSliceSetIsLoadedAction,
  IInkSliceSetTotalAction,
} from '../../types/inkSlice'

const initialState: IInkSliceInitialState = {
  isLoaded: false,
  total: 0,
  inks: [],
}

export const inkSlice = createSlice({
  name: 'ink',
  initialState,
  reducers: {
    setIsLoaded: (state, action: IInkSliceSetIsLoadedAction) => {
      state.isLoaded = action.payload.isLoaded
    },
    setTotal: (state, action: IInkSliceSetTotalAction) => {
      state.total = action.payload.total
    },
    setInks: (state, action: IInkSliceSetInksAction) => {
      state.inks = action.payload.inks
    },
    addInks: (state, action: IInkSliceAddInksAction) => {
      state.inks = [...state.inks, ...action.payload.inks]
    },
  },
})

export const { setIsLoaded, setTotal, setInks, addInks } = inkSlice.actions

export default inkSlice.reducer
