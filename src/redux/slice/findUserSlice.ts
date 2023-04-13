
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface ProfileI {
    findUsers: any[],
    currentPage: number,
    totalCount: number,
    isPreloader: boolean,
    filter: { term: string },
    userCount: number
}

const initialState: ProfileI = {
    findUsers: [],
    currentPage: 1,
    totalCount: 0,
    isPreloader: false,
    filter: {
        term: ''
    },
    userCount: 10
} 

export const findUserSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<any>) => {
            state.findUsers = [...action.payload]
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
 state.currentPage = action.payload
        },
        setTotalCount: (state, action: PayloadAction<number>) => {
state.totalCount = action.payload
        },
        setPreloader: (state, action: PayloadAction<boolean>) => {
          state.isPreloader = action.payload
        },
        followUnfollow: (state, action: PayloadAction<number>) => {

          state.findUsers =  state.findUsers.map(user => {
                if (user.id === action.payload) {
          
                    return { ...user, followed: !user.followed };
                }
                return user;
       
            }) 
            },
        setFilter: (state, action: PayloadAction<any>) => {
            state.filter = action.payload
        }
    }
})

export const {reducer: findUserReducer, actions: findUserAction} = findUserSlice