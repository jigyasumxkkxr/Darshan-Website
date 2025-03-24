import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import destinationSlice from "./destinationSlice"
import tourPackagesSlice from './tourPackagesSlice'
import currencySlice from './currencySlice';

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}


const rootReducer = combineReducers({
   auth: authSlice,
   destination: destinationSlice,
   tourPackages: tourPackagesSlice,
   currency: currencySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;