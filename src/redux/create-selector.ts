import { AppStateReducer } from "./store"

// import { createSelector } from "@reduxjs/toolkit";
export const getProfile = (state: AppStateReducer) => {
  return  state.profile.profile
}

export const getUserStatus = (state: AppStateReducer) => {
    return state.profile.status
} 

 export const getAuthUserId = (state: AppStateReducer) => {
     return state.auth.userId
 }

export const  setNewPost = (state: AppStateReducer) => {
  return  state.profile.posts
} 

export const  getIsAuth = (state: AppStateReducer) => {
  return  state.auth.isAuth
} 

export const  getFindUser = (state: AppStateReducer) => {
  return  state.findUsers.findUsers
} 

export const  getLogin = (state: AppStateReducer) => {
  return  state.auth.login
} 

export const  getUrlCaptcha = (state: AppStateReducer) => {
  return  state.auth.captchaUrl
} 

export const  getNewMessage = (state: AppStateReducer) => {
  return  state.newMessage.messagers
} 

export const  getAllUsers = (state: AppStateReducer) => {
  return  state.users.users
} 

export const  getMessageUserId = (state: AppStateReducer) => {
  return   state.users.users.length
  // return   state.users.users.id<<<<<<<<<<<<<MISTAKE>>>>>>>>
} 

export const  getCurrentPage = (state: AppStateReducer) => {
  return   state.findUsers.currentPage
} 

export const  getTotalCount = (state: AppStateReducer) => {
  return   state.findUsers.totalCount
} 

export const  getCountUsers = (state: AppStateReducer) => {
  return   state.findUsers.userCount
} 

export const  getPreloader = (state: AppStateReducer) => {
  return   state.findUsers.isPreloader
} 

export const  setInitialized = (state: AppStateReducer) => {
  return   state.app.initialized
} 


export const getFilter = (state: AppStateReducer) => state.findUsers.filter