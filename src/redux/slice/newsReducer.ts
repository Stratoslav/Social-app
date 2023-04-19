
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

 
const initialState = {
    news: [] as any[],
    // pagesArray: [] as number[],
    pages: 0 as number,
    newsCount: 0,
    nextPage: null as any
} 

export const newsSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        getSearchNews: (state, action: PayloadAction<any[]>) => {
     state.news = action.payload
        },
        newsPageCount: (state, action: PayloadAction<any>) => {
          
            state.nextPage = action.payload.nextPage
            
            let totalCountOfPages = Math.ceil( action.payload.totalHits / 10)
            state.pages = totalCountOfPages
         
            // for (let i = 0; i <= totalCountOfPages; i++){
                // state.pages.push(i)
                // console.log(state.pages)
            // }
          
           
        },
       
    }
})

export const {reducer: newsReducer, actions: newsAction} = newsSlice