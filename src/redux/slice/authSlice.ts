import { string } from 'yup';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";



type AuthType = {
    userId: null | number,
    captchaUrl: null | string,
    isAuth: boolean
 };
const initialState: AuthType = {
    userId: null,
    captchaUrl: null,
    isAuth: false
} 

export const authSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setAuthUserData: (state, action: PayloadAction<{id:number, login:string, email: string, isAuth: boolean, captha?: any}>) => {
     state.userId = action.payload.id
        },
        getCapthaUrlSuccess: (state, action: PayloadAction<string | null>) => {
            state.captchaUrl = action.payload
        }
    }
})

export const {reducer: authReducer, actions: authAction} = authSlice