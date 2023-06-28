import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    initialized: false as boolean
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        initializationSuccess: (state, action) => {
state.initialized = true
        }
    }
})

export const {reducer: appReducer, actions: appActions} = appSlice