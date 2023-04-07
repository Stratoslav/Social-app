import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { messageReducer, userReducer, profileReducer, findUsersReducer, authReducer, appReducer, chatReducer } from './create-reducer';
import logger from 'redux-logger'
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['app', 'users',  'auth','findUsers', ] 
}

const rootReducer = combineReducers({
  profile: profileReducer,
  newMessage: messageReducer,
  users: userReducer,
  findUsers: findUsersReducer,
  auth: authReducer,
  app: appReducer,
chat : chatReducer
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

const persistor = persistStore(store)
export  {store, persistor};
