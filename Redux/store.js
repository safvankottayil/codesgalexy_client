import { configureStore } from "@reduxjs/toolkit";
import { persistReducer,persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'
// import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { ClentReduser } from "./client";

const UserpersistConfig = {
    key: 'User',
    storage,
  }
  const UserPersistReducer=persistReducer(UserpersistConfig,ClentReduser)
  export const store= configureStore({
    reducer:{
        Client:UserPersistReducer
    }
  })
  persistStore(store)