
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type NewsType = {
     category
: 
string[]
content
: string
country
: 
string[]
creator
: 
null | any
description
:  string
image_url
: 
string
keywords
: 
string[]
language
: 
string
link
:  string
pubDate
: 
string
source_id
: 
string
title
:  string
video_url
: 
null | any
 }
const initialState = {
    news: [] as NewsType[],
   
    pages: 0 as number,
    newsCount: 0,
    nextPage: null as any
} 

export const newsSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        getSearchNews: (state, action: PayloadAction<NewsType[]>) => {
     
     state.news = action.payload
        },
        newsPageCount: (state, action: PayloadAction<any>) => {
        
            state.nextPage = action.payload.nextPage
            
            let totalCountOfPages = Math.ceil( action.payload.totalHits / 10)
            state.pages = totalCountOfPages
         
        
           
        },
       
    }
})

export const {reducer: newsReducer, actions: newsAction} = newsSlice