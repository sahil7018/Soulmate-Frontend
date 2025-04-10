import { configureStore } from "@reduxjs/toolkit";
import storeReducer from './slices/slice';

export const store = configureStore({
    reducer: {
        dataStore: storeReducer,
    }
});
