
import { PayloadAction, createSlice } from "@reduxjs/toolkit";



 type StatusType = 'pending' | 'ready';
const initialState = {
    chat: [] as any[],
    statusChat: "pending" as StatusType,
} 

export const chatSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        messageResieved: (state, action: PayloadAction<any[]>) => {
     state.chat = action.payload.filter((m, index, array)=>index >= array.length - 100) 
        },
        statusChanged: (state, action) => {
            state.statusChat = action.payload
        }
    }
})

export const {reducer: chatReducer, actions: chatAction} = chatSlice