export interface IInkSliceInitialState {
  isLoaded: boolean
  total: number
  inks: string[]
}

export interface IInkSliceSetIsLoadedAction {
  payload: {
    isLoaded: boolean
  }
}

export interface IInkSliceSetTotalAction {
  payload: {
    total: number
  }
}

export interface IInkSliceSetInksAction {
  payload: {
    inks: string[]
  }
}

export interface IInkSliceAddInksAction {
  payload: {
    inks: string[]
  }
}
