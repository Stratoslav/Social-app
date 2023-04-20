import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type MessageType = {
     messagers: Array<{message: string, id: number}>,
    messageNewBody: string,

}
const initialState: MessageType = {
    messagers: [
        { message: 'Hello', id: 1 },
    { message: 'How are you?', id: 2 },
    ],
    messageNewBody: "",

}

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addNewMessage: (state, action: PayloadAction<string>) => {
          
            state.messageNewBody = action.payload;
            const newMessage = {
        id: Math.random(),
        message: action.payload,
            };
            state.messagers.push(newMessage)
}
    }
})

export const {reducer: messageReducer, actions: messageAction} = messageSlice