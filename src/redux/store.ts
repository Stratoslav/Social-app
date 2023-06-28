import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {  userReducer , authReducer, appReducer } from './create-reducer';
import { findUserReducer } from './slice/findUserSlice';
import { profileReducer } from './slice/profileSlice';
import { messageReducer } from './slice/messageSlice';
import { chatReducer } from './slice/chatSlice';
import { newsReducer } from './slice/newsReducer';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['app', 'users',  'auth','findUsers', ] 
}

const rootReducer = combineReducers({
  profile: profileReducer,
  newMessage: messageReducer,
  users: userReducer,
  findUsers: findUserReducer,
  auth: authReducer,
  app: appReducer,
  chat: chatReducer,
news: newsReducer
})

type RootReducerType = typeof rootReducer
export type AppStateReducer = ReturnType<RootReducerType>

type PropertiseType<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiseType<T>>

const persistedReducers = persistReducer(persistConfig, rootReducer)


const store = configureStore({
  reducer: persistedReducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
const persistor = persistStore(store)
export  {store, persistor};
 